import express from 'express';
import bodyParser from 'body-parser';
import logger from 'morgan';
import webpack from 'webpack';
import config from './webpack.config';
import open from 'open';
import path from 'path';

/* eslint-disable no-console */

const app = express();
const port =  8000;
const compiler = webpack(config);

app.set('port', port);
      
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(require('webpack-dev-middleware')(compiler, {
  noInfo: true,
  publicPath: config.output.publicPath
}));

app.use(require('webpack-hot-middleware')(compiler));

app.get('*', function(req, res) {
  res.sendFile(path.join(__dirname, './client/index.html'));
});

app.listen(port, function(err) {
  if (err) {
    console.log(err);
  } else {
    open(`http://localhost:${port}`);
  }
});



module.exports = app;