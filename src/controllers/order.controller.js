const OrderValidation = require('../validations/order.validation')
const Order = require('../models/order.model')


const addOrder = async (req, res) => {
    const {error} = OrderValidation.orderCreateValidation.validate(req.body);
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
        'OrderItems.Quantity': 1,
        'OrderItems.CoffeeName': '$CoffeeDetails.name',
        'OrderItems.CoffeePrice': '$CoffeeDetails.price',
        'OrderItems.TotalCost': {$multiply: ["$CoffeeDetails.price", "$OrderItems.Quantity"]},
    }

    const group = {
        _id: "$_id",
        ClientName: {$first: "$ClientName"},
        OrderDate: {$first: "$OrderDate"},
        OrderItems: {
            $push: {
                CoffeeId: "$OrderItems.CoffeeId",
                CoffeeName: "$OrderItems.CoffeeName",
                CoffeePrice: "$OrderItems.CoffeePrice",
                Quantity: "$OrderItems.Quantity",
                TotalCost: "$OrderItems.TotalCost"
            }
        },
        TotalPrice: {
            $sum: "$OrderItems.TotalCost"
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

const updateOrderClientName = async (req, res) => {
    const {error} = OrderValidation.orderClientNameValidation.validate(req.body);
    if (error) {
        return res.status(400).send({
            error: error.details[0].message
        })
    }
    const {id} = req.params
    const {ClientName} = req.body
    const {modifiedCount, matchedCount} = await Order.updateOne({'_id': id}, {$set: {ClientName: ClientName}}, null);
    if (modifiedCount === 0) {
        return res.status(404).send({error: "Order not update"})
    } else if (matchedCount === 0) {
        return res.status(404).send({error: "Order not found"})
    }

    return res.status(200).send({})


}

const addMoreItems = async (req, res) => {
    const {error} = OrderValidation.orderItemsValidation.validate(req.body);
    if (error) {
        return res.status(400).send({
            error: error.details[0].message
        })
    }

    const {id} = req.params
    const {coffeeId, quantity} = req.body
    const {matchedCount} = await Order.updateOne({'_id': id}, {
        $push: {
            OrderItems: {
                CoffeeId: coffeeId,
                Quantity: quantity
            }
        }
    }, null);

    if (matchedCount === 0) {
        return res.status(404).send({error: "Order not found"});
    }
    return res.status(200).send({})
}

const deleteOrderItems = async (req, res) => {
    const {error} = OrderValidation.orderItemsIdValidation.validate(req.body);
    if (error) {
        return res.status(400).send({
            error: error.details[0].message
        })
    }

    const {id} = req.params
    const {coffeeIds} = req.body

    const {modifiedCount, matchedCount} = await Order.updateOne(
        {'_id': id},
        {$pull: {OrderItems: {CoffeeId: {$in: coffeeIds}}}},
        null
    );


    if (modifiedCount === 0) {
        return res.status(404).send({error: "No items updated"});
    } else if (matchedCount === 0) {

        return res.status(404).send({error: "Order not found"});
    }

    return res.status(200).send({});
}

const updateOrderItems = async (req, res) => {
    const {error} = OrderValidation.orderItemsValidation.validate(req.body);
    if (error) {
        return res.status(400).send({
            error: error.details[0].message
        });
    }

    const {id} = req.params;
    const {coffeeId, quantity} = req.body
    const filter = {'_id': id, 'OrderItems.CoffeeId': coffeeId}
    const update = {$set: {'OrderItems.$.Quantity': quantity}}
    const {modifiedCount, matchedCount} = await Order.updateOne(filter, update)


    if (modifiedCount === 0) {
        return res.status(404).send({error: "No items updated"});
    } else if (matchedCount === 0) {

        return res.status(404).send({error: "Order not found"});
    }

    return res.status(200).send({});
};

const deleteOrder = async (req, res) => {
    const {id} = req.params
    const result = await Order.findByIdAndDelete(id, null);
    if (!result) {
        return res.status(404).send({error: "Order not found"})
    }
    return res.status(200).send({})
}

module.exports = {
    addOrder,
    getOrder,
    updateOrderClientName,
    deleteOrder,
    addMoreItems,
    deleteOrderItems,
    updateOrderItems
}