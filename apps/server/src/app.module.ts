import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { GremlinModule } from './modules/gremlin/gremlin.module';

@Module({
  imports: [GremlinModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
