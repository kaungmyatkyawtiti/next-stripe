import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

export default function AuthLayout({ children }: Props) {
  return (
    <main className="flex min-h-svh items-center justify-center px-4">
      {children}
    </main>
  );
}
