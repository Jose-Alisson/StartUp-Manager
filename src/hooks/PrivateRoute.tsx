import { Navigate } from "react-router-dom"
import { useAuth } from "./Auth"

export default function PrivateRoute({ children, roles = [] }) {
    let { user } = useAuth()
    return roles.includes(user?.role) ? children : Navigate({ to: '/auth/login' })
}