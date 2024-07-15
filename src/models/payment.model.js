const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema({
  amount: {
    type: Number,
    required: true,
  },
  currency: { 
    type: String, 
    required: true 
},
  status: {
    type: String,
    enum: ["created", "processed", "refunded"],
    default: "created",
  },
  transactionId: String,
  paymentType: {
    type: String,
    enum: ["Credit Card", "Debit Card", "Digital Wallet", "Other"],
    required: true,
  },
 
},{timestamps:true});

const Payment = mongoose.model("Payment", paymentSchema);

module.exports = Payment;
