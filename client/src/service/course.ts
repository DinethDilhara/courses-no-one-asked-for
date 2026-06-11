import { api } from "@/lib/api-client"
import { z } from "zod"

const courseResponseSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string(),
  author: z.string(),
  thumbnailUrl: z.string().url().optional(),
})

export type Course = z.infer<typeof courseResponseSchema>

const apiResponseSchema = <T extends z.ZodTypeAny>(data: T) =>
  z.object({
    success: z.boolean(),
    message: z.string(),
    data,
    timestamp: z.string(),
})

export async function fetchCourses(): Promise<Course[]> {
  const response = await api.get("courses")

  const parsed = apiResponseSchema(z.array(courseResponseSchema)).parse(response)

  return parsed.data
}

export async function fetchCoursesByCourseId(
  courseId: string
): Promise<Course[]> {
  const response = await api.get(`courses/${encodeURIComponent(courseId)}`)

  const parsed = apiResponseSchema(z.array(courseResponseSchema)).parse(response)

  return parsed.data
}
