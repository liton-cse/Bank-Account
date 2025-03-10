import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
      minlength: [3, "Minimum 3 character is require"],
    },
    email: {
      type: String,
      unique: true,
      required: [true, "Email is required"],
      trim: true,
      match: [/^\S+@\S+\.\S+$/, "Please enter a valid email address"],
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [6, "Minimum length is 6 character00"],
    },
    balance: {
      type: Number,
      default: 0,
      min: [0, "Balance can not be nagetive"],
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
  },
  { timestamps: true }
);
const User = mongoose.model("User", UserSchema);
export default User;
