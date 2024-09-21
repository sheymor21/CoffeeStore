const Coffee = require("../models/coffee.model");

const addCoffee = async (req, res) => {
    try {
        const coffee = await Coffee.create(req.body, null)
        return res.status(201).send(coffee)
    } catch (e) {
        return res.status(500).send({error: e.message})
    }
}

const getCoffee = async (req, res) => {
    try {
        const projection = {_id: 1, name: 1, type: 1, size: 1, ingredients: 1, price: 1}
        const coffeeList = await Coffee.find({}, projection, null);
        return res.status(200).send(coffeeList);
    } catch (e) {
        return res.status(500).send({error: e.message})
    }
}

const updateCoffee = async (req, res) => {
    const {id} = req.params;
    const {modifiedCount, matchedCount} = await Coffee.updateOne({'_id': id}, {$set: req.body}, null);

    if (modifiedCount === 0) {
        return res.status(404).send({error: "Coffee not update"})
    } else if (matchedCount === 0) {
        return res.status(404).send({error: "Coffee not found"})
    }
    return res.status(200).send({});

}

const deleteCoffee = async (req, res) => {
    const {id} = req.params
    const deleteConfirmation = await Coffee.findByIdAndDelete(id, null);
    if (!deleteConfirmation) {
        return res.status(404).send({
            error: "Coffee not found"
        })
    }
    return res.status(200).send({});

}

module.exports = {addCoffee, getCoffee, updateCoffee, deleteCoffee}