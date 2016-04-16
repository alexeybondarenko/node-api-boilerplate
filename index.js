
import express from 'express'
import expressValidator from 'express-validator'

import bodyParser from 'body-parser'

import requireDir from 'require-dir';

let middlewares = requireDir('./middlewares');

import router from './router'

let app = express();

app.set('PORT', process.env.PORT || 3000);

// Middlewares

app.use(bodyParser.urlencoded({ extended: false })); // parse application/x-www-form-urlencoded
app.use(bodyParser.json()); // parse application/json

app.use(expressValidator());

// Request modificators can be here


// Routers
app.use(router);

// Response modificators
app.use(middlewares.response);

app.listen(app.get('PORT'), () => {
  console.log(`Start server on port ${app.get('PORT')}`);
});
