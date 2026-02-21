import { verifySessionAction } from "@/lib/actions/auth-action";
import { redirect } from "next/navigation";
import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

export default async function AuthLayout({ children }: Props) {
  const session = await verifySessionAction()

  if (session) {
    redirect("/dashboard")
  }

  return (
    <main className="flex min-h-svh items-center justify-center px-4">
      {children}
    </main>
  );
}
