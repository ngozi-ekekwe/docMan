import documents from './documents';
import roles from './roles';
import users from './users';

module.exports = (app) => {
    app.get('/', function (req, res) {
        res.send({message: 'Document Management System'})
    });

    app.use('/api/documents', documents);
    app.use('/api/roles',roles);
    app.use('/api/users', users);
}