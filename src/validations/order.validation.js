const Joi = require('joi');

const orderSingleItemValidation = Joi.object({
    coffeeId: Joi.string().required(),
})

const orderItemsIdValidation = Joi.object({
    coffeeIds: Joi.array().items(Joi.string()).required(),
})

const orderItemsValidation = Joi.object({
    coffeeId: Joi.string().required(),
    quantity: Joi.number().required(),
})

const orderCreateValidation = Joi.object({
    clientName: Joi.string().required(),
    orderItems: Joi.array().items(orderItemsValidation).required()
})

const orderClientNameValidation = Joi.object({
    clientName: Joi.string().required(),
})


module.exports = {
    orderClientNameValidation,
    orderCreateValidation,
    orderItemsIdValidation,
    orderItemsValidation,
    orderSingleItemValidation
}
