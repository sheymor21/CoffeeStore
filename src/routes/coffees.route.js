const express = require('express');
const router = express.Router();
const CoffeeRoutes = require('../controllers/coffee.controller');
/**
 * @swagger
 * tags:
 *  - name: Coffees
 *    description: Endpoints related to Coffee operations
 */

/**
 * @swagger
 * /Coffees:
 *   post:
 *     summary: Add a new coffee
 *     tags: [Coffees]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               type:
 *                  type: string
 *               size:
 *                  type: string
 *               ingredients:
 *                  type: array
 *                  items:
 *                      type: string
 *               price:
 *                  type: number
 *     responses:
 *       201:
 *         description: Coffee added successfully
 *       400:
 *         description: Invalid input
 */
router.post('/', CoffeeRoutes.addCoffee)
/**
 * @swagger
 * /Coffees:
 *   get:
 *     summary: Get all coffee items
 *     tags: [Coffees]
 *     responses:
 *       200:
 *         description: A list of coffee items
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                   name:
 *                     type: string
 *                   type:
 *                      type: string
 *                   size:
 *                      type: string
 *                   ingredients:
 *                     type: array
 *                     items:
 *                          type: string
 *                   price:
 *                     type: number
 */
router.get('/', CoffeeRoutes.getCoffee);
/**
 * @swagger
 * /Coffees/{id}:
 *   put:
 *     summary: Update a coffee item
 *     tags: [Coffees]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               type:
 *                  type: string
 *               size:
 *                  type: string
 *               ingredients:
 *                  type: array
 *                  items:
 *                      type: string
 *               price:
 *                  type: number
 *     responses:
 *       200:
 *         description: Coffee item updated successfully
 *       404:
 *         description: Coffee item not found
 */
router.put('/:id', CoffeeRoutes.updateCoffee);
/**
 * @swagger
 * /Coffees/{id}:
 *   delete:
 *     summary: Delete a coffee item
 *     tags: [Coffees]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Coffee item deleted successfully
 *       404:
 *         description: Coffee item not found
 */
router.delete('/:id', CoffeeRoutes.deleteCoffee);

module.exports = router;