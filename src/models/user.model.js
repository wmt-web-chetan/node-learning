import mongoose, { Schema } from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    trim: true,
    index: true,
    lowercase: true,
    unique: true,
  },
  fullName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  watchHistory: [
    {
      type: Schema.Types.ObjectId,
      ref: "Video",
    },
  ],

  refreshToken: {
    type: String,

  },
  avatar: {
    type: String,
    required: true,
  },
  coverImage: {
    type: String,
  },
},{timestamps:true});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  this.password =await bcrypt.hash(this.password, 10);
  next();
});

userSchema.methods.isPasswordCorrect = async function (password) {
  return await bcrypt.compare(password, this.password);
};

userSchema.methods.generateAccessToken = function () {
  return jwt.sign(
    {
      _id: this._id
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: '1d',
    }
  );
};
userSchema.methods.generateRefreshToken = function () {
  return jwt.sign(
    {
      _id: this._id,
    },
    process.env.REFRESH_TOKEN_SECRET,
    {
      expiresIn: '7d'
    }
  );
};
export const User = mongoose.model("User", userSchema);
