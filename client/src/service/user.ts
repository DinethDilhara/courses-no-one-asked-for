import { api } from "@/lib/api-client"
import { z } from "zod"

const userResponseSchema = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string().email(),
  role: z.string(),
})

export type UserResponseSchema = z.infer<typeof userResponseSchema>

const apiResponseSchema = <T extends z.ZodTypeAny>(data: T) =>
  z.object({
    success: z.boolean(),
    message: z.string(),
    data,
    timestamp: z.string(),
  })

export async function fetchCurrentUser(): Promise<UserResponseSchema> {
  const response = await api.get("users/me")
  const raw = apiResponseSchema(userResponseSchema).parse(response)
  return raw.data
}

export async function fetchUserDetailsByUserId(
  userId: string
): Promise<UserResponseSchema> {
  const response = await api.get(
    `users/${encodeURIComponent(userId)}`
  )

  const raw = apiResponseSchema(userResponseSchema).parse(response)
  return raw.data
}
