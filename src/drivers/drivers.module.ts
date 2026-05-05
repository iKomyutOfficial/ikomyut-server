import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DriversService } from './drivers.service';
import { DriversController } from './drivers.controller';
import { Drivers, DriversSchema } from './schemas/drivers.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Drivers.name, schema: DriversSchema }]),
  ],
  controllers: [DriversController],
  providers: [DriversService],
  exports: [DriversService],
})
export class DriversModule {}
