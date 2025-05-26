import jwt from "jsonwebtoken";
import { SECRET_KEY } from "../config/dotenv.js";
import User from "../models/User.js";

export const authMiddleware = async (req, res, next) => {
  const token = req.header("Authorization")?.split(" ")[1];
  // console.log("Authorization Header:", req.header("Authorization"));
  // console.log("Extracted Token:", token); // Log token to debug
  if (!token) {
    return res.status(401).json({ message: "Unauthorized: No token provided" });
  }

  try {
    // console.log(SECRET_KEY);
    const decoded = jwt.verify(token, SECRET_KEY);
    // console.log("Decoded Token:", decoded); // Log decoded token
    req.user = await User.findById(decoded.userId).select("password");
    // console.log("Authenticated User:", req.user); // Log user data

    if (!req.user) {
      return res.status(401).json({ message: "User not found" });
    }
    next();
  } catch (error) {
    // console.error("Authorization Error:", error);
    res
      .status(401)
      .json({ message: "Invalid or expired token", error: error.message });
  }
};
