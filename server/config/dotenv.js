import dotenv from "dotenv";
dotenv.config();

export const PORT = process.env.PORT || 3030;
export const MONGO_DB_URL = process.env.MONGO_DB_URI;
export const SECRET_KEY = process.env.SECRET_KEY;
