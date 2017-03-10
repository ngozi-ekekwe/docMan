import Express from 'express';
import bodyParser from 'body-parser';
import logger from 'morgan';
import webpack from 'webpack';
import config from './webpack.config';
import open from 'open';
import path from 'path';
import routes from './server/routes/index';

const app = Express();
const port = process.env.PORT || 8000;
const compiler = webpack(config);

app.set('port', port);

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

routes(app);

if (process.env.NODE_ENV !== 'test') {
  app.listen(port, function () {
    open(`http://localhost:${port}`);
  });
}

module.exports = app;
