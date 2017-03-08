import documents from './documents';
import roles from './roles';
import users from './users';

module.exports = (app) => {
    app.get('/', function (req, res) {
        res.send({message: 'Document Management System'})
    });

    app.use('/documents', documents);
    app.use('/roles',roles);
    app.use('/users', users);
}