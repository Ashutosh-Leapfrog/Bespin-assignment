import { Injectable } from '@nestjs/common';
import UserFriendsRepo from './user-friends.repo';
import { UserFriend } from './entities/user-friend.entity';

@Injectable()
export class UserFriendsService {
  constructor(private readonly userFriendRepo: UserFriendsRepo) {}
  sendRequest(createUserFriend: UserFriend) {
    return this.userFriendRepo.sendRequest(createUserFriend);
  }

  acceptRequest(createUserFriend: UserFriend) {
    return this.userFriendRepo.acceptRequest(createUserFriend);
  }

  findRequests(userId: number) {
    return this.userFriendRepo.getRequests(userId);
  }

  findFriends(userId: number) {
    return this.userFriendRepo.getFriends(userId);
  }

  removeFriend(userFriend: UserFriend) {
    return this.userFriendRepo.deleteFriend(userFriend);
  }
}
