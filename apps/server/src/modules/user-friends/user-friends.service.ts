import { BadRequestException, Injectable } from '@nestjs/common';
import UserFriendsRepo from './user-friends.repo';
import { UserFriend } from './entities/user-friend.entity';
import relations from '@/constants/relations';

@Injectable()
export class UserFriendsService {
  constructor(private readonly userFriendRepo: UserFriendsRepo) {}
  async sendRequest(createUserFriend: UserFriend) {
    const requestId = await this.userFriendRepo.getRelations(
      createUserFriend,
      relations.FRIEND_REQUESTED,
    );

    if (requestId) {
      throw new BadRequestException('Friend request already sent');
    }

    return this.userFriendRepo.sendRequest(createUserFriend);
  }

  acceptRequest(createUserFriend: UserFriend) {
    return this.userFriendRepo.acceptRequest(createUserFriend);
  }

  cancelRequest(createUserFriend: UserFriend) {
    return this.userFriendRepo.cancelRequest(createUserFriend);
  }

  findRequests(userId: number) {
    return this.userFriendRepo.getRequests(userId);
  }

  findSentRequests(userId: number) {
    return this.userFriendRepo.getSentRequests(userId);
  }

  getFriendsSuggestions(userId: number) {
    return this.userFriendRepo.getFriendsSuggestions(userId);
  }

  findFriends(userId: number) {
    return this.userFriendRepo.getFriends(userId);
  }

  async removeFriend(userFriend: UserFriend) {
    const requestId = await this.userFriendRepo.getRelations(
      userFriend,
      relations.FRIENDS_WITH,
    );

    if (!requestId) {
      throw new BadRequestException('Friend does not exist');
    }

    return await this.userFriendRepo.deleteFriend(userFriend);
  }
}
