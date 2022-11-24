import IUser from '../entities/IUser';
import UserModel from '../models/UserModel';

export default class LoginService {
  static async login(email: string, _password: string): Promise<IUser> {
    const uEmail = await LoginService.buscaEmail(email);
    return uEmail;
  }

  private static async buscaEmail(email: string): Promise<IUser> {
    const userEmail = await UserModel.findOne({ where: { email } });
    if (!userEmail) {
      throw new Error('Conta não encontrada');
    }

    const { password: _, ...userWithoutPassword } = userEmail.dataValues;

    return userWithoutPassword;
  }

  private static async buscaPassword(password: string): Promise<IUser> {
    const userPassword = await UserModel.findOne({ where: { password } });
    if (!userPassword) {
      throw new Error('Senha não encontrada');
    }

    const senha = userPassword.dataValues.password;

    return senha;
  }
}
