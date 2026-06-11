import { api } from "@/lib/api-client"
import { z } from "zod"

export const enrollCourseRequestSchema = z.object({
  userId: z.string(),
  courseId: z.string(),
})

export type EnrollCourseRequest = z.infer<typeof enrollCourseRequestSchema>

export const enrollmentResponseSchema = z.object({
  enrollmentId: z.string(),
  userId: z.string(),
  courseId: z.string(),
  enrolledAt: z.string(),
})

export type EnrollmentResponse = z.infer<typeof enrollmentResponseSchema>

export const enrolledCourseResponseSchema = z.object({
  enrollmentId: z.string(),
  courseId: z.string(),
  enrolledAt: z.string(),
})

export type EnrolledCourseResponse = z.infer<
  typeof enrolledCourseResponseSchema
>

const apiResponseSchema = <T extends z.ZodTypeAny>(data: T) =>
  z.object({
    success: z.boolean(),
    message: z.string(),
    data,
    timestamp: z.string(),
  })

export async function enrollCourse(
  payload: EnrollCourseRequest
): Promise<EnrollmentResponse> {
  const response = await api.post("enrollments", payload)

  const parsed = apiResponseSchema(enrollmentResponseSchema).parse(response)

  return parsed.data
}

export async function getUserEnrollments(
  userId: string
): Promise<EnrolledCourseResponse[]> {
  const response = await api.get(`enrollments/${encodeURIComponent(userId)}`)

  const parsed = apiResponseSchema(
    z.array(enrolledCourseResponseSchema)
  ).parse(response)

  return parsed.data
}

export async function removeEnrollment(
  userId: string,
  courseId: string
): Promise<void> {
  const response = await api.delete(
    `enrollments?userId=${encodeURIComponent(
      userId
    )}&courseId=${encodeURIComponent(courseId)}`
  )

  apiResponseSchema(z.null()).parse(response)

  return
}