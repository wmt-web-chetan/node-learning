import mongoose, { Schema } from "mongoose";

const userSchema = new Schema(
  {
    userName: {
      Type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true
    },
    email: {
      Type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    password: {
      Type: String,
      required: true,
    },

    fullName: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    contactNumber: {
      Type: Number,
      required: true,
    },
  },
  { timestamps: true }
);
export const User = mongoose.model("User", userSchema);
