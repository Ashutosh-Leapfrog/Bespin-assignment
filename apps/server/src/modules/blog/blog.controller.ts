import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Request,
  UseGuards,
  Put,
} from '@nestjs/common';
import { BlogService } from './blog.service';
import { CreateBlogDto } from './dto/create-blog.dto';
import { UpdateBlogDto } from './dto/update-blog.dto';
import CustomRequest from '@/interfaces/custom.request';
import JwtGuard from '../auth/auth.jwt.guard';

@Controller('blog')
@UseGuards(JwtGuard)
export class BlogController {
  constructor(private readonly blogService: BlogService) {}

  @Post()
  create(@Body() createBlogDto: CreateBlogDto, @Request() req: CustomRequest) {
    const { userId } = req.user;

    return this.blogService.create(userId, createBlogDto);
  }

  @Get()
  findAll() {
    return this.blogService.findAll();
  }

  @Get('/user/:id')
  findAllByUser(@Param('id') id: string) {
    return this.blogService.findAllByUser(+id);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.blogService.findOne(+id);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateBlogDto: UpdateBlogDto,
    @Request() req: CustomRequest,
  ) {
    const { userId } = req.user;
    return this.blogService.update(+id, updateBlogDto, userId);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @Request() req: CustomRequest) {
    const { userId } = req.user;
    return this.blogService.remove(+id, userId);
  }
}
