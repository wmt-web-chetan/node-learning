import mongoose,{Schema} from "mongoose";

const hospitalSchema = new Schema({
    name:{
        type: String,
        required: true
    },

    address:{
        type: String,
        required: true
    },
    contact:{
        type: String,
        required: true
    },
},{timestamps:true});

export const Hospital=mongoose.model("Hospital",hospitalSchema);