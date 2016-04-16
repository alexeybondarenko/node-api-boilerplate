
import express from 'express'
import expressValidator from 'express-validator'

import bodyParser from 'body-parser'

import router from './router'

let app = express();

app.set('PORT', process.env.PORT || 3000);

// Middlewares

// Request modificators

app.use(bodyParser.urlencoded({ extended: false })); // parse application/x-www-form-urlencoded
app.use(bodyParser.json()); // parse application/json

app.use(expressValidator());

// Routers
app.use(router);

// Response modificators
app.use((val, req, res, next) => {
  if (val instanceof Error) {
    // error response

    let statusCode = (val.output || {}).statusCode || 500;
    res.json({
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
