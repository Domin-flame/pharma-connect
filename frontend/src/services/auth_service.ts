import api from './api'
import { LoginCredentials, LoginResponse, User } from '../types/auth'

export const authService = {
  async login(credentials: LoginCredentials): Promise<LoginResponse> {
    const { data } = await api.post<LoginResponse>(
      '/auth/login/',
      credentials
    )

    localStorage.setItem('access_token', data.access)
    localStorage.setItem('refresh_token', data.refresh)
    localStorage.setItem('user', JSON.stringify(data.user))

    return data
  },

  async logout(): Promise<void> {
    try {
      const refresh = localStorage.getItem('refresh_token')
      await api.post('/auth/logout/', { refresh })
    } finally {
      localStorage.clear()
    }
  },

  async getCurrentUser(): Promise<User> {
    const { data } = await api.get<User>('/auth/me/')
    return data
  },
}