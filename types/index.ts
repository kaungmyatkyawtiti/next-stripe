import { forgotPasswordSchema, resetPasswordSchema, signInSchema, signUpSchema, updateProfileSchema } from "@/lib/validation";
import { z } from "zod";

export type SignInValues = z.infer<typeof signInSchema>;

export type SignUpValues = z.infer<typeof signUpSchema>;

export type UpdateProfileValues = z.infer<typeof updateProfileSchema>;

export type ForgotPasswordValues = z.infer<typeof forgotPasswordSchema>;

export type ResetPasswordValues = z.infer<typeof resetPasswordSchema>;
