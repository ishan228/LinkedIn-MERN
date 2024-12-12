import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL);
    console.log("MongoDb connected");
  } catch (error) {
    console.log(`Error Connecting to mongodb: ${error}`);
    process.exit(1);
  }
};
