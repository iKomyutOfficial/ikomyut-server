import { Module } from '@nestjs/common';
import { OtpController } from './otp.controller';
import { OtpService } from './otp.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Drivers, DriversSchema } from '../schemas/drivers.schema';
import { Otp, OtpSchema } from '../schemas/otp.schema';
import { Users, UsersSchema } from '../schemas/users.schema';
import { UsersService } from '../users/users.service';

@Module({
  imports: [
    // AdminModule,
    MongooseModule.forFeature([
      { name: Users.name, schema: UsersSchema },
      { name: Drivers.name, schema: DriversSchema },
      { name: Otp.name, schema: OtpSchema },
    ]),
  ],
  controllers: [OtpController],
  providers: [OtpService, UsersService],
  exports: [OtpService],
})
export class OtpModule {}
