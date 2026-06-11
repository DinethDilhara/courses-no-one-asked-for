import { api } from "@/lib/api-client"
import { z } from "zod"

export const loginSchema = z.object({
  email: z.string().email("Invalid email"),
  password: z.string().min(1, "Password is required"),
})

export type LoginPayload = z.infer<typeof loginSchema>

const allowedRoles = ["USER", "ADMIN"] as const
const userRoleSchema = z
  .string()
  .refine((r) => allowedRoles.includes(r as (typeof allowedRoles)[number]), {
    message: "Invalid user role received",
  })

const authResponseSchema = z.object({
  userId: z.string(),
  userRole: userRoleSchema,
  accessToken: z.string(),
})

export type AuthResponseDto = z.infer<typeof authResponseSchema>

const apiResponseSchema = <T extends z.ZodTypeAny>(data: T) =>
  z.object({
    success: z.boolean(),
    message: z.string(),
    data,
    timestamp: z.string(),
})

export async function login(payload: unknown) {
  const body = loginSchema.parse(payload)

  const response = await api.post("auth/login", body)

  const raw = apiResponseSchema(authResponseSchema).parse(response)
  return raw
}
