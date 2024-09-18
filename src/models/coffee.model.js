const mongoose = require('../database/connection.js');

const coffeeSchema = new mongoose.Schema(
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

const Coffee = mongoose.model('Coffee', coffeeSchema);
module.exports = Coffee;