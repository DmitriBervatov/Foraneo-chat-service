import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { ChatService } from './chat.service';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class ChatGateway {
  @WebSocketServer()
  server: Server;

  constructor(private readonly chatService: ChatService) {}

  @SubscribeMessage('message')
  async handleMessage(
    @MessageBody() data: { message: string },
    @ConnectedSocket() client: Socket,
  ): Promise<void> {
    try {
      client.emit('userMessage', { message: data.message });
      const response = await this.chatService.sendToGemini(data.message);
      client.emit('aiResponse', { message: response });
    } catch (error) {
      console.error('Error en handleMessage:', error);
      client.emit('error', { message: 'Error al procesar el mensaje' });
    }
  }

  handleConnection(client: Socket): void {
    console.log(`Cliente conectado: ${client.id}`);
  }

  handleDisconnect(client: Socket): void {
    console.log(`Cliente desconectado: ${client.id}`);
  }
}
