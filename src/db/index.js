const mongoose = require('mongoose');


const connectDB = async () => {
  try {
    const conn= await mongoose.connect(`mongodb+srv://sinhaarnabh888:Arnabh@cluster0.rixkb92.mongodb.net/PaymentGateway` )
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;
