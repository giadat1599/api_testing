const { object, string } = require('yup');

exports.registerUserSchema = object({
  body: object({
    name: string().required('Name is required'),
    email: string().required('Email is required').email('Invalid email'),
    password: string()
      .required('Password is required')
      .min(5, 'Password must be at least 5 characters'),
  }),
});

exports.loginUserSchema = object({
  body: object({
    email: string().required('Email is required').email('Invalid email'),
    password: string().required('Password is required'),
  }),
});

exports.updateUserSchema = object({
  body: object({
    name: string().required('Name is required'),
  }),
});

exports.changePasswordUserSchema = object({
  body: object({
    new_password: string()
      .required('Password is required')
      .min(5, 'New Password must be at least 5 characters'),
  }),
});
