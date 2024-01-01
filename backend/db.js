const mongoose = require("mongoose");


const connectToMongo = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
     
      useUnifiedTopology: true,
      connectTimeoutMS: 30000, // Set a longer timeout (e.g., 30 seconds)
    });
    

    console.log("Connected to MongoDB successfully!");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
};

module.exports = connectToMongo;
