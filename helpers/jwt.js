const jwt = require('jsonwebtoken');

exports.sign = function (object, options) {
  return jwt.sign(object, process.env.privateKey, options);
};

exports.decode = function (token) {
  try {
    const decoded = jwt.verify(token, process.env.privateKey);
    return {
      valid: true,
      expired: false,
      decoded,
    };
  } catch (error) {
    return {
      valid: true,
      expired: error.message === 'jwt expired',
      decoded,
    };
  }
};
