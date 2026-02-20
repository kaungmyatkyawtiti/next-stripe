import * as dotenv from "dotenv";

dotenv.config({ path: ".env.local" });

export const dbUrl = process.env.DATABASE_URL!;
export const resendApiKey = process.env.RESEND_API_KEY!;
export const resendEmail = process.env.RESEND_TO_EMAIL!;
