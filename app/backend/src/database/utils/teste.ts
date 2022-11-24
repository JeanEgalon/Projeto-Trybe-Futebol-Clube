import * as bcrypt from 'bcryptjs';

const password = 'jean';
const brokenPassword = 'ola';

const criptografia = bcrypt.genSaltSync(10);
const criptografar = bcrypt.hashSync(password, criptografia);
const descriptografar = bcrypt.compareSync(brokenPassword, criptografar);

console.log(criptografar);
console.log('----------');
console.log(descriptografar);
