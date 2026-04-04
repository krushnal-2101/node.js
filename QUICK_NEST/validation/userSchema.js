import Joi from "joi"

const userSchema = Joi.object({
    name: Joi.string().min(2).trim().label("Name").messages({
        "string.base": "Name must be a string",
        "string.empty": "Name is required",
        "string.min": "Name must be at least 2 characters long",
    }),

    email: Joi.string().email().label("Email").messages({
        "string.base": "Email must be a string",
        "string.empty": "Email is required",
        "string.email": "Email must be a valid email address",
        "any.required": "Email is required"
    }),

    password: Joi.string()
        .min(6)
        .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$"))
        .label("Password")
        .required()
        .messages({
            "string.base": "Password must be a string",
            "string.empty": "Password is required",
            "string.min": "Password must be at least 6 characters long",
            "string.pattern.base": "Password must contain only letters and numbers",
            "any.required": "Password is required"
        }),

    phone: Joi.number()
        .min(1000000000)
        .max(9999999999)
        .label("Phone")
        .messages({
            "number.base": "Phone number must be a number",
            "number.min": "Phone number must be at least 10 digits",
            "number.max": "Phone number must be at most 10 digits"
        }),
    profilePic: Joi.string().label("profilePic").messages({
        "string.base": "url must be in string format",
    }),
    role: Joi.string()
        .valid("customer", "provider", "admin", "super_admin")
        .optional()
        .label("Role")
        .messages({
            "string.empty": "role is required from any of these customer.",
            "any.required": "email is required",
        }),
});

export const createUserSchema = userSchema.fork(
    ["name", "email", "password", "phone"],
    (field) =>
        field.required().messages({
            "any.required": "{#label} is required",
        }),
);



export const updateUserSchema = userSchema.fork(
  ["name", "password", "phone", "profilePic"],
  (fields) => fields.optional(),
)
  .fork(["role", "email"], (fields) => fields.forbidden())
  .or("name", "password", "phone", "profilePic")
  .messages({
    "object.missing":
      "name, password or phone or profilePic any of these field required when updating",
  });
