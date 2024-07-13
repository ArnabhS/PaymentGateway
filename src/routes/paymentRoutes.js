const express = require('express');
const {
  createPayment,
  processPayment,
  getPaymentStatus,
  handleRefund
} = require('../controllers/paymentController');

const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Payment:
 *       type: object
 *       required:
 *         - amount
 *         - currency
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated id of the payment
 *         amount:
 *           type: number
 *           description: The amount of the payment
 *         currency:
 *           type: string
 *           description: The currency of the payment
 *         status:
 *           type: string
 *           description: The status of the payment
 *         transactionId:
 *           type: string
 *           description: The transaction ID of the payment
 *         createdAt:
 *           type: string
 *           format: date
 *           description: The date the payment was created
 *         updatedAt:
 *           type: string
 *           format: date
 *           description: The date the payment was last updated
 *       example:
 *         amount: 100
 *         currency: USD
 *         status: created
 *         transactionId: 123456789
 */

/**
 * @swagger
 * tags:
 *   name: Payments
 *   description: The payments managing API
 */

/**
 * @swagger
 * /api/payments:
 *   post:
 *     summary: Create a new payment
 *     tags: [Payments]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Payment'
 *     responses:
 *       201:
 *         description: The payment was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Payment'
 *       500:
 *         description: Some server error
 */
router.post('/', createPayment);

/**
 * @swagger
 * /api/payments/{id}/process:
 *   post:
 *     summary: Process a payment
 *     tags: [Payments]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The payment id
 *     responses:
 *       200:
 *         description: The payment was successfully processed
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Payment'
 *       404:
 *         description: Payment not found
 *       400:
 *         description: Payment cannot be processed
 *       500:
 *         description: Some server error
 */
router.post('/:id/process', processPayment);

/**
 * @swagger
 * /api/payments/{id}/status:
 *   get:
 *     summary: Retrieve payment status
 *     tags: [Payments]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The payment id
 *     responses:
 *       200:
 *         description: The payment status
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Payment'
 *       404:
 *         description: Payment not found
 *       500:
 *         description: Some server error
 */
router.get('/:id/status', getPaymentStatus);

/**
 * @swagger
 * /api/payments/{id}/refund:
 *   post:
 *     summary: Handle refund
 *     tags: [Payments]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The payment id
 *     responses:
 *       200:
 *         description: The refund was successfully processed
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Payment'
 *       404:
 *         description: Payment not found
 *       400:
 *         description: Refund cannot be processed
 *       500:
 *         description: Some server error
 */
router.post('/:id/refund', handleRefund);

module.exports = router;
