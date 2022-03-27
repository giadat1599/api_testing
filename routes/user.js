const useAsync = require('../middlewares/async');
const useValidation = require('../middlewares/validate');
const useAuth = require('../middlewares/auth');
const {
  registerUserSchema,
  loginUserSchema,
  updateUserSchema,
  changePasswordUserSchema,
} = require('../schemas/user');
const { Router } = require('express');
const controller = require('../controllers/user');

const router = Router();

router.post(
  '/register',
  useValidation(registerUserSchema),
  useAsync(controller.register)
);

router.post(
  '/login',
  useValidation(loginUserSchema),
  useAsync(controller.login)
);

router.get('/', useAuth, useAsync(controller.getInfo));

router.post(
  '/update',
  useAuth,
  useValidation(updateUserSchema),
  useAsync(controller.updateUser)
);

router.post(
  '/update/password',
  useAuth,
  useValidation(changePasswordUserSchema),
  useAsync(controller.changePassword)
);

module.exports = router;
