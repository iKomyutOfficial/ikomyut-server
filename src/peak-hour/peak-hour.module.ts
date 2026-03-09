import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PeakHourController } from './peak-hour.controller';
import { PeakHourService } from './peak-hour.service';
import { PeakHour, PeakHourSchema } from '../schemas/peak-hour.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: PeakHour.name, schema: PeakHourSchema },
    ]),
  ],
  controllers: [PeakHourController],
  providers: [PeakHourService],
  exports: [PeakHourService],
})
export class PeakHourModule {}