import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import configurator from './config/configurator';
import { BuildingModule } from './modules/buildings/building.module';
import { RoomModule } from './modules/rooms/room.module';
import { BookingModule } from './modules/bookings/booking.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configurator],
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.get<string>('db.host'),
        port: configService.get<number>('db.port'),
        username: configService.get<string>('db.username'),
        password: configService.get<string>('db.password'),
        database: configService.get<string>('db.name'),
        synchronize: configService.get<boolean>('db.sync', false),
        logging: configService.get<boolean>('db.log', false),
        entities: ['dist/**/*.entity{ .ts,.js}'],
        retryAttempts: 10,
        retryDelay: 3000,
      }),
    }),
    BuildingModule,
    RoomModule,
    BookingModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
