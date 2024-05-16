import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { RoomEntity } from '../rooms/room.entity';

export interface BuildingProps {
  name: string;
  address: string;
  city: string;
  region: string;
  province: string;
  createdAt?: Date;
  updatedAt?: Date;
}

@Entity('buildings')
export class BuildingEntity implements BuildingProps {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'varchar',
    nullable: false,
  })
  name: string;

  @Column({
    type: 'varchar',
    nullable: false,
  })
  address: string;

  @Column({
    type: 'varchar',
    nullable: false,
  })
  city: string;

  @Column({
    type: 'varchar',
    nullable: false,
  })
  region: string;

  @Column({
    type: 'varchar',
    nullable: false,
  })
  province: string;

  @CreateDateColumn({
    type: 'timestamp',
  })
  public createdAt: Date;

  @UpdateDateColumn({
    type: 'timestamp',
  })
  public updatedAt: Date;

  @OneToMany(() => RoomEntity, (room: RoomEntity) => room.building)
  rooms: RoomEntity[];
}
