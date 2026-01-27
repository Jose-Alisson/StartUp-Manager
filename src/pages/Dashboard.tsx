import { Outlet, useNavigate } from "react-router-dom"
import { useAuth } from "../hooks/Auth"
import { useEffect } from 'react'

export function Dashboard() {
    let navigate = useNavigate()
    let { me, token, setAuth } = useAuth()

    useEffect(() => {
        let load = async () => {
            try {
                const meResult = await me()
                setAuth({ user: meResult, token: token })
            } catch (ex) {
                console.log("Erroe", ex)
                navigate("/auth/login")
            }
        }
        load()
    }, [token])

    return <Outlet></Outlet>
}