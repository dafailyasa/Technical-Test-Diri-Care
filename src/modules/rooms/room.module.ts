import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoomEntity } from './room.entity';
import { RoomService } from './room.service';
import { RoomController } from './room.controller';
import { BuildingModule } from '../buildings/building.module';

@Module({
  imports: [TypeOrmModule.forFeature([RoomEntity]), BuildingModule],
  providers: [RoomService],
  controllers: [RoomController],
  exports: [RoomService],
})
export class RoomModule {}
