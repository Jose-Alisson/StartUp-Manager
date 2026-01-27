import React, { useEffect, useRef } from 'react';
import Header from '../components/Header';
import '../styles/style.css';
import HeroBar from '../components/HeroBar';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger'
import Footer from '../components/Footer';

gsap.registerPlugin(ScrollTrigger);

function Home() {
  const containerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray(".feature-section").forEach((section: any) => {
        const left = section.querySelector(".left");
        const right = section.querySelector(".right");

        gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: "top 85%",
            end: "top 30%",
            scrub: true,      // 🔥 acompanha o scroll
          },
        })
          .from(left, {
            x: -120,
            opacity: 0,
            ease: "none",
          })
          .from(
            right,
            {
              x: 120,
              opacity: 0,
              ease: "none",
            },
            "<"
          );
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const section = sectionRef.current;
      const title = section.querySelector("h1");
      const cards = section.querySelectorAll(".card");

      gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top 85%",
          end: "top 15%",
          scrub: true,
          invalidateOnRefresh: true,
        },
      })
        .fromTo(
          section,
          { borderRadius: "0rem" },
          { borderRadius: "3rem 3rem 0 0", ease: "none" }
        )
        .fromTo(
          title,
          { y: 60, opacity: 0 },
          { y: 0, opacity: 1, ease: "none" },
          0
        )
        .fromTo(
          cards,
          { y: 60, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            stagger: { amount: 0.6 },
            ease: "none",
            immediateRender: false,
          },
          0.2
        );

    }, sectionRef);

    return () => ctx.revert();
  }, []);


  return (
    <div className="min-h-screen bg-appBg" style={{"overflow": "hidden"}}>
      <Header></Header>
      <HeroBar></HeroBar>
      <main ref={containerRef}>
        <section className="feature-section h-[90dvh] p-16 flex items-center gap-8 justify-center">
          <div className="left w-[65%] flex flex-col gap-4">
            <h1 className="text-[clamp(1rem,6vw,4rem)] leading-snug">
              Transforme sua ideia em produto validado
            </h1>
            <p className="text-[clamp(1rem,4vw,2rem)]">
              A StartUp Guide é uma plataforma que guia fundadores desde a ideia inicial até a validação do produto, com foco em execução, métricas reais e decisões baseadas em dados.
            </p>
          </div>
          <div className="right flex items-center justify-center">
            <img src="/startUpUlu.jpg" alt="" className="w-[75%] rounded-[10%]" />
          </div>
        </section>
        <section className="feature-section h-[90dvh] p-16 flex items-center gap-8 justify-center bg-blue-50">
          <div className="left w-[45%] flex items-center justify-center">
            <img src="/equipe.jpg" alt="" className="w-[75%] object-contain rounded-[10%]" />
          </div>
          <div className="right flex flex-col gap-4 w-[55%]">
            <h1 className="text-[clamp(1rem,6vw,4rem)] leading-snug">Um caminho claro, do início à validação</h1>
            <p className="text-[clamp(1rem,4vw,2rem)]">A StartUp Guide entrega um processo estruturado para você saber exatamente o que fazer, quando fazer e por que fazer.</p>
          </div>
        </section>
        <section ref={sectionRef} className="feature-section bg-[#07081C] text-white p-16 flex flex-col gap-4 items-center" style={{ "border-radius": "2rem 2rem 0px 0px" }}>
          <h1 className="text-center text-[clamp(1rem,6.5vw,3.5rem)] font-black">Feito para quem <br />quer <span className="text-blue-500">construir</span> com clareza</h1>
          <div className="cards text-[clamp(0.8rem,1.5vw,1.5rem)]">
            <div className="card">
              <h2 className="text-[1.5em] font-semibold">Fundadores iniciantes</h2>
              <p className="text-gray-400">Para quem tem uma ideia, mas não sabe por onde começar.</p>
            </div>
            <div className="card">
              <h2 className="text-[1.5em] font-semibold">Desenvolvedores e makers</h2>
              <p className="text-gray-400">Para quem já sabe construir, mas quer validar antes.</p>
            </div>
            <div className="card">
              <h2 className="text-[1.5em] font-semibold" >Pequenos times</h2>
              <p className="text-gray-400">Times enxutos que precisam de foco e velocidade.</p>
            </div>
          </div>
        </section>
        <section className="feature-section bg-[#07081C] text-white p-16 flex flex-col gap-8 items-center" style={{ "border-radius": "0rem 0rem 0rem 0rem" }}>
          {/* <h1 className="text-center text-[clamp(1rem,6.5vw,3.5rem)] font-black">Seus <span className="text-blue-500">negócios</span> </h1> */}
          <div className="carrocel reverse">
            <div className="group">
              <div className="card bg-[url('/cinza.jpg')]">
              </div>
              <div className="card bg-[url('/cinza.jpg')]">
              </div>
              <div className="card bg-[url('/cinza.jpg')]">
              </div>
              <div className="card bg-[url('/cinza.jpg')]">
              </div>
            </div>
            <div className="group" aria-hidden>
              <div className="card bg-[url('/cinza.jpg')]">
              </div>
              <div className="card bg-[url('/cinza.jpg')]">
              </div>
              <div className="card bg-[url('/cinza.jpg')]">
              </div>
              <div className="card bg-[url('/cinza.jpg')]">
              </div>
            </div>
          </div>
          <div className="carrocel">
            <div className="group">
              <div className="card bg-[url('/cinza.jpg')]">
              </div>
              <div className="card bg-[url('/cinza.jpg')]">
              </div>
              <div className="card bg-[url('/cinza.jpg')]">
              </div>
              <div className="card bg-[url('/cinza.jpg')]">
              </div>
            </div>
            <div className="group" aria-hidden>
              <div className="card bg-[url('/cinza.jpg')]">
              </div>
              <div className="card bg-[url('/cinza.jpg')]">
              </div>
              <div className="card bg-[url('/cinza.jpg')]">
              </div>
              <div className="card bg-[url('/cinza.jpg')]">
              </div>
            </div>
          </div>
        </section>
        <section className="feature-section h-[90dvh] p-16 flex items-center gap-8 justify-center bg-[#FDFDFD]">
          <div className="left w-[50%] flex flex-col gap-4">
            <h1 className="text-[clamp(1rem,4vw,4rem)] leading-snug">Centralize tudo em um só lugar</h1>
            <p className="text-[clamp(1rem,4vw,2rem)]">Ideias, métricas, validações e decisões ficam organizadas dentro da StartUp Guide, sem planilhas, ferramentas soltas ou retrabalho.</p>
            <button className="download shadow-lg shadow-blue-500/50 mt-4">Baixar&nbsp;&nbsp;<i class="fi fi-rr-download"></i></button>
          </div>
          <div className="cellphone right h-[100%]">
            <img src="/celular.jpeg" alt="" className="cellphone object-contain rounded-[10%]" style={{ "max-height": "100%" }} />
          </div>
        </section>
      </main>
      <Footer></Footer>
    </div>
  );
}

export default Home;