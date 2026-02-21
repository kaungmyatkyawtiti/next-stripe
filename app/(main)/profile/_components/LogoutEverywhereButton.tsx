"use client";

import { LoadingButton } from "@/components/LoadingButton";
import { logoutEverywhereAction } from "@/lib/actions/auth-action";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

export function LogoutEverywhereButton() {
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const handleLogoutEverywhere = async () => {
    setLoading(true);

    try {
      await logoutEverywhereAction();
      toast.success("Logged out from all devices");
      router.push("/sign-in");
    } catch (err) {
      console.log("Logout everywhere error", err);
      const errMsg = err instanceof Error
        ? err.message
        : "Failed to log out everywhere";
      toast.error(errMsg);
    } finally {
      setLoading(false);
    }
  }

  return (
    <LoadingButton
      variant="destructive"
      onClick={handleLogoutEverywhere}
      loading={loading}
      className="w-full"
    >
      Log out everywhere
    </LoadingButton>
  );
}
