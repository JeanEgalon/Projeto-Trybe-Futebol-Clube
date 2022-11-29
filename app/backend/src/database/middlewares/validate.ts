import { NextFunction, Request, Response } from 'express';
import TeamService from '../services/TeamService';
import { validate as validateToken } from '../utils/jwt.util';

type MyToken = {
  valor: {
    id: number,
    username: string,
    role: string,
    email: string,
    password: string
  },
  iat: number,
  exp: number,
  message: string
};

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

  static token(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    const { authorization } = req.headers;

    try {
      validateToken(authorization as string) as MyToken;
      next();
    } catch (_e) {
      return res.status(401).json(
        { message: 'Token must be a valid token' },
      );
    }
  }

  static async teams(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    const { homeTeam, awayTeam } = req.body;

    const findHomeTeam = await TeamService.getTeamById(homeTeam);
    const findAwayTeam = await TeamService.getTeamById(awayTeam);

    if (!findHomeTeam || !findAwayTeam) {
      return res.status(404).json({ message: 'There is no team with such id!' });
    }

    if (homeTeam === awayTeam) {
      return res.status(422).json(
        { message: 'It is not possible to create a match with two equal teams' },
      );
    }
    next();
  }
}
