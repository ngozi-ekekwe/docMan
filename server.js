'use strict'
/**
 * module dependencies
 */
const express = require('esxpress'),
      bodyParser = require('body-parser'),
      logger = require('morgan'),
      http = require('http'),
      app = express(),
      jwt = require('jsonwebtoken');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const port = parseInt(process.env.PORT, 10) || 8000;
app.set('port', port);

const server = http.createServer(app);
server.listen(port);

app.get('*', (req,res) => {
  res.send(200).status({
    message: 'welcome'
  });
});

module.exports = app;