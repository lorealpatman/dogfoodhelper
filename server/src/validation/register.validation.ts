import { Joi } from 'express-validation';

export const RegisterValidation = Joi.object({
  userName: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().required(),
  passwordConfirm: Joi.string().required(),
});
