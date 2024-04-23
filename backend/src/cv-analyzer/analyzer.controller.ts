import { Body, Controller, Get, Post, ValidationPipe } from '@nestjs/common';
import { AnalyzerService } from './analyzer.service';
import { GetInputBase64DataDTO } from 'src/model/DTOs.dto';

@Controller('analyzer')
export class AnalyzerController {
  constructor(private readonly service: AnalyzerService) {}

  @Get('hello')
  getHello(): string {
    return 'Hello World!';
  }

  @Post('ocr')
  async OCRimage(
    @Body(new ValidationPipe({ transform: true })) data: GetInputBase64DataDTO,
  ) {
    try {
      const dataUrl = this.service.buildDataUrl(data.type, data.base64);
      let dataText = '';
      for (let i = 0; i < 70; i++) {
        dataText += dataUrl[i];
      }

      console.log('dataText: ', dataText);

      const res = await this.service.OCRimage(dataUrl);

      console.log('res: ', res);

      return res;
    } catch (e) {
      throw new Error(e);
    }
  }
}
