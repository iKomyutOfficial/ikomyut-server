import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Conductor, ConductorSchema } from './schemas/conductor.schema';
import { ConductorController } from './conductors.controller';
import { ConductorService } from './conductors.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Conductor.name, schema: ConductorSchema },
    ]),
  ],
  controllers: [ConductorController],
  providers: [ConductorService],
  exports: [ConductorService],
})
export class ConductorsModule {}
