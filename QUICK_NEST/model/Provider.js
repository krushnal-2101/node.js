import mongoose, { mongo } from "mongoose";
import { boolean, ref, required } from "joi";

const Provider  = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId(),
        required: "User",
        ref: true,
    },
    service: {
        type: mongoose.Schema.Types.ObjectId(),
        ref: true,
    },
    experience: {
        type: Number,
        default: 0,
    },
    documents: {
        type: String,
        required: true,
    },
    isVarified:{
        type: boolean,
        default: false,
    }
})

export default Provider