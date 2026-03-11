import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TimeMatrixController } from './time-matrix.controller';
import { TimeMatrixService } from './time-matrix.service';
import { TimeMatrix, TimeMatrixSchema } from '../schemas/time-matrix.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: TimeMatrix.name, schema: TimeMatrixSchema }]),
  ],
  controllers: [TimeMatrixController],
  providers: [TimeMatrixService],
})
export class TimeMatrixModule {}