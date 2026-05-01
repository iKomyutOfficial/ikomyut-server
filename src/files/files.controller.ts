import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
  BadRequestException,
  Get,
  Query,
  UseGuards,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { FilesService } from './files.service';
import { Multer } from 'multer';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth } from '@nestjs/swagger';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';

@Controller('files')
@ApiBearerAuth('access-token')
@UseGuards(AuthGuard('jwt'), RolesGuard)
export class FilesController {
  constructor(private readonly filesService: FilesService) {}

  /**
   * Upload file to S3
   */
  @Post('upload')
  @Roles('admin')
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

    const safeFileName = `${Date.now()}-${file.originalname}`;

    await this.filesService.uploadFile(
      file.buffer,
      safeFileName,
      file.mimetype,
    );

    const publicUrl = await this.filesService.getFileUrl(safeFileName);

    return {
      message: 'File uploaded successfully',
      key: safeFileName,
      url: publicUrl,
    };
  }

  /**
   * Get signed URL for a file
   */
  @Get('url')
  @Roles('admin')
  async getFileUrl(@Query('filename') filename: string) {
    if (!filename) {
      throw new BadRequestException('filename is required');
    }

    // Normalize filename (handle full S3 URL)
    if (filename.startsWith('http')) {
      const parts = filename.split('.amazonaws.com/');
      if (parts.length > 1) {
        filename = parts[1];
      }
    }

    const url = await this.filesService.getFileUrl(filename);

    return { url };
  }
}
