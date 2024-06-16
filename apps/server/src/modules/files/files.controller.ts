import {
  Controller,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
  Request,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express/multer/interceptors';

import { FilesService } from './files.service';
import JwtGuard from '../auth/auth.jwt.guard';
import CustomRequest from '@/interfaces/custom.request';

@Controller('files')
export class FilesController {
  constructor(private readonly filesService: FilesService) {}
  @Post('upload')
  @UseGuards(JwtGuard)
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(
    @UploadedFile() file: Express.Multer.File,
    @Request() req: CustomRequest,
  ) {
    const { userId } = req.user;
    const fileUrl = this.filesService.uploadFile(userId, file);

    return { message: 'File uploaded successfully', fileUrl };
  }
}
