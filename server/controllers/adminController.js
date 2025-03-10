import User from "../models/User.js";

// @Get All Users
// @method Get
// @endPoint admin/users
export const getUser = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json({ message: "User retrieve successfully", users });
  } catch (error) {
    res.status(400).json({ message: "User retrieve error", Error: error });
  }
};

// @Block User
// @method put
// @endPoint admin/user/block/:id

export const blockUser = async (req, res) => {
  const { id } = req.params.id;
  try {
    const user = await User.findById(id);
    if (!user) {
      return res.status(400).json({ message: "User Not Founnd" });
    }
    user.isBlocked = true;
    await user.save();
    res.status(200).json({ message: "User Block Successfully", user });
  } catch (error) {
    res.status(400).json({ message: "User Block Successfully", Error: error });
  }
};
