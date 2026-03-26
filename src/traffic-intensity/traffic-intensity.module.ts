import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TrafficIntensity, TrafficIntensitySchema } from '../schemas/traffic-intensity.schema';
import { TrafficController } from './traffic-intensity.controller';
import { TrafficService } from './traffic-intensity.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: TrafficIntensity.name, schema: TrafficIntensitySchema },
    ]),
  ],
  controllers: [TrafficController],
  providers: [TrafficService],
})
export class TrafficModule {}
