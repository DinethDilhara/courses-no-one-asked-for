import * as React from "react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

interface CourseCardProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string
  description: string
  author: string
  thumbnailUrl: string

  isEnrolled?: boolean
  onEnroll?: () => void
  onRemoveEnrollment?: () => void
}

const CourseCard = React.forwardRef<HTMLDivElement, CourseCardProps>(
  (
    {
      className,
      title,
      description,
      author,
      thumbnailUrl,
      isEnrolled = false,
      onEnroll,
      onRemoveEnrollment,
      ...props
    },
    ref
  ) => {
    return (
      <div
        ref={ref}
        className={cn(
          "overflow-hidden rounded-sm border bg-card text-card-foreground shadow",
          "flex flex-col md:flex-row",
          className
        )}
        {...props}
      >
        <div className="w-full md:w-3/5">
          <img
            src={thumbnailUrl}
            alt={title}
            className="h-56 w-full object-cover md:h-full"
          />
        </div>

        <div className="flex w-full flex-col justify-center p-6 md:w-3/5 md:p-8">
          <div>
            <h2 className="text-2xl font-bold tracking-tight md:text-3xl">
              {title}
            </h2>

            <p className="mt-1 text-sm text-muted-foreground">by {author}</p>

            <p className="mt-4 line-clamp-6 text-muted-foreground">
              {description}
            </p>

            <div className="mt-6">
              {!isEnrolled ? (
                <Button size="lg" onClick={onEnroll}>
                  Enroll
                </Button>
              ) : (
                <Button
                  size="lg"
                  variant="destructive"
                  onClick={onRemoveEnrollment}
                >
                  Remove Enrollment
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    )
  }
)

CourseCard.displayName = "CourseCard"

export { CourseCard }