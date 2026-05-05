import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { VersionsService } from './versions.service';
import { VersionsController } from './versions.controller';
import { Versions, VersionsSchema } from './schemas/versions.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Versions.name, schema: VersionsSchema },
    ]),
  ],
  controllers: [VersionsController],
  providers: [VersionsService],
  exports: [VersionsService],
})
export class VersionsModule {}
