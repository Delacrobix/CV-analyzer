import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';

import { AnalyzerController } from './analyzer.controller';
import { AnalyzerService } from './analyzer.service';
import { TsseeractService } from './tsseeract/tsseeract.service';
import { ApiKeyMiddleware } from '../middlewares/api-key.middleware';
import { RequestHistoryMiddleware } from '../middlewares/request-history.middleware';

@Module({
  imports: [AnalyzerModule],
  controllers: [AnalyzerController],
  providers: [AnalyzerService, TsseeractService],
})
export class AnalyzerModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(ApiKeyMiddleware).forRoutes('*');
    consumer.apply(RequestHistoryMiddleware).forRoutes('*');
  }
}
