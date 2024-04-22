import { Body, Controller, Delete, Get, Param, Post, Put, Query, UseGuards } from '@nestjs/common';
import { CreateOsmoBusinessDto } from './dtos/createOsmoBusiness.dto';
import { OsmoBusinessService } from './osmo-business.service';
import { GetOsmoBusinessDto } from './dtos/getOsmoBusiness.dto';
import { AdminAccessTokenGuard } from '../admin-auth/guards/accessToken.guard';

@UseGuards(AdminAccessTokenGuard)
@Controller('admin/osmo-business')
export class OsmoBusinessController {

    constructor(
        private osmoBusinessService: OsmoBusinessService
    ){}

    @Post()
    createOsmoBusiness(@Body() body: CreateOsmoBusinessDto) {
        return this.osmoBusinessService.createOsmoBusiness(body)
    }

    @Get()
    getOsmoBusinessBpts(@Query() query: GetOsmoBusinessDto) {
        return this.osmoBusinessService.getOsmoBusinesses(query)
    }

    @Delete('/:id')
    deleteOsmoBusinessBpt(@Param('id') id: string) {
        return this.osmoBusinessService.deleteOsmoBusiness(id)
    }

    @Put('/:id')
    updateOsmoBusinessBpt(@Param('id') id: string, @Body() body: CreateOsmoBusinessDto) {
        return this.osmoBusinessService.updateOsmoBusiness(id, body,)
    }
}
