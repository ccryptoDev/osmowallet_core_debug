import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FundingMethod } from 'src/entities/fundingMethod.entity';
import { TierFeature } from 'src/entities/tierFeature.entity';
import { TierFunding } from 'src/entities/tierFunding.entity';
import { WithdrawalMethod } from 'src/entities/withdrawalMethod.entity';
import { AdminFeaturesController } from './admin-features.controller';
import { AdminFeaturesService } from './admin-features.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      TierFeature,
      FundingMethod,
      WithdrawalMethod,
      TierFunding,
    ])
  ],
  controllers: [AdminFeaturesController],
  providers: [AdminFeaturesService]
})
export class AdminFeaturesModule { }
