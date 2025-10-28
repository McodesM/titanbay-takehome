import dotenv from "dotenv";
dotenv.config();

export const PORT = process.env.PORT || 3000;
export const DATABASE_URL = process.env.DATABASE_URL || "";
export const POSTGRES_USER = process.env.POSTGRES_USER || "postgres";
export const POSTGRES_PASSWORD = process.env.POSTGRES_PASSWORD || "postgres";
export const POSTGRES_DB = process.env.POSTGRES_DB || "appdb";
export const POSTGRES_PORT = Number(process.env.DB_PORT) || 5432;
export const POSTGRES_HOST = process.env.DB_HOST || "localhost";