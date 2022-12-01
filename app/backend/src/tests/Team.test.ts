import * as chai from 'chai';
import * as sinon from 'sinon';
// @ts-ignore
import chaiHttp = require('chai-http');

import App from '../app';

chai.use(chaiHttp);

const { app } = new App();

const { expect } = chai;

let getTeamMock;

describe('Testando a rota de Teams', () => {
  beforeEach(sinon.restore)
  it('get /teams retorna o resultado esperado', async () => {
    const response = await chai
      .request(app)
      .get('/teams');

    getTeamMock = response.body;
    expect(response.status).to.be.equal(200);
    expect(response.body).to.deep.equal(getTeamMock);
  });

  it('get /teams/:id retorna o resultado esperado', async () => {
    const response = await chai
      .request(app)
      .get('/teams/1');

    getTeamMock = response.body;
    expect(response.status).to.be.equal(200);
    expect(response.body).to.deep.equal(getTeamMock);
  });
})
