import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    const dbURI = process.env.MONGO_URI;
    await mongoose.connect(dbURI);
    console.log("Database connected successfully");
  } 
  catch (error) {
    console.error("MongoDB connection error:", error.message);
    process.exit(1); //exit process
  }
};

export default connectDB;
