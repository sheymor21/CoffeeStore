const Joi = require('joi');

const OrderItemValidation = Joi.object({
    CoffeeId: Joi.string().required(),
    Quantity: Joi.number().required(),
})
const OrderValidation = Joi.object({
    ClientName: Joi.string().required(),
    OrderItems: Joi.array().items(OrderItemValidation).required()
})

module.exports = OrderValidation