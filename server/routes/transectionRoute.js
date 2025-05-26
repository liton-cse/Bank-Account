import express from "express";
import {
  deposit,
  withdrow,
  transactionHistory,
  transfer,
  resetBalance,
  latestHistory,
} from "../controllers/transactionController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";
const router = express.Router();

router.post("/deposit", authMiddleware, deposit);
router.post("/withdrow", authMiddleware, withdrow);
router.post("/transfer", authMiddleware, transfer);
router.get("/history", authMiddleware, transactionHistory);
router.delete("/reset", authMiddleware, resetBalance);
router.get("/latest-history", authMiddleware, latestHistory);

export default router;
