import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Query,
  Req,
  UseGuards,
  UseInterceptors
} from '@nestjs/common';
import { Request } from 'express';
import { AccessTokenGuard } from 'src/modules/auth/guards/accessToken.guard';
import { AuthUser } from '../auth/payloads/auth.payload';
import { CreateTransactionCategoryDto } from './dtos/category.dto';
import { EditTransactionDto } from './dtos/editTransaction.dto';
import { GetTransactionsDto } from './dtos/getTransaction.dto';
import { ResetAmassedAmountDto } from './dtos/resetAmassedAmount.dto';
import { AmassedAmount } from './enums/resetAmassedAmount.enum';
import { TransactionsService } from './transactions.service';

@UseInterceptors(ClassSerializerInterceptor)
@Controller('transactions')
export class TransactionsController {
  constructor(private transactionsService: TransactionsService) {}

  @Post('/amassed-amounts/reset')
  async resetDailyLimits(@Body() data: ResetAmassedAmountDto) {
    if (data.type == AmassedAmount.DAILY)
      return this.transactionsService.resetDailyLimits();
    return this.transactionsService.resetMonthlyLimits();
  }

  @UseGuards(AccessTokenGuard)
  @Post('/categories')
  async getCategory(@Req() req: Request, @Body() body: CreateTransactionCategoryDto) {
    return this.transactionsService.createTransactionCategory(req.user as AuthUser, body)
  }

  @UseGuards(AccessTokenGuard)
  @Get('/categories')
  async createCategory(@Req() req: Request) {
    return this.transactionsService.getTransactionCategories(req.user as AuthUser)
  }
  
  @UseGuards(AccessTokenGuard)
  @Put('/:id')
  async editTransaction(@Param('id') id: string, @Body() body: EditTransactionDto) {
    return this.transactionsService.editTransaction(id,body)
  }

  @UseGuards(AccessTokenGuard)
  @Get()
  async getTransactions(@Req() req: Request,@Query() params: GetTransactionsDto,) {
    return this.transactionsService.getTransactions(req.user as AuthUser, params,);
  }
}
