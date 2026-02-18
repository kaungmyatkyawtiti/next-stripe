import Navbar from "@/components/Nabar";
import { ReactNode } from "react";

export default async function MainLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      {children}
    </div>
  );
}
