export interface User {
    id: number
    email: string
    role: 'user' 'pharmacist' 'admin'
}

export interface LoginResponse {
    access: string
    refresh: string
    user: User
}

export interface LoginCredentials {
    email: string
    password: string
}