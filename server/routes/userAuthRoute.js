import express from "express";
import { registerUser, Login } from "../controllers/authController.js";

const router = express.Router();
router.post("/register", registerUser);
router.post("/login", Login);

export default router;
