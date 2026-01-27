export default function Footer() {
    return (
        <footer className="flex justify-between items-center border-t border-gray-200 py-10 bg-white gap-8 p-8 flex-wrap">
            <div className="startUp flex items-baseline gap-2 flex-col">
                <h1 className="text-lg font-black text-gray-400 tracking-tight leading-none">StartUp Guide</h1>
                <p className="text-[8px] text-gray-400 font-bold uppercase tracking-widest">O Caminho do Empreendedor</p>
            </div>
            <div className="max-w-7xl mx-auto px-4 text-center">
                <p className="text-sm text-gray-400">
                    &copy; 2024 StartUp Guide - Democratizando o Empreendedorismo Brasileiro.
                </p>
                <div className="flex justify-center gap-4 mt-4 text-xs font-bold text-blue-500 uppercase tracking-widest">
                    <a href="#" className="hover:opacity-70 transition-opacity">Privacidade</a>
                    <a href="#" className="hover:opacity-70 transition-opacity">Termos</a>
                    <a href="#" className="hover:opacity-70 transition-opacity">Contato</a>
                </div>
            </div>
            <span className="w-32 hidden md:block"></span>
        </footer>
    )
}