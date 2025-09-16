import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { getZodiacSign } from "../utils/zodiac.js";
import { body, validationResult } from "express-validator";

// Validation middleware for registration
export const validateRegistration = [
  body("email").isEmail().withMessage("Enter a valid email"),
  body("name").notEmpty().withMessage("Name is required"),
  body("password").isLength({ min: 6 }).withMessage("Password must be at least 6 characters long"),
  body("birthdate").isISO8601().toDate().withMessage("Enter a valid birthdate in YYYY-MM-DD format"),
];

export const registerUser = asyncHandler(async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    throw new ApiError(400, "Validation failed", errors.array());
  }

  const { name, email, password, birthdate } = req.body;

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new ApiError(409, "User with this email already exists");
  }

  const zodiacSign = getZodiacSign(new Date(birthdate));

  const user = await User.create({
    name,
    email,
    password,
    birthdate,
    zodiacSign,
  });

  const createdUser = await User.findById(user._id).select("-password");

  if (!createdUser) {
    throw new ApiError(500, "Something went wrong while registering the user");
  }

  return res.status(201).json(new ApiResponse(201, createdUser, "User registered successfully"));
});

export const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    throw new ApiError(400, "Email and password are required");
  }

  const user = await User.findOne({ email });
  if (!user) {
    throw new ApiError(404, "User not found");
  }

  const isPasswordValid = await user.isPasswordCorrect(password);
  if (!isPasswordValid) {
    throw new ApiError(401, "Invalid credentials");
  }

  const token = user.generateAuthToken();

  const loggedInUser = await User.findById(user._id).select("-password");

  return res.status(200).json(new ApiResponse(200, { user: loggedInUser, token }, "User logged in successfully"));
});
