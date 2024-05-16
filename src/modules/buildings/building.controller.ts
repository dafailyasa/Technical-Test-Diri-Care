/*
https://docs.nestjs.com/controllers#controllers
*/

import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Patch,
  Post,
  Query,
  Res,
} from '@nestjs/common';
import { BuildingService } from './building.service';
import {
  QueryBuldingDto,
  CreateBuildingDto,
  UpdateBuildingDto,
} from './building.dto';
import { Response } from 'express';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Buildings - API')
@Controller('buildings')
export class BuildingController {
  constructor(private readonly buildingService: BuildingService) {}

  @Get('/search')
  async list(@Query() query: QueryBuldingDto, @Res() res: Response) {
    const buildings = await this.buildingService.findWithPagination(query);

    return res.status(HttpStatus.OK).json(buildings);
  }
  @Post()
  async create(@Res() res: Response, @Body() body: CreateBuildingDto) {
    const building = await this.buildingService.create(body);
    return res.status(HttpStatus.CREATED).json(building);
  }

  @Get(':id')
  async findOne(@Param('id') id: string, @Res() res: Response) {
    const building = await this.buildingService.findById(id);
    return res.status(HttpStatus.OK).json(building);
  }

  @Delete(':id')
  async delete(@Param('id') id: string, @Res() res: Response) {
    const deleted = await this.buildingService.deleteById(id);
    return res.status(HttpStatus.OK).json(deleted);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() body: UpdateBuildingDto,
    @Res() res: Response,
  ) {
    const building = await this.buildingService.update(id, body);
    return res.status(HttpStatus.OK).json(building);
  }
}
