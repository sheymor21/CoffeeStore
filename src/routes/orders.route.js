const express = require('express');
router = express.Router();
const OrderRoutes = require('../controllers/order.controller');


/**
 * @swagger
 * tags:
 * - name: Orders
 *   description: Endpoints related to Orders operations
 */


/**
 * @swagger
 * /orders:
 *   get:
 *     summary: Retrieve a list of orders
 *     tags: [Orders]
 *     responses:
 *       200:
 *         description: A list of orders
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                     description: The order ID
 *                     example: 60d0fe4f5311236168a109ca
 *                   clientName:
 *                     type: string
 *                     description: Name of the customer
 *                     example: Jane Doe
 *                   orderItems:
 *                     type: array
 *                     description: List of items in the order
 *                     items:
 *                       type: object
 *                       properties:
 *                         coffeeId:
 *                           type: string
 *                           description: The ID of the item
 *                           example: 98765
 *                         quantity:
 *                           type: integer
 *                           description: Quantity of the item
 *                           example: 2
 */
router.get('/', OrderRoutes.getOrder);

/**
 * @swagger
 * /orders:
 *   post:
 *     summary: Add a new order
 *     tags: [Orders]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - clientName
 *               - orderItems
 *             properties:
 *               clientName:
 *                 type: string
 *                 description: Name of the customer
 *                 example: John Smith
 *               orderItems:
 *                 type: array
 *                 description: List of items in the order
 *                 items:
 *                   type: object
 *                   properties:
 *                     coffeeId:
 *                       type: string
 *                       description: The ID of the coffee
 *                       example: 12345
 *                     quantity:
 *                       type: integer
 *                       description: Quantity of the item
 *                       example: 1
 *     responses:
 *       201:
 *         description: Order created successfully

 */
router.post('/', OrderRoutes.addOrder);

/**
 * @swagger
 * /orders/{id}:
 *   put:
 *     summary: Update the client name of an order
 *     tags: [Orders]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The order ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               clientName:
 *                 type: string
 *                 description: The new client name
 *                 example: Michael Johnson
 *     responses:
 *       200:
 *         description: Order's client name updated successfully
 *
 */
router.put('/:id', OrderRoutes.updateOrderClientName);

/**
 * @swagger
 * /orders/{id}:
 *   delete:
 *     summary: Delete an order
 *     tags: [Orders]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The order ID
 *     responses:
 *       200:
 *         description: Order deleted successfully
 *
 */
router.delete('/:id', OrderRoutes.deleteOrder);

/**
 * @swagger
 * /orders/items/{id}:
 *   post:
 *     summary: Add more items to an order
 *     tags: [Orders]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The order ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               coffeeId:
 *                 type: string
 *                 description: The ID of the coffee
 *               quantity:
 *                  type: integer
 *                  description: Quantity of the item
 *                  example: 2
 *
 *     responses:
 *       200:
 *         description: Items added successfully

 */
router.post('/items/:id', OrderRoutes.addMoreItems);

/**
 * @swagger
 * /orders/items/{id}:
 *   delete:
 *     summary: Delete items from an order
 *     tags: [Orders]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The order ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - coffeeIds
 *             properties:
 *               coffeeIds:
 *                 type: array
 *                 description: The ID of the item to delete
 *                 example: [60d0fe4f5311236168a109ca]
 *     responses:
 *       200:
 *         description: Item deleted successfully from the order

 */
router.delete('/items/:id', OrderRoutes.deleteOrderItems);

/**
 * @swagger
 * /orders/items/{id}:
 *   put:
 *     summary: Update items in an order
 *     tags: [Orders]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The order ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - items
 *             properties:
 *               coffeeId:
 *                  type: string
 *                  description: The ID of the item
 *                  example: 12345
 *               quantity:
 *                  type: integer
 *                  description: Quantity of the item
 *                  example: 2

 *     responses:
 *       200:
 *         description: Items updated successfully

 */
router.put('/items/:id', OrderRoutes.updateOrderItems);
module.exports = router;