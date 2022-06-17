import { Module } from '@nestjs/common';
import { ChatGateway } from './chat.gateway';
import { AppController } from './app.controller';

@Module({
  providers: [ChatGateway],
  controllers: [AppController],
})
export class AppModule {}
