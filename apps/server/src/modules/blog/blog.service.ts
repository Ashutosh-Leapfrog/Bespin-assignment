import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateBlogDto } from './dto/create-blog.dto';
import { UpdateBlogDto } from './dto/update-blog.dto';
import BlogRepo from './blog.repo';
import { UserService } from '../user/user.service';
import { plainToClass } from 'class-transformer';
import { Blog } from './entities/blog.entity';

@Injectable()
export class BlogService {
  constructor(
    private readonly blogRepo: BlogRepo,
    private readonly userService: UserService,
  ) {}
  async create(userId: number, createBlogDto: CreateBlogDto) {
    const user = await this.userService.findOne(userId);
    if (!user) {
      throw new NotFoundException('User not found');
    }

    createBlogDto.authorId = Number(userId);

    const blog = plainToClass(Blog, createBlogDto);

    return this.blogRepo.addBlog(blog);
  }

  async findAll() {
    const blogs = await this.blogRepo.getBlogs();
    return blogs;
  }

  async findAllByUser(id: number) {
    const user = await this.userService.findOne(id);
    if (!user) {
      throw new NotFoundException('Author does not exist');
    }

    const blogs = await this.blogRepo.getBlogsByAuthorId(id);
    return blogs;
  }

  async findOne(id: number) {
    const [blog] = await this.blogRepo.getBlogById(id);
    if (!blog) {
      throw new NotFoundException('Blog not found');
    }

    return blog;
  }

  async update(id: number, updateBlogDto: UpdateBlogDto, userId: number) {
    const existingBlog = await this.findOne(id);

    if (existingBlog.authorId !== userId) {
      throw new UnauthorizedException(
        'You are not authorized to update this blog',
      );
    }

    const blog = plainToClass(Blog, updateBlogDto);

    return this.blogRepo.updateBlog(id, blog);
  }

  async remove(id: number, userId: number) {
    const existingBlog = await this.findOne(id);
    if (existingBlog.authorId !== userId) {
      throw new UnauthorizedException(
        'You are not authorized to delete this blog',
      );
    }

    return this.blogRepo.deleteBlog(id);
  }
}
