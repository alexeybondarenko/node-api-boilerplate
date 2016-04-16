
import express from 'express'
import expressValidator from 'express-validator'

import bodyParser from 'body-parser'

import requireDir from 'require-dir';

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
app.use(function (val, req, res, next) {
  if (val instanceof Error) {
    // error response

    let statusCode = (val.output || {}).statusCode || 500;
    res.status(statusCode).json({
      error: {
        // output is `boom js` error object property
        code: statusCode,
        message: val.message,
        data: val.data ? val.data : undefined,
        logs: statusCode >= 500 ? val.stack : undefined
      }
    });
    return;
  }
  // normal response
  res.json({
    data: val
  })
});

app.listen(app.get('PORT'), () => {
  console.log(`Start server on port ${app.get('PORT')}`);
});
