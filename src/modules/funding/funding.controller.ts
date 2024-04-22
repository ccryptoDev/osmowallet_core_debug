import { Body, Controller, Get, Post, Req, UnauthorizedException, UseInterceptors } from '@nestjs/common';
import { UploadedFile, UseGuards } from '@nestjs/common/decorators';
import { ClassSerializerInterceptor } from '@nestjs/common/serializer';
import { FileInterceptor } from '@nestjs/platform-express';
import { Request } from 'express';
import { User } from 'src/common/decorators/user.decorator';
import { AccessTokenGuard } from 'src/modules/auth/guards/accessToken.guard';
import { AuthUser } from '../auth/payloads/auth.payload';
import { FundingDto } from './dtos/funding.dto';
import { FundingService } from './funding.service';
import { OnvoCheckoutSuccess } from './interfaces/onvo.checkout.success';

@UseInterceptors(ClassSerializerInterceptor)
@Controller('funding')
export class FundingController {
    constructor(private fundingService: FundingService) { }

    @Post('/onvo')
    manageOnvoEvents(@Req() req: Request, @Body() body: OnvoCheckoutSuccess) {
        const webhookSecret = req.headers['x-webhook-secret']
        if (webhookSecret != process.env.ONVO_WEBHOOK_SECRET) throw new UnauthorizedException()
        return this.fundingService.createOnvoFundingTransaction(body)
    }

    @UseGuards(AccessTokenGuard)
    @Get('/methods')
    funding(@User() user: AuthUser) {
        return this.fundingService.getFundingMethods(user)
    }

    @UseGuards(AccessTokenGuard)
    @Post('/')
    @UseInterceptors(FileInterceptor('file'))
    fundStable(@User() user: AuthUser, @Body() data: FundingDto, @UploadedFile() file: Express.Multer.File) {
        return this.fundingService.fund(user, data, file)
    }
}
