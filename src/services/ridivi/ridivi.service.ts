import { BadRequestException, Injectable } from '@nestjs/common';
import axios from 'axios'
import { GetIbanAccountResponse } from './interfaces/get-iban-account-response';
import { DtrTransferResponse } from './interfaces/dtr-transfer-response';
import { DtrLoadTransfer } from './interfaces/dtr-load-transfer';
import { InjectModel } from '@nestjs/mongoose';
import { RidiviAccount, RidiviIbanAccount } from 'src/schemas/solfinAccount.schema';
import { Model } from 'mongoose';
import { UpdateBalanceTransferType } from 'src/modules/balance-updater/enums/type.enum';
import * as crypto from 'crypto';
import { KycService } from 'src/modules/kyc/kyc.service';
import { UsersService } from 'src/modules/users/users.service';
import { RawKyc } from 'src/modules/kyc/interfaces/raw-kyc';
import { getNameSplitted } from 'src/modules/kyc/helpers/name-extracter';
import { Country } from 'src/schemas/countries.schema';
import { generateRandomPassword } from 'src/common/helpers/password-generator';
import fetch from 'node-fetch';
import { v4 as uuidv4 } from 'uuid';
import { RidiviNewUserResponse } from './interfaces/new-user-response';
import { GoogleCloudTasksService } from '../google-cloud-tasks/google-cloud-tasks.service';
import { CreateRidiviAccount } from './interfaces/create-account';
import { Status } from 'src/common/enums/status.enum';
import { RidiviCurrency } from './enums/currency.enum';
import { InternalTransfer } from 'src/common/interfaces/internal-transfer';
import { ConfigService } from '@nestjs/config';

type RidiviFile = {
    url: string
    fileName: string
}
@Injectable()
export class RidiviService {
    private RIDIVI_QUEUE: string
    private RIDIVI_ACCOUNT_URL: string
    private baseURL: string
    private payURL: string

    constructor(
        @InjectModel(RidiviAccount.name) private ridiviAccountModel: Model<RidiviAccount>,
        @InjectModel(Country.name) private countryModel: Model<Country>,
        private googleTaskService: GoogleCloudTasksService,
        private userService: UsersService,
        private kycService: KycService,
        private configService: ConfigService,
    ) {
        this.RIDIVI_QUEUE = `RIDIVI-${configService.getOrThrow('ENV')}`
        this.RIDIVI_ACCOUNT_URL = `https://${configService.getOrThrow('DOMAIN')}/ridivi/accounts`
        this.baseURL = configService.getOrThrow('RIDIVI_URL')
        this.payURL = configService.getOrThrow('RIDIVI_PAY_URL')
    }

    async fetchAndInsertCountries() {
        try {
            const response = await axios.get('https://restcountries.com/v3.1/all');
            const countries = response.data.map((country: { cca2: string, cca3: string, ccn3: string, name: { common: string } }) => ({
                cca2: country.cca2,
                cca3: country.cca3,
                ccn3: country.ccn3,
                name: country.name.common
            }));
            const countriesFiltered = countries.filter((c: { ccn3: string }) => c.ccn3 != undefined)
            await this.countryModel.insertMany(countriesFiltered);
            console.log('Countries successfully inserted into the database');
        } catch (error) {
            console.error('Failed to fetch and insert countries:', error);
        }
    }

    private async uploadFile(ridiviFile: RidiviFile) {
        const fileResponse = await fetch(ridiviFile.url);
        const buffer = await fileResponse.buffer();
        const base64Image = buffer.toString('base64');
        const key = await this.getKey()
        const modifiedBase64Image = `data:image/jpeg;base64,${base64Image}`;
        const body = {
            option: 'uploadFiles',
            key: key,
            name: ridiviFile.fileName,
            contend: modifiedBase64Image
        }
        const response = await axios.post(this.payURL ?? '', body)
        console.log(response.data)
    }

    private async createIbanAccount(documentId: string, currency: string) {
        const key = await this.getKey()
        const body = {
            option: 'newAccount',
            key: key,
            cur: currency,
            idNumber: documentId,
            name: `Cuenta en ${currency}`
        }
        const response = await axios.post(this.payURL ?? '', body)
        return response.data
    }

    async getUser(documentId: string): Promise<RidiviNewUserResponse> {
        const key = await this.getKey()
        const body = {
            option: 'getUser',
            key: key,
            idNumber: documentId
        }
        const response = await axios.post(this.payURL ?? '', body)
        return response.data
    }

    /// STEP 2
    async createAccounts(createRidiviAccount: CreateRidiviAccount) {
        let ridiviUser = await this.getUser(createRidiviAccount.documentId)
        const partnerStatus = await this.kycService.getKycPartnerStatuses({ sub: createRidiviAccount.userId })

        if (!ridiviUser.user.active || !partnerStatus) {
            new Promise(resolve => setTimeout(resolve, 2000)).then(() => this.googleTaskService.createInternalTask(this.RIDIVI_QUEUE, createRidiviAccount, this.RIDIVI_ACCOUNT_URL))
            return
        }
        const ridiviCurrencies = Object.values(RidiviCurrency);
        await Promise.all(ridiviCurrencies.map(currency => this.createIbanAccount(createRidiviAccount.documentId, currency)))
        ridiviUser = await this.getUser(createRidiviAccount.documentId)
        const accounts: RidiviIbanAccount[] = ridiviUser.user.accounts.map(account => ({
            currency: account.cur,
            iban: account.iban
        }))
        await this.ridiviAccountModel.create({
            accounts: accounts,
            documentId: createRidiviAccount.documentId,
            userId: createRidiviAccount.userId
        })
        await this.kycService.updateBankKyc({ userId: createRidiviAccount.userId, status: Status.COMPLETED })
    }

    /// STEP 1
    async createUser(userId: string): Promise<any> {
        const user = await this.userService.getUserById(userId);
        const osmoAccount = await this.ridiviAccountModel.findOne({ userId: 'osmo' });
        const rawKyc = await this.kycService.getRawKyc(userId) as RawKyc;
        let photos = rawKyc.images;
        if (photos.length === 1) {
            photos = [...photos, ...photos];
        }

        const filePrefixPath = `${osmoAccount?.documentId}/KYC/`
        const images: RidiviFile[] = photos.map(photoUrl => {
            const fileName = `${filePrefixPath}${uuidv4()}`;
            return {
                url: photoUrl,
                fileName: fileName
            };
        });
        await Promise.all(images.map(image => this.uploadFile(image)))

        const splittedName = getNameSplitted(rawKyc)
        const expDate = rawKyc.fields.find(field => field.name == 'Expiration date')?.value
        const dateOfBirth = rawKyc.fields.find(field => field.name == 'Date of birth')?.value
        const formattedDateOfBirth = dateOfBirth ? dateOfBirth.split('-').reverse().join('/') : '';
        const formattedExpDate = expDate ? expDate.split('-').reverse().join('/') : '';
        const sex = rawKyc.fields.find(field => field.name == 'Sex')?.value == 'M' ? 1 : 2
        const nationality = rawKyc.fields.find(field => field.name == 'Nationality')?.value
        let numericCode = 188;
        if (nationality?.length === 2) {
            const country = await this.countryModel.findOne({ cca2: nationality }).exec();
            numericCode = country ? country.ccn3 : 188;
        } else if (nationality?.length === 3) {
            const country = await this.countryModel.findOne({ cca3: nationality }).exec();
            numericCode = country ? country.ccn3 : 188;
        }
        const documentId = rawKyc.verification.documentNumber;
        let idTypeCode = documentId.charAt(0);

        if (!['0', '1', '5', '3'].includes(idTypeCode)) idTypeCode = '9';

        const newPassword = generateRandomPassword();
        const key = await this.getKey()

        const body = {
            option: 'newUser',
            key: key,
            firstName: splittedName.firstName,
            lastName: splittedName.lastName,
            nationality: numericCode.toString(),
            idType: '9',
            NewidNumber: documentId,
            idLocality: "188",
            idExpDate: formattedExpDate,
            NewPassword: newPassword,
            phone: user?.mobile,
            email: user?.email,
            file1: `${images[0]?.fileName}.jpeg`,
            file2: `${images[1]?.fileName}.jpeg`,
            gender: sex,
            dateBirth: formattedDateOfBirth
        }
        const bodyValues = Object.values(body);
        if (bodyValues.some(value => value === undefined)) {
            throw new BadRequestException('One or more required fields are undefined.');
        }
        await axios.post(`${this.payURL}`, body);
        const createAccountBody: CreateRidiviAccount = {
            userId: userId,
            documentId: documentId
        }
        this.googleTaskService.createInternalTask(this.RIDIVI_QUEUE, createAccountBody, this.RIDIVI_ACCOUNT_URL)
    }


