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
import { RoomService } from './room.service';
import { ApiTags } from '@nestjs/swagger';
import {
  QueryRoomDto,
  CreateRoomDto,
  QueryByBuildingId,
  UpdateRoomDto,
} from './room.dto';
import { Response } from 'express';

@ApiTags('Rooms - API')
@Controller('rooms')
export class RoomController {
  constructor(private readonly roomService: RoomService) {}

  @Get('/search')
  async list(@Query() query: QueryRoomDto, @Res() res: Response) {
    const rooms = await this.roomService.search(query);
    return res.status(HttpStatus.OK).json(rooms);
  }

  @Post()
  async create(@Res() res: Response, @Body() body: CreateRoomDto) {
    const room = await this.roomService.create(body);
    return res.status(HttpStatus.OK).json(room);
  }

  @Get()
  async findRooms(@Res() res: Response, @Query() query: QueryByBuildingId) {
    const rooms = await this.roomService.findRoomsByBuildingId(
      query.buildingId,
    );
    return res.status(HttpStatus.OK).json(rooms);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() body: UpdateRoomDto,
    @Res() res: Response,
  ) {
    const room = await this.roomService.update(id, body);
    return res.status(HttpStatus.OK).json(room);
  }

  @Delete(':id')
  async delete(@Param('id') id: string, @Res() res: Response) {
    const deleted = await this.roomService.delete(id);
    return res.status(HttpStatus.OK).json(deleted);
  }
}
