import { Body, Controller, Get, Param, Put, Query, UseGuards } from '@nestjs/common';
import { AdminAccessTokenGuard } from '../admin-auth/guards/accessToken.guard';
import { AdminFeaturesService } from './admin-features.service';
import { GetFundingByTierDto } from './dtos/getFundingByTier.dto';
import { UpdateTierFeatureDto } from './dtos/tierFeature.dto';
import { UpdateFundingMethodDto } from './dtos/updateFundingMethod.dto';
import { UpdateWithdrawlMethodDto } from './dtos/updateWithdrawlMethod.dto';

@UseGuards(AdminAccessTokenGuard)
@Controller('admin/features')
export class AdminFeaturesController {
    constructor(private adminFeatureService: AdminFeaturesService) { }

    @Put('/withdrawal/methods/:id')
    updateWithdrawalMethod(@Param('id') id: string, @Body() data: UpdateWithdrawlMethodDto) {
        return this.adminFeatureService.updateWithdrawalMethod(id, data)
    }

    @Get('/withdrawal/methods')
    getWithdrawalMethods() {
        return this.adminFeatureService.getWithdrawMethods()
    }

    @Put('/funding/methods/:id')
    updateFundingMethod(@Param('id') id: string, @Body() data: UpdateFundingMethodDto) {
        return this.adminFeatureService.updateFundingMethod(id, data)
    }

    @Get('/funding/methods')
    getFundingMethods(@Query() query: GetFundingByTierDto) {
        return this.adminFeatureService.getFundingMethods(query)
    }

    @Put('/:id')
    updateTierFeature(@Param('id') id: string, @Body() data: UpdateTierFeatureDto) {
        return this.adminFeatureService.updateTierFeature(id, data)
    }

    @Get()
    getTierFeatures() {
        return this.adminFeatureService.getFeatures()
    }
}