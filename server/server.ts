import * as express from 'express';
import * as dotenv from 'dotenv';
import * as bodyParser from 'body-parser';

import * as HomeController from './live.controller';

dotenv.config();

const app = express();

app.set('port', process.env.port || 3000);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.get('/', HomeController.index);

app.listen(app.get('port'), () => {
    console.log('Server is listening to port:%d', app.get('port'));
    console.log('Press CTRL-C to stop');
});
