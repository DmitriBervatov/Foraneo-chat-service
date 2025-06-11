import { GenerativeModel, GoogleGenerativeAI } from '@google/generative-ai';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ChatService {
  private genAI: GoogleGenerativeAI;
  private model: GenerativeModel;

  constructor() {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error('GEMINI_API_KEY no esta configurada');
    }

    this.genAI = new GoogleGenerativeAI(apiKey);
    this.model = this.genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
  }

  async sendToGemini(message: string): Promise<string> {
    try {
      const result = await this.model.generateContent(message);
      const response = result.response;
      return response.text();
    } catch (error) {
      console.error('Error al enviar mensaje a Gemini:', error);
      throw new Error('Error al enviar mensaje a Gemini');
    }
  }
}
