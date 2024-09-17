const mongoose = require('../database/connection.js');

const CoffeeSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },
        type: {
            type: String,
            required: true
        },
        size: {
            type: String,
            required: true
        },
        ingredients: {
            type: [String],
            required: true
        },
        price: {
            type: Number,
            required: true
        }
    },
    {
        timestamps: true
    }
)

const Coffee = mongoose.model('Coffee', CoffeeSchema);
module.exports = Coffee;