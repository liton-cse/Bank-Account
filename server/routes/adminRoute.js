import express from "express";
import { getUser, blockUser } from "../controllers/adminController.js";
import adminMiddleware from "../middlewares/adminMIddleware.js";

const router = express.Router();

router.get("/users", adminMiddleware, getUser);
router.put("user/block/:id", adminMiddleware, blockUser);

export default router;
