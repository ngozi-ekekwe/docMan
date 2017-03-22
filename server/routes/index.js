import path from 'path';
import documents from './documents';
import roles from './roles';
import users from './users';

module.exports = (app) => {
  app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../../client/index.html'));
  });

  app.use('/api/documents', documents);
  app.use('/api/roles', roles);
  app.use('/api/users', users);
};
