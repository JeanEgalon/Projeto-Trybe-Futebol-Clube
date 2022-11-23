import IUser from '../entities/IUser';
import UserModel from '../models/UserModel';

export default class LoginService {
  static async login(email: string, _password: string): Promise<void> {
    const uEmail = await LoginService.buscaEmail(email);
    console.log(uEmail);
  }

  private static async buscaEmail(email: string): Promise<IUser> {
    const userEmail = await UserModel.findOne({ where: { email } });
    if (!userEmail) {
      throw new Error('Conta não encontrada');
    }
    return userEmail;
  }
}
