import axios from "axios"

export const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
})

apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("auth.accessToken")

  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }

  return config
})

export const api = {
  get<T>(url: string) {
    return apiClient.get<T>(url).then((r) => r.data)
  },
  getById<T>(url: string, id: string | number) {
    return apiClient.get<T>(`${url}/${id}`).then((r) => r.data)
  },
  post<T, B>(url: string, body: B) {
    return apiClient.post<T>(url, body).then((r) => r.data)
  },
  put<T, B>(url: string, id: string | number, body: B) {
    return apiClient.put<T>(`${url}/${id}`, body).then((r) => r.data)
  },
  deleteById<T>(url: string, id: string | number) {
    return apiClient.delete<T>(`${url}/${id}`).then((r) => r.data)
  },
  delete<T>(url: string, params?: Record<string, string | number | boolean>) {
    return apiClient.delete<T>(url, { params }).then((r) => r.data)
  },
}
