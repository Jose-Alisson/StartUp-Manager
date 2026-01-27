import { Outlet } from "react-router-dom";
import '../styles/auth.style.css';

export default function Authencation() {
    return (
        <div className="flex">
            {/* <div className="w-1/2 h-screen p-8 bg-blue-500 text-white flex items-center justify-center flex-col gap-8">
                <img src="/business-plan-animate.svg" alt="" />
            </div> */}
            <section className="w-full h-[100dvh] flex items-center justify-center">
                <Outlet />
            </section>
        </div>
    )
}
