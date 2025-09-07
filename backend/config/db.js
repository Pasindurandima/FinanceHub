const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const mongoURI = "mongodb://localhost:27017/finance_db"; // Change if needed

    const conn = await mongoose.connect(mongoURI);

    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`❌ MongoDB connection error: ${error.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;
