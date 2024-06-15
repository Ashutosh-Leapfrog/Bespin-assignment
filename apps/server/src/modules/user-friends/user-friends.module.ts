import { Module } from '@nestjs/common';

import { AuthModule } from '../auth/auth.module';
import UserFriendsRepo from './user-friends.repo';
import { UserFriendsService } from './user-friends.service';
import { UserFriendsController } from './user-friends.controller';
import { GremlinModule } from '../gremlin/gremlin.module';

@Module({
  imports: [AuthModule, GremlinModule],
  controllers: [UserFriendsController],
  providers: [UserFriendsService, UserFriendsRepo],
})
export class UserFriendsModule {}
