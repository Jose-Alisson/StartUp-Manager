import { NavLink } from "react-router-dom";
import '../styles/manager.style.css'

export function SideBar() {
    return (
        <section className="border w-[350px] h-full  grid grid-rows-[auto_1fr_auto]">
            <div className="side-header p-8">
                <h1 className="text-lg font-black tracking-tight leading-none">StartUp <span className="text-blue-500">Guide</span></h1>
            </div>
            <div className="side-content">
                <div className="navigate">
                    <div className="p-[0rem_2rem_0rem_2rem] font-bold">
                        <p className="text-gray-400 text-sm">Navegação</p>
                    </div>
                    <ul className="p-8 flex flex-col gap-2">
                        <li>
                            <NavLink to="users" className={({ isActive }) => `flex items-center gap-4 cursor-pointer rounded transition ${isActive ? 'active' : ''}`}>
                                <div className="icon rounded-[20%] w-[42px] h-[42px] flex justify-center items-center">
                                    <i className="fi fi-rr-circle-user text-xl text-gray-500 flex"></i>
                                </div>
                                <span className="font-bold text-gray-500 text-sm">
                                    Usuários
                                </span>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="buildings" className={({ isActive }) => `flex items-center gap-4 cursor-pointer rounded transition ${isActive ? 'active' : ''}`}>
                                <div className="icon rounded-[20%] w-[42px] h-[42px] flex justify-center items-center">
                                    <i className="fi fi-rr-building text-xl text-gray-500 flex"></i>
                                </div>
                                <span className="font-bold text-gray-500 text-sm">
                                    Negócios
                                </span>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="categories" className={({ isActive }) => `flex items-center gap-4 cursor-pointer rounded transition ${isActive ? 'active' : ''}`}>
                                <div className="icon rounded-[20%] w-[42px] h-[42px] flex justify-center items-center">
                                    <i class="fi fi-rr-category-alt  text-xl text-gray-500 flex"></i>
                                </div>
                                <span className="font-bold text-gray-500 text-sm">
                                    Categoria
                                </span>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="legal" className={({ isActive }) => `flex items-center gap-4 cursor-pointer rounded transition ${isActive ? 'active' : ''}`}>
                                <div className="icon rounded-[20%] w-[42px] h-[42px] flex justify-center items-center">
                                    <i class="fi fi-rr-legal-document text-xl text-gray-500 flex"></i>
                                </div>
                                <span className="font-bold text-gray-500 text-sm">
                                    Legal
                                </span>
                            </NavLink>
                        </li>
                    </ul>
                </div>
            </div>
            <NavLink to="about">
                <div className="profile flex p-[1rem_2rem_1rem_2rem] items-center gap-4 border-t cursor-pointer">
                    <div className="icon">
                        <div className="bg-gray-400 rounded-[50%] w-[32px] h-[32px]"></div>
                    </div>
                    <div className="about">
                        <p>Jose ALisson</p>
                        <p className="text-gray-400 text-sm max-[100%] truncate">alissonbarbosa.9982@gmail.com</p>
                    </div>
                </div>
            </NavLink>
        </section>
    )
}