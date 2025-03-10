import User from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { SECRET_KEY } from "../config/dotenv.js";

// @Register the user:
// Route API
export const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    console.log(name, email, password);
    if (!name || !email || !password) {
      return res.status(400).json({ messgae: "All fields are required" });
    }
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User Already Exist" });
    }

    const hassPassword = await bcrypt.hash(password, 10);
    const user = new User({ name, email, password: hassPassword });
    await user.save();
    return res.status(200).json({ messag: "User Register Successfully" });
  } catch (error) {
    console.log(error.messag);
    return res.status(500).json({ message: "Internal server Error" });
  }
};

//login the user
// Login API

export const Login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }
    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      return res.status(400).json({ message: "User are not registered" });
    }
    const isMatchPassword = await bcrypt.compare(
      password,
      existingUser.password
    );
    if (!isMatchPassword) {
      return res.status(400).json({ message: "Invalid password" });
    }

    const token = jwt.sign(
      { userId: existingUser._id, role: existingUser.role },
      SECRET_KEY,
      { expiresIn: "1h" }
    );
    return res.status(201).json({ message: "User Login Successfully", token });
  } catch (error) {
    return res.status(500).json({ message: "User not Login" });
  }
};
