import { useAuth } from "../hooks/Auth"

export default function User() {
    const { user } = useAuth()

    return (
        <div className="bg-white h-[100dvh]">
            <section className="feature-section h-[90dvh] p-16 flex items-center gap-8 justify-center bg-[#FDFDFD]">
                <div className="left w-[50%] flex flex-col gap-4">
                    <h1 className="text-[clamp(1.5rem,4vw,4rem)] leading-snug font-black text-gray-800">
                        Olá, {user?.username}
                    </h1>

                    <p className="text-[clamp(1rem,4vw,2rem)] text-gray-600">
                        Seu ambiente já está pronto.
                        Para ter a melhor experiência, leve a <strong>StartUp Guide</strong>&nbsp;
                        com você e acompanhe tudo direto pelo aplicativo.
                    </p>

                    <button className="download shadow-lg shadow-blue-500/50 mt-4">
                        Baixar o aplicativo&nbsp;&nbsp;
                        <i className="fi fi-rr-download"></i>
                    </button>

                    <span className="text-sm text-gray-400 mt-2">
                        Disponível para Android
                    </span>
                </div>

                <div className="cellphone right h-[100%]">
                    <img
                        src="/start/celular.jpeg"
                        alt="Aplicativo StartUp Guide"
                        className="cellphone object-contain rounded-[10%]"
                        style={{ maxHeight: "100%" }}
                    />
                </div>
            </section>
        </div>

    )
}