const Payment = require('../models/payment.model.js');

// Create a new payment
const createPayment = async (req, res) => {
  try {
    const { amount, currency, paymentType } = req.body; 
    const payment = new Payment({ amount, currency, paymentType }); 
    await payment.save();
    res.status(201).json(payment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// Process a payment 
const processPayment = async (req, res) => {
  try {
    const payment = await Payment.findById(req.params.id);
    if (!payment) {
      return res.status(404).json({ message: "Payment not found" });
    }
    if (payment.status !== 'created') {
      return res.status(400).json({ message: "Payment cannot be processed" });
    }
    payment.status = 'processed';
    payment.transactionId = `txn_${Math.random().toString(36).substr(2, 9)}`;
    payment.updatedAt = Date.now();
    await payment.save();
    res.json(payment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Retrieve payment status
const getPaymentStatus = async (req, res) => {
  try {
    const payment = await Payment.findById(req.params.id);
    if (!payment) {
      return res.status(404).json({ message: 'Payment not found' });
    }
    res.json(payment.status);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Handle refunds 
const handleRefund = async (req, res) => {
  try {
    const payment = await Payment.findById(req.params.id);
    if (!payment) {
      return res.status(404).json({ message: 'Payment not found' });
    }
    if (payment.status !== 'processed') {
      return res.status(400).json({ message: 'Refund cannot be processed' });
    }
    payment.status = 'refunded';
    payment.updatedAt = Date.now();
    await payment.save();
    res.json(payment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createPayment,
  processPayment,
  getPaymentStatus,
  handleRefund
};
