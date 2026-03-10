import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import {
  TrafficIntensity,
  TrafficIntensitySchema,
} from '../schemas/traffic-intensity.schema';

import { TrafficIntensityController } from './traffic-intensity.controller';
import { TrafficIntensityService } from './traffic-intensity.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: TrafficIntensity.name, schema: TrafficIntensitySchema },
    ]),
  ],
  controllers: [TrafficIntensityController],
  providers: [TrafficIntensityService],
})
export class TrafficIntensityModule {}