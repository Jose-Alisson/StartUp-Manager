import { NavLink } from "react-router-dom";
import '../styles/manager.style.css'
import { useState } from "react";
import { useAuth } from "../hooks/Auth";
import { API_URL } from "../constants";

export function SideBar() {
    const [sideActive, setSideActive] = useState(true)
    const {user} = useAuth()

    return (
        <section className={`border transition-[width] transition ${sideActive ? 'w-[350px]' : 'w-[106px]'} h-full grid grid-rows-[auto_1fr_auto] bg-white relative`}>
            <div className={`absolute ${sideActive ? 'right-[-16px]' : ' right-[36px]'} bg-white border top-[92px] rounded-[50%] cursor-pointer z-10`} onClick={() => setSideActive(!sideActive)}>
                <i className={`fi fi-rr-angle-small-left flex p-2 ${sideActive ? '' : 'rotate-180'}`}></i>
            </div>
            <div className={`side-header p-8 ${sideActive ? '' : 'p-[2rem_0rem_2rem_0rem] text-center'}`}>
                <h1 className="text-lg font-black tracking-tight leading-none">StartUp <span className="text-blue-500">Guide</span></h1>
            </div>
            <div className={`side-content ${sideActive ? '' : 'w-[106px]'}`}>
                <div className={`navigate`}>
                    <div className={`p-[0rem_2rem_0rem_2rem] font-bold ${sideActive ? '' : 'opacity-0 p-0 text-center'}`}>
                        <p className="text-gray-400 text-sm">Navegação</p>
                    </div>
                    <ul className={`p-8 flex flex-col gap-2`}>
                        <li>
                            <NavLink to="users" className={({ isActive }) => `flex items-center gap-4 cursor-pointer rounded transition ${isActive ? 'active' : ''}`}>
                                <div className="icon rounded-[20%] w-[42px] h-[42px] flex justify-center items-center">
                                    <i className="fi fi-rr-circle-user text-xl text-gray-500 flex"></i>
                                </div>
                                {sideActive && <span className="font-bold text-gray-500 text-sm">
                                    Usuários
                                </span>}
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="buildings" className={({ isActive }) => `flex items-center gap-4 cursor-pointer rounded transition ${isActive ? 'active' : ''}`}>
                                <div className="icon rounded-[20%] w-[42px] h-[42px] flex justify-center items-center">
                                    <i className="fi fi-rr-building text-xl text-gray-500 flex"></i>
                                </div>
                                {sideActive && <span className="font-bold text-gray-500 text-sm">
                                    Negócios
                                </span>}
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="categories" className={({ isActive }) => `flex items-center gap-4 cursor-pointer rounded transition ${isActive ? 'active' : ''}`}>
                                <div className="icon rounded-[20%] w-[42px] h-[42px] flex justify-center items-center">
                                    <i className="fi fi-rr-category-alt  text-xl text-gray-500 flex"></i>
                                </div>
                                {sideActive && <span className="font-bold text-gray-500 text-sm">
                                    Categoria
                                </span>
                                }
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="legal" className={({ isActive }) => `flex items-center gap-4 cursor-pointer rounded transition ${isActive ? 'active' : ''}`}>
                                <div className="icon rounded-[20%] w-[42px] h-[42px] flex justify-center items-center">
                                    <i className="fi fi-rr-legal-document text-xl text-gray-500 flex"></i>
                                </div>
                                {sideActive && <span className="font-bold text-gray-500 text-sm">
                                    Legal
                                </span>}
                            </NavLink>
                        </li>
                    </ul>
                </div>
            </div>
            <NavLink to="about">
                <div className={`profile flex p-[1rem_2rem_1rem_2rem] items-center gap-4 border-t cursor-pointer ${sideActive ? '' : 'w-[106px]'}`}>
                    <div className="icon">
                        {user?.profile?.imageUrl ? <img src={user.profile.imageUrl ? API_URL + "/resources/download/" + user?.profile?.imageUrl : ""} className="bg-gray-400 rounded-[50%] w-[32px] h-[32px] object-cover" alt=""/> : 
                        <div className="bg-gray-400 rounded-[50%] w-[32px] h-[32px]"></div>}
                        </div>
                    {sideActive && <div className="about">
                        <p>{user.profile?.username}</p>
                        <p className="text-gray-400 text-sm max-[100%] truncate">{user?.email}</p>
                    </div>}
                </div>
            </NavLink>
        </section>
    )
}