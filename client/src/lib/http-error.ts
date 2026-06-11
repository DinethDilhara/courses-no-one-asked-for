import axios from "axios"

export type FieldErrors = Record<string, string[]>

export type ParsedHttpError = {
  message: string
  status?: number
  fieldErrors?: FieldErrors
}

function coerceStringArray(value: unknown): string[] {
  if (typeof value === "string") return [value]
  if (Array.isArray(value))
    return value.filter((v): v is string => typeof v === "string")
  return []
}

function tryExtractFieldErrors(data: unknown): FieldErrors | undefined {
  if (!data || typeof data !== "object") return undefined

  const anyData = data as Record<string, unknown>

  // Common Spring-ish shapes:
  // - { errors: { field: "msg" | ["msg"] } }
  // - { fieldErrors: { field: "msg" | ["msg"] } }
  // - { errors: [{ field: "email", message: "..." }, ...] }
  const candidates = [
    anyData.errors,
    anyData.fieldErrors,
    anyData.validationErrors,
  ]

  for (const candidate of candidates) {
    if (!candidate) continue

    if (Array.isArray(candidate)) {
      const out: FieldErrors = {}
      for (const item of candidate) {
        if (!item || typeof item !== "object") continue
        const entry = item as Record<string, unknown>
        const field = typeof entry.field === "string" ? entry.field : undefined
        const message =
          typeof entry.message === "string"
            ? entry.message
            : typeof entry.defaultMessage === "string"
              ? entry.defaultMessage
              : undefined
        if (field && message) {
          out[field] = [...(out[field] ?? []), message]
        }
      }
      if (Object.keys(out).length) return out
    }

    if (typeof candidate === "object") {
      const out: FieldErrors = {}
      for (const [k, v] of Object.entries(
        candidate as Record<string, unknown>
      )) {
        const messages = coerceStringArray(v)
        if (messages.length) out[k] = messages
      }
      if (Object.keys(out).length) return out
    }
  }

  return undefined
}

export function parseHttpError(error: unknown): ParsedHttpError {
  if (axios.isAxiosError(error)) {
    const status = error.response?.status
    const data = error.response?.data

    const message =
      (data &&
      typeof data === "object" &&
      typeof (data as any).message === "string"
        ? (data as any).message
        : undefined) ??
      error.message ??
      "Request failed"

    const fieldErrors = tryExtractFieldErrors(data)

    return { message, status, fieldErrors }
  }

  if (error instanceof Error) {
    return { message: error.message }
  }

  return { message: "Something went wrong" }
}
