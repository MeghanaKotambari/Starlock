const { default: mongoose } = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI).then(() => {
      console.log("CONNECTED TO MONGODB");
    });
  } catch (error) {
    console.log("Error connecting to MongoDB", error.message);
  }
};

module.exports = connectDB;
