import { Body, ClassSerializerInterceptor, Controller, Get, Post, Query, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { User } from 'src/common/decorators/user.decorator';
import EncrypterHelper from 'src/common/helpers/encrypter.helper';
import { AccessTokenGuard } from 'src/modules/auth/guards/accessToken.guard';
import { AuthUser } from '../auth/payloads/auth.payload';
import { EstimateScanToReceiveDto } from './dtos/estimate.dto';
import { InvoiceDto, InvoiceDtoV2 } from './dtos/invoice.dto';
import { ReceiveDto } from './dtos/receive.dto';
import { ScanDto } from './dtos/scan.dto';
import { ReceiveService } from './receive.service';

@UseInterceptors(ClassSerializerInterceptor)
@Controller('receive')
export class ReceiveController {
    constructor(
        private receiveService: ReceiveService,
        private encrypterService: EncrypterHelper
    ) { }

    @UseInterceptors(FileInterceptor('file', {
        fileFilter: (req, file, callback) => {
            if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
                return callback(new Error('Only image files are allowed!'), false);
            }
            callback(null, true);
        }
    }))
    @Post('/via-link')
    receiveViaLink(@Body() body: ReceiveDto, @UploadedFile() file: Express.Multer.File) {
        return this.receiveService.receiveViaLink(body, file)
    }

    @UseGuards(AccessTokenGuard)
    @Get('/scan/estimate')
    estimateScanToReceive(@Query() query: EstimateScanToReceiveDto) {
        return this.receiveService.estimateScanToReceive(query)
    }

    @UseGuards(AccessTokenGuard)
    @Post('/scan')
    async scanToReceive(@User() user: AuthUser, @Body() data: ScanDto) {
        const rocketDecrypted = await this.encrypterService.decryptRocket(data.rocket)
        data.btcPrice = Number(rocketDecrypted)
        return this.receiveService.scanToReceive(user, data)
    }

    @UseGuards(AccessTokenGuard)
    @Post('/generate-invoice')
    async generateInvoice(@User() user: AuthUser, @Body() data: InvoiceDto) {
        return this.receiveService.generateInvoice(user, data)
    }

    @UseGuards(AccessTokenGuard)
    @Post('/generate-invoice/v2')
    async generateInvoiceV2(@User() user: AuthUser, @Body() data: InvoiceDtoV2) {
        const rocketDecrypted = await this.encrypterService.decryptRocket(data.rocket)
        data.btcPrice = Number(rocketDecrypted)
        return this.receiveService.generateInvoice(user, data)
    }
}
