import {Body, Controller, Get, Param, Post, Query} from '@nestjs/common';
import {PlaceService} from "./place.service";
import {CreatePlaceDTO} from "./dto/create-place.dto";

@Controller('place')
export class PlaceController {
    constructor(private readonly placeService: PlaceService) {}

    @Get()
    async ping() {
        return await this.placeService.ping()
    }

    @Post('index')
    async createPlaceIndex() {
        return await this.placeService.createPlaceIndex()
    }

    @Post()
    async createPlace(@Body() createPlaceDTO: CreatePlaceDTO) {
        return await this.placeService.createPlace(createPlaceDTO)
    }

    @Get('box')
    async findByBoundingBox() {
        return await this.placeService.findByBoundingBox()
    }

    @Get(':id')
    async findByID(@Param('id') id: string) {
        return await this.placeService.findByID(id)
    }
}
