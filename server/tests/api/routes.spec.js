import supertest from 'supertest';
import app from '../../../server';


const request = supertest(app);

describe('Index route', () => {
  it('loads successfully', (done) => {
    request.get('/').expect(200, done);
  });
});
