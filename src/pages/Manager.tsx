import { Outlet, useLocation } from "react-router-dom";
import { SideBar } from "../components/SideBar";

export default function Manager(){
    return (
        <section className="flex h-[100dvh]">
            <SideBar></SideBar>
            <main className="w-full h-full overflow-auto">
                <Outlet></Outlet>
            </main>
        </section>
    )
}