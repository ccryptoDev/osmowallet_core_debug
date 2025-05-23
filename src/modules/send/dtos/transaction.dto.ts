import { AuthUser } from 'src/modules/auth/payloads/auth.payload';
import { Wallets } from 'src/modules/swap/dtos/swapTransaction.dto';
import { SendDto } from './send.dto';

export interface CreateTransaction {
  id: string;
  user: AuthUser;
  payload: SendDto;
  balances: BalanceCreateTransaction;
  amounts: AmountCreateTransaction;
  btcPrice?: number;
  wallets: Wallets;
}

export interface AmountCreateTransaction {
  totalUserFiatToDebit?: number;
  totalUserBtcToDebit?: number;
  osmoFiatFeeToCredit?: number;
}

export interface BalanceCreateTransaction {
  userFiatBalance?: number;
  osmoWalletFeeBalance?: number;
  userSatsBalance?: number;
}
