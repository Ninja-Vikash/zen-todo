import mongoose from "mongoose";

const connectDB = async () => {
    try {
        const connectionInstance = await mongoose.connect(
            `${process.env.MONGODB_URI}`
        );
        console.log(
            `MongoDB Database is connected: ${connectionInstance.connection.host}`
        );
    } catch (error) {
        console.log(`Error in database connection ${error}`);
        process.exit(1);
    }
};

export default connectDB;
