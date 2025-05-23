import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import { User } from 'src/common/decorators/user.decorator';
import { AuthUser } from 'src/modules/auth/payloads/auth.payload';
import { CashInOutService } from './cash-in-out.service';
import { CashInDto } from './dtos/cash-in.dto';
import { CashOutDto } from './dtos/cash-out.dto';
import { GetUserbyPhoneOrEmailDto } from '../dtos/getUser.dto';
import { AccessTokenGuard } from 'src/modules/auth/guards/accessToken.guard';
import { PartnerAccessTokenGuard } from 'src/modules/auth/guards/partnerAccessToken.guard';

@Controller('partners/cash-in-out')
export class CashInOutController {
  constructor(private cashInOutService: CashInOutService) {}

  @UseGuards(AccessTokenGuard)
  @Get('/token')
  getOTP(@User() user: AuthUser) {
    return this.cashInOutService.getOTP(user);
  }
  
  @UseGuards(PartnerAccessTokenGuard)
  @Get('/user')
  async getUser(@Query() params: GetUserbyPhoneOrEmailDto) {
    return this.cashInOutService.getUserbyPhoneOrEmail(params);
  }
  
  @UseGuards(PartnerAccessTokenGuard)
  @Post('/funding')
  async funding(@User() partner: AuthUser, @Body() body: CashInDto) {
    return this.cashInOutService.funding(partner, body);
  }
  
  @UseGuards(PartnerAccessTokenGuard)
  @Post('/withdraw')
  async withdraw(@User() partner: AuthUser, @Body() body: CashOutDto) {
    return this.cashInOutService.withdraw(partner, body);
  }
}