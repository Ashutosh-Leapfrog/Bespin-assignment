import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseGuards,
  Request,
} from '@nestjs/common';

import { UserFriendsService } from './user-friends.service';
import JwtGuard from '../auth/auth.jwt.guard';
import CustomRequest from '@/interfaces/custom.request';
import { UserFriend } from './entities/user-friend.entity';

@Controller('friends')
export class UserFriendsController {
  constructor(private readonly userFriendsService: UserFriendsService) {}

  @UseGuards(JwtGuard)
  @Post('/accept')
  acceptRequest(
    @Body() createUserFriendDto: UserFriend,
    @Request() req: CustomRequest,
  ) {
    const { userId } = req.user;
    createUserFriendDto.userId = userId;
    return this.userFriendsService.acceptRequest(createUserFriendDto);
  }

  @UseGuards(JwtGuard)
  @Post('/reject')
  rejectRequest(
    @Body() createUserFriendDto: UserFriend,
    @Request() req: CustomRequest,
  ) {
    const { userId } = req.user;
    createUserFriendDto.userId = userId;
    return this.userFriendsService.cancelRequest(createUserFriendDto);
  }

  @UseGuards(JwtGuard)
  @Post('/cancel')
  cancelRequest(
    @Body() createUserFriendDto: UserFriend,
    @Request() req: CustomRequest,
  ) {
    const { userId } = req.user;
    createUserFriendDto.userId = userId;
    return this.userFriendsService.cancelRequest(createUserFriendDto, 'cancel');
  }

  @UseGuards(JwtGuard)
  @Post('/request')
  sendRequest(
    @Body() createUserFriendDto: UserFriend,
    @Request() req: CustomRequest,
  ) {
    const { userId } = req.user;
    createUserFriendDto.userId = userId;
    return this.userFriendsService.sendRequest(createUserFriendDto);
  }

  @UseGuards(JwtGuard)
  @Get()
  findAllFriends(@Request() req: CustomRequest) {
    const { userId } = req.user;
    return this.userFriendsService.findFriends(userId);
  }

  @UseGuards(JwtGuard)
  @Get('/request/sent')
  findSentRequests(@Request() req: CustomRequest) {
    const { userId } = req.user;
    return this.userFriendsService.findSentRequests(userId);
  }

  @UseGuards(JwtGuard)
  @Get('/request')
  findAllRequests(@Request() req: CustomRequest) {
    const { userId } = req.user;
    return this.userFriendsService.findRequests(userId);
  }

  @UseGuards(JwtGuard)
  @Get('/suggestions')
  findAllSuggestions(@Request() req: CustomRequest) {
    const { userId } = req.user;
    return this.userFriendsService.getFriendsSuggestions(userId);
  }

  @UseGuards(JwtGuard)
  @Delete('/remove/:id')
  remove(@Param('id') id: number, @Request() req: CustomRequest) {
    const { userId } = req.user;
    const userFriend = new UserFriend(userId, id);

    return this.userFriendsService.removeFriend(userFriend);
  }
}
