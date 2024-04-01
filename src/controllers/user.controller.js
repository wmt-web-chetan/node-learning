import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/user.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const registerUser = asyncHandler(async (req, res) => {
  const { username, email, password, fullName, coverImage, avatar } = req.body;
  
  if (
    [fullName, password, email, username].some((field) => {
      return field?.trim() === ""; 
    })
  ) {
    throw new ApiError(409, "All the field are compulsory");
  }
  const existingUser=await User.findOne({
    $or:[{username},{email}]
  })

  if(existingUser){
    throw new ApiError(401,"this email or username is already exist")
  }
  const avatarLocalPath = req.files?.avatar?.[0].path;
  const coverImageLocalPath=req.files?.coverImage?.[0].path
  if(!avatarLocalPath){
    throw new ApiError(400, "aVATARFILE IS REQUIRES")
  }
  const user=await User.create({
    fullName,
    avatar:avatarLocalPath,
    coverImage:coverImageLocalPath || "",
    username: username.toLowerCase(),
    password,
    email
    
  })
  const createdUser= await User.findById(user._id).select("-password -refreshToken")
  if(!createdUser){
    throw new ApiError(500,"user not created")
  }

  res.status(201).json(new ApiResponse(201,"User registerd successfully",createdUser))

  
});

export { registerUser };
