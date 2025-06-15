import { GenerativeModel, GoogleGenerativeAI } from '@google/generative-ai';
import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { N8NResponse } from './dto/response/N8NResponse';

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

  async sendToN8N(userId: string, message: string): Promise<string> {
    try {
      const webhookUrl = process.env.N8N_WEBHOOK_URL_PROD;
      const response = await axios.post<N8NResponse[] | N8NResponse | string>(
        webhookUrl!,
        {
          userId,
          message,
        },
      );

      const data = response.data;

      // Caso 1: Array de objetos con output
      if (
        Array.isArray(data) &&
        data.length > 0 &&
        typeof (data[0]).output === 'string'
      ) {
        return (data[0]).output;
      }

      // Caso 2: Objeto con output
      if (
        typeof data === 'object' &&
        data !== null &&
        'output' in data &&
        typeof (data).output === 'string'
      ) {
        return (data).output;
      }

      // Caso 3: Respuesta es un string plano
      if (typeof data === 'string') {
        return data;
      }

      throw new Error('No se recibió una respuesta válida de n8n');
    } catch (error) {
      console.error('Error al enviar mensaje a n8n:', error);
      throw new Error('Error al enviar mensaje a n8n');
    }
  }
}
