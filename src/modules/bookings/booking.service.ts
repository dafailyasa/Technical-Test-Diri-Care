/*
https://docs.nestjs.com/providers#services
*/

import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BookingEntity } from './booking.entity';
import { Repository } from 'typeorm';
import { RoomService } from '../rooms/room.service';
import {
  CreateBookingDto,
  UpdateBookingDto,
  QueryBookingDto,
} from './booking.dto';
import isEmpty from 'src/common/helpers/isEmpty';
import * as moment from 'moment';
import {
  paginationBuilder,
  ResultPagination,
} from 'src/common/helpers/pagination';

@Injectable()
export class BookingService {
  constructor(
    @InjectRepository(BookingEntity)
    private readonly bookingRepository: Repository<BookingEntity>,

    private readonly roomService: RoomService,
  ) {}

  async create(body: CreateBookingDto): Promise<BookingEntity> {
    const { roomId, startTime, endTime, date, user } = body;
    const payload = await this.validateAndCreatePayload(
      date,
      startTime,
      endTime,
      user,
      roomId,
    );
    const booking = await this.bookingRepository.save(payload);
    return booking;
  }

  async update(id: string, body: UpdateBookingDto): Promise<BookingEntity> {
    const { startTime, endTime, date, user } = body;
    const payload = await this.validateAndCreatePayload(
      date,
      startTime,
      endTime,
      user,
    );
    const updated = await this.bookingRepository.update(id, payload);
    if (updated.affected) {
      throw new HttpException(
        `Something worng when update, please try again`,
        HttpStatus.BAD_REQUEST,
      );
    }
    return await this.bookingRepository.findOne({
      where: {
        id,
      },
    });
  }

  async delete(id: string) {
    const deleted = await this.bookingRepository.delete(id);
    if (deleted.affected == 0) {
      throw new HttpException(
        'id booking was not found.',
        HttpStatus.BAD_REQUEST,
      );
    }
    return deleted;
  }

  async search(query: QueryBookingDto) {
    const queryBuilder = this.buildQueryBuilderPagination(query);
    queryBuilder
      .orderBy('bk.date', query.order)
      .skip(query.skip)
      .limit(query.limit);
    const itemCount = await queryBuilder.getCount();
    const { entities, raw } = await queryBuilder.getRawAndEntities();
    const pagination = paginationBuilder(itemCount, query);

    const mappedData = entities.map((entity: any) => ({
      status: raw.find((data) => data.bk_id === entity.id).status,
      ...entity,
    }));

    return ResultPagination(mappedData, pagination);
  }

  private buildQueryBuilderPagination(query: QueryBookingDto) {
    const queryBuilder = this.bookingRepository.createQueryBuilder('bk');
    queryBuilder
      .leftJoin('bk.room', 'r')
      .leftJoin('r.building', 'b')
      .addSelect([
        'r.id',
        'r.name',
        'r.capacity',
        `CASE
          WHEN bk.date > CURRENT_DATE THEN 'waiting'
          WHEN bk.date = CURRENT_DATE AND bk.startTime > CURRENT_TIME THEN 'scheduled'
          WHEN bk.date = CURRENT_DATE AND bk.startTime <= CURRENT_TIME AND bk.endTime >= CURRENT_TIME THEN 'ongoing'
          WHEN bk.date = CURRENT_DATE AND bk.endTime < CURRENT_TIME THEN 'completed'
          ELSE 'completed'
        END AS status`,
      ]);

    if (!isEmpty(query.user)) {
      queryBuilder.andWhere('bk.user LIKE :user', {
        user: `%${query.user}%`,
      });
    }
    if (!isEmpty(query.roomId)) {
      queryBuilder.andWhere('r.id = :roomId', {
        roomId: `${query.roomId}`,
      });
    }
    if (!isEmpty(query.buildingId)) {
      queryBuilder.andWhere('b.id = :buildingId', {
        buildingId: `${query.buildingId}`,
      });
    }
    if (!isEmpty(query.startTime) && !isEmpty(query.endTime)) {
      queryBuilder.andWhere(
        ':startTime < bk.endTime AND :endTime > bk.startTime',
        {
          startTime: query.startTime,
          endTime: query.endTime,
        },
      );
    }

    return queryBuilder;
  }

  private async validateAndCreatePayload(
    date: Date,
    startTime: string,
    endTime: string,
    user: string,
    roomId?: string,
  ) {
    const formatDate = 'YYYY-MM-DD';
    const timeFormat = 'HH:mm:ss';
    if (!isEmpty(date) ? !moment(date, formatDate, true).isValid() : false) {
      throw new HttpException(
        `invalid format date. should be format: ${formatDate}`,
        HttpStatus.BAD_REQUEST,
      );
    }
    if (
      !isEmpty(startTime)
        ? !moment(startTime, timeFormat, true).isValid()
        : false
    ) {
      throw new HttpException(
        `invalid startTime. should be format: ${timeFormat}`,
        HttpStatus.BAD_REQUEST,
      );
    }
    if (
      !isEmpty(endTime) ? !moment(endTime, timeFormat, true).isValid() : false
    ) {
      throw new HttpException(
        `invalid endTime. should be format: ${timeFormat}`,
        HttpStatus.BAD_REQUEST,
      );
    }
    let room = null;
    if (!isEmpty(roomId)) {
      room = await this.roomService.findRoomById(roomId);
      if (isEmpty(room)) {
        throw new HttpException('Room was not found', HttpStatus.BAD_REQUEST);
      }
    }

    const existCountBooking = await this.existBooking(
      roomId,
      startTime,
      endTime,
      date,
    );

    if (existCountBooking > 0) {
      throw new HttpException(
        'Room is already booked for the specified time period.',
        HttpStatus.BAD_REQUEST,
      );
    }

    const payload = {
      ...(!isEmpty(user) && { user }),
      ...(!isEmpty(startTime) && { startTime }),
      ...(!isEmpty(endTime) && { endTime }),
      ...(!isEmpty(date) && { date }),
      ...(!isEmpty(room) && { room }),
    };

    return payload;
  }

  private async existBooking(
    roomId: string,
    startTime: string,
    endTime: string,
    date: Date,
  ) {
    const queryBuilder = this.bookingRepository.createQueryBuilder('bk');
    const existBookings = await queryBuilder
      .where('bk.roomId = :roomId', {
        roomId,
      })
      .andWhere('bk.date = :date', {
        date,
      })
      .andWhere(':startTime < bk.endTime AND :endTime > bk.startTime', {
        startTime,
        endTime,
      })
      .getCount();
    return existBookings;
  }
}
