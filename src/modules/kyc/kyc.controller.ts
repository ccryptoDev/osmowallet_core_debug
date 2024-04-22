import { Controller, Post, Req, Body, Get, ClassSerializerInterceptor, UseInterceptors, UseGuards, Param, ParseUUIDPipe } from '@nestjs/common';
import { KycService } from './kyc.service';
import { KycQueueDto } from './dtos/queue.dto';
import { AuthUser } from '../auth/payloads/auth.payload';
import { Request } from 'express';
import { AccessTokenGuard } from '../auth/guards/accessToken.guard';
import { MetamapGuard } from '../auth/guards/metamap.guard';
import { User } from 'src/common/decorators/user.decorator';


@Controller('kyc')
export class KycController {
    constructor(private kycService: KycService) { }

    @UseGuards(AccessTokenGuard)
    @Get('/partner-statuses')
    async getKycPartnerStatuses(@Req() req: Request) {
        const kycs = await this.kycService.getKycPartnerStatuses(req.user as AuthUser)
        if (!kycs) return {}
        return kycs
    }


    @UseGuards(MetamapGuard)
    @Post('/wf')
    createWorkFlow(@Req() req: Request, @Body() data: any) {
        console.log(data)
        return this.kycService.manageEvent(data)
    }

    @Post('/country')
    updateCountryAndName(@Body() data: KycQueueDto) {
        return this.kycService.saveCountry(data.verificationId)
    }

    @UseGuards(AccessTokenGuard)
    @Get('/validate')
    validateUser(@User() user: AuthUser) {
        return this.kycService.validate(user)
    }

    @UseInterceptors(ClassSerializerInterceptor)
    @UseGuards(AccessTokenGuard)
    @Get('/')
    async getVerification(@User() user: AuthUser) {
        const verification = await this.kycService.getKycVerification(user)
        if (!verification) return {}
        return verification
    }

    @Get('/:id/raw-kyc')
    async getRawKyc(@Param('id', new ParseUUIDPipe()) id: string) {
        return this.kycService.getRawKyc(id)
    }

}

