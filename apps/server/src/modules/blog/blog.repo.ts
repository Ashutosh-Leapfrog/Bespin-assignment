import { Injectable } from '@nestjs/common';

import labels from '@/constants/labels';
import { Blog } from './entities/blog.entity';
import relations from '@/constants/relations';
import { GremlinService } from '../gremlin/gremlin.service';
import { BaseRepository } from '../gremlin/base.repository';

const { BLOG } = labels;
const { CREATED } = relations;
@Injectable()
export default class BlogRepo extends BaseRepository {
  constructor(readonly gremlinService: GremlinService) {
    super(gremlinService, BLOG);
  }

  async addBlog(blog: Blog) {
    const traversal = this.gremlinService.getClient().addV(BLOG);

    this.gremlinService.assignProperties(traversal, blog);

    traversal.as(BLOG).V(blog.authorId).addE(CREATED).to(BLOG);

    return this.execute<Blog>(traversal);
  }

  async getBlogs() {
    const traversal = this.gremlinService.getClient().V().hasLabel(BLOG);
    return this.execute<Blog>(traversal);
  }

  async getBlogsByAuthorId(authorId: number) {
    const traversal = this.gremlinService
      .getClient()
      .V(authorId)
      .outE(CREATED)
      .inV()
      .hasLabel(BLOG);
    return this.execute<Blog>(traversal);
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
}
