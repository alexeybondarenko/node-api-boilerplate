
import boom from 'boom';
import * as service from '../services/users'

/**
 * Get list of users
 * @apiParam size - count of users in response
 * @apiParam page - number of the page
 */

export function getUsers (req, res, next) {
  next(service.getUsers(req.query.size, req.query.page))
}

export function postUsers (req, res, next) {

  req.check({
    'name': {
      in: 'body',
      notEmpty: true,
      errorMessage: 'missed name'
    },
    'city': {
      in: 'body',
      notEmpty: true,
      errorMessage: 'missed city'
    }
  });

  var errors = req.validationErrors();
  if (errors) {
    throw boom.badData('invalid post users', errors)
  }

  let newUser = service.createUser({
    name: req.body.name,
    city: req.body.city
  });

  next(newUser);
}

/**
 * Get users by ID
 *
 * @apiMethod get
 * @apiRoute /users/:id
 * @apiParam id id of the user
 */

export function getUserById (req, res, next) {

  next(service.getUserById(req.params.id) || boom.notFound('user not found'));
}

export function updateUserById (req, res, next) {

  req.check({
    'name': {
      in: 'body',
      errorMessage: 'invalid name'
    },
    'city': {
      in: 'body',
      errorMessage: 'invalid city'
    }
  });

  var errors = req.validationErrors();
  if (errors) {
    throw boom.badData('invalid update user', errors)
  }

  var user = service.updateUserById(req.params.id, {
    name: req.body.name,
    city: req.body.city
  });

  next(user);
}

export function deleteUserById (req, res, next) {

  next({})
}
