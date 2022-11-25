import { Request, Response } from 'express';
import LoginService from '../services/LoginService';
import { validate } from '../utils/jwt.util';

type MyToken = {
  valor: {
    id: number,
    username: string,
    role: string,
    email: string,
    password: string
  },
  iat: number,
  exp: number
};

export default class LoginController {
  static async login(req: Request, res: Response) {
    const { email, password } = req.body;

    const result = await LoginService.login(email, password);

    res.status(200).json({ token: result });
  }

  static async loginValidate(req: Request, res: Response) {
    const param = req.headers.authorization as string;

    const result = validate(param) as MyToken;

    res.status(200).json(result.valor);
  }
}
