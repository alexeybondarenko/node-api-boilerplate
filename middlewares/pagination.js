
import boom from 'boom';

module.exports = function (defaultSize) {

  return function (req, res, next) {

    req.check({
      'size': {
        in: 'query',
        optional: true,
        errorMessage: 'invalid size param',
        isInt: {}
      },
      'page': {
        in: 'query',
        optional: true,
        errorMessage: 'invalid page param',
        isInt: {}
      }
    });

    req.sanitizeQuery('size').toInt();
    req.sanitizeQuery('page').toInt();

    req.query.size = req.query.size || defaultSize;
    req.query.page = req.query.page || 0;

    var errors = req.validationErrors();
    if (errors) {
      next(boom.badData('invalid get users', errors))
    }

    next();
  }

};
