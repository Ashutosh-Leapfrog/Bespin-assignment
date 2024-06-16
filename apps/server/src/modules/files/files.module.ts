import { Module } from '@nestjs/common';
import { FilesService } from './files.service';
import { FilesController } from './files.controller';
import { AuthModule } from '../auth/auth.module';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [AuthModule],
  controllers: [FilesController],
  providers: [FilesService, ConfigService],
})
export class FilesModule {}
