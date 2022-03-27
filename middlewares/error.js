module.exports = function (err, req, res, next) {
  let error = { ...err };
  error.message = err.message;

  res.status(error.statusCode || 500).send({
    success: false,
    error: error.message || 'Internal Server Error',
  });
};
