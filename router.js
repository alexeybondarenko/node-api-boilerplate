
import {Router} from 'express'
import requireDir from 'require-dir'

import boom from 'boom';

let router = new Router();
let controllers = requireDir('./controllers');
let middlewares = requireDir('./middlewares');

router.get('/users', middlewares.pagination(2), controllers.users.getUsers);
router.post('/users', controllers.users.postUsers);

router.get('/users/:id', controllers.users.getUserById);
router.put('/users/:id', controllers.users.updateUserById);
router.delete('/users/:id', controllers.users.deleteUserById);

router.use(function (req, res, next) {
  next(boom.notFound('route not found'));
});

export default router;
