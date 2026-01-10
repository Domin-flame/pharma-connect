import { Navigate } from 'react-router-dom'

interface Props {
    children: JSX.Element
    role?: 'user' | 'pharmacist' | 'admin'
}

export default function ProtectedRoute({ children, role }: Props) {
    const user = localStorage.getItem('user')

    if (!user) return <Navigate to="/login" replace />

    const parsedUser = JSON.parse(user)

    if (role && parsedUser.role !== role) {
        return <Navigate to="/" replace />
    }

    return children
}