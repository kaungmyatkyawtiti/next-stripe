"use client";

import { LoadingButton } from "@/components/LoadingButton";
import { PasswordInput } from "@/components/PasswordInput";
import { Card, CardContent } from "@/components/ui/card";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { resetPasswordAction } from "@/lib/actions/auth-action";
import { resetPasswordSchema } from "@/lib/validation";
import { ResetPasswordValues } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";

interface ResetPasswordFormProps {
  token: string;
}

export function ResetPasswordForm({ token }: ResetPasswordFormProps) {
  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const router = useRouter();

  const defaultValues = {
    newPassword: "",
  }

  const form = useForm<ResetPasswordValues>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues,
  });

  const onSubmit: SubmitHandler<ResetPasswordValues> = async ({ newPassword }) => {
    console.log("Submit reset password", newPassword);
    setSuccess(null);
    setError(null);

    try {
      await resetPasswordAction(newPassword, token);
      setSuccess("Password has been reset. You can now sign in.")
      setTimeout(() => router.push("sign-in"), 3000);
    } catch (err) {
      console.log("Reset password error", err);
      const errMsg = err instanceof Error
        ? err.message
        : "Something went wrong";
      setError(errMsg);
    } finally {
      form.reset(defaultValues)
    }
  }

  const loading = form.formState.isSubmitting;

  return (
    <Card className="mx-auto w-full min-w-md">
      <CardContent>
        <form
          id="reset-password-form"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <FieldGroup>
            <Controller
              name="newPassword"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor={field.name}>New Password</FieldLabel>
                  <PasswordInput
                    {...field}
                    id={field.name}
                    aria-invalid={fieldState.invalid}
                    placeholder="Enter new password"
                    autoComplete="off"
                  />
                  {
                    fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )
                  }
                </Field>
              )}
            />
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
              form="reset-password-form"
              type="submit"
              className="w-full"
              loading={loading}
            >
              Reset password
            </LoadingButton>
          </FieldGroup>
        </form>
      </CardContent>
    </Card >
  );
}
