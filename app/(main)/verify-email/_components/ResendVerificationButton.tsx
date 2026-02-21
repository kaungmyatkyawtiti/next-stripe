"use client";

import { LoadingButton } from "@/components/LoadingButton";
import { verifyEmail } from "@/lib/actions/auth-action";
import { useState } from "react";

export function ResendVerificationButton({ email, }: { email: string }) {
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const resendVerificationEmail = async () => {
    setIsLoading(true);

    try {
      await verifyEmail(email);
      setSuccess("Verification email sent successfully");
    } catch (err) {
      console.log("Verify email error", err);
      const errMsg = err instanceof Error
        ? err.message
        : "Something went wrong";
      setError(errMsg)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="space-y-4">
      {success && (
        <div role="status" className="text-sm text-green-600">
          {success}
        </div>
      )}
      {error && (
        <div role="alert" className="text-sm text-red-600">
          {error}
        </div>
      )}

      <LoadingButton
        onClick={resendVerificationEmail}
        className="w-full"
        loading={isLoading}
      >
        Resend verification email
      </LoadingButton>
    </div>
  );
}
