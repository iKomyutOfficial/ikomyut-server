import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { GPSDeviceService } from './gps-device.service';
import { GPSDeviceController } from './gps-device.controller';
import { GPSDevice, GPSDeviceSchema } from './schemas/gps-device.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: GPSDevice.name, schema: GPSDeviceSchema },
    ]),
  ],
  controllers: [GPSDeviceController],
  providers: [GPSDeviceService],
  exports: [GPSDeviceService],
})
export class GPSDeviceModule {}
