import bcrypt from "bcrypt";
import { generateAccessToken, generateRefreshToken } from "../Utils/generateToken.js";
import { UserSchema } from "../models/User.models.js";
import { AdminSchema } from "../models/Admin.models.js";


export const Signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Check if email already exists
    if (await UserSchema.findOne({ email })) {
      return res.status(400).json({ message: "Email already exists" });
    }

    // Check if username already exists
    if (await UserSchema.findOne({ name })) {
      return res.status(400).json({ message: "Username already exists" });
    }

    // Hash the password securely
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await AdminSchema.create({ name, email, password: hashedPassword, });

    return res.status(201).json({
      message: "User Signuped successfully",
      user: { id: user._id, name: user.name, email: user.email },

    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Error occurred", error: error });
  }
};

export const Login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Find user by email
    const user = await AdminSchema.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Check if password is correct
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid password" });
    }

    const accessToken = generateAccessToken(user?._id);

    const refreshToken = generateRefreshToken(user?._id);

    res.cookie("authToken", accessToken, {
      httpOnly: true,
      secure: false,
      maxAge: 60 * 60 * 1000,
    });


    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: false,
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });


    return res.status(200).json({
      message: "Login successful",
      user: { id: user._id, userName: user.userName, email: user.email },
    });

  } catch (error) {
    res.status(500).json({ message: "An error occurred", error: error.message });
  }
};
