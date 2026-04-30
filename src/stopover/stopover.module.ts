import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { StopOver, StopOverSchema } from './schemas/stopover.schema';
import { StopOverService } from './stopover.service';
import { StopOverController } from './stopover.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: StopOver.name, schema: StopOverSchema },
    ]),
  ],
  controllers: [StopOverController],
  providers: [StopOverService],
})
export class StopOverModule {}
