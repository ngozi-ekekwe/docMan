'use strict'
/**
 * module dependencies
 */
const express = require('express'),
      bodyParser = require('body-parser'),
      logger = require('morgan'),
      http = require('http'),
      app = express(),
      jwt = require('jsonwebtoken'),
      config = require('./server/config/config.json');
      require('./server/routes')(app);
      
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const port = parseInt(process.env.PORT, 10) || 8000;
app.set('port', port);

const server = http.createServer(app);
server.listen(port);
console.log(`server is running on port ${port}`);


app.get('*', (req,res) => {
  res.send(200).status({
    message: 'welcome'
  });
});

module.exports = app;