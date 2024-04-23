import { Injectable } from '@nestjs/common';
import { ChatOpenAI } from 'langchain/chat_models/openai';

import { GetOpenAIAnswerOutputDTO } from '../model/DTOs.dto';
import { TsseeractService } from './tsseeract/tsseeract.service';

const DEFAULT_TEMPERATURE = 1;
const DEFAULT_MODEL = 'gpt-3.5-turbo';
const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

@Injectable()
export class AnalyzerService {
  private readonly chat: ChatOpenAI;

  constructor() {
    this.chat = new ChatOpenAI({
      temperature: DEFAULT_TEMPERATURE,
      openAIApiKey: OPENAI_API_KEY,
      modelName: DEFAULT_MODEL,
    });
  }

  async getAIResponse(prompt: string) {
    try {
      const result = await this.chat.invoke(prompt);

      const aiMessage = result.content.toString();

      return GetOpenAIAnswerOutputDTO.getInstance(aiMessage);
    } catch (error) {
      console.error('Error in AnalyzerService.getAIResponse: ', error);
      throw error;
    }
  }

  async OCRimage(image: string) {
    try {
      const worker = new TsseeractService();
      const ret = await worker.recognize(image);
      console.log('ret: ', ret);

      worker.terminate();
      return ret;
    } catch (error) {
      console.error('Error in AnalyzerService.OCRimage: ', error);
    }
  }

  buildDataUrl(fileType: string, base64: string) {
    const validTypes = [
      'image/jpeg',
      'image/jpg',
      'image/png',
      'application/pdf',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'application/vnd.oasis.opendocument.text',
    ];

    if (!validTypes.includes(fileType)) {
      throw new Error('Tipo de archivo no válido');
    }

    return `data:${fileType};base64,${base64}`;
  }
}
