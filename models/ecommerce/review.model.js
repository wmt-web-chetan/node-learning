import mongoose,{Schema} from "mongoose";

const reviewSchema=new Schema({
    review:{
        type: String,
        required: true
    },
    rating:{
        type: Number,
        required: true
    },
    product:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product"
    },
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }
},{timestamps:true})

export const Review=mongoose.model("Review",reviewSchema)