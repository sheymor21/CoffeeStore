const express = require('express');
router = express.Router();
const {addOrder, getOrder} = require('../controllers/order.controller');

router.get('/', getOrder);
router.post('/', addOrder);
module.exports = router;