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
  const result = await resend.emails.send({
    from: "Next Stripe Example <onboarding@resend.dev>",
    to,
    subject,
    text,
  })

  console.log("Send email result", result);
}
