import Express from 'express';
import bodyParser from 'body-parser';
import logger from 'morgan';
import open from 'open';
import routes from './server/routes/index';

const app = Express();
const port = process.env.PORT || 8000;


app.set('port', port);

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

routes(app);

if (process.env.NODE_ENV !== 'test') {
  app.listen(port, () => {
    open(`http://localhost:${port}`);
  });
}

module.exports = app;
