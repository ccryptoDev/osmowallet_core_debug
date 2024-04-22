import { ClassSerializerInterceptor, Controller, Get, NotFoundException, Post, UseGuards, UseInterceptors } from '@nestjs/common';
import { User } from 'src/common/decorators/user.decorator';
import { AccessTokenGuard } from 'src/modules/auth/guards/accessToken.guard';
import { AuthUser } from '../auth/payloads/auth.payload';
import { UsersService } from '../users/users.service';
import { CoinsService } from './coins.service';

@Controller('coins')
export class CoinsController {
    constructor(
        private coinService: CoinsService,
        private userService: UsersService
    ) { }
    @UseGuards(AccessTokenGuard)
    @Get('/country')
    async getCoinsByCountry(@User() authUser: AuthUser) {
        const user = await this.userService.getUserById(authUser.sub)
        if (!user) throw new NotFoundException('User not found')
        return this.coinService.getCoinsByResidence(user.residence)
    }

    @Post('/updateRates')
    updateRates() {
        return this.coinService.updateExchangesRates()
    }

    //@UseGuards(AccessTokenGuard)
    @UseInterceptors(ClassSerializerInterceptor)
    @Get()
    async getCoins() {
        return this.coinService.getAll()
    }

    @UseGuards(AccessTokenGuard)
    @Get('/btc-price')
    async getBtcPrice() {
        return this.coinService.getBtcPrice()
    }
}
