import mongoose from "mongoose";

async function connectDB()
{
try{

await mongoose.connect("mongodb+srv://<mmaro5584_db_user>:<hyKK1U1bZgk4JMF0>@cluster0.3xqxke3.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
console.log("connecting to mongodb")

}
catch(error)
{
console.log("connection failed");
console.error();

}
}