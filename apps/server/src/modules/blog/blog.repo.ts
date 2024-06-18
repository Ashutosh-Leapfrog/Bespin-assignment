import { Injectable } from '@nestjs/common';

import labels from '@/constants/labels';
import { Blog } from './entities/blog.entity';
import relations from '@/constants/relations';
import { GremlinService } from '../gremlin/gremlin.service';
import { BaseRepository } from '../gremlin/base.repository';
import User from '../user/entities/user.entity';

const { BLOG, USER } = labels;
const { CREATED } = relations;
@Injectable()
export default class BlogRepo extends BaseRepository {
  constructor(readonly gremlinService: GremlinService) {
    super(gremlinService, BLOG);
  }

  async addBlog(blog: Blog) {
    const traversal = this.gremlinService.getClient().addV(BLOG);

    this.gremlinService.assignProperties(traversal, blog);

    traversal
      .as(BLOG)
      .V(blog.authorId)
      .as('author')
      .addE(CREATED)
      .from_('author')
      .to(BLOG);

    return this.execute<Blog>(traversal);
  }

  async getBlogs() {
    const traversal = this.gremlinService
      .getClient()
      .V()
      .hasLabel(BLOG)
      .as(BLOG)
      .in_(CREATED)
      .as(USER)
      .select(BLOG, USER);

    const result: { blog: Blog; user: User }[] = await this.execute(traversal);
    return result.map(this.mapToModel);
  }

  async getBlogsByAuthorId(authorId: number) {
    const traversal = this.gremlinService
      .getClient()
      .V(authorId)
      .as(USER)
      .outE(CREATED)
      .inV()
      .as(BLOG)
      .hasLabel(BLOG)
      .select(BLOG, USER);

    const result: { blog: Blog; user: User }[] = await this.execute(traversal);

    return result.map(this.mapToModel);
  }

  async getBlogById(id: number) {
    const traversal = this.gremlinService.getClient().V(id).hasLabel(BLOG);
    return this.execute<Blog>(traversal);
  }

  async deleteBlog(id: number) {
    const traversal = this.gremlinService.getClient().V(id).drop();
    return this.execute(traversal);
  }

  async updateBlog(id: number, blog: Blog) {
    const traversal = this.gremlinService.getClient().V(id).hasLabel(BLOG);
    this.gremlinService.assignProperties(traversal, blog);
    return this.execute(traversal);
  }

  private mapToModel(data: { blog: Blog; user: User }) {
    const { blog, user } = data;

    return {
      ...blog,
      author: {
        username: user.username,
        imageUrl: user.imageUrl,
      },
    };
  }
}
