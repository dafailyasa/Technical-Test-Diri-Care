import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { RoomEntity } from '../rooms/room.entity';

export interface bookingProps {
  user: string;
  date: Date;
  startTime: string;
  endTime: string;
  room?: RoomEntity;
}

@Entity('bookings')
export class BookingEntity implements bookingProps {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'varchar',
    nullable: false,
  })
  user: string;

  @Column({
    type: 'date',
    nullable: false,
  })
  date: Date;

  @Column({
    type: 'time',
    nullable: false,
  })
  startTime: string;

  @Column({
    type: 'time',
    nullable: false,
  })
  endTime: string;

  @ManyToOne(() => RoomEntity, (room) => room.bookings)
  room: RoomEntity;
}
