import Joi from "joi";

const schema = Joi.object({
  pokemon: Joi.string()
    .min(3)
    .max(30)
    .pattern(/^[a-z-A-Z-]+$/)
    .message("Invalid pokemon name")
});

export default schema;
