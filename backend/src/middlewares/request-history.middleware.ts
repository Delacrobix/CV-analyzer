import { Injectable, NestMiddleware, Logger } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class RequestHistoryMiddleware implements NestMiddleware {
  private logger = new Logger('Request');

  use(req: Request, res: Response, next: NextFunction) {
    this.logger.log(`Received ${req.method} request to ${req.originalUrl}`);
    res.on('finish', () => {
      this.logger.log(
        `Completed ${req.method} request to ${req.originalUrl} with status ${res.statusCode}`,
      );
    });
    next();
  }
}
