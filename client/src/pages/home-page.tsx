import { useEffect, useMemo, useState } from "react"
import { useNavigate } from "react-router-dom"

import { FieldSeparator } from "@/components/ui/field"
import { Button } from "@/components/ui/button"
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"

import Navbar from "@/components/navigation-menu"
import { CourseCard } from "@/components/course-card"
import { useAuth } from "@/context/AuthContext"

import { type Course, fetchCourses } from "@/service/course"

import {
  getUserEnrollments,
  enrollCourse,
  removeEnrollment,
} from "@/service/enrollment"

import type { EnrolledCourseResponse } from "@/service/enrollment"

export function HomePage() {
  const navigate = useNavigate()
  const { isAuthenticated, userId } = useAuth()

  const [courses, setCourses] = useState<Course[]>([])
  const [enrolled, setEnrolled] = useState<string[]>([])
  const [enrollments, setEnrollments] = useState<EnrolledCourseResponse[]>([])

  const [open, setOpen] = useState(false)

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login", { replace: true })
    }
  }, [isAuthenticated, navigate])

  useEffect(() => {
    if (!userId) return

    const load = async () => {
      const [courseData, enrollmentData] = await Promise.all([
        fetchCourses(),
        getUserEnrollments(userId),
      ])

      setCourses(courseData)
      setEnrollments(enrollmentData)
      setEnrolled(enrollmentData.map((e) => e.courseId))
    }

    load()
  }, [userId])

  const courseMap = useMemo(() => {
    return new Map(courses.map((c) => [c.id, c]))
  }, [courses])

  const handleEnroll = async (courseId: string) => {
    if (!userId) return

    await enrollCourse({ userId, courseId })

    setEnrolled((prev) => [...prev, courseId])

    const updated = await getUserEnrollments(userId)
    setEnrollments(updated)
  }

  const handleRemoveEnrollment = async (courseId: string) => {
    if (!userId) return

    await removeEnrollment(userId, courseId)

    setEnrolled((prev) => prev.filter((id) => id !== courseId))

    setEnrollments((prev) => prev.filter((e) => e.courseId !== courseId))
  }

  if (!isAuthenticated) return null

  return (
    <div className="flex min-h-svh items-center justify-center p-6">
      <div className="flex max-w-5xl min-w-0 flex-col gap-4 text-sm leading-loose">
        <Navbar />

        <p>Hello there 👋</p>

        <p>
          This is the client for System Design Challenge – BeautyOfCloud 2.0
          (USJP)
        </p>

        <p>
          Developed by{" "}
          <a
            href="https://github.com/DinethDilhara"
            className="font-medium text-primary underline underline-offset-4"
          >
            Dineth Dilhara
          </a>
        </p>

        <FieldSeparator />

        <div className="flex items-center justify-between gap-2">
          <h1 className="text-2xl font-medium">Available Courses</h1>

          <Drawer open={open} onOpenChange={setOpen} direction="right">
            <DrawerTrigger asChild>
              <Button variant="outline">Enrolled Courses</Button>
            </DrawerTrigger>

            <DrawerContent className="flex h-full flex-col">
              <DrawerHeader>
                <DrawerTitle>My Learning</DrawerTitle>
                <DrawerDescription>Courses you have enrolled</DrawerDescription>
              </DrawerHeader>

              <div className="flex-1 space-y-4 overflow-y-auto px-4">
                {enrollments.length === 0 ? (
                  <p className="text-sm text-muted-foreground">
                    No enrolled courses yet. Start learning
                  </p>
                ) : (
                  enrollments.map((enroll) => {
                    const course = courseMap.get(enroll.courseId)

                    return (
                      <div
                        key={enroll.enrollmentId}
                        className="flex flex-col gap-2 rounded-lg border p-4"
                      >
                        <p className="text-base font-medium">
                          {course?.title ?? "Unknown Course"}
                        </p>

                        <p className="text-xs text-muted-foreground">
                          by {course?.author ?? "Unknown"}
                        </p>

                        <p className="text-xs text-muted-foreground">
                          Enrolled at:{" "}
                          {new Date(enroll.enrolledAt).toLocaleDateString(
                            "en-US",
                            {
                              year: "numeric",
                              month: "short",
                              day: "numeric",
                            }
                          )}
                        </p>
                        <Button
                          variant="destructive"
                          size="sm"
                          className="mt-2 w-fit"
                          onClick={() =>
                            handleRemoveEnrollment(enroll.courseId)
                          }
                        >
                          Remove
                        </Button>
                      </div>
                    )
                  })
                )}
              </div>

              <DrawerFooter>
                <DrawerClose asChild>
                  <Button variant="outline">Close</Button>
                </DrawerClose>
              </DrawerFooter>
            </DrawerContent>
          </Drawer>
        </div>

        <div className="mt-2 flex flex-col gap-6">
          {courses.map((course) => (
            <CourseCard
              key={course.id}
              title={course.title}
              author={course.author}
              description={course.description}
              thumbnailUrl={course.thumbnailUrl || ""}
              isEnrolled={enrolled.includes(course.id)}
              onEnroll={() => handleEnroll(course.id)}
              onRemoveEnrollment={() => handleRemoveEnrollment(course.id)}
            />
          ))}
        </div>

        <FieldSeparator />

        <p>We sell developer dreams, not courses. 😎</p>
      </div>
    </div>
  )
}

export default HomePage
