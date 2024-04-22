import { Controller, Get, Query, Req, UseGuards } from '@nestjs/common';
import { Request } from 'express';
import { AccessTokenGuard } from '../auth/guards/accessToken.guard';
import { AuthUser } from '../auth/payloads/auth.payload';
import { AnalyticsService } from './analytics.service';
import { GetAnalyticsDto } from './dtos/analytics.dto';

@UseGuards(AccessTokenGuard)
@Controller('analytics')
export class AnalyticsController {
    constructor(private analyticsService: AnalyticsService) { }

    @Get()
    getAnalytics(@Req() req: Request, @Query() query: GetAnalyticsDto) {

        return this.analyticsService.getAnalitycsByCoin(req.user as AuthUser, query)
    }

    @Get('/btc-history')
    getBtcBalanceHistory(@Req() req: Request) {
        return this.analyticsService.getBtcBalanceHistory(req.user as AuthUser)
    }
}
