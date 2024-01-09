import Joi from "joi";

const createUserSchema = Joi.object({
  username: Joi.string().required().max(255).messages({
    "required.any": "username is required",
  }),

  email: Joi.string().email().required().max(255).messages({
    "required.any": "email is required",
  }),

  password: Joi.string().required().max(255).messages({
    "required.any": "username is required",
  }),
});
const loginSchema = Joi.object({
  email: Joi.string().required().min(4).max(255),
  password: Joi.string().required().min(6).max(255),
});

const updateUserSchema = Joi.object({
  username: Joi.string().required().max(255).messages({
    "required.any": "username is required",
  }),
});

export { createUserSchema, loginSchema, updateUserSchema };
