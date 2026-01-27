
import '../styles/home.style.css'
import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { useNavigate } from 'react-router-dom'

export default function HeroBar() {
    const navigate = useNavigate()
    const heroRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from(".hero-title", {
                y: 80,
                opacity: 0,
                duration: 1,
                ease: "power4.out"
            });

            gsap.from(".hero-sub", {
                y: 60,
                opacity: 0,
                duration: 0.8,
                delay: 0.2,
                ease: "power3.out"
            });

            gsap.from(".hero-cta", {
                y: 40,
                opacity: 0,
                duration: 0.6,
                delay: 0.4,
                ease: "power2.out"
            });
        }, heroRef);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={heroRef} className="hero h-[100vh] bg-[url('/building-2378893_1920.jpg')] w-full object-cover flex p-[4rem] bg-fixed">
            <div className="left w-[50%] flex flex-col justify-center gap-[2rem]">
                <h1 className="hero-title text-[clamp(1rem,4.5vw,6rem)] font-black text-white leading-snug">Transforme ideias em negócios reais</h1>
                <p className="hero-sub text-gray-200 text-2xl">Do zero à execução, o StartUp Guide te acompanha na criação do seu próprio negócio. Menos incerteza, mais estratégia e um caminho claro para crescer.</p>
                <div className="hero-cta actions">
                    <button onClick={() => navigate("/auth/register")} style={{"min-width": "200px"}} className="w-[150px, 3vw, 350px]">Comece Hoje &nbsp;&nbsp;<i className="fi fi-rr-arrow-right flex"></i></button>
                </div>
            </div>
        </section>
    )
}