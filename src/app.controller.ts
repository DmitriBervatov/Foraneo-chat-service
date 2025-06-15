import { Body, Controller, Post } from '@nestjs/common';
import { ChatService } from './chat/chat.service';

@Controller()
export class AppController {
  constructor(private readonly chatService: ChatService) {}

  @Post('chat')
  async testChat(@Body() body: { message: string }) {
    const response = await this.chatService.sendToGemini(body.message);
    return { response };
  }
}
