import * as bcrypt from 'bcryptjs';
import IUser from '../entities/IUser';
import UserModel from '../models/UserModel';
import { create } from '../utils/jwt.util';

export default class LoginService {
  static async login(email: string, password: string): Promise<string> {
    const uEmail = await LoginService.findUser(email, password);

    const token = create(uEmail);

    return token;
  }

  private static async findUser(email: string, password: string): Promise<IUser> {
    const userEmail = await UserModel.findOne({ where: { email } });

    if (!userEmail) {
      throw new Error('Incorrect email or password');
    }

    const descriptografar = bcrypt.compareSync(password, userEmail?.dataValues.password);

    if (!descriptografar) {
      throw new Error('Incorrect email or password');
    }

    return userEmail;
  }
}
