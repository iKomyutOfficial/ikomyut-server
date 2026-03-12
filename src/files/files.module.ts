import { Module } from '@nestjs/common';
import { FilesService } from './files.service';
import { FilesController } from './files.controller';
import { MulterModule } from '@nestjs/platform-express';

@Module({
  imports: [
    MulterModule.register({
      limits: {
        fileSize: 5 * 1024 * 1024,
      },
    }),
  ],
  providers: [FilesService],
  controllers: [FilesController],
  exports: [FilesService], // optional, in case other modules need to use it
})
export class FilesModule {}
