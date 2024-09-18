const OrderValidation = require('../validations/order.validation')
const {Order} = require('../models/order.model')


const addOrder = async (req, res) => {
    const {error} = OrderValidation.validate(req.body);
    if (error) {
        return res.status(400).send({
            error: error.details[0].message
        })
    }
    await Order.create(req.body, null);
    return res.status(201).send(req.body)
}

const getOrder = async (req, res) => {
    const lookup = {
        from: 'coffees', // name of the coffee collection in MongoDB
        localField: 'OrderItems.CoffeeId',
        foreignField: '_id',
        as: 'CoffeeDetails'
    }

    const projection = {
        ClientName: 1,
        OrderDate: 1,
        'OrderItems.CoffeeId': 1,
        'OrderItems.CoffeeName': '$CoffeeDetails.name',
        'OrderItems.CoffeePrice': '$CoffeeDetails.price'
    }

    const group = {
        _id: "$_id",
        ClientName: {$first: "$ClientName"},
        OrderDate: {$first: "$OrderDate"},
        OrderItems: {
            $push: {
                CoffeeId: "$OrderItems.CoffeeId",
                CoffeeName: "$OrderItems.CoffeeName",
                CoffeePrice: "$OrderItems.CoffeePrice"
            }
        },
        TotalPrice: {
            $sum: "$OrderItems.CoffeePrice"
        }
    }
    const result = await Order.aggregate()
        .unwind("$OrderItems")
        .lookup(lookup)
        .unwind("$CoffeeDetails")
        .project(projection)
        .group(group)
        .exec()

    return res.status(201).send(result)
}

module.exports = {addOrder, getOrder}