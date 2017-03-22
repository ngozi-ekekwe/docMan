import Express from 'express';
import bodyParser from 'body-parser';
import logger from 'morgan';
import open from 'open';
import path from 'path';
import webpack from 'webpack';
import config from './webpack.config';
import routes from './server/routes';

/* eslint-disable no-console */
const app = Express();
const port = 8000;
const compiler = webpack(config);

app.set('port', port);


app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(require('webpack-dev-middleware')(compiler, {
  noInfo: true,
  publicPath: config.output.publicPath
}));
routes(app);


app.use(require('webpack-hot-middleware')(compiler));


if (process.env.NODE_ENV = 'test') {
  app.listen(port, (err) => {
    if (err) {
    } else {
      open(`http://localhost:${port}`);
    }
  });
}


module.exports = app;
