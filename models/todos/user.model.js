import mongoose,{Schema}  from "mongoose";

const userModel=new Schema({
     userName:{
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        unique: true
     },
     fullName:{
        type:String,
        required: true
     },
     email:{
        type:String,
        required: true,
        lowercase: true,
        unique: true

     },
     password:{
        type: String,
        required: [true, "password is required"]
     }
},{timestamps: true})

export const User=mongoose.modell("User",userModel)