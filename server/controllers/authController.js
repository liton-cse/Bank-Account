import User from "../models/User.js";
import Transaction from "../models/Transaction.js"
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { SECRET_KEY } from "../config/dotenv.js";

// @Register the user:
// Route API
export const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ messgae: "All fields are required" });
    }
    const avatar = req.file?.filename;
    if (!avatar) {
      return res.status(400).json({ messgae: "image is require required" });
    }
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User Already Exist" });
    }

    const hassPassword = await bcrypt.hash(password, 10);
    const user = new User({ name, email, password: hassPassword, avatar });
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
      { expiresIn: "5h" }
    );
    return res.status(201).json({ message: "User Login Successfully", token });
  } catch (error) {
    return res.status(500).json({ message: "User not Login" });
  }
};

export const UserInformation = async (req, res) => {
  try {
    // Find user by ID (excluding password)
    const user = await User.findById(req.user._id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const lastDeposit = await Transaction.findOne({
      userId: req.user._id,
      type: "deposit",
    })
      .sort({ createdAt: -1 }) // Sort by newest
      .limit(1);

    const lastWithdrow = await Transaction.findOne({
      userId: req.user._id,
      type: "withdrow"
    })
      .sort({ createdAt: -1 }) // Sort by newest
      .limit(1);

    const lastTransfer = await Transaction.findOne({
      userId: req.user._id,
      type: "transfer"
    })
      .sort({ createdAt: -1 }) // Sort by newest
      .limit(1);
    res.status(200).json({ success: true, user, lastDeposit, lastWithdrow, lastTransfer });


  } catch (err) {
    res.status(500).json({ messag: "internal server error" });
  }
}
