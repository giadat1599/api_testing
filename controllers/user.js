const ErrorResponse = require('../helpers/ErrorResponse');
const UserModel = require('../models/user');
const { omit } = require('lodash');
const { createAccessToken } = require('../helpers/functionHelpers');

exports.register = async (req, res, next) => {
  const emailExisted = await UserModel.findOne({ email: req.body.email });

  if (emailExisted) {
    throw new ErrorResponse('Email is already in use', 400);
  }

  const user = await UserModel.create(req.body);

  const access_token = createAccessToken({
    user_id: user._id,
    email: user.email,
  });

  return res.status(201).send({
    success: true,
    access_token,
    user: omit(user.toJSON(), 'password'),
  });
};

exports.login = async (req, res, next) => {
  const { email, password } = req.body;
  const user = await UserModel.findOne({ email }).select('+password');

  if (!user) {
    return next(new ErrorResponse('Email does not exist', 401));
  }

  const isPasswordMatching = await user.comparePassword(password);

  if (!isPasswordMatching) {
    return next(new ErrorResponse('Password is incorrect', 401));
  }

  const access_token = createAccessToken({
    user_id: user._id,
    email: user.email,
  });

  return res.status(200).send({
    success: true,
    access_token,
    user: omit(user.toJSON(), 'password'),
  });
};

exports.getInfo = async (req, res, next) => {
  const user = await UserModel.findById({ _id: req.user.user_id });

  if (!user) {
    return next(new ErrorResponse('User not found', 404));
  }

  return res.status(200).send({
    success: true,
    user,
  });
};

exports.updateUser = async (req, res, next) => {
  const { name, phone, photo, email } = req.body;
  const updatedUser = await UserModel.findByIdAndUpdate(
    req.user.user_id,
    { name, phone, photo, email },
    { new: true }
  );

  if (!updatedUser) {
    return next(new ErrorResponse('User not found', 404));
  }

  return res.status(200).send({
    success: true,
    user: updatedUser,
  });
};

exports.changePassword = async (req, res, next) => {
  const user = await UserModel.findById(req.user.user_id).select('+password');

  if (!user) {
    return next(new ErrorResponse('User not found', 404));
  }

  const isOldPasswordMatching = await user.comparePassword(
    req.body.old_password
  );

  if (!isOldPasswordMatching) {
    return next(new ErrorResponse('Wrong old password', 401));
  }

  user.password = req.body.new_password;
  await user.save();

  return res.status(200).send({
    success: true,
  });
};
