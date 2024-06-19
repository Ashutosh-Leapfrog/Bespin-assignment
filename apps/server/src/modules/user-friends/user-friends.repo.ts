import labels from '@/constants/labels';
import relations from '@/constants/relations';
import { Injectable } from '@nestjs/common';
import { process } from 'gremlin';
import { BaseRepository } from '../gremlin/base.repository';
import { GremlinService } from '../gremlin/gremlin.service';
import { UserFriend } from './entities/user-friend.entity';

const { USER } = labels;
const { FRIENDS_WITH, FRIEND_REQUESTED } = relations;

const { statics } = process;

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

  private async getIncomingRelations(userFriend: UserFriend) {
    const { userId, friendId } = userFriend;

    const traversal = this.gremlinService
      .getClient()
      .V(userId)
      .inE(FRIEND_REQUESTED)
      .as(FRIEND_REQUESTED)
      .outV()
      .hasId(friendId)
      .as('vertex')
      .select('vertex', FRIEND_REQUESTED);

    const [friendRelation]: any = await this.execute(traversal);

    if (!friendRelation) {
      return null;
    }

    return friendRelation.friendRequested.id.relationId;
  }

  async getRelations(userFriend: UserFriend, label: string) {
    const { userId, friendId } = userFriend;

    const traversal = this.gremlinService
      .getClient()
      .V(userId)
      .outE(label)
      .as(label)
      .inV()
      .hasId(friendId)
      .as('vertex')
      .select('vertex', label);

    const [friendRelation]: any = await this.execute(traversal);

    if (!friendRelation) {
      return null;
    }

    if (label === FRIENDS_WITH) {
      return friendRelation.isFriendsWith.id.relationId;
    }

    return friendRelation.friendRequested.id.relationId;
  }

  async acceptRequest(userFriend: UserFriend) {
    await this.deleteRelation(userFriend, FRIEND_REQUESTED);
    const traversal = await this.createRelations(userFriend, FRIENDS_WITH);
    return this.execute(traversal);
  }

  async sendRequest(userFriend: UserFriend) {
    const traversal = await this.createRelations(userFriend, FRIEND_REQUESTED);

    return this.execute(traversal);
  }

  async cancelRequest(userFriend: UserFriend, type?: string) {
    await this.deleteRelation(userFriend, FRIEND_REQUESTED, type);
  }

  async deleteRelation(userFriend: UserFriend, label: string, type?: string) {
    let friendRequestedId;
    if (label === FRIENDS_WITH || type === 'cancel') {
      friendRequestedId = await this.getRelations(userFriend, label);
    } else {
      friendRequestedId = await this.getIncomingRelations(userFriend);
    }

    await this.gremlinService
      .getClient()
      .E(friendRequestedId)
      .hasLabel(label)
      .drop()
      .iterate();
  }

  async getRequests(userId: number) {
    const traversal = this.gremlinService
      .getClient()
      .V(userId)
      .inE(FRIEND_REQUESTED)
      .outV();

    return this.execute(traversal);
  }

  async getSentRequests(userId: number) {
    const traversal = this.gremlinService
      .getClient()
      .V(userId)
      .outE(FRIEND_REQUESTED)
      .inV();

    return this.execute(traversal);
  }

  async getFriendsSuggestions(userId: number) {
    const generalSuggestionsTraversal = this.gremlinService
      .getClient()
      .V()
      .hasLabel(USER)
      .not(statics.bothE().hasLabel(FRIENDS_WITH).otherV())
      .not(statics.bothE().hasLabel(FRIEND_REQUESTED).otherV())
      .not(statics.hasId(userId));

    const allSuggestions = await this.execute(generalSuggestionsTraversal);

    const commonSuggestionsTraversal = this.gremlinService
      .getClient()
      .V()
      .hasLabel(USER)
      .both(FRIENDS_WITH)
      .both(FRIENDS_WITH)
      .not(statics.bothE().hasLabel(FRIENDS_WITH).otherV())
      .not(statics.bothE().hasLabel(FRIEND_REQUESTED).otherV())
      .not(statics.hasId(userId));

    const commonSuggestions = await this.execute(commonSuggestionsTraversal);

    return [...commonSuggestions, ...allSuggestions];
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
    await this.deleteRelation(userFriend, FRIENDS_WITH);
  }
}
