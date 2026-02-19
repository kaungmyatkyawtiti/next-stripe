"use server";

import { headers } from "next/headers";
import { auth } from "../auth";
import { redirect } from "next/navigation";
import { SignInValues, SignUpValues } from "@/types";
import { cache } from "react";

export const signUp = async (values: SignUpValues) => {
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

export const signIn = async (values: SignInValues) => {
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

export const signOut = async () => {
  try {
    return await auth.api.signOut({
      headers: await headers()
    });
  } catch (err) {
    console.log("SignOut action error", err)
    throw err;
  }
}

export const verifySession = cache(async () => {
  console.log("getServerSession");

  return await auth.api.getSession({
    headers: await headers()
  })
})

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
