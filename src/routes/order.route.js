const express = require('express');
router = express.Router();
const OrderRoutes = require('../controllers/order.controller');

router.get('/', OrderRoutes.getOrder);
router.post('/', OrderRoutes.addOrder);
router.post('/item/:id', OrderRoutes.addMoreItems);
router.delete('/item/:id', OrderRoutes.deleteOrderItems);
router.put('/item/:id', OrderRoutes.updateOrderItems);
router.put('/:id', OrderRoutes.updateOrderClientName);
router.delete('/:id', OrderRoutes.deleteOrder);
module.exports = router;