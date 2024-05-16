import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';
import { PaginationDto } from 'src/common/base/dto/pagination.dto';

export class QueryRoomDto extends PaginationDto {
  @ApiPropertyOptional({
    type: String,
    name: 'name',
    description: 'this will search data by name room',
    required: false,
  })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiPropertyOptional({
    type: Number,
    name: 'minCapacity',
    description: 'this will search data by minimum capacity of room',
    required: false,
  })
  @IsOptional()
  @IsString()
  minCapacity?: number;

  @ApiPropertyOptional({
    type: Number,
    name: 'maxCapacity',
    description: 'this will search data by maximum of capacity room',
    required: false,
  })
  @IsOptional()
  @IsString()
  maxCapacity?: number;

  @ApiPropertyOptional({
    type: String,
    name: 'buildingId',
    description: 'this will search data by building id of rooms',
    required: false,
  })
  @IsOptional()
  @IsString()
  buildingId?: string;
}
export class QueryByBuildingId {
  @ApiPropertyOptional({
    type: String,
    name: 'buildingId',
    description: 'this will search data by building id of rooms',
    required: true,
    nullable: false,
  })
  @IsOptional()
  @IsString()
  buildingId: string;
}
export class CreateRoomDto {
  @ApiProperty({
    type: String,
    name: 'buildingId',
    description: 'this will search data by building id of rooms',
    required: true,
    nullable: false,
  })
  @IsNotEmpty()
  @IsString()
  @IsUUID()
  buildingId: string;

  @ApiProperty({
    type: String,
    name: 'name',
    description: 'name of building',
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({
    type: Number,
    name: 'capacity',
    description: 'capacity of room',
    required: true,
    nullable: false,
  })
  @IsNotEmpty()
  @IsNumber()
  capacity: number;
}
export class UpdateRoomDto {
  @ApiProperty({
    type: String,
    name: 'name',
    description: 'name of building',
    required: true,
  })
  @IsOptional()
  @IsString()
  name: string;

  @ApiProperty({
    type: Number,
    name: 'capacity',
    description: 'capacity of room',
    required: true,
    nullable: false,
  })
  @IsOptional()
  @IsNumber()
  capacity: number;
}
