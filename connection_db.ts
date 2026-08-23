import mongoose from "mongoose";

export async function connectDB() {
  try {
    await mongoose.connect(
    "mongodb+srv://mmaro5584_db_user:hyKK1U1bZgk4JMF0@cluster0.doo2mf8.mongodb.net/products_configs?retryWrites=true&w=majority&appName=Cluster0" );
   console.log("Connected to MongoDB successfully!");
  } 
  catch (error) {
    console.error("Connection failed:", error);
  }
}