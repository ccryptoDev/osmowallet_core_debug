import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { isUUID } from 'class-validator';
import { TierFeature } from 'src/entities/tierFeature.entity';
import { FindOptionsWhere, Repository } from 'typeorm';
import { UpdateTierFeatureDto } from './dtos/tierFeature.dto';
import { FundingMethod } from 'src/entities/fundingMethod.entity';
import { UpdateFundingMethodDto } from './dtos/updateFundingMethod.dto';
import { WithdrawalMethod } from 'src/entities/withdrawalMethod.entity';
import { TierFunding } from 'src/entities/tierFunding.entity';
import { GetFundingByTierDto } from './dtos/getFundingByTier.dto';
import { UpdateWithdrawlMethodDto } from './dtos/updateWithdrawlMethod.dto';

@Injectable()
export class AdminFeaturesService {
    constructor(
        @InjectRepository(TierFeature) private tierFeatureRepository: Repository<TierFeature>,
        @InjectRepository(FundingMethod) private fundingMethodRepository: Repository<FundingMethod>,
        @InjectRepository(WithdrawalMethod) private withdrawalMethodRepository: Repository<WithdrawalMethod>,
        @InjectRepository(TierFunding) private tierFundingRepository: Repository<TierFunding>,
    ) {}

    async getWithdrawMethods() {
        const withdrawalMethods = await this.withdrawalMethodRepository.find();
        return withdrawalMethods;
    }

    async updateWithdrawalMethod(id: string, data: UpdateWithdrawlMethodDto) {
        if (!isUUID(id)) throw new BadRequestException('Invalid id');
        await this.withdrawalMethodRepository.update(id, {
            fee: data.fee,
            max: data.max,
            min: data.min,
            estimateTime: data.estimateTime,
            description: data.description,
        });
    }

    async getFundingMethods(query: GetFundingByTierDto) {
        const options: FindOptionsWhere<TierFunding>[] = [];
        if (query.tierId != null) {
            options.push({
                tier: { id: query.tierId },
            });
        }
        const fundingMethods = await this.tierFundingRepository.find({
            relations: { fundingMethod: true, tier: true },
            select: { fundingMethod: { name: true, description: true, estimateTime: true } },
            where: options,
        });
        return fundingMethods;
    }

    async updateFundingMethod(id: string, data: UpdateFundingMethodDto) {
        if (!isUUID(id)) throw new BadRequestException('Invalid id');
        await this.tierFundingRepository.update(id, {
            fee: data.fee,
            max: data.max,
            min: data.min,
            dailyLimit: data.dailyLimit,
            monthlyLimit: data.monthlyLimit,
            isActive: data.isActive,
        });
    }

    async getFeatures() {
        const tierFeatures = await this.tierFeatureRepository.find({
            relations: {
                feature: true,
                tier: true,
            },
        });
        return tierFeatures;
    }

    async updateTierFeature(id: string, data: UpdateTierFeatureDto) {
        if (!isUUID(id)) throw new BadRequestException('Invalid id');

        await this.tierFeatureRepository.update(id, {
            dailyLimit: data.dailyLimit,
            fee: data.fee,
            min: data.min,
            max: data.max,
            monthlyLimit: data.monthlyLimit,
        });
    }
}