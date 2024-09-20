const Joi = require('joi');

const orderSingleItemValidation = Joi.object({
    coffeeId: Joi.string().required(),
})

const orderItemsIdValidation = Joi.object({
    CoffeeIds: Joi.array().items(Joi.string()).required(),
})

const orderItemsValidation = Joi.object({
    CoffeeId: Joi.string().required(),
    Quantity: Joi.number().required(),
})

const orderCreateValidation = Joi.object({
    ClientName: Joi.string().required(),
    OrderItems: Joi.array().items(orderItemsValidation).required()
})

const orderClientNameValidation = Joi.object({
    ClientName: Joi.string().required(),
})


module.exports = {
    orderClientNameValidation,
    orderCreateValidation,
    orderItemsIdValidation,
    orderItemsValidation,
    orderSingleItemValidation
}
