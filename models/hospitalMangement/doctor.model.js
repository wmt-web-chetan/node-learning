import mongoose,{Schema} from "mongoose";

const doctorSchema = new Schema({
    name:{
        type: String,
        required: true
    },
    age:{
        type: Number,
        required: true
    },
    specialization:{
        type: String,
        required: true
    },
    salaary:{
        type: Number,
        required: true
    },
    qualification:{
        type: String,
        required: true
    },
    experience:{
        type: Number,
        required: true,
        default: 0
    },
    workingInHospitals:[{
        type: Schema.Types.ObjectId,
        ref: "Hospital",
        required: true
    }],
},{timestamps:true});

export const Doctor=mongoose.model("Doctor",doctorSchema);

