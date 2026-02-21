"use server";

import { headers } from "next/headers";
import { auth } from "../auth";
import { redirect } from "next/navigation";
import { SignInValues, SignUpValues, UpdateEmailValues, UpdatePasswordValues, UpdateProfileValues } from "@/types";
import { cache } from "react";

export const signUpAction = async (values: SignUpValues) => {
  const { name, email, password } = values;

  return auth.api.signUpEmail({
    body: {
      name,
      email,
      password,
      callbackURL: "/email-verified"
    }
  })
}

export const signInAction = async (values: SignInValues) => {
  const { email, password, rememberMe } = values;

  return auth.api.signInEmail({
    body: {
      email,
      password,
      rememberMe,
      callbackURL: "/dashboard"
    }
  })
}

export const signOutAction = async () => {
  return auth.api.signOut({
    headers: await headers()
  });
}

export const verifySessionAction = cache(async () => {
  console.log("getServerSession");

  return auth.api.getSession({
    headers: await headers()
  })
})

export const verifyEmail = async (email: string) => {
  return auth.api.sendVerificationEmail({
    body: {
      email,
      callbackURL: "/email-verified",
    }
  });
}

export const requestPasswordResetAction = async (email: string) => {
  return auth.api.requestPasswordReset({
    body: {
      email,
      redirectTo: "/reset-password"
    }
  });
}

export const resetPasswordAction = async (
  newPassword: string,
  token: string,
) => {
  return auth.api.resetPassword({
    body: {
      newPassword,
      token,
    }
  });
}

export const signInSocialAction = async (
  provider: "github" | "google",
  redirectTo: string | null,
) => {
  const { url } = await auth.api.signInSocial({
    body: {
      provider,
      callbackURL: redirectTo ?? "/dashboard"
    }
  });

  if (url) {
    redirect(url);
  }
}

export const updateProfileAction = async (values: UpdateProfileValues) => {
  const { name, image } = values;

  return auth.api.updateUser({
    headers: await headers(),
    body: {
      name,
      image,
    }
  });
}

export const updateEmailAction = async (values: UpdateEmailValues) => {
  const { newEmail } = values;

  return auth.api.changeEmail({
    headers: await headers(),
    body: {
      newEmail,
      callbackURL: "/email-verified"
    }
  });
}

export const updatePasswordAction = async (values: UpdatePasswordValues) => {
  const { currentPassword, newPassword } = values;

  return auth.api.changePassword({
    headers: await headers(),
    body: {
      currentPassword,
      newPassword,
      revokeOtherSessions: true
    }
  });
}

export const logoutEverywhereAction = async () => {
  return auth.api.revokeSessions({
    headers: await headers()
  });
}
