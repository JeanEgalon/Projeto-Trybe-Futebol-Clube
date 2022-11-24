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
        { message: 'Email não informado' },
      );
    }

    if (!formatEmail.test(email)) {
      return res.status(400).json(
        { message: 'Email inválido' },
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
    const message = 'A senha precisa ter no mínimo 6 caracteres';

    if (password.length < 6) return res.status(400).json({ message });

    next();
  }
}
