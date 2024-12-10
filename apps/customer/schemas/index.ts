import { z } from "zod"

export const SignUpSchema = z.object({
  firstName: z.string(),
  phoneNumber: z.string(),
  birthday: z.string()
})

export const SignInSchema = z.object({
  firstName: z.string(),
  phoneNumber: z.string()
})
