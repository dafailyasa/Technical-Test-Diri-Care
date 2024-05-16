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
import { BookingService } from './booking.service';
import { Response } from 'express';
import {
  QueryBookingDto,
  CreateBookingDto,
  UpdateBookingDto,
} from './booking.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Bookings - API')
@Controller('bookings')
export class BookingController {
  constructor(private readonly bookingService: BookingService) {}

  @Get('/search')
  async list(@Query() query: QueryBookingDto, @Res() res: Response) {
    const rooms = await this.bookingService.search(query);
    return res.status(HttpStatus.OK).json(rooms);
  }

  @Post()
  async create(@Body() body: CreateBookingDto, @Res() res: Response) {
    const booking = await this.bookingService.create(body);
    return res.status(HttpStatus.CREATED).json(booking);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    body: UpdateBookingDto,
    @Res() res: Response,
  ) {
    const booking = await this.bookingService.update(id, body);
    return res.status(HttpStatus.OK).json(booking);
  }

  @Delete(':id')
  async delete(@Param('id') id: string, @Res() res: Response) {
    const deleted = await this.bookingService.delete(id);
    return res.status(HttpStatus.OK).json(deleted);
  }
}
