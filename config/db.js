const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("DB connected successfully");
  } catch (error) {
    console.error("DB connection failed:", error);
    process.exit(1);
  }
};

module.exports = connectDB;
