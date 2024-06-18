import { Injectable } from '@nestjs/common';

import labels from '@/constants/labels';
import { GremlinService } from '../gremlin/gremlin.service';
import User from './entities/user.entity';
import { BaseRepository } from '../gremlin/base.repository';

const { USER } = labels;
// const { FRIENDS_WITH, CREATED } = relations;

@Injectable()
export default class UserRepo extends BaseRepository {
  constructor(readonly gremlinService: GremlinService) {
    super(gremlinService, USER);
  }

  async addUser(user: User) {
    const traversal = this.gremlinService.getClient().addV(USER);
    this.gremlinService.assignProperties(traversal, user);
    return this.execute(traversal);
  }

  async getUsers() {
    const traversal = this.gremlinService.getClient().V().hasLabel(USER);
    return this.execute<User>(traversal);
  }

  async getUserById(id: number) {
    const traversal = this.gremlinService.getClient().V(id).hasLabel(USER);
    return this.execute<User>(traversal);
  }

  async getUserByEmail(email: string) {
    const traversal = this.gremlinService
      .getClient()
      .V()
      .hasLabel(USER)
      .has('email', email);

    const [user] = await this.execute<User>(traversal);
    return user;
  }

  async updateUser(id: number, user: User) {
    const traversal = this.gremlinService.getClient().V(id).hasLabel(USER);
    this.gremlinService.assignProperties(traversal, user);

    return this.execute(traversal);
  }

  async deleteUser(id: number) {
    const traversal = this.gremlinService.getClient().V(id).drop();
    return this.execute(traversal);
  }
}
