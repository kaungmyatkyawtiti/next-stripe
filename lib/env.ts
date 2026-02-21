import * as dotenv from "dotenv";

dotenv.config({ path: ".env.local" });

export const dbUrl = process.env.DATABASE_URL!;
export const resendApiKey = process.env.RESEND_API_KEY!;
export const resendEmail = process.env.RESEND_TO_EMAIL!;
export const googleClientId = process.env.GOOGLE_CLIENT_ID!;
export const googleClientSecret = process.env.GOOGLE_CLIENT_SECRET!;
export const githubClientId = process.env.GITHUB_CLIENT_ID!;
export const githubClientSecret = process.env.GITHUB_CLIENT_SECRET!;
