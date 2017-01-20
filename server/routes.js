const documents = require('../server/controllers/documents');
const users = require('../server/controllers/users');
const roles = require('../server/controllers/roles');

const routes = {
  /**
   * set document routes
   */
  app.post('/', users.create);
}
module.exports= routes