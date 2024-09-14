const CoffeeValidation = require("../Validations/Coffee.validation");
const Coffee = require("../Models/Coffee.model");

const addCoffee = async (req, res) => {
    try {
        const {error} = CoffeeValidation.validate(req.body);
        if (error) {
            return res.status(400).send({
                error: error.details[0].message
           })
        }
        const test = await Coffee.create(req.body, null)
        res.status(201).send(test)
    } catch (err) {
        res.status(500).send(err.message)
    }
}

module.exports = {addCoffee}