import express from "express";
import { registerUser, Login, UserInformation } from "../controllers/authController.js";
import {upload} from "../service/multer.js";
import {authMiddleware} from "../middlewares/authMiddleware.js";

const router = express.Router();
router.post("/register", upload.single("avatar"), registerUser);
router.post("/login", Login);
router.get(`/userInfo`,authMiddleware,UserInformation);

export default router;
