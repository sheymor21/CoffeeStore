const express = require('express');
const router = express.Router();
const {addCoffee, getCoffee, updateCoffee, deleteCoffee} = require('../controllers/coffee.controller');


router.post('/', addCoffee)
router.get('/', getCoffee);
router.put('/:id', updateCoffee);
router.delete('/:id', deleteCoffee);

module.exports = router;