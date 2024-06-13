import { forwardRef, Module } from '@nestjs/common';

import UserRepo from './user.repo';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { GremlinModule } from '../gremlin/gremlin.module';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [GremlinModule, forwardRef(() => AuthModule)],
  controllers: [UserController],
  providers: [UserService, UserRepo],
  exports: [UserService],
})
export class UserModule {}
