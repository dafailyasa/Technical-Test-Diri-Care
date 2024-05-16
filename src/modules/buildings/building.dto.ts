import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { PaginationDto } from 'src/common/base/dto/pagination.dto';

export class CreateBuildingDto {
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
    type: String,
    name: 'address',
    description: 'address of building',
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  address: string;

  @ApiProperty({
    type: String,
    name: 'city',
    description: 'city of building',
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  city: string;

  @ApiProperty({
    type: String,
    name: 'region',
    description: 'region of building',
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  region: string;

  @ApiProperty({
    type: String,
    name: 'province',
    description: 'province of building',
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  province: string;
}
export class UpdateBuildingDto {
  @ApiProperty({
    type: String,
    name: 'name',
    description: 'name of building',
    required: false,
    nullable: false,
  })
  @IsOptional()
  @IsString()
  name: string;

  @ApiProperty({
    type: String,
    name: 'address',
    description: 'address of building',
    required: false,
    nullable: false,
  })
  @IsOptional()
  @IsString()
  address: string;

  @ApiProperty({
    type: String,
    name: 'city',
    description: 'city of building',
    required: false,
    nullable: false,
  })
  @IsOptional()
  @IsString()
  city: string;

  @ApiProperty({
    type: String,
    name: 'region',
    description: 'region of building',
    required: false,
    nullable: false,
  })
  @IsOptional()
  @IsString()
  region: string;

  @ApiProperty({
    type: String,
    name: 'province',
    description: 'province of building',
    required: false,
    nullable: false,
  })
  @IsOptional()
  @IsString()
  province: string;
}
export class QueryBuldingDto extends PaginationDto {
  @ApiPropertyOptional({
    type: String,
    name: 'city',
    description: 'this will search data by city building',
    required: false,
  })
  @IsOptional()
  @IsString()
  city?: string;

  @ApiPropertyOptional({
    type: String,
    name: 'province',
    description: 'this will search data by province building',
    required: false,
  })
  @IsOptional()
  @IsString()
  province?: string;

  @ApiPropertyOptional({
    type: String,
    name: 'region',
    description: 'this will search data by region building',
    required: false,
  })
  @IsOptional()
  @IsString()
  region?: string;

  @ApiPropertyOptional({
    type: String,
    name: 'name',
    description: 'this will search data by name building',
    required: false,
  })
  @IsOptional()
  @IsString()
  name?: string;
}
