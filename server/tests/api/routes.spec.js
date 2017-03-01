const app = require('../../../server');
const request = require('supertest')(app);

describe('Index route', () => {
  it('loads successfully', (done) => {
    request.get('/').expect(200, done);
  });
});