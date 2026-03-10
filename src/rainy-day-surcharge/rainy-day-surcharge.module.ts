import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { RainyDaySurchargeController } from './rainy-day-surcharge.controller';
import { RainyDaySurchargeService } from './rainy-day-surcharge.service';
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
  controllers: [RainyDaySurchargeController],
  providers: [RainyDaySurchargeService],
})
export class RainyDaySurchargeModule {}
