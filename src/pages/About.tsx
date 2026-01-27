import { useNavigate } from "react-router-dom"
import { useAuth } from "../hooks/Auth"

export default function About() {
    const navigate = useNavigate()
    const { user, logout } = useAuth()

    const logoutAndRedrectLogin = () => {
        logout()
        navigate("/auth")
    }

    return (
        <section className="p-8 flex flex-col gap-4">
            <div className="border p-4 flex gap-4 rounded">
                <div className="icon flex items-center">
                    <div className="bg-gray-400 rounded-[50%] w-[72px] h-[72px]"></div>
                </div>
                <div className="about flex-1">
                    <h1 className="text-[clamp(1rem,4.5vw,2rem)]">
                        {user?.username}
                    </h1>
                    <p>{user?.email}</p>
                </div>
                <div onClick={logoutAndRedrectLogin} className="flex justify-center items-center cursor-pointer">
                    <i class="fi fi-rr-sign-out-alt flex text-[3rem] text-red-400"></i>
                </div>
            </div>
        </section>
    )
} 