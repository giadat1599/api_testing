const ErrorResponse = require('../helpers/ErrorResponse');
const { decode } = require('../helpers/jwt');

module.exports = function (req, res, next) {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    return next(new ErrorResponse('No token provided', 401));
  }

  const { decoded, expired, valid } = decode(token);

  if (!valid && expired) {
    return next(new ErrorResponse('Token is expired', 401));
  }

  if (decoded) {
    req.user = decoded;
    return next();
  }

  return next(new ErrorResponse('Not authenticated', 401));
};
