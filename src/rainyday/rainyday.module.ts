import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { RainyDayService } from './rainyday.service';
import { RainyDayController } from './rainyday.controller';
import {
  RainyDaySurcharge,
  RainyDaySurchargeSchema,
} from '../schemas/rainy-day-surcharge.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: RainyDaySurcharge.name, schema: RainyDaySurchargeSchema },
    ]),
  ],
  controllers: [RainyDayController],
  providers: [RainyDayService],
})
export class RainyDayModule {}
