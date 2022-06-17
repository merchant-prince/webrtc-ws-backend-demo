import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server } from 'socket.io';

@WebSocketGateway({ cors: true })
export class ChatGateway {
  @WebSocketServer()
  private readonly server: Server;

  @SubscribeMessage('broadcast')
  handleBroadcast(@MessageBody() message: string): void {
    this.server.emit('broadcast', message);
  }
}
