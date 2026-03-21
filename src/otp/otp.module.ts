import { Module } from '@nestjs/common';
import { OtpController } from './otp.controller';
import { OtpService } from './otp.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Drivers, DriversSchema } from '../schemas/drivers.schema';
import { Otp, OtpSchema } from '../schemas/otp.schema';
import { Users, UsersSchema } from '../schemas/users.schema';
import { UsersService } from '../users/users.service';
import { DriversService } from '../driver/driver.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Users.name, schema: UsersSchema },
      { name: Drivers.name, schema: DriversSchema },
      { name: Otp.name, schema: OtpSchema },
    ]),
  ],
  controllers: [OtpController],
  providers: [OtpService, UsersService, DriversService],
  exports: [OtpService], // export so other modules can inject it
})
export class OtpModule {}
