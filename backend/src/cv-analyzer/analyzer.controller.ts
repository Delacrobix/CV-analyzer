import { Body, Controller, Get, Post, ValidationPipe } from '@nestjs/common';

import { AnalyzerService } from './analyzer.service';
import { GetInputFileDataDTO } from 'src/model/DTOs.dto';
import { getOrganizePrompt } from 'src/utils/prompts';

@Controller('analyzer')
export class AnalyzerController {
  constructor(private readonly service: AnalyzerService) {}

  @Get('health')
  getHello(): string {
    return 'OK';
  }

  // TODO: change name of this endpoint for something more meaningful
  @Post('ocr')
  async OCRimage(
    @Body(new ValidationPipe({ transform: true })) data: GetInputFileDataDTO,
  ) {
    try {
      const dataUrl = this.service.buildDataUrl(data.type, data.base64);

      let imgs = [];

      if (data.type === 'application/pdf') {
        imgs = await this.service.convertPdfToImages(dataUrl);
      }

      if (
        data.type === 'image/jpeg' ||
        data.type === 'image/jpg' ||
        data.type === 'image/png'
      ) {
        imgs.push(dataUrl);
      }

      const scansPromises = imgs.map(async (img) => {
        return new Promise((resolve) => {
          const res = this.service.OCRimage(img);

          resolve(res);
        });
      });

      const scansText = await Promise.all(scansPromises);
      const organizedText = scansText.join(' ');

      const prompt = getOrganizePrompt(organizedText);
      const cvAnalysis = await this.service.getAIResponse(prompt);

      return cvAnalysis;
    } catch (e) {
      throw new Error(e);
    }
  }
}
