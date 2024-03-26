import mongoose,{Schema} from "mongoose";

const productSchema=new Schema({
    productName:{
        type: String,
        required: true
    },
    productDescription:{
        type: String,
        required: true
    },
    productPrice:{
        type: Number,
        required: true
    },
    productCategory:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category"
    },
    productImage:{
        type: String,
        required: true
    },
    productQuantity:{
        type: Number,
        required: true
    },
    productRating:{
        type: Number,
        required: true
    },
    productOwner:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    poductReviews:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Review"
        }
    ]

})
 export const Product=mongoose.Schema("Product",productSchema)