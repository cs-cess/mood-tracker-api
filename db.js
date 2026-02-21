import mysql from "mysql2/promise";
import dotenv from "dotenv";
dotenv.config();

// This one line replaces all four variables above
export const db = mysql.createPool(process.env.DATABASE_URL);