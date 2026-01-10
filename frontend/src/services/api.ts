import axios, {
  AxiosError,
  AxiosInstance,
  AxiosRequestConfig,
} from 'axios'

const API_BASE_URL =
  import.meta.env.VITE_API_URL || 'http://localhost:8000/api'

interface RetryRequestConfig extends AxiosRequestConfig {
  _retry?: boolean
}

const api: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
})

/* Request interceptor */
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('access_token')
  if (token && config.headers) {
    config.headers.Authorization = Bearer ${token}
  }
  return config
})

/* Response interceptor */
api.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as RetryRequestConfig

    if (
      error.response?.status === 401 &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true

      try {
        const refreshToken = localStorage.getItem('refresh_token')

        const { data } = await axios.post(${API_BASE_URL}/auth/token/refresh/, {
          refresh: refreshToken,
        })

        localStorage.setItem('access_token', data.access)

        if (originalRequest.headers) {
          originalRequest.headers.Authorization = Bearer ${data.access}
        }

        return api(originalRequest)
      } catch {
        localStorage.clear()
        window.location.href = '/login'
      }
    }

    return Promise.reject(error)
  }
)

export default api