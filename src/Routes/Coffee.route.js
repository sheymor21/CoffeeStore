const express = require('express');
const router = express.Router();
const {addCoffee} = require('../Controllers/Coffee.controller');


router.post('/', addCoffee)

module.exports = router;