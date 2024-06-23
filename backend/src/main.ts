import { NestFactory } from '@nestjs/core';
import * as dotenv from 'dotenv';
import * as bodyParser from 'body-parser';

import { AnalyzerModule } from './cv-analyzer/analyzer.module';

async function bootstrap() {
  const PORT = process.env.PORT;

  dotenv.config();
  const app = await NestFactory.create(AnalyzerModule);

  app.use(bodyParser.json({ limit: '2mb' }));
  app.use(bodyParser.urlencoded({ limit: '2mb', extended: true }));

  app.enableCors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    allowedHeaders: 'Content-Type, Accept, Authorization, api-key',
  });

  await app.listen(PORT);
  console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();
