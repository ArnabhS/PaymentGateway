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
 
},{timestamps:true});

const Payment = mongoose.model("Payment", paymentSchema);

module.exports = Payment;
