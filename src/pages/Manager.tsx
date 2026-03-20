import { Outlet, useLocation } from "react-router-dom";
import { SideBar } from "../components/SideBar";
import { ToastContainer } from "react-toastify";

export default function Manager() {
    return (
        <section className="flex h-[100dvh]">
            <SideBar></SideBar>
            <main className="w-full h-full overflow-auto bg-[#EFF6FF]">
                <ToastContainer
                    position="top-right"
                    autoClose={3000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                />
                <Outlet></Outlet>
            </main>
        </section>
    )
}