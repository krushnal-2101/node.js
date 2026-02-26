import mongoose from "mongoose";

async function connectDB(){
    try{
        const connect = await mongoose.connect(
            process.env.MONGO.URI
        )
    }catch(error){
        throw new Error(error.massage.env)
    }
}

export default connectDB