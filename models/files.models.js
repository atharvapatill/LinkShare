import mongoose from "mongoose";

const fileSchema = mongoose.Schema({
    filename:{
        type:String,
        required:true
    },
    path:{
        type:String,
        required:true
    },
    size:{
        type:Number,
        required:true
    },
    uuid:{
        type:String,
        required:true
    },
    expiresAt: {
      type: Date,
      required: true
    }
},{timestamps:true})

export const Files = mongoose.model("files",fileSchema);