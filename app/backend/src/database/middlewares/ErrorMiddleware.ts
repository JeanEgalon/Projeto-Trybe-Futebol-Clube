import { NextFunction, Request, Response } from 'express';
import { Error } from 'sequelize';

export default class ErrorMiddleware {
  static handler(
    error: Error,
    _req: Request,
    res: Response,
    _next: NextFunction,
  ) {
    return res.status(401).json({ message: error.message });
  }
}
