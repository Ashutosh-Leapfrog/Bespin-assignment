import labels from '@/constants/labels';
import relations from '@/constants/relations';
import { Injectable } from '@nestjs/common';
import { BaseRepository } from '../gremlin/base.repository';
import { GremlinService } from '../gremlin/gremlin.service';
import { UserFriend } from './entities/user-friend.entity';
import { process } from 'gremlin';

const { statics } = process;

const { USER } = labels;
const { FRIENDS_WITH, FRIEND_REQUESTED } = relations;
@Injectable()
export default class UserFriendsRepo extends BaseRepository {
  constructor(readonly gremlinService: GremlinService) {
    super(gremlinService, USER);
  }

  private async createRelations(userFriend: UserFriend, type: string) {
    const { userId, friendId } = userFriend;
    const traversal = this.gremlinService
      .getClient()
      .V(userId)
      .as('user')
      .V(friendId)
      .as('friend')
      .addE(type)
      .from_('user')
      .to('friend');
    return traversal;
  }

  async acceptRequest(userFriend: UserFriend) {
    const traversal = await this.createRelations(userFriend, FRIENDS_WITH);
    return this.execute(traversal);
  }

  async sendRequest(userFriend: UserFriend) {
    const traversal = await this.createRelations(userFriend, FRIEND_REQUESTED);

    return this.execute(traversal);
  }

  // async declineRequest(userFriend: UserFriend) {}

  async getRequests(userId: number) {
    const traversal = this.gremlinService
      .getClient()
      .V(userId)
      .outE(FRIEND_REQUESTED)
      .inV();

    return this.execute(traversal);
  }

  async getFriends(userId: number) {
    const traversal = this.gremlinService
      .getClient()
      .V(userId)
      .bothE(FRIENDS_WITH)
      .inV();

    return this.execute(traversal);
  }

  async deleteFriend(userFriend: UserFriend) {
    const { userId, friendId } = userFriend;

    const [edge] = await this.gremlinService
      .getClient()
      .V(userId)
      .bothE(FRIENDS_WITH)
      .where(statics.otherV().hasId(friendId))
      .toList();

    const edgeId = (edge as any).id.relationId;

    const traversal = this.gremlinService.getClient().E(edgeId).drop();

    return this.execute(traversal);
  }
}
