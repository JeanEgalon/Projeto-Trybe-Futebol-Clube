import * as chai from 'chai';
import * as sinon from 'sinon';
// @ts-ignore
import chaiHttp = require('chai-http');

import App from '../app';

chai.use(chaiHttp);

const { app } = new App();

const { expect } = chai;

const postMatches = {
  homeTeam: 16,
  awayTeam: 8,
  homeTeamGoals: 2,
  awayTeamGoals: 2
}

const wrongPostMatches = {
  homeTeam: 16,
  awayTeam: 16,
  homeTeamGoals: 2,
  awayTeamGoals: 2
}

const wrongPostMatchesWithUnknownOneTeam = {
  homeTeam: 99,
  awayTeam: 16,
  homeTeamGoals: 2,
  awayTeamGoals: 2
}

let token;
let getMatchMock;
let getMatchInProgressTrueMock;
let getMatchInProgressFalseMock;
let expectValue;
let invalidToken;

describe('Testando a rota de Match', () => {
  beforeEach(sinon.restore)
  it('get /matches retorna o resultado esperado', async () => {
    const response = await chai
      .request(app)
      .get('/matches');

    getMatchMock = response.body;
    expect(response.status).to.be.equal(200);
    expect(response.body).to.deep.equal(getMatchMock);
  });

  it('get /matches?inProgress=true retorna o resultado esperado', async () => {
    const response = await chai
      .request(app)
      .get('/matches?inProgress=true');

    getMatchInProgressTrueMock = response.body;
    expect(response.status).to.be.equal(200);
    expect(response.body).to.deep.equal(getMatchInProgressTrueMock);
  });

  it('get /matches?inProgress=false retorna o resultado esperado', async () => {
    const response = await chai
      .request(app)
      .get('/matches?inProgress=false');

    getMatchInProgressFalseMock = response.body;
    expect(response.status).to.be.equal(200);
    expect(response.body).to.deep.equal(getMatchInProgressFalseMock);
  });

  it('post /matches sem token retorna o resultado esperado', async () => {
    const response = await chai
      .request(app)
      .post('/matches')
      .send(postMatches);
    invalidToken = response.body;
    expect(response.status).to.be.equal(401);
    expect(response.body).to.deep.equal(invalidToken);
  });

  it('post /matches com token retorna o resultado esperado', async () => {

    const getToken = await chai
      .request(app)
      .post('/login')
      .send({ email: 'admin@admin.com', password: 'secret_admin' });

    token = getToken.body.token

    const response = await chai
      .request(app)
      .post('/matches')
      .set("Authorization", token)
      .send(postMatches);
    expectValue = response.body;
    expect(response.status).to.be.equal(201);
    expect(response.body).to.deep.equal(expectValue);
  });

  it('post /matches com token e times iguais retorna o error esperado', async () => {

    const getToken = await chai
      .request(app)
      .post('/login')
      .send({ email: 'admin@admin.com', password: 'secret_admin' });

    token = getToken.body.token

    const response = await chai
      .request(app)
      .post('/matches')
      .set("Authorization", token)
      .send(wrongPostMatches);
    expectValue = response.body;
    expect(response.status).to.be.equal(422);
    expect(response.body).to.deep.equal(expectValue);
  });

  it('post /matches com token e algum time inexistente retorna o error esperado', async () => {

    const getToken = await chai
      .request(app)
      .post('/login')
      .send({ email: 'admin@admin.com', password: 'secret_admin' });

    token = getToken.body.token

    const response = await chai
      .request(app)
      .post('/matches')
      .set("Authorization", token)
      .send(wrongPostMatchesWithUnknownOneTeam);
    expectValue = response.body;
    expect(response.status).to.be.equal(404);
    expect(response.body).to.deep.equal(expectValue);
  });

  it('patch /matches/:id/finish retorna o resultado esperado', async () => {
    const response = await chai
      .request(app)
      .patch('/matches/1/finish');
    expectValue = response.body;
    expect(response.status).to.be.equal(200);
    expect(response.body).to.deep.equal(expectValue);
  });

  it('patch /matches/:id retorna o resultado esperado', async () => {
    const response = await chai
      .request(app)
      .patch('/matches/1')
      .send({ homeTeamGoals: 3, awayTeamGoals: 1 });
    expectValue = response.body;
    expect(response.status).to.be.equal(200);
    expect(response.body).to.deep.equal(expectValue);
  });

  it('patch /matches/:id passando times igualsretorna o resultado esperado', async () => {
    const response = await chai
      .request(app)
      .patch('/matches/1')
      .send({ homeTeamGoals: 3, awayTeamGoals: 1 });
    expectValue = response.body;
    expect(response.status).to.be.equal(200);
    expect(response.body).to.deep.equal(expectValue);
  });
})
