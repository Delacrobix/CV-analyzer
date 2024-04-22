import { Controller, Get } from '@nestjs/common';
import { AnalyzerService } from './analyzer.service';

@Controller('analyzer')
export class AnalyzerController {
  constructor(private readonly service: AnalyzerService) {}

  @Get('hello')
  getHello(): string {
    return 'Hello World!';
  }

  // @Post('')
  // async cssToTailwind(
  //   @Body(new ValidationPipe({ transform: true }))
  //   data: GetInputDTO,
  // ) {
  //   try {
  //     const prompt = CSS_TO_TAILWIND_PROMPT(data.message);

  //     return await this.service.getAIResponse(prompt);
  //   } catch (e) {
  //     throw new Error(e);
  //   }
  // }
}
