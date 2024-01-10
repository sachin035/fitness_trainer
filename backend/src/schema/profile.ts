import Joi from "joi";

const createProfileSchema = Joi.object({
  fullname: Joi.string().required().max(255).messages({
    "required.any": "fullname is required",
  }),
  description: Joi.string().required().max(555).messages({
    "required.any": "description is required",
  }),
  available_time: Joi.string().required().max(225).messages({
    "required.any": "available_time is required",
  }),
  address: Joi.string().required().max(225).messages({
    "required.any": " address is required",
  }),
  minimum_charge: Joi.string().required().max(225).messages({
    "required.any": " minimum_charge is required",
  }),
  specialization: Joi.string().required().max(225).messages({
    "required.any": " specialization is required",
  }),
  experience: Joi.string().required().max(225).messages({
    "required.any": " experience is required",
  }),
  contact_number: Joi.string().required().max(225).messages({
    "required.any": "contact_number is required",
  }),
});
export { createProfileSchema };
