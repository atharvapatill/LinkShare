import mongoose from "mongoose";

const connectDB = async()=>{
    try {
        const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}/${process.env.DB_NAME}`)
        console.log(connectionInstance.connection.host)
    } catch (error) {
        console.log("Error while connecting database ", error)
    }
}

export {connectDB}