const OrderValidation = require('../validations/order.validation')
const Order = require('../models/order.model')


const addOrder = async (req, res) => {
    await Order.create(req.body, null);
    return res.status(201).send(req.body)
}

const getOrder = async (req, res) => {
    const lookup = {
        from: 'coffees', // name of the coffee collection in MongoDB
        localField: 'orderItems.coffeeId',
        foreignField: '_id',
        as: 'coffeeDetails'
    }

    const projection = {
        ClientName: 1,
        OrderDate: 1,
        'orderItems.coffeeId': 1,
        'orderItems.quantity': 1,
        'orderItems.coffeeName': '$coffeeDetails.name',
        'orderItems.coffeePrice': '$coffeeDetails.price',
        'orderItems.totalCost': {$multiply: ["$coffeeDetails.price", "$orderItems.quantity"]},
    }

    const group = {
        _id: "$_id",
        clientName: {$first: "$clientName"},
        orderDate: {$first: "$orderDate"},
        orderItems: {
            $push: {
                coffeeId: "$orderItems.coffeeId",
                coffeeName: "$orderItems.coffeeName",
                coffeePrice: "$orderItems.coffeePrice",
                quantity: "$orderItems.quantity",
                totalCost: "$orderItems.totalCost"
            }
        },
        totalPrice: {
            $sum: "$orderItems.totalCost"
        }
    }
    const result = await Order.aggregate()
        .unwind("$orderItems")
        .lookup(lookup)
        .unwind("$coffeeDetails")
        .project(projection)
        .group(group)
        .exec()

    return res.status(201).send(result)
}

const updateOrderClientName = async (req, res) => {
    const {id} = req.params
    const {clientName} = req.body
    const {modifiedCount, matchedCount} = await Order.updateOne({'_id': id}, {$set: {clientName: clientName}}, null);
    if (modifiedCount === 0) {
        return res.status(404).send({error: "Order not update"})
    } else if (matchedCount === 0) {
        return res.status(404).send({error: "Order not found"})
    }

    return res.status(200).send({})


}

const addMoreItems = async (req, res) => {
    const {id} = req.params
    const {coffeeId, quantity} = req.body
    const {matchedCount} = await Order.updateOne({'_id': id}, {
        $push: {
            orderItems: {
                coffeeId: coffeeId,
                quantity: quantity
            }
        }
    }, null);

    if (matchedCount === 0) {
        return res.status(404).send({error: "Order not found"});
    }
    return res.status(200).send({})
}

const deleteOrderItems = async (req, res) => {

    const {id} = req.params
    const {coffeeIds} = req.body

    const {modifiedCount, matchedCount} = await Order.updateOne(
        {'_id': id},
        {$pull: {orderItems: {coffeeId: {$in: coffeeIds}}}},
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

    const {id} = req.params;
    const {coffeeId, quantity} = req.body
    const filter = {'_id': id, 'orderItems.coffeeId': coffeeId}
    const update = {$set: {'orderItems.$.quantity': quantity}}
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