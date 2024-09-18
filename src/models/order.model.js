const mongoose = require('mongoose');
const orderItemsSchema = new mongoose.Schema(
    {
        CoffeeId: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'coffee'
        },
        Quantity: {
            type: Number,
            required: true
        }
    }
)

const orderSchema = new mongoose.Schema({
    ClientName: {
        type: String,
        required: true,
    },

    OrderItems: {
        type: [orderItemsSchema],
        required: true
    },

    OrderDate: {
        type: Date,
        default: Date.now,
    },
})

module.exports = mongoose.model("Order", orderSchema)