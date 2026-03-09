import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';
import { Admins, AdminsSchema } from '../schemas/admin.schema';
import { DriversService } from '../driver/driver.service';
// import { MobileModule } from '../mobile/mobile.module';
import { Bookings, BookingsSchema } from '../schemas/bookings.schema';
import { Drivers, DriversSchema } from '../schemas/drivers.schema';
import { Messages, MessagesSchema } from '../schemas/messages.schema';
import { Users, UsersSchema } from '../schemas/users.schema';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forFeature([
      { name: Admins.name, schema: AdminsSchema },
      // { name: Bookings.name, schema: BookingsSchema },
      { name: Drivers.name, schema: DriversSchema },
      { name: Users.name, schema: UsersSchema },
      { name: Messages.name, schema: MessagesSchema },
    ]),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET') || 'supersecretkey',
        signOptions: { expiresIn: '30d' },
      }),
      inject: [ConfigService],
    }),

    UsersModule,
  ],
  controllers: [AdminController],
  providers: [AdminService, DriversService],
  exports: [AdminService],
})
export class AdminModule {}
