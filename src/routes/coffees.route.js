const express = require('express');
const router = express.Router();
const CoffeeRoutes = require('../controllers/coffee.controller');


router.post('/', CoffeeRoutes.addCoffee)
router.get('/', CoffeeRoutes.getCoffee);
router.put('/:id', CoffeeRoutes.updateCoffee);
router.delete('/:id', CoffeeRoutes.deleteCoffee);

module.exports = router;