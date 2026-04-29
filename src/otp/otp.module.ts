import { Module } from '@nestjs/common';
import { OtpController } from './otp.controller';
import { OtpService } from './otp.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Otp, OtpSchema } from './schemas/otp.schema';
import { DriversService } from '../drivers/drivers.service';
import { Drivers, DriversSchema } from '../drivers/schemas/drivers.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Drivers.name, schema: DriversSchema },
      { name: Otp.name, schema: OtpSchema },
    ]),
  ],
  controllers: [OtpController],
  providers: [OtpService, DriversService],
  exports: [OtpService], // export so other modules can inject it
})
export class OtpModule {}
