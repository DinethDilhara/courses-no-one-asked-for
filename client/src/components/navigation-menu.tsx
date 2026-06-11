import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card"

import { useAuth } from "@/context/AuthContext"
import { fetchCurrentUser, type UserResponseSchema } from "@/service/user"

export default function Navbar() {
  const navigate = useNavigate()
  const { isAuthenticated, logout } = useAuth()

  const [user, setUser] = useState<UserResponseSchema | null>(null)

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login", { replace: true })
    }
  }, [isAuthenticated, navigate])

  useEffect(() => {
    const loadUser = async () => {
      try {
        const data = await fetchCurrentUser()
        setUser(data)
      } catch (err) {
        console.error("Failed to load user:", err)
      }
    }

    if (isAuthenticated) {
      loadUser()
    }
  }, [isAuthenticated])

  if (!isAuthenticated) return null

  return (
    <header className="border-b">
      <div className="flex h-16 items-center justify-between">
        <div className="flex items-center gap-6">
          <a href="/" className="text-2xl font-bold text-primary">
            CoursesNoOneAskedFor
          </a>
        </div>

        <div className="flex items-center gap-3">
          <Button
            onClick={() => {
              logout()
              navigate("/login", { replace: true })
            }}
          >
            Log out
          </Button>

          <HoverCard>
            <HoverCardTrigger>
              <Avatar className="cursor-pointer">
                <AvatarImage src="https://ui.shadcn.com/avatars/02.png" />
                <AvatarFallback>
                  {user?.name?.charAt(0) ?? "U"}
                </AvatarFallback>
              </Avatar>
            </HoverCardTrigger>

            <HoverCardContent className="w-72">
              <div className="flex flex-col gap-2">
                <p className="text-sm font-semibold">
                  {user?.name ?? "Unknown User"}
                </p>

                <p className="text-xs text-muted-foreground">
                  {user?.email ?? "no-email@example.com"}
                </p>

                <p className="text-xs text-muted-foreground">
                  Role: {user?.role ?? "student"}
                </p>
              </div>
            </HoverCardContent>
          </HoverCard>
        </div>
      </div>
    </header>
  )
}