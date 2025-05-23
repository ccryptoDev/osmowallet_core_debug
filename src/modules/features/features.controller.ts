import { ClassSerializerInterceptor, Controller, Get, Param, Req, UseGuards, UseInterceptors } from '@nestjs/common';
import { Request } from 'express';
import { AccessTokenGuard } from '../auth/guards/accessToken.guard';
import { AuthUser } from '../auth/payloads/auth.payload';
import { FeaturesService } from './features.service';

@UseGuards(AccessTokenGuard)
@UseInterceptors(ClassSerializerInterceptor)
@Controller('features')
export class FeaturesController {
    constructor(private featureService: FeaturesService) { }

    @Get('/:id/')
    getTierFeature(@Param('id') id: string, @Req() req: Request) {
        return this.featureService.getTierFeature(id, req.user as AuthUser)
    }

    @Get('')
    getFeatures(@Req() req: Request) {
        return this.featureService.getFeatures(req.user as AuthUser)
    }
}
