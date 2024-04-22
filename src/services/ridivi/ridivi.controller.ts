import { Body, Controller, Post } from '@nestjs/common';
import { CreateRidiviAccount } from './interfaces/create-account';
import { RidiviService } from './ridivi.service';

@Controller('ridivi')
export class RidiviController {
    constructor(private ridiviService: RidiviService){}

    @Post('/accounts')
    createAccount(@Body() body: CreateRidiviAccount){
        return this.ridiviService.createAccounts(body)
    }
}
