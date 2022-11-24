import * as jwt from 'jsonwebtoken';

import 'dotenv/config';

const secret: string = process.env.JWT_SECRET || 'secret';

export const create = (valor: string): string => jwt.sign({ valor }, secret, {
  expiresIn: '15d',
  algorithm: 'HS256',
});

export const validate = (token: string) => {
  try {
    const result = jwt.verify(token, secret);
    return result;
  } catch (e) {
    return e;
  }
};
