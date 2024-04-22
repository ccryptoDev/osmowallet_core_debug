import { ClassSerializerInterceptor, Controller, Get, Query, UseGuards, UseInterceptors } from '@nestjs/common';
import { AccessTokenGuard } from 'src/modules/auth/guards/accessToken.guard';
import { BankService } from './banks.service';
import { OsmoBankAccountQueryDto } from './dtos/osmoBankAccount.dto';

@Controller('banks')
export class BankController {
  constructor(private bankService: BankService) { }

  @UseGuards(AccessTokenGuard)
  @UseInterceptors(ClassSerializerInterceptor)
  @Get()
  getAllBanks() {
    return this.bankService.getAllBanks()
  }

  @UseGuards(AccessTokenGuard)
  @UseInterceptors(ClassSerializerInterceptor)
  @Get('/osmo-accounts')
  getOsmoBankAccounts(@Query() params: OsmoBankAccountQueryDto) {
    return this.bankService.getOsmoBankAccounts(params)
  }
}
