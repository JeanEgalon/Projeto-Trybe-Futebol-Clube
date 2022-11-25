import * as chai from 'chai';
import * as sinon from 'sinon';
import { IncorrectEmailOrPassword, loginValidateMock } from './mocks/LoginMock';
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
    expect(response.body).to.deep.equal({ message: "All fields must be filled" });
  });

  it('Campo Password não informado', async () => {
    const response = await chai
      .request(app)
      .post('/login')
      .send({ email: 'teste@trybe.com' });
    expect(response.status).to.be.equal(400);
    expect(response.body).to.deep.equal({ message: "All fields must be filled" });
  });

  it('Campo Email inválido', async () => {
    const response = await chai
      .request(app)
      .post('/login')
      .send({ email: '123456' });
    expect(response.status).to.be.equal(401);
    expect(response.body).to.deep.equal(IncorrectEmailOrPassword);
  });

  it('Campo Password inválido', async () => {
    const response = await chai
      .request(app)
      .post('/login')
      .send({ email: 'teste@trybe.com', password: '12345' });

    expect(response.status).to.be.equal(400);
    expect(response.body).to.deep.equal(IncorrectEmailOrPassword);
  });

  it('Campos Email e Senha válidos porém email não existente no BD', async () => {
    const response = await chai
      .request(app)
      .post('/login')
      .send({ email: 'teste@trybe.com', password: '123456' });

    expect(response.status).to.be.equal(401);
    expect(response.body).to.deep.equal(IncorrectEmailOrPassword);
  });

  it('Campo Email válido e existente no BD', async () => {
    const response = await chai
      .request(app)
      .post('/login')
      .send({ email: 'admin@admin.com', password: 'secret_admin' });

    expect(response.status).to.be.equal(200);
    expect(response.body.token);
  });

  it('Campo Email e senha válidos mas senha incorreta', async () => {
    const response = await chai
      .request(app)
      .post('/login')
      .send({ email: 'admin@admin.com', password: '123456' });

    expect(response.status).to.be.equal(401);
    expect(response.body).to.deep.equal(IncorrectEmailOrPassword);
  });
});

describe('Testando a rota de LoginValidate', () => {
  it('Login com token correto', async () => {
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ2YWxvciI6eyJpZCI6MSwidXNlcm5hbWUiOiJBZG1pbiIsInJvbGUiOiJhZG1pbiIsImVtYWlsIjoiYWRtaW5AYWRtaW4uY29tIiwicGFzc3dvcmQiOiIkMmEkMDgkeGkuSHhrMWN6QU8wblpSLi5CMzkzdTEwYUVEMFJRMU4zUEFFWFE3SHh0TGpLUEVaQnUuUFcifSwiaWF0IjoxNjY5NDAzMDI0LCJleHAiOjE2NzA2OTkwMjR9.Lm_Rzch6B0v4H4CCSyGuBmnq5kQZBI9RLYR83KaPSX0'
    const response = await chai
      .request(app)
      .get('/login/validate')
      .set("Authorization", token);

    expect(response.status).to.be.equal(200);
    expect(response.body).to.deep.equal(loginValidateMock);
  });
})
