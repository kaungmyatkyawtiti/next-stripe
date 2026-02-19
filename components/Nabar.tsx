import Image from "next/image";
import Link from "next/link";
import { UserDropdown } from "./UserDropdown";

export default function Navbar() {
  return (
    <header className="bg-background border-b">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <Link
          href="/"
          className="flex items-center gap-2 font-semibold"
        >
          <Image
            src="/coding_in_flow_logo.jpg"
            alt="Coding in Flow logo"
            width={32}
            height={32}
            className="border-muted rounded-full border"
          />
          Next-Stripe
        </Link>
        <div className="flex items-center gap-2">
          <UserDropdown />
        </div>
      </div>
    </header>
  );
}
