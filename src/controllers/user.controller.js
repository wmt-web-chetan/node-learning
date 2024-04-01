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
  const existingUser = await User.findOne({
    $or: [{ username }, { email }],
  });

  if (existingUser) {
    throw new ApiError(401, "this email or username is already exist");
  }
  const avatarLocalPath = req.files?.avatar?.[0].path;
  const coverImageLocalPath = req.files?.coverImage?.[0].path;
  if (!avatarLocalPath) {
    throw new ApiError(400, "aVATARFILE IS REQUIRES");
  }
  const user = await User.create({
    fullName,
    avatar: avatarLocalPath,
    coverImage: coverImageLocalPath || "",
    username: username.toLowerCase(),
    password,
    email,
  });
  const createdUser = await User.findById(user._id).select(
    "-password -refreshToken"
  );
  if (!createdUser) {
    throw new ApiError(500, "user not created");
  }

  res
    .status(201)
    .json(new ApiResponse(201, "User registerd successfully", createdUser));
});

// login user
const generateAccessTokenandRefreshToken = async (userId) => {
  try {
    const user = await User.findById(userId);
    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();
    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });
    console.log(accessToken, refreshToken, "token");
    return { accessToken, refreshToken };
  } catch (error) {
    throw new ApiError(500, "error in generating token");
  }
};

const loginUser = asyncHandler(async (req, res) => {
  // get email and password from req.body
  // check if email and password are provided
  // find user by email and password
  // if user not found, throw 401 error
  // generate access token and refresh token
  // set cookie with refresh token
  const { email, password, username } = req.body;
  console.log(email, password, username);
  if (!email || !password) {
    throw new ApiError(400, "Email,Password  are required");
  }
  const user = await User.findOne({ $or: [{ email }, { username }] });
  if (!user) {
    throw new ApiError(404, "invalid email or username");
  }

  const isPasswordCorrect = await user.isPasswordCorrect(password);
  if (!isPasswordCorrect) {
    throw new ApiError(401, "invalid password");
  }
  const { accessToken, refreshToken } =
    await generateAccessTokenandRefreshToken(user._id);

  user.refreshToken = refreshToken;
  await user.save({ validateBeforeSave: false });
  const logedInUser = await User.findById(user._id).select(
    "-password -refreshToken"
  );
  const options = {
    httpOnly: true,
    secure: true,
  };

  return res
    .status(200)
    .cookie("refreshToken", refreshToken, options)
    .cookie("accessToken", accessToken, options)
    .json(
      new ApiResponse(200, "User login successfully", {
        user: logedInUser,
        refreshToken,
        accessToken,
      })
    );
});

// logout user
const logoutUser = asyncHandler(async (req, res) => {
  const user = await User.findByIdAndUpdate(
    req.user._id,
    {
      $set: {
        refreshToken: undefined,
      },
    },
    {
      new: true,
    }
  );

  const option = {
    httpOnly: true,
    secure: true,
  };
  return res
    .status(200)
    .clearCookie("accessToken", option)
    .clearCookie("refreshToken", option)
    .json(new ApiResponse(200, "Logout Successfully"));
});

export { registerUser, loginUser, logoutUser };
