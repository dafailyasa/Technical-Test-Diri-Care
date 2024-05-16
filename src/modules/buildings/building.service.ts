/*
https://docs.nestjs.com/providers#services
*/

import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BuildingEntity, BuildingProps } from './building.entity';
import { Repository } from 'typeorm';
import isEmpty from 'src/common/helpers/isEmpty';
import { QueryBuldingDto } from './building.dto';
import {
  paginationBuilder,
  ResultPagination,
} from 'src/common/helpers/pagination';

@Injectable()
export class BuildingService {
  constructor(
    @InjectRepository(BuildingEntity)
    private readonly buildingRepository: Repository<BuildingEntity>,
  ) {}

  async create(data: BuildingProps): Promise<BuildingEntity> {
    const existName = await this.findByName(data.name);
    if (existName) {
      throw new HttpException(
        `Building name has been created before. please use another name`,
        HttpStatus.BAD_REQUEST,
      );
    }

    return await this.buildingRepository.save(data);
  }

  async update(id: string, data: BuildingProps): Promise<BuildingEntity> {
    const updated = await this.buildingRepository.update(id, data);
    if (isEmpty(updated.affected)) {
      throw new HttpException(
        `Something worng when update, please try again`,
        HttpStatus.BAD_REQUEST,
      );
    }

    return await this.findById(id);
  }

  async deleteById(id: string) {
    return await this.buildingRepository.delete(id);
  }

  async findById(id: string): Promise<BuildingEntity> {
    return await this.buildingRepository.findOneOrFail({
      where: {
        id: id,
      },
      relations: {
        rooms: {
          bookings: true,
        },
      },
    });
  }

  async findWithPagination(query: QueryBuldingDto) {
    const queryBuilder = this.buildQueryBuilderPagination(query);
    queryBuilder
      .orderBy('b.createdAt', query.order)
      .skip(query.skip)
      .take(query.limit);

    const itemCount = await queryBuilder.getCount();
    const { entities } = await queryBuilder.getRawAndEntities();

    const pagination = paginationBuilder(itemCount, query);
    return ResultPagination(entities, pagination);
  }

  private async findByName(name: string): Promise<BuildingEntity> {
    return await this.buildingRepository.findOne({
      where: {
        name: name,
      },
    });
  }

  private buildQueryBuilderPagination(query: QueryBuldingDto) {
    const queryBuilder = this.buildingRepository.createQueryBuilder('b');
    if (!isEmpty(query.name)) {
      queryBuilder.andWhere('b.name LIKE :name', {
        name: `%${query.name}%`,
      });
    }
    if (!isEmpty(query.city)) {
      queryBuilder.andWhere('b.city LIKE :city', {
        city: `%${query.city}%`,
      });
    }
    if (!isEmpty(query.region)) {
      queryBuilder.andWhere('b.region LIKE :region', {
        region: `%${query.region}%`,
      });
    }
    if (!isEmpty(query.province)) {
      queryBuilder.andWhere('b.province LIKE :province', {
        province: `%${query.province}%`,
      });
    }
    return queryBuilder;
  }
}
