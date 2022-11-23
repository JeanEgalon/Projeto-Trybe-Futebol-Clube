import { NextFunction, Request, Response } from 'express';

export default class validate {
  static email(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    const { email } = req.body;
    const formatEmail = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+(\.[a-z]+)?$/i;

    if (!formatEmail.test(email) || !email) {
      return res.status(400).json(
        { message: '"email" must be a valid email' },
      );
    }

    next();
  }

  static password(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    const { password } = req.body;
    const message = 'Incorrect password';

    if (password.length < 6) return res.status(400).json({ message });

    next();
  }
}
