import { Module } from '@nestjs/common';
import { BlogService } from './blog.service';
import { BlogController } from './blog.controller';
import { UserModule } from '../user/user.module';
import { AuthModule } from '../auth/auth.module';
import BlogRepo from './blog.repo';
import { GremlinModule } from '../gremlin/gremlin.module';

@Module({
  imports: [UserModule, AuthModule, GremlinModule],
  controllers: [BlogController],
  providers: [BlogService, BlogRepo],
})
export class BlogModule {}
