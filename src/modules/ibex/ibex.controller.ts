import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import { User } from 'src/common/decorators/user.decorator';
import { AccessTokenGuard } from '../auth/guards/accessToken.guard';
import { AuthUser } from '../auth/payloads/auth.payload';
import { CreateIbexAccountDto } from './dtos/create-account.dto';
import { CreateIbexAddressesDto } from './dtos/create-addresses.dto';
import { CreateIbexUsernameDto } from './dtos/create-username.dto';
import { IbexService } from './ibex.service';
@Controller('ibex')
export class IbexController {
    constructor(private ibexService: IbexService) { }

    @Post('autologin')
    login() {
        return this.ibexService.login()
    }

    @Post('/usernames')
    createUsername(@Body() body: CreateIbexUsernameDto) {
        return this.ibexService.createUsername(body)
    }

    @Post('/accounts')
    createAccount(@Body() body: CreateIbexAccountDto) {
        return this.ibexService.createUserIbexAccount(body.userId)
    }

    @Post('/addresses')
    createAddress(@Body() body: CreateIbexAddressesDto) {
        return this.ibexService.createAddresses(body.ibexAccountId)
    }

    @UseGuards(AccessTokenGuard)
    @Get('/addresses')
    getAddress(@User() user: AuthUser) {
        return this.ibexService.getAddresses(user)
    }

    @Post('')
    async ibexWebhook(@Query() query: string) {
        console.log('Query Params:', query);
    }
}
