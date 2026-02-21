import { forgotPasswordSchema, resetPasswordSchema, signInSchema, signUpSchema, updateEmailSchema, updatePasswordSchema, updateProfileSchema } from "@/lib/validation";
import { z } from "zod";

export type SignInValues = z.infer<typeof signInSchema>;

export type SignUpValues = z.infer<typeof signUpSchema>;

export type ForgotPasswordValues = z.infer<typeof forgotPasswordSchema>;

export type ResetPasswordValues = z.infer<typeof resetPasswordSchema>;

export type UpdateProfileValues = z.infer<typeof updateProfileSchema>;

export type UpdateEmailValues = z.infer<typeof updateEmailSchema>;

export type UpdatePasswordValues = z.infer<typeof updatePasswordSchema>;
