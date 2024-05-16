/*
https://docs.nestjs.com/providers#services
*/

import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RoomEntity, RoomProps } from './room.entity';
import { MoreThanOrEqual, Repository } from 'typeorm';
import { BuildingService } from '../buildings/building.service';
import { CreateRoomDto, UpdateRoomDto, QueryRoomDto } from './room.dto';
import isEmpty from 'src/common/helpers/isEmpty';
import * as moment from 'moment';
import {
  paginationBuilder,
  ResultPagination,
} from 'src/common/helpers/pagination';

@Injectable()
export class RoomService {
  constructor(
    @InjectRepository(RoomEntity)
    private readonly roomRepository: Repository<RoomEntity>,

    private readonly buildingService: BuildingService,
  ) {}

  async create(body: CreateRoomDto): Promise<RoomProps & RoomEntity> {
    const building = await this.buildingService.findById(body.buildingId);
    if (isEmpty(building)) {
      throw new HttpException('Building was not found', HttpStatus.BAD_REQUEST);
    }
    const existRoomName = await this.findRoomByName(body.name);
    if (existRoomName) {
      throw new HttpException(
        'Room has been created before, please use another name.',
        HttpStatus.BAD_REQUEST,
      );
    }
    const payload = {
      name: body.name,
      capacity: body.capacity,
      building: building,
    };
    return await this.roomRepository.save(payload);
  }

  private async findRoomByName(name: string): Promise<RoomEntity> {
    return await this.roomRepository.findOne({
      where: {
        name: name,
      },
    });
  }
  async findRoomById(id: string): Promise<RoomEntity> {
    return await this.roomRepository.findOne({
      where: {
        id: id,
      },
    });
  }
  async findRoomsByBuildingId(buildingId: string): Promise<RoomEntity[]> {
    const rooms = await this.roomRepository.find({
      where: {
        building: {
          id: buildingId,
        },
      },
    });
    return rooms;
  }
  async update(id: string, body: UpdateRoomDto): Promise<RoomEntity> {
    const updated = await this.roomRepository.update(id, body);
    if (updated.affected === 0) {
      throw new HttpException(`room was not found.`, HttpStatus.BAD_REQUEST);
    }
    return await this.roomRepository.findOne({
      where: {
        id: id,
      },
    });
  }

  async delete(id: string) {
    const room = await this.roomRepository.findOne({
      where: {
        id: id,
        bookings: {
          date: MoreThanOrEqual(moment(moment().format('YYYY-MM-DD')).toDate()),
        },
      },
      relations: {
        bookings: true,
      },
    });

    if (isEmpty(room)) {
      throw new HttpException(`room was not found.`, HttpStatus.BAD_REQUEST);
    }

    if (!isEmpty(room?.bookings)) {
      throw new HttpException(
        `Can't delete room. because have booking(${room.bookings.length}) schedules on this room`,
        HttpStatus.FORBIDDEN,
      );
    }

    return await this.roomRepository.delete(id);
  }

  async search(query: QueryRoomDto) {
    const queryBuilder = this.buildQueryBuilderPagination(query);
    queryBuilder
      .orderBy('r.createdAt', query.order)
      .skip(query.skip)
      .take(query.limit);

    const itemCount = await queryBuilder.getCount();
    const { entities } = await queryBuilder.getRawAndEntities();

    const pagination = paginationBuilder(itemCount, query);
    return ResultPagination(entities, pagination);
  }

  private buildQueryBuilderPagination(query: QueryRoomDto) {
    const queryBuilder = this.roomRepository.createQueryBuilder('r');
    queryBuilder.addSelect(['b.id', 'b.name']);
    queryBuilder.leftJoin('r.building', 'b');

    if (!isEmpty(query.name)) {
      queryBuilder.andWhere('r.user LIKE :name', {
        name: `%${query.name}%`,
      });
    }

    if (!isEmpty(query.buildingId)) {
      queryBuilder.andWhere('r.buildingId = :buildingId', {
        buildingId: `${query.buildingId}`,
      });
    }

    if (!isEmpty(query.minCapacity) && !isEmpty(query.maxCapacity)) {
      queryBuilder.andWhere(
        'r.capacity BETWEEN :minCapacity AND :maxCapacity',
        {
          minCapacity: query.minCapacity,
          maxCapacity: query.maxCapacity,
        },
      );
    }

    if (!isEmpty(query.minCapacity) && isEmpty(query.maxCapacity)) {
      queryBuilder.andWhere('r.capacity >= :minCapacity', {
        minCapacity: query.minCapacity,
      });
    }

    if (!isEmpty(query.maxCapacity) && isEmpty(query.minCapacity)) {
      queryBuilder.andWhere('r.capacity <= :maxCapacity', {
        maxCapacity: query.maxCapacity,
      });
    }

    return queryBuilder;
  }
}
