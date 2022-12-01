import * as chai from 'chai';
import * as sinon from 'sinon';
// @ts-ignore
import chaiHttp = require('chai-http');

import App from '../app';

chai.use(chaiHttp);

const { app } = new App();

const { expect } = chai;

let getLeaderboardMock;

describe('Testando a rota de Leaderboard', () => {
  beforeEach(sinon.restore)
  it('get /leaderboard retorna o resultado esperado', async () => {
    const response = await chai
      .request(app)
      .get('/leaderboard');

    getLeaderboardMock = response.body;
    expect(response.status).to.be.equal(200);
    expect(response.body).to.deep.equal(getLeaderboardMock);
  });

  it('get /leaderboard/home retorna o resultado esperado', async () => {
    const response = await chai
      .request(app)
      .get('/leaderboard/home');

    getLeaderboardMock = response.body;
    expect(response.status).to.be.equal(200);
    expect(response.body).to.deep.equal(getLeaderboardMock);
  });

  it('get /leaderboard/away retorna o resultado esperado', async () => {
    const response = await chai
      .request(app)
      .get('/leaderboard/away');

    getLeaderboardMock = response.body;
    expect(response.status).to.be.equal(200);
    expect(response.body).to.deep.equal(getLeaderboardMock);
  });
})
