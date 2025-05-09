import mongoose from "mongoose";
import { Error } from "mongoose";


const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL)
        console.log("✅ MongoDB connected"); 
    } catch (error) {
        throw new Error("❌ MongoDB connection failed");
    }
}

export default connectDB;