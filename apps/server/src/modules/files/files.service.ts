import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as Minio from 'minio';
import { v4 as uuid } from 'uuid';

import ENV_CONSTANTS from '@/constants/env.constants';

@Injectable()
export class FilesService {
  private minioClient: Minio.Client;
  constructor(readonly config: ConfigService) {
    this.minioClient = new Minio.Client({
      endPoint: this.config.get(ENV_CONSTANTS.MINIO.ENDPOINT) ?? '',
      port: Number(this.config.get(ENV_CONSTANTS.MINIO.PORT)),
      useSSL: false,
      accessKey: this.config.get(ENV_CONSTANTS.MINIO.ACCESS_KEY) ?? '',
      secretKey: this.config.get(ENV_CONSTANTS.MINIO.SECRET_KEY) ?? '',
    });
  }

  async uploadFile(file: Express.Multer.File) {
    const bucket = this.config.get(ENV_CONSTANTS.MINIO.BUCKET) ?? '';

    const filename = `${Date.now()}-${uuid()}`;
    const options = {
      'Content-Type': file.mimetype,
    };

    await this.minioClient.putObject(
      bucket,
      filename,
      file.buffer,
      file.size,
      options,
    );

    return `http://${this.config.get(ENV_CONSTANTS.MINIO.ENDPOINT)}:${this.config.get(ENV_CONSTANTS.MINIO.PORT)}/${bucket}/${filename}`;
  }
}
