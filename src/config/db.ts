import mongoose from "mongoose";

const connectDB = async (): Promise<void> =>{
    try{
        const conn = await mongoose.connect(process.env.MONGO_URI as string);
        console.log(`mongodb connected: ${conn.connection.host}`);
    } catch(error) {
        console.log(`Error: ${(error as Error).message}`);
        process.exit(1);
    }
};


export default connectDB;