import * as z from "zod"

export const FORM_SCHEMA = z.object({
  title: z
    .string()
    .min(5, "Bug title must be at least 5 characters.")
    .max(32, "Bug title must be at most 32 characters."),
  description: z
    .string()
    .min(20, "Description must be at least 20 characters.")
    .max(100, "Description must be at most 100 characters."),
  bio: z
    .string()
    .min(10, "Bio must be at least 10 characters.")
    .max(200, "Bio must be at most 200 characters."),
  category: z.string().min(1, "Please select a category."),
  priority: z.string().min(1, "Please select a priority."),
  notifyByEmail: z.boolean(),
  agreeToTerms: z.boolean().refine((v) => v, "You must agree to continue."),
  dueDate: z.date({ error: "Please pick a due date." }),
  verificationCode: z
    .string()
    .length(6, "Verification code must be 6 digits."),
  severity: z.number().min(0).max(10),
  budgetRange: z.tuple([z.number(), z.number()]),
  isBold: z.boolean(),
})

export const DEFAULT_NULL_VALUES: IFormSchema = {
  title: "",
  description: "",
  bio: "",
  category: "",
  priority: "",
  notifyByEmail: false,
  agreeToTerms: false,
  dueDate: undefined as unknown as Date,
  verificationCode: "",
  severity: 5,
  budgetRange: [20, 80],
  isBold: false,
};

export type IFormSchema = z.infer<typeof FORM_SCHEMA>;
