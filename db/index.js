import mongoose from "mongoose";
import dotenv from "dotenv"

dotenv.config()

const mongoUrl = process.env.MONGO_URL || 'mongodb://localhost:27017/shop';
mongoose.connect(mongoUrl).then(() => {
	console.log("Connected to Shop DB")
})

export default mongoose