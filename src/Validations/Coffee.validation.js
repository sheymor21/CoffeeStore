const Joi = require("joi");

const CoffeeValidation = Joi.object({
    name: Joi.string().required(),
    type: Joi.string().required(),
    size: Joi.string().valid('Small', 'Medium', 'Large').required(),
    ingredients: Joi.array().required(),
    price: Joi.number().required()
})

module.exports = CoffeeValidation