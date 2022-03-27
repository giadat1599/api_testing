module.exports = function (schema) {
  return async function (req, res, next) {
    try {
      await schema.validate({
        body: req.body,
        query: req.query,
        params: req.params,
      });
      return next();
    } catch (error) {
      return res.status(400).send({
        success: false,
        errors: error.errors,
      });
    }
  };
};
