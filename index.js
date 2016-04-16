
import express from 'express'
import bodyParser from 'body-parser'

import router from './router'

let app = express();

app.set('PORT', process.env.PORT || 3000);

// Middlewares

// Request modificators

app.use(bodyParser.urlencoded({ extended: false })); // parse application/x-www-form-urlencoded
app.use(bodyParser.json()); // parse application/json

// Routers
app.use(router);

// Response modificators
app.use((val, req, res, next) => {
  if (val instanceof Error) {
    // error
    res.json({
      error: {
        message: val.message
      }
    });
    return;
  }
  //
  res.json({
    data: val
  })
});

app.listen(app.get('PORT'), () => {
  console.log(`Start server on port ${app.get('PORT')}`);
});
