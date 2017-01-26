'use strict'
/**
 * module dependencies
 */
const express = require('express');
const bodyParser = require('body-parser');
const logger = require('morgan');
const http = require('http');
const app = express();
const config = require('./server/config/config.json');
const router = express.Router();
const roleController = require('./server/controllers/roles');
const userController = require('./server/controllers/users');

//create port
const port = parseInt(process.env.PORT, 10) || 8000;
app.set('port', port);
      
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// apply the routes to our application
app.use('/', router);

//create server
const server = http.createServer(app);
server.listen(port);
console.log(`server is running on port ${port}`);

router.get('/', function(req, res) {
    res.send({message: 'API Document '});  
});

//roles routes
router.post('/roles', roleController.create);
router.get('/roles', roleController.index);

//user routes
router.post('/users', userController.create);
router.get('/users', userController.index);


module.exports = app;