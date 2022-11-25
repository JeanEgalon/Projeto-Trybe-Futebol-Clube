import * as chai from 'chai';
import * as sinon from 'sinon';
// @ts-ignore
import chaiHttp = require('chai-http');

import App from '../app';

chai.use(chaiHttp);

const { app } = new App();

const { expect } = chai;

describe('Testando a rota de Login', () => {
  it('Campo Email não informado', async () => {
    const response = await chai
      .request(app)
      .post('/login')
      .send({ password: '123456' });
    expect(response.status).to.be.equal(400);
    expect(response.body).to.deep.equal({ message: 'Email não informado' });
  });

  it('Campo Email inválido', async () => {
    const response = await chai
      .request(app)
      .post('/login')
      .send({ email: '123456' });
    expect(response.status).to.be.equal(400);
    expect(response.body).to.deep.equal({ message: 'Email inválido' });
  });

  it('Campo Password inválido', async () => {
    const response = await chai
      .request(app)
      .post('/login')
      .send({ email: 'teste@trybe.com', password: '12345' });

    expect(response.status).to.be.equal(400);
    expect(response.body).to.deep.equal({ message: 'A senha precisa ter no mínimo 6 caracteres' });
  });

  it('Campos Email e Senha válidos porém email não existente no BD', async () => {
    const response = await chai
      .request(app)
      .post('/login')
      .send({ email: 'teste@trybe.com', password: '123456' });

    expect(response.status).to.be.equal(500);
    expect(response.body).to.equal('Conta não encontrada');
  });

  it('Campo Email válido e existente no BD', async () => {
    const response = await chai
      .request(app)
      .post('/login')
      .send({ email: 'admin@admin.com', password: 'secret_admin' });

    expect(response.status).to.be.equal(200);
    expect(response.body).to.be.equal({ id: 1, username: 'Admin', role: 'admin', email: 'admin@admin.com' });
  });
});
