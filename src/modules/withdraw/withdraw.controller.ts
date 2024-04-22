import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  Post,
  Req,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { Request } from 'express';
import { User } from 'src/common/decorators/user.decorator';
import { AccessTokenGuard } from 'src/modules/auth/guards/accessToken.guard';
import { AuthUser } from '../auth/payloads/auth.payload';
import { CashoutWithdrawDto } from './dtos/cashoutWithdraw.dto';
import { WithdrawDto } from './dtos/withdraw.dto';
import { CashOutPayload } from './interfaces/cashout.payload';
import { WithdrawService } from './withdraw.service';

@UseInterceptors(ClassSerializerInterceptor)
@Controller('withdraw')
export class WithdrawController {
  constructor(private withdrawService: WithdrawService) { }

  @UseGuards(AccessTokenGuard)
  @Get('/ibex-rate')
  getIbexGtqExchangeRate() {
    return this.withdrawService.getIbexGtqExchangeRate();
  }

  @UseGuards(AccessTokenGuard)
  @Get('/methods')
  getWitdrawMethods(@Req() req: Request) {
    return this.withdrawService.getWithdrawMethods(req.user as AuthUser);
  }

  @UseGuards(AccessTokenGuard)
  @Post('/cashout')
  withdrawInAgency(@User() user: AuthUser, @Body() data: CashoutWithdrawDto) {
    return this.withdrawService.withdrawInAgency(user.sub, data);
  }

  @Post('/cashout/create-transaction')
  withdrawInAgencyCreateTransaction(@Req() req: Request, @Body() data: CashOutPayload) {
    return this.withdrawService.createWithdrawInAgencyTransaction(data);
  }


  @Post('/bank/generate-csv')
  withdrawBank() {
    return this.withdrawService.generateBankWithdrawReport()
  }

  @UseGuards(AccessTokenGuard)
  @Post('/')
  withdraw(@Req() req: Request, @Body() body: WithdrawDto) {
    return this.withdrawService.withdraw(req.user as AuthUser, body)
  }
}
