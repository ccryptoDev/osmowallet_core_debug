import { Controller, Get, Put, Query, UseGuards } from '@nestjs/common';
import { AccessTokenGuard } from 'src/modules/auth/guards/accessToken.guard';
import { CommercesService } from './commerces.service';
import { GetCommerceDto } from './dtos/getCommerce.dto';
import { NearestCommerceDto } from './dtos/nearestCommerces.dto';


@Controller('commerces')
export class CommercesController {
    constructor(private commerceService: CommercesService){}

    @Put()
    updateCommerces() {
        this.commerceService.updateCommerces()
    }

    @UseGuards(AccessTokenGuard)
    @Get('/version')
    getCommerceVersion(){
        return this.commerceService.getCommercesVersion()
    }

    @UseGuards(AccessTokenGuard)
    @Get()
    getCommerces(@Query() query: GetCommerceDto){
        return this.commerceService.findCommerces(query)
    }

    @UseGuards(AccessTokenGuard)
    @Get('/nearest')
    getNearestCommerces(@Query() query: NearestCommerceDto){
        return this.commerceService.getNearestCommerces(query)
    }    
}
