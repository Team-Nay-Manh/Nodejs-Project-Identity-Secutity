import { config } from "dotenv";

config({ path: `.env` });
export const {
  PORT,
  SERVER_URL,
  DB_URI,
  JWT_SECRET,
  JWT_EXPIRES_IN,
  CLOUDINARY_SECRET,
  CLOUDINARY_CLOUD_NAME,
  CLOUDINARY_API_KEY,
} = process.env;
