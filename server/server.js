import express from "express";
import cors from "cors";
import { PORT } from "./config/dotenv.js";
import connectDB from "./config/db.js";
import authRoute from "./routes/userAuthRoute.js";
import transectionRoute from "./routes/transectionRoute.js";
import adminRoutes from "./routes/adminRoute.js";

const app = express();
// middleware...
app.use(express.json());
const allowedOrigins = [
  'http://localhost:5173',
];

app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    } else {
      return callback(new Error('Not allowed by CORS'));
    }
  }
}));
app.use(express.urlencoded({ extended: true }));
// connected database..
connectDB();
app.use("/uploads", express.static("uploads"));

// Routing...
app.use("/auth", authRoute);
app.use("/admin", adminRoutes);
app.use("/transaction", transectionRoute);
app.listen(PORT, () => {
  console.log(`✅ Server is running on ${PORT}`);
});
