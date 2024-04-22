import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UseGuards,
  UseInterceptors
} from '@nestjs/common';
import { User } from 'src/common/decorators/user.decorator';
import EncrypterHelper from 'src/common/helpers/encrypter.helper';
import { AccessTokenGuard } from 'src/modules/auth/guards/accessToken.guard';
import { AuthUser } from '../auth/payloads/auth.payload';
import { DeleteRecurrentBuyDTO, RecurrentBuyDto } from './dtos/recurrentBuy.dto';
import { RecurrentBuyPayload } from './dtos/recurrentBuyPayload.dto';
import { RecurrentBuyTransactionData } from './dtos/recurrentBuyTransactionData.dto';
import { SwapDto, SwapDtoTwo } from './dtos/swap.dto';
import { SwapTransactionDto } from './dtos/swapTransaction.dto';
import { AutoconvertToReceivePayload } from './interfaces/autoconvert.interface';
import { AutoconvertTransaction } from './interfaces/autoconvertTransaction.interface';
import { SwapService } from './swap.service';

@UseInterceptors(ClassSerializerInterceptor)
@Controller('swap')
export class SwapController {
  constructor(
    private swapService: SwapService,
    private encrypterService: EncrypterHelper
  ) { }

  @Post('/v2')
  @UseGuards(AccessTokenGuard)
  async swapv2(@User() user: AuthUser, @Body() data: SwapDtoTwo) {
    const rocketDecrypted = await this.encrypterService.decryptRocket(data.rocket)
    data.btcPrice = Number(rocketDecrypted)
    return this.swapService.swap(user, data as SwapDto);
  }

  @Post('')
  @UseGuards(AccessTokenGuard)
  async swap1(@User() user: AuthUser, @Body() data: SwapDto) {
    return this.swapService.swap(user, data);
  }

  @Post('/autoconvert')
  async initAutoconvert(@Body() data: AutoconvertToReceivePayload) {
    return this.swapService.autoConvertToReceive(data);
  }

  @Post('/autoconvert-create')
  async createAutoconvert(@Body() data: AutoconvertTransaction) {
    return this.swapService.createAutoconvertToReceiveTransaction(data);
  }


  @Post('/create')
  async create(@Body() data: SwapTransactionDto) {
    return this.swapService.createTransactions(data);
  }

  @Delete('/recurrent-buys/:id')
  @UseGuards(AccessTokenGuard)
  deleteRecurrentBuy(@User() user: AuthUser, @Param() params: DeleteRecurrentBuyDTO) {
    return this.swapService.deleteRecurrentBuy(user, params.id);
  }

  @Get('/recurrent-buys')
  @UseGuards(AccessTokenGuard)
  getRecurrentBuys(@User() user: AuthUser) {
    return this.swapService.getRecurrentBuys(user);
  }

  @Post('/recurrent-buys')
  @UseGuards(AccessTokenGuard)
  createRecurrentBuy(@User() user: AuthUser, @Body() data: RecurrentBuyDto) {
    return this.swapService.createRecurrentBuy(user, data);
  }

  @Post('/recurrent-buys/process')
  buyRecurrentProcess() {
    return this.swapService.processRecurrentBuys();
  }

  @Post('/recurrent-buys/transactions-create')
  createRecurrentBuyTransactions(@Body() data: RecurrentBuyTransactionData) {
    this.swapService.createRecurrentBuyTransactions(data);
  }

  @Post('/recurrent-buys/buy')
  buyRecurrentBuy(@Body() data: RecurrentBuyPayload) {
    return this.swapService.buyRecurrentBuy(data);
  }
}