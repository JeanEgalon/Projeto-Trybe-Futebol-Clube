import { NextFunction, Request, Response } from 'express';

export default class validate {
  static email(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    const { email } = req.body;
    const formatEmail = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+(\.[a-z]+)?$/i;

    if (!email) {
      return res.status(400).json(
        { message: 'All fields must be filled' },
      );
    }

    if (!formatEmail.test(email)) {
      return res.status(401).json(
        { message: 'Incorrect email or password' },
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

    if (!password) {
      return res.status(400).json(
        { message: 'All fields must be filled' },
      );
    }

    if (password.length < 6) {
      return res.status(400).json({ message: 'Incorrect email or password' });
    }

    next();
  }
}
