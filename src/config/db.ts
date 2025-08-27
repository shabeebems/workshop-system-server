import mongoose from "mongoose";

const connectDB = async () => {
    try {
        console.log(' DB Connection - MONGO_URI value:', process.env.MONGO_URI ? 'EXISTS' : 'UNDEFINED');
        console.log(' DB Connection - Attempting connection...');
        await mongoose.connect(process.env.MONGO_URI as string);
        console.log(' MongoDB connected');
    } catch (error) {
        console.error(' MongoDB connection failed:', error);
    }
};

export default connectDB;