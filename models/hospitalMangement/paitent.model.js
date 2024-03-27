import mongoose,{Schema} from "mongoose";

const paitentSchema = new Schema({
    name:{
        type: String,
        required: true
    },
    age:{
        type: Number,
        required: true
    },
    diagonesdWith:{
        type: String,
        required: true
    },
    admittedOn:{
        type: Date,
        required: true
    },
    address:{
        type: String,
        required: true
    },
    bloodGroup:{
        type: String,
        required: true,
        enum: ["A+","A-","B+","B-","O+","O-","AB+","AB-"]
    },
    gender:{
        type: String,
        required: true,
        enum: ["M","F","O"]
    },
    admittedIn:{
        type: Schema.Types.ObjectId,
        ref: "Hospital",
        required: true
    },
    
    
    
},{timestamps: true});

export const Paitent=mongoose.model("Paitent",paitentSchema);