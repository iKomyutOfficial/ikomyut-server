import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Fleet, FleetSchema } from './schemas/fleet.schema';
import { FleetController } from './fleets.controller';
import { FleetService } from './fleets.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Fleet.name, schema: FleetSchema }]),
  ],
  controllers: [FleetController],
  providers: [FleetService],
  exports: [FleetService],
})
export class FleetsModule {}
