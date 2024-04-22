import { Body, Controller, Delete, Get, Param, Post, Put, Req, UseGuards } from '@nestjs/common';
import { Request } from 'express';
import { AccessTokenGuard } from '../auth/guards/accessToken.guard';
import { AuthUser } from '../auth/payloads/auth.payload';
import { BlockchainService } from './blockchain.service';
import { CreateBlockChainAddress } from './dtos/blockchainAddress.dto';

@UseGuards(AccessTokenGuard)
@Controller('blockchain')
export class BlockchainController {
    constructor(private blockChainService: BlockchainService) { }

    @Get('/osmo-addresses')
    getOsmoBlockchainAddresses() {
        return this.blockChainService.getOsmoAddresses()
    }

    @Get('/networks')
    getBlockchainNetworks() {
        return this.blockChainService.getBlockchainNetworks()
    }

    @Get('/addresses')
    getBlockchainAddresses(@Req() req: Request) {
        return this.blockChainService.getBlockChainAddresses(req.user as AuthUser)
    }

    @Post('/addresses')
    createAddress(@Req() req: Request, @Body() data: CreateBlockChainAddress) {
        return this.blockChainService.createBlockChainAddress(req.user as AuthUser, data)
    }

    @Put('/addresses/:id')
    updateAddress(@Param('id') id: string, @Body() data: CreateBlockChainAddress) {
        return this.blockChainService.updateBlockChainAddress(id, data)
    }

    @Delete('/addresses/:id')
    deleteAddress(@Param('id') id: string) {
        return this.blockChainService.deleteBlockChainAddress(id)
    }
}
