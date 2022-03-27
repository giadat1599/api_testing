const { sign } = require('./jwt');

exports.createAccessToken = function (payload) {
  return sign(payload, {
    expiresIn: `${process.env.accessTokenLifeTime}d`,
  });
};
