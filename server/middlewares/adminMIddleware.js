// admin middleware for authentication.
const adminMiddleware = async (req, res, next) => {
  if (req.user.role !== "admin") {
    return res.status(400).json({ message: "Access Forbidden" });
    next();
  }
};
export default adminMiddleware;
