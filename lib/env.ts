import * as dotenv from "dotenv";

dotenv.config({ path: ".env.local" });

export const dbUrl = process.env.DATABASE_URL!;
