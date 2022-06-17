import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({ cors: true })
export class ChatGateway {
  @WebSocketServer()
  private readonly server: Server;

  @SubscribeMessage('connection')
  async handleConnection(@ConnectedSocket() connectedSocket: Socket) {
    this.server.emit('connected-sockets', [
      ...(await this.server.allSockets()),
    ]);

    connectedSocket.on('disconnect', async () => {
      this.server.emit('connected-sockets', [
        ...(await this.server.allSockets()),
      ]);
    });
  }

  @SubscribeMessage('offer')
  handleOffer(
    @MessageBody('destination') destinationSocketId: string,
    @MessageBody('offer') offer: RTCSessionDescriptionInit,
  ) {
    this.server.to(destinationSocketId).emit('offer', offer);
  }
}
