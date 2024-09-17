const CoffeeValidation = require("../validations/coffee.validation");
const Coffee = require("../models/coffee.model");

const addCoffee = async (req, res) => {
    try {
        const {error} = CoffeeValidation.validate(req.body);
        if (error) {
            return res.status(400).send({
                error: error.details[0].message
            })
        }
        const test = await Coffee.create(req.body, null)
        return res.status(201).send(test)
    } catch (err) {
        return res.status(500).send(err.message)
    }
}

const getCoffee = async (req, res) => {
    try {
        const projection = {_id: 1, name: 1, type: 1, size: 1, ingredients: 1, price: 1}
        const coffeeList = await Coffee.find({}, projection, null);
        return res.status(200).send(coffeeList);
    } catch (e) {
        return res.status(500).send(e.message)
    }
}

const updateCoffee = async (req, res) => {
    const {error} = CoffeeValidation.validate(req.body);
    if (error) {
        return res.status(400).send({
            error: error.details[0].message
        })
    }
    const {id} = req.params;
    const updatedCoffee = await Coffee.findByIdAndUpdate(id, req.body, null);
    if (!updatedCoffee) {
        return res.status(404).send({
            error: "Coffee not found"
        });
    }
    return res.status(200).send('update coffee');

}

const deleteCoffee = async (req, res) => {
    const {id} = req.params
    const deleteConfirmation = await Coffee.findByIdAndDelete(id, null);
    if (!deleteConfirmation) {
        return res.status(404).send({
            error: "Coffee not found"
        })
    }
    return res.status(200).send('deleted coffee');

}

module.exports = {addCoffee, getCoffee, updateCoffee, deleteCoffee}