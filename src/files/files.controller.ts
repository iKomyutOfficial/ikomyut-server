import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
  Body,
  BadRequestException,
  Get,
  Query,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { FilesService } from './files.service';

@Controller('files')
export class FilesController {
  constructor(private readonly filesService: FilesService) {}

  /**
   * Uploads a file to S3.
   * The frontend should send FormData with:
   * - file: the uploaded file
   * - userId: the ID of the user
   */
  @Post('upload')
  @UseInterceptors(
    FileInterceptor('file', {
      limits: {
        fileSize: 5 * 1024 * 1024, // 5MB
      },
      fileFilter: (req, file, cb) => {
        if (!file.mimetype.startsWith('image/')) {
          return cb(
            new BadRequestException('Only image files are allowed'),
            false,
          );
        }
        cb(null, true);
      },
    }),
  )
  async uploadFile(@UploadedFile() file: Express.Multer.File) {
    if (!file) {
      throw new BadRequestException('File is required');
    }

    // Prevent filename collisions
    const safeFileName = `${Date.now()}-${file.originalname}`;

    const uploadResult = await this.filesService.uploadFile(
      file.buffer,
      safeFileName,
      file.mimetype,
    );

    return {
      message: 'File uploaded successfully',
      url: uploadResult.Location, // already correct from AWS
      key: safeFileName,
    };
  }

  @Get('url')
  async getFileUrl(@Query('filename') filename: string) {
    if (!filename) {
      throw new BadRequestException('userId and filename are required');
    }

    const url = await this.filesService.getFileUrl(filename);
    return { url };
  }
}
