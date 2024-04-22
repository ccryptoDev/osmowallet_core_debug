import { Controller, Get, Param, Patch, UseGuards } from '@nestjs/common';
import { User } from 'src/common/decorators/user.decorator';
import { AccessTokenGuard } from '../auth/guards/accessToken.guard';
import { AuthUser } from '../auth/payloads/auth.payload';
import { WalletsService } from './wallets.service';

@UseGuards(AccessTokenGuard)
@Controller('wallets')
export class WalletsController {
    constructor(private walletService: WalletsService) { }

    @Patch('/:id/hide')
    hideWallet(@Param('id') id: string) {
        return this.walletService.hideWallet(id)
    }

    @Patch('/:id/show')
    showWallet(@Param('id') id: string) {
        return this.walletService.showWallet(id)
    }

    @Get()
    getWallets(@User() user: AuthUser) {
        return this.walletService.getWalletsByUser(user.sub)
    }
}
