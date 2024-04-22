import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class ApiKeyMiddleware implements NestMiddleware {
  private readonly validApiKey = process.env.API_KEY;

  use(req: Request, res: Response, next: NextFunction) {
    const apiKey = req.headers['api-key'];

    if (!apiKey || apiKey !== this.validApiKey) {
      return res.status(401).json({ message: 'Api key is not valid' });
    }

    next();
  }
}
