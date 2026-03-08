import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Drivers, DriversSchema } from '../schemas/drivers.schema';
import { DriversController } from './driver.controller';
import { DriversService } from './driver.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Drivers.name, schema: DriversSchema }]),
  ],
  controllers: [DriversController],
  providers: [DriversService],
})
export class DriversModule {}
