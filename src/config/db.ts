import mongoose from "mongoose";
import config from "./index.ts";

const connectDB = async () => {
	try {
		const conn = await mongoose.connect(config.mongoURI!);
		console.log(`MongoDB Connected: ${conn.connection.host}`);
	} catch (error) {
		console.error(`Error connecting to MongoDB: ${error}`);
		process.exit(1);
	}
};

export default connectDB;
