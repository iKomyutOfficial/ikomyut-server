import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { LapCounterSettingsService } from './lap-counter-settings.service';
import { LapCounterSettingsController } from './lap-counter-settings.controller';
import {
  LapCounterSettings,
  LapCounterSettingsSchema,
} from './schemas/lap-counter-settings.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: LapCounterSettings.name, schema: LapCounterSettingsSchema },
    ]),
  ],
  controllers: [LapCounterSettingsController],
  providers: [LapCounterSettingsService],
  exports: [LapCounterSettingsService],
})
export class LapCounterSettingsModule {}
