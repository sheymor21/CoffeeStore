const mongoose = require('mongoose');
const orderItemsSchema = new mongoose.Schema(
    {
        coffeeId: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'coffee'
        },
        quantity: {
            type: Number,
            required: true
        }
    }
)

const orderSchema = new mongoose.Schema({
    clientName: {
        type: String,
        required: true,
    },

    orderItems: {
        type: [orderItemsSchema],
        required: true
    },

    orderDate: {
        type: Date,
        default: Date.now,
    },
})

module.exports = mongoose.model("Order", orderSchema)