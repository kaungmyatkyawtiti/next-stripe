import type { Metadata } from "next";
import { SignInForm } from "./_components/SignInForm";

export const metadata: Metadata = {
  title: "Sign in",
};

export default function SignIn() {
  return <SignInForm />
}
