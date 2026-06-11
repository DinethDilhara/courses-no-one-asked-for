import React, {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react"

import type { AuthResponseDto, LoginPayload } from "@/service/auth"
import { login as loginRequest } from "@/service/auth"

type AuthState = {
  userId: string | null
  userRole: string | null
  accessToken: string | null
}

const STORAGE_KEY_USER_ID = "auth.userId"
const STORAGE_KEY_USER_ROLE = "auth.userRole"
const STORAGE_KEY_ACCESS_TOKEN = "auth.accessToken"


function readStoredAuthState(): AuthState {
  try {
    const userId = localStorage.getItem(STORAGE_KEY_USER_ID)
    const userRole = localStorage.getItem(STORAGE_KEY_USER_ROLE)
    const accessToken = localStorage.getItem(STORAGE_KEY_ACCESS_TOKEN)
    return {
      userId: userId && userId.length ? userId : null,
      userRole: userRole && userRole.length ? userRole : null,
      accessToken: accessToken && accessToken.length ? accessToken : null,
    }
  } catch {
    return { userId: null, userRole: null, accessToken: null }
  }
}

function writeStoredAuthState(next: AuthState) {
  try {

    if (next.userId) {
      localStorage.setItem(STORAGE_KEY_USER_ID, next.userId)
    } else {
      localStorage.removeItem(STORAGE_KEY_USER_ID)
    }
    
    
    if (next.userRole) {
      localStorage.setItem(STORAGE_KEY_USER_ROLE, next.userRole)
    } else {
      localStorage.removeItem(STORAGE_KEY_USER_ROLE)
    }
    
    if (next.accessToken) {
      localStorage.setItem(STORAGE_KEY_ACCESS_TOKEN, next.accessToken)
    } else {
      localStorage.removeItem(STORAGE_KEY_ACCESS_TOKEN)
    }

    
  } catch {
    // ignore storage failures
  }
}

type AuthContextValue = {
  userId: string | null
  userRole: string | null
  accessToken: string | null
  isAuthenticated: boolean
  login: (payload: LoginPayload) => Promise<AuthResponseDto>
  logout: () => void
}

const AuthContext = createContext<AuthContextValue | null>(null)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<AuthState>(() => readStoredAuthState())

  const login = useCallback(async (payload: LoginPayload) => {
    const res = await loginRequest(payload)

    const nextState: AuthState = {
      userId: res.data.userId,
      userRole: res.data.userRole,
      accessToken: res.data.accessToken,
    }
    setState(nextState)
    writeStoredAuthState(nextState)

    return res.data
  }, [])

  const logout = useCallback(() => {
    const nextState: AuthState = { userId: null, userRole: null, accessToken: null }
    setState(nextState)
    writeStoredAuthState(nextState)
  }, [])

  const value = useMemo<AuthContextValue>(() => {
    return {
      userId: state.userId,
      userRole: state.userRole,
      accessToken: state.accessToken,
      isAuthenticated: !!state.accessToken,
      login,
      logout,
    }
  }, [login, logout, state.accessToken, state.userRole, state.userId])

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return ctx
}
