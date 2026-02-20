"use server";

import { headers } from "next/headers";
import { auth } from "../auth";
import { redirect } from "next/navigation";
import { SignInValues, SignUpValues } from "@/types";
import { cache } from "react";

export const signUpAction = async (values: SignUpValues) => {
  const { name, email, password } = values;

  try {
    return await auth.api.signUpEmail({
      body: {
        name,
        email,
        password,
        callbackURL: "/email-verified"
      }
    })
  } catch (err) {
    console.log("SignUp action error", err);
    throw err;
  }
}

export const signInAction = async (values: SignInValues) => {
  const { email, password, rememberMe } = values;

  try {
    return await auth.api.signInEmail({
      body: {
        email,
        password,
        rememberMe,
        callbackURL: "/dashboard"
      }
    })
  } catch (err) {
    console.log("SignIn action error", err);
    throw err;
  }
}

export const signOutAction = async () => {
  try {
    return await auth.api.signOut({
      headers: await headers()
    });
  } catch (err) {
    console.log("SignOut action error", err)
    throw err;
  }
}

export const verifySessionAction = cache(async () => {
  console.log("getServerSession");

  return await auth.api.getSession({
    headers: await headers()
  })
})

export const verifyEmail = async (email: string) => {
  try {
    return await auth.api.sendVerificationEmail({
      body: {
        email,
        callbackURL: "/email-verified",
      }
    });
  } catch (err) {
    throw err;
  }
}

export const requestPasswordResetAction = async (email: string) => {
  try {
    return await auth.api.requestPasswordReset({
      body: {
        email,
        redirectTo: "/reset-password"
      }
    });
  } catch (err) {
    throw err;
  }
}

export const resetPasswordAction = async (
  newPassword: string,
  token: string,
) => {
  try {
    return await auth.api.resetPassword({
      body: {
        newPassword,
        token,
      }
    });
  } catch (err) {
    throw err;
  }
}

// export const signInSocial = async (provider: "github" | "google") => {
//   const { url } = await auth.api.signInSocial({
//     body: {
//       provider,
//       callbackURL: "/dashboard"
//     }
//   });
//
//   if (url) {
//     redirect(url);
//   }
// }
