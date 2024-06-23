import {
  Body,
  Controller,
  Get,
  Post,
  Delete,
  ValidationPipe,
} from '@nestjs/common';

import { AnalyzerService } from './analyzer.service';
import { GetInputFileDataDTO } from 'src/model/DTOs.dto';
import { getOrganizePrompt } from 'src/utils/prompts';

/**
 * Controller for the 'analyzer' endpoint.
 */
@Controller('analyzer')
export class AnalyzerController {
  constructor(private readonly service: AnalyzerService) {}

  /**
   * GET request handler for the 'health' endpoint.
   * @returns A string indicating the health status.
   */
  @Get('health')
  getHello(): string {
    return 'OK';
  }

  /**
   * POST request handler for the 'cv-analysis' endpoint.
   * @param data - The request body containing the data for CV analysis.
   * @returns The analysis result of the CV.
   * @throws Error if an error occurs during the analysis process.
   */
  @Post('cv-analysis')
  async cvOcrAndAnalysis(
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
      console.log('Images OCR completed.');

      const scansText = await Promise.all(scansPromises);
      const organizedText = scansText.join(' ');

      const prompt = getOrganizePrompt(organizedText);
      const cvAnalysis = await this.service.getAIResponse(prompt);
      console.log('AI response completed.');

      return cvAnalysis;
    } catch (e) {
      throw new Error(e);
    }
  }

  /**
   * DELETE request handler for the 'clean-files' endpoint.
   * @returns A string indicating the result of the file cleaning process.
   * @throws Error if an error occurs during the file cleaning process.
   */
  @Delete('clean-files')
  async cleanFilesFolder() {
    try {
      await this.service.cleanFilesFolder();

      return 'Files cleaned.';
    } catch (e) {
      throw new Error(e);
    }
  }
}
