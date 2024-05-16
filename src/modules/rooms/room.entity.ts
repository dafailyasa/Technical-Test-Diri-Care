import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { BuildingEntity } from '../buildings/building.entity';
import { BookingEntity } from '../bookings/booking.entity';

export interface RoomProps {
  name: string;
  capacity: number;
  building: BuildingEntity;
  createdAt?: Date;
  updatedAt?: Date;
}

@Entity('rooms')
export class RoomEntity implements RoomProps {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'varchar',
    nullable: false,
  })
  name: string;

  @Column({
    type: 'int',
    nullable: false,
  })
  capacity: number;

  @CreateDateColumn({
    type: 'timestamp',
  })
  public createdAt: Date;

  @UpdateDateColumn({
    type: 'timestamp',
  })
  public updatedAt: Date;

  @ManyToOne(() => BuildingEntity, (building: BuildingEntity) => building.rooms)
  building: BuildingEntity;

  @OneToMany(() => BookingEntity, (booking) => booking.room)
  bookings: BookingEntity[];
}
