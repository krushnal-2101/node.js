import mongoose from "mongoose";


 const userSchema = mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    email:{
        type: String,
        required: true,
        unique: true,
        trim:true
    },
    password:{
        type:String,
        required:true,
    },
    phone:{
        type:Number,
        required: true,
    },
      roll:{
        type:String,
        enum:["customer", "provider", "admin", "super-main"],
        default:"customer",
    },
    isVerified: {
        type: Boolean,
        default: false,
    }
 },{timeStamp: true})

 const User = mongoose.model("User", userSchema)

 export default User