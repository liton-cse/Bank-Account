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
app.use(cors());
app.use(express.urlencoded({ extended: true }));
// connected database..
connectDB();

// Routing...
app.use("/auth", authRoute);
app.use("/admin", adminRoutes);
app.use("/transaction", transectionRoute);
app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});
