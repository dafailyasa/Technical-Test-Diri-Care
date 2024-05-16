import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import * as moment from 'moment';
import { PaginationDto } from 'src/common/base/dto/pagination.dto';

export class CreateBookingDto {
  @ApiProperty({
    type: String,
    name: 'roomId',
    description: 'roomId of booking',
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  roomId: string;

  @ApiProperty({
    type: String,
    name: 'user',
    description: 'user name of room booking',
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  user: string;

  @ApiProperty({
    type: String,
    name: 'date',
    description: 'date of booking room',
    required: true,
    default: moment().format('YYYY-MM-DD'),
  })
  @IsNotEmpty()
  @IsString()
  date: Date;

  @ApiProperty({
    type: String,
    name: 'startTime',
    description: 'startTime of booking room',
    required: true,
    default: moment().format('HH:mm:ss'),
  })
  @IsNotEmpty()
  @IsString()
  startTime: string;

  @ApiProperty({
    type: String,
    name: 'endTime',
    description: 'endTime of booking room',
    required: true,
    default: moment().format('HH:mm:ss'),
  })
  @IsNotEmpty()
  @IsString()
  endTime: string;
}
export class UpdateBookingDto {
  @ApiProperty({
    type: String,
    name: 'user',
    description: 'user name of room booking',
    required: false,
  })
  @IsOptional()
  @IsString()
  user: string;

  @ApiProperty({
    type: String,
    name: 'date',
    description: 'date of booking room',
    required: false,
    format: moment().format('YYYY-MM-DD'),
  })
  @IsOptional()
  @IsString()
  date: Date;

  @ApiProperty({
    type: String,
    name: 'startTime',
    description: 'startTime of booking room',
    required: false,
    default: moment().format('YYYY-MM-DD'),
  })
  @IsOptional()
  @IsString()
  startTime: string;

  @ApiProperty({
    type: String,
    name: 'endTime',
    description: 'endTime of booking room',
    required: false,
    default: moment().format('HH:mm:ss'),
  })
  @IsOptional()
  @IsString()
  endTime: string;
}
export class QueryBookingDto extends PaginationDto {
  @ApiPropertyOptional({
    type: String,
    name: 'user',
    description: 'this will search data by name of booking',
    required: false,
  })
  @IsOptional()
  @IsString()
  user?: string;

  @ApiPropertyOptional({
    type: Date,
    name: 'date',
    description: 'this will search data by date of booking',
    required: false,
  })
  @IsOptional()
  @IsString()
  date?: string;

  @ApiPropertyOptional({
    type: String,
    name: 'startTime',
    description: 'this will search data by startTime of booking',
    required: false,
  })
  @IsOptional()
  @IsString()
  startTime?: string;

  @ApiPropertyOptional({
    type: String,
    name: 'endTime',
    description: 'this will search data by endTime of booking',
    required: false,
  })
  @IsOptional()
  @IsString()
  endTime?: string;

  @ApiPropertyOptional({
    type: String,
    name: 'roomId',
    description: 'this will search data by roomId of booking',
    required: false,
  })
  @IsOptional()
  @IsString()
  roomId?: string;

  @ApiPropertyOptional({
    type: String,
    name: 'buildingId',
    description: 'this will search data by buildingId of booking',
    required: false,
  })
  @IsOptional()
  @IsString()
  buildingId?: string;
}
