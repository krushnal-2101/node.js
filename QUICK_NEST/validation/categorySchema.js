import Joi from "joi";

const categorySchema = Joi.object({
  name: Joi.string()
    .min(2)
    .trim()
    .required()
    .messages({
      "string.base": "Category name must be a string",
      "string.empty": "Category name cannot be empty",
      "string.min": "Category name must be at least 2 characters long",
      "any.required": "Category name is required",
    }),

  description: Joi.string()
    .allow("")
    .messages({
      "string.base": "Description must be a string",
    }),
});

export default categorySchema;