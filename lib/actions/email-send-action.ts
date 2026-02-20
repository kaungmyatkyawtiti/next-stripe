"use server";

import { Resend } from "resend"
import { resendApiKey } from "../env";

const resend = new Resend(resendApiKey);

interface sendEmailProps {
  to: string;
  subject: string;
  text: string;
}

export const sendEmail = async ({
  to,
  subject,
  text
}: sendEmailProps) => {
  await resend.emails.send({
    from: "Next Stripe Example <onboarding@resend.dev>",
    to,
    subject,
    text,
  })
}
