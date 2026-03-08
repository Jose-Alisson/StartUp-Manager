import { Outlet, useNavigate } from "react-router-dom"
import { useAuth } from "../hooks/Auth"
import { useEffect } from 'react'
import { AxiosError } from "axios"
import { useOffline } from "../hooks/Offline"

export function Dashboard() {
    let navigate = useNavigate()
    let { show } = useOffline()
    let { me, token, setAuth } = useAuth()

    useEffect(() => {
        let load = async () => {
            try {
                const meResult = await me()
                setAuth({ user: meResult, token: token })
            } catch (ex) {
                if (ex instanceof AxiosError) {
                    if ([401, 403].includes(ex.status)) {
                        navigate("/auth/login")
                    }

                    if (ex.code === AxiosError.ERR_NETWORK) {
                        show()
                    }
                }
            }
        }
        load()
    }, [token])

    return <Outlet></Outlet>
}