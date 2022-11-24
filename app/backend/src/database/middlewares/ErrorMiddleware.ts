import { NextFunction, Request, Response } from 'express';

export default class ErrorMiddleware {
  static handler(
    error: unknown,
    _req: Request,
    res: Response,
    _next: NextFunction,
  ) {
    if (error instanceof Error) {
      return res.status(500).json(error.message);
    }
    return res.status(500).json('Erro não definido');
  }
}
