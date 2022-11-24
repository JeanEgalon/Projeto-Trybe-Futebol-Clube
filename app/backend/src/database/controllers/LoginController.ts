import { Request, Response } from 'express';
import LoginService from '../services/LoginService';

export default class LoginController {
  static async login(req: Request, res: Response) {
    const { email, password } = req.body;

    const result = await LoginService.login(email, password);
    console.log(result);

    res.status(200).json(result);
  }
}
