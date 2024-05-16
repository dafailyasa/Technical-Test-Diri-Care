import { ApiPropertyOptional } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import { IsInt, Min, IsOptional, IsEnum } from 'class-validator';
import {
  DefaultPageLimitPagination,
  DefaultPagePagination,
} from 'src/common/constant/constant';

export interface PageMetaDtoParameters {
  QueryBuldingDto: any;
  itemCount: number;
}

export enum Order {
  ASC = 'ASC',
  DESC = 'DESC',
}

export class PaginationDto {
  @ApiPropertyOptional({
    minimum: DefaultPagePagination,
    default: DefaultPagePagination,
  })
  @Transform(({ value }) => parseInt(value))
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @IsOptional()
  readonly page: number = DefaultPagePagination;

  @ApiPropertyOptional({
    minimum: DefaultPageLimitPagination,
    default: DefaultPageLimitPagination,
  })
  @IsInt()
  @IsOptional()
  @Transform(({ value }) => parseInt(value))
  @Type(() => Number)
  readonly limit?: number = DefaultPageLimitPagination;

  @ApiPropertyOptional({ enum: Order, default: Order.DESC })
  @IsEnum(Order)
  @IsOptional()
  readonly order?: Order = Order.DESC;

  get skip(): number {
    return (this.page - 1) * this.limit;
  }
}
