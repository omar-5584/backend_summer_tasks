import mongoose from "mongoose";
import "dotenv/config";

export async function connectDB() {
  try {
    const uri = process.env.Mongo_url || process.env.MONGO_URI;
    if (!uri) {
      throw new Error("MongoDB Connection string is not defined in environment variables!");
    }
    await mongoose.connect(uri);
    console.log("Connected to MongoDB successfully!");
  } catch (error) {
    console.error("Connection failed:", error);
  }
}