"use client";

import { LoadingButton } from "@/components/LoadingButton";
import { Card, CardContent } from "@/components/ui/card";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input";
import { requestPasswordResetAction } from "@/lib/actions/auth-action";
import { forgotPasswordSchema } from "@/lib/validation";
import { ForgotPasswordValues } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";

export function ForgotPasswordForm() {
  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const defaultValues = {
    email: "",
  }

  const form = useForm<ForgotPasswordValues>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues,
  });

  const onSubmit: SubmitHandler<ForgotPasswordValues> = async ({ email }) => {
    console.log("Submit forgot password", email);

    try {
      await requestPasswordResetAction(email);
      setSuccess("If an account exists for this email, we've sent a password reset link.")
    } catch (err) {
      console.log("Request password reset error", err);
      const errMsg = err instanceof Error ? err.message : "Something went wrong";
      setError(errMsg);
    } finally {
      form.reset(
        defaultValues,
        { keepErrors: true }
      )
    }
  }

  const loading = form.formState.isSubmitting;

  return (
    <Card className="mx-auto w-full max-w-md">
      <CardContent>
        <form
          id="forgot-password-form"
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-4"
        >
          <FieldGroup>
            <Controller
              name="email"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor={field.name}>Email</FieldLabel>
                  <Input
                    {...field}
                    id={field.name}
                    aria-invalid={fieldState.invalid}
                    placeholder="example@email.com"
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
              form="forgot-password-form"
              type="submit"
              className="w-full"
              loading={loading}
            >
              Send reset link
            </LoadingButton>
          </FieldGroup>
        </form>
      </CardContent>
    </Card >
  );
}
