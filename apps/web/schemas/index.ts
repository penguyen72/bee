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

export const EditMemberSchema = z.object({
  firstName: z.string(),
  phoneNumber: z.string(),
  birthday: z.string(),
  points: z.string()
})

export const ProfileSchema = z.object({
  businessName: z.string().optional(),
  address: z.string().optional(),
  city: z.string().optional(),
  state: z.string().optional(),
  zipCode: z.string().optional(),
  timezone: z.string().optional(),
  phoneNumber: z.string().optional(),
  emailAddress: z.string()
})

export const MemberSearchSchema = z.object({
  searchString: z.string().optional()
})

export const AddPromotionSchema = z.object({
  name: z.string(),
  unit: z.string(),
  value: z.string(),
  type: z.string(),
  expiration: z.date(),
  addBusinessPhoneNumber: z.boolean(),
  welcomeWalkin: z.boolean(),
  optOut: z.boolean(),
  message: z.string(),
  messagePreview: z.string()
})
