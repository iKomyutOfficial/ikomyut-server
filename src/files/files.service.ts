import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  S3Client,
  PutObjectCommand,
  GetObjectCommand,
} from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

@Injectable()
export class FilesService {
  private s3: S3Client;

  constructor(private readonly configService: ConfigService) {
    this.s3 = new S3Client({
      region: this.configService.get<string>('AWS_REGION'),
      credentials: {
        accessKeyId: this.configService.get<string>('AWS_ACCESS_KEY')!,
        secretAccessKey: this.configService.get<string>('AWS_SECRET_KEY')!,
      },
    });
  }

  /**
   * Upload file to S3
   */
  async uploadFile(dataBuffer: Buffer, filename: string, mimetype?: string) {
    const command = new PutObjectCommand({
      Bucket: this.configService.get('AWS_PUBLIC_BUCKET_NAME')!,
      Key: filename,
      Body: dataBuffer,
      ContentType: mimetype,
    });

    await this.s3.send(command);

    return {
      key: filename,
    };
  }

  /**
   * Generate pre-signed URL
   */
  async getFileUrl(filename: string): Promise<string> {
    const command = new GetObjectCommand({
      Bucket: this.configService.get('AWS_PUBLIC_BUCKET_NAME')!,
      Key: filename,
    });

    const url = await getSignedUrl(this.s3, command, {
      expiresIn: 3600, // 1 hour
    });

    return url;
  }
}
