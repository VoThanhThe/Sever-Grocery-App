import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class ProductQueryMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    console.log('Request...', req.path);
    if (req.path == "/san-pham/get") {
      const { name, price } = req.query;
      if (price && !Number.isInteger(Number(price))) {
        return res.status(400).json({
          status: false,
          message: "Price must be string"
        });
      }
    }
    next();
  }
}
