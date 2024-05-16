import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BookingEntity } from './booking.entity';
import { BookingService } from './booking.service';
import { BookingController } from './booking.controller';
import { RoomModule } from '../rooms/room.module';

@Module({
  imports: [TypeOrmModule.forFeature([BookingEntity]), RoomModule],
  providers: [BookingService],
  controllers: [BookingController],
  exports: [BookingService],
})
export class BookingModule {}
