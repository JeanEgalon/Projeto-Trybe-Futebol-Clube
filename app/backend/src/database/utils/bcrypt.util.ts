import * as bcrypt from 'bcryptjs';

export const checkPassword = (password: string): boolean => {
  const criptografia = bcrypt.genSaltSync(10);
  const criptografar = bcrypt.hashSync(password, criptografia);

  const descriptografar = bcrypt.compareSync(password, criptografar);

  return descriptografar;
};

export const criptografarSenha = (password: string): string => {
  const criptografia = bcrypt.genSaltSync(10);
  const criptografar = bcrypt.hashSync(password, criptografia);

  return criptografar;
};
