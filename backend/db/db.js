import mongoose from "mongoose";

export const connectDB = async () => {
    try {
        const connection = await mongoose.connect(process.env.MONGO_URI)
        console.log(connection.connection.host)
    } catch (error) {
        console.log(error,"error while connecting database")
    }
}