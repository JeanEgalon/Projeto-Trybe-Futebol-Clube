import * as jwt from 'jsonwebtoken';

import 'dotenv/config';
import IUser from '../entities/IUser';

const secret: string = process.env.JWT_SECRET || 'secret';

export const create = (valor: IUser): string => jwt.sign({ valor }, secret, {
  expiresIn: '15d',
  algorithm: 'HS256',
});

export const validate = (token: string) => {
  const result = jwt.verify(token, secret);
  return result;
};
