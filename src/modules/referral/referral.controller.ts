import { Body, ClassSerializerInterceptor, Controller, Post, Req, UseGuards, UseInterceptors } from '@nestjs/common';
import { Request } from 'express';
import { User } from 'src/common/decorators/user.decorator';
import { AccessTokenGuard } from 'src/modules/auth/guards/accessToken.guard';
import { AuthUser } from '../auth/payloads/auth.payload';
import { OsmoReferralDto } from './dtos/osmoReferral.dto';
import { RefundReferral } from './interfaces/refund.interface';
import { ReferralService } from './referral.service';

@UseInterceptors(ClassSerializerInterceptor)
@Controller('referral')
export class ReferralController {

    constructor(private referralService: ReferralService) { }

    @Post('/check-referral-invitations')
    async checkReferralInvitations() {
        return this.referralService.checkExpiredInvitation()
    }

    @Post('/refund')
    async refundReferral(@Req() req: Request, @Body() data: RefundReferral) {
        if (data.isOsmoSponsor) {
            return this.referralService.refundOsmoReferralTransaction(data)
        } else {
            return this.referralService.refundSmsTransaction(data)
        }
    }

    @UseGuards(AccessTokenGuard)
    @Post('/generate-invitation')
    async generateInvitation(@User() user: AuthUser, @Body() data: OsmoReferralDto) {
        return this.referralService.generateInvitation(user.sub, data)
    }
}
