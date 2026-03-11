import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TnvsConfigurationController } from './tnvs-configuration.controller';
import { TnvsConfigurationService } from './tnvs-configuration.service';
import {
  TnvsConfiguration,
  TnvsConfigurationSchema,
} from '../schemas/tnvs-configuration.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: TnvsConfiguration.name,
        schema: TnvsConfigurationSchema,
      },
    ]),
  ],
  controllers: [TnvsConfigurationController],
  providers: [TnvsConfigurationService],
  exports: [TnvsConfigurationService],
})
export class TnvsConfigurationModule {}