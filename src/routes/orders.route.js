const express = require('express');
router = express.Router();
const OrderRoutes = require('../controllers/order.controller');

router.get('/', OrderRoutes.getOrder);
router.post('/', OrderRoutes.addOrder);
router.put('/:id', OrderRoutes.updateOrderClientName);
router.delete('/:id', OrderRoutes.deleteOrder);
router.post('/items/:id', OrderRoutes.addMoreItems);
router.delete('/items/:id', OrderRoutes.deleteOrderItems);
router.put('/items/:id', OrderRoutes.updateOrderItems);
module.exports = router;