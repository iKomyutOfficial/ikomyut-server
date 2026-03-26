import { Injectable } from '@nestjs/common';
import { S3 } from 'aws-sdk';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class FilesService {
  constructor(private readonly configService: ConfigService) {}

  /**
   * Used by the mobile application. Uploads a file to the associated amazon s3 bucket
   */
  async uploadFile(dataBuffer: Buffer, filename: string, mimetype?: string) {
    const s3 = new S3();

    return s3
      .upload({
        Bucket: this.configService.get('AWS_PUBLIC_BUCKET_NAME')!,
        Body: dataBuffer,
        Key: filename,
        ContentType: mimetype,
      })
      .promise();
  }

  /**
   * Generate a pre-signed URL for a file in S3
   */
  async getFileUrl(filename: string): Promise<string> {
    const s3 = new S3();
    const key = `${filename}`;

    const url = s3.getSignedUrl('getObject', {
      Bucket: this.configService.get('AWS_PUBLIC_BUCKET_NAME'),
      Key: key,
      Expires: 3600, // 1 hour
    });

    return url;
  }
}
