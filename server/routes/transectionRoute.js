import express from "express";
import {
  deposit,
  withdrow,
  transactionHistory,
  transfer,
} from "../controllers/transactionController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";
const router = express.Router();

router.post("/deposit", authMiddleware, deposit);
router.post("/withdrow", authMiddleware, withdrow);
router.post("/transfer", authMiddleware, transfer);
router.get("/history", authMiddleware, transactionHistory);

export default router;