    private async getKey(): Promise<string> {
        try {
            const password = this.configService.getOrThrow<string>('RIDIVI_PASSWORD')
            const encryptedPassword = crypto.createHash('sha1').update(password).digest('hex');
            const response = await axios.post(`${this.payURL}`, {
                option: 'getKey',
                userName: process.env.RIDIVI_USERNAME,
                password: encryptedPassword
            });
            return response.data.key
        } catch (error) {
            throw new BadRequestException('Failed to get key from Ridivi API');
        }
    }

    async getToken(): Promise<string> {
        try {
            const response = await axios.post(`${this.baseURL}/auth/token`, {
                key: process.env.RIDIVI_CLIENT_ID,
                secret: process.env.RIDIVI_CLIENT_SECRET,
            }, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            return response.data.token;
        } catch (error) {
            throw new Error('Failed to fetch token from Ridivi API');
        }
    }

    private async getIbanAccountByIban(iban: string): Promise<GetIbanAccountResponse> {
        try {
            const response = await axios.post(`${this.baseURL}/sinpe/getIbanData`, {
                iban: iban,
            }, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            return response.data
        } catch (error) {
            throw new BadRequestException('Could not get iban account')
        }
    }

    private async loadTransfer(data: DtrLoadTransfer): Promise<DtrTransferResponse> {
        const token = await this.getToken()
        try {
            const response = await axios.post(`${this.baseURL}/sinpe/loadTransfer`, data, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
            });

            return response.data.token;
        } catch (error) {
            throw new Error('Failed to fetch token from Ridivi API');
        }
    }

    private async sendTransferLoaded(loadKey: string): Promise<DtrTransferResponse> {
        const token = await this.getToken();
        try {
            const response = await axios.post(`${this.baseURL}/sinpe/sendLoadedTransfer`, {
                loadKey: loadKey,
            }, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
            });

            return response.data;
        } catch (error) {
            throw new Error('Failed to send loaded transfer via Ridivi API');
        }
    }

    async createExternalDtrTransfer(data: any) {
        const userAccount = await this.ridiviAccountModel.findOne({ userId: data.userId })
        const ibanAccount = userAccount?.accounts.find(account => account.currency == data.currency)
        const accountTo = await this.getIbanAccountByIban(data.iban)
        const transferData: DtrLoadTransfer = {
            amount: data.amount,
            currency: data.currency,
            toIban: data.toIban,
            toId: accountTo.identification,
            time: 'DTR',
            text: 'DTR Transfer',
            service: 'DTR Transfer',
            fromIban: ibanAccount?.iban ?? '',
            fromId: userAccount?.documentId ?? '',
        }
        const transferLoaded = await this.loadTransfer(transferData)
        await this.sendTransferLoaded(transferLoaded.loadKey)
    }

    async createInternalTransfer(data: InternalTransfer) {
        const userAccount = await this.ridiviAccountModel.findOne({ userId: data.userId })
        const userIbanAccount = userAccount?.accounts.find(account => account.currency == data.currency)
        const osmoAccount = await this.ridiviAccountModel.findOne({ userId: 'osmo' })
        const osmoIbanAccount = osmoAccount?.accounts.find(account => account.currency == data.currency)
        let ibanFrom, ibanTo, toId, fromId
        if (data.type == UpdateBalanceTransferType.OSMO_TO_USER) {
            ibanFrom = osmoIbanAccount?.iban
            ibanTo = userIbanAccount?.iban
            fromId = osmoAccount?.documentId
            toId = userAccount?.documentId
        } else {
            ibanFrom = userIbanAccount?.iban
            ibanTo = osmoIbanAccount?.iban
            fromId = userAccount?.documentId
            toId = osmoAccount?.documentId
        }
        const transferData: DtrLoadTransfer = {
            amount: data.amount,
            currency: data.currency,
            toIban: ibanTo ?? '',
            toId: toId ?? '',
            time: 'tft',
            text: 'Internal Transfer',
            service: 'Internal Transfer',
            fromIban: ibanFrom ?? '',
            fromId: fromId ?? '',
        }
        const transferLoaded = await this.loadTransfer(transferData)
        await this.sendTransferLoaded(transferLoaded.loadKey)
    }
}
