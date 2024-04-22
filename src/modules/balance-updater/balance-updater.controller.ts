import { Body, Controller, Post } from '@nestjs/common';
import { BalanceUpdaterService } from './balance-updater.service';
import { SyncBalance } from './interfaces/sync-balance';
import { UpdateBalance } from './interfaces/updateBalance';

@Controller('balance-updater')
export class BalanceUpdaterController {
    constructor(private balanceUpdaterService: BalanceUpdaterService) { }

    @Post('/sync')
    syncBalance(@Body() body: SyncBalance) {
        return this.balanceUpdaterService.syncBalance(body)
    }

    @Post()
    updateBalance(@Body() body: UpdateBalance) {
        return this.balanceUpdaterService.updateBalance(body)
    }
}
