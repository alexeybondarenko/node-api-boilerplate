
import {Router} from 'express'

let router = new Router();

router.get('/', function (req, res, next) {
  next({
    message: "hello world!"
  });
});

router.get('/error', function (req, res, next) {
  next(new Error("some error message"));
});

export default router;
