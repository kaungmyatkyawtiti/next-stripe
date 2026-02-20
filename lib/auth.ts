import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "./db";
import * as schema from "./db/schema";
import { nextCookies } from "better-auth/next-js";
import { sendEmail } from "./actions/email-send-action";

const { users, accounts, sessions, verifications } = schema;

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "pg",
    usePlural: true,
    schema: {
      users,
      accounts,
      sessions,
      verifications,
    },
  }),
  emailAndPassword: {
    enabled: true,
    // requireEmailVerification: true,
    async sendResetPassword({ user, url }) {
      await sendEmail({
        to: user.email,
        subject: "Reset your password",
        text: `Click the link to reset your password: ${url}`
      })
    }
  },
  emailVerification: {
    sendOnSignUp: true,
    autoSignInAfterVerification: true,
    async sendVerificationEmail({ user, url }) {
      await sendEmail({
        to: user.email,
        subject: "Verify your email",
        text: `Click the link to verify your email: ${url}`
      })
    }
  },
  user: {
    additionalFields: {
      role: {
        type: "string",
        input: false,
      }
    }
  },
  plugins: [nextCookies()]
});

export type Session = typeof auth.$Infer.Session;
export type User = typeof auth.$Infer.Session.user;
