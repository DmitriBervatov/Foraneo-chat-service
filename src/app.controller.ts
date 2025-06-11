import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { ChatService } from './chat/chat.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly chatService: ChatService,
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post('chat')
  async testChat(@Body() body: { message: string }) {
    const response = await this.chatService.sendToGemini(body.message);
    return { response };
  }
}
