import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './modules/auth/auth.module';
import { BlogModule } from './modules/blog/blog.module';
import { GremlinModule } from './modules/gremlin/gremlin.module';
import { UserModule } from './modules/user/user.module';
import { UserFriendsModule } from './modules/user-friends/user-friends.module';

@Module({
  imports: [
    GremlinModule,
    UserModule,
    AuthModule,
    BlogModule,
    ConfigModule.forRoot({
      envFilePath: '.env',
    }),
    UserFriendsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
