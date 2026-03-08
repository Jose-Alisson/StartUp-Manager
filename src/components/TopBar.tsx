import { use, useEffect, useRef, useState } from "react";

export default function TopBar({ active = false, children }) {
    const element = useRef(null);
    const [navActive, setNavActive] = useState(active);


    useEffect(() => {
        function handleClickOutside(event) {
            if (element.current && !element.current.contains(event.target)) {
                setNavActive(false);
            }
        }

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);


    return (
        <>
            <div className={`box p-4 flex items-center justify-center transition-all duration-300 ${navActive ? "rotate-0" : "rotate-90"}`} onClick={() => setNavActive(!navActive)}>
                <i className="fi fi-rr-tally-3 flex"></i>
            </div>
            <div ref={element} className={`w-full bg-white flex-column px-4 absolute left-0 z-10 transition-all duration-300 ${navActive ? "top-0" : "-top-32"} `}>
                {children}
            </div>
        </>
    );
}