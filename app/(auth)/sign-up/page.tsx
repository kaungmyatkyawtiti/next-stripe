import type { Metadata } from "next";
import { SignUpForm } from "./_components/SignUpForm";

export const metadata: Metadata = {
  title: "Sign up",
};

export default function SignUp() {
  return <SignUpForm />
}
