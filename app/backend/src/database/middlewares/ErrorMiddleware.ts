import { NextFunction, Request, Response } from 'express';

export default class ErrorMiddleware {
  static handler(
    error: unknown,
    _req: Request,
    res: Response,
    _next: NextFunction,
  ) {
    if (error instanceof Error) {
      return res.status(500).send(error.message);
    }
    return res.status(500).send('Erro não definido');
  }
}
