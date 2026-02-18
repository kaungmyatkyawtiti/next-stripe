import { signInSchema, signUpSchema } from "@/lib/validation";
import { z } from "zod";

export type SignInValues = z.infer<typeof signInSchema>;

export type SignUpValues = z.infer<typeof signUpSchema>;
