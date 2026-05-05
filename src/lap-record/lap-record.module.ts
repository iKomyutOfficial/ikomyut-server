import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { LapRecordService } from './lap-record.service';
import { LapRecordController } from './lap-record.controller';
import { LapRecord, LapRecordSchema } from './schemas/lap-record.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: LapRecord.name, schema: LapRecordSchema },
    ]),
  ],
  controllers: [LapRecordController],
  providers: [LapRecordService],
  exports: [LapRecordService],
})
export class LapRecordModule {}
