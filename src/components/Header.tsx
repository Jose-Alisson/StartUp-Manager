
import React, { navigate } from 'react';
import '../styles/home.style.css'
import { useNavigate } from 'react-router-dom';

interface HeaderProps {
  onSearchChange: (val: string) => void;
  onBudgetChange: (val: number) => void;
  currentBudget: number;
}

// const Header: React.FC<HeaderProps> = ({ onSearchChange, onBudgetChange, currentBudget }) => {
//   return (
//     <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-gray-200 shadow-sm">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
//         {/* Camada Superior: Controles de Busca e Orçamento (Ferramentas Principais) */}
//         <div className="flex flex-col sm:flex-row items-center gap-4">
//           <div className="relative w-full flex-grow">
//             <input 
//               type="text" 
//               placeholder="Ex: Cafeteria, Oficina, Loja de roupas..." 
//               onChange={(e) => onSearchChange(e.target.value)}
//               className="w-full bg-appBg border-none focus:ring-2 focus:ring-primaryBlue rounded-full py-2.5 pl-10 pr-4 text-sm transition-all placeholder:text-gray-400"
//             />
//             <svg className="absolute left-3 top-2.5 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
//             </svg>
//           </div>

//           <div className="flex items-center gap-3 w-full sm:w-auto bg-appBg px-4 py-1.5 rounded-full border border-gray-100">
//             <span className="text-xs font-bold text-gray-500 whitespace-nowrap">Orçamento:</span>
//             <input 
//               type="range" 
//               min="10" 
//               max="50000" 
//               step="10"
//               value={currentBudget}
//               onChange={(e) => onBudgetChange(Number(e.target.value))}
//               className="w-24 h-1.5 bg-gray-300 rounded-lg appearance-none cursor-pointer accent-primaryBlue"
//             />
//             <span className="text-xs font-bold text-primaryBlue whitespace-nowrap min-w-[70px]">
//               R$ {currentBudget.toLocaleString('pt-BR')}
//             </span>
//           </div>
//         </div>

//         {/* Camada Inferior: Nome e Marca (Deslocado para baixo das ferramentas) */}
//         {/* <div className="flex items-center gap-3 border-t border-gray-50 pt-2">
//           <div className="w-8 h-8 rounded-lg overflow-hidden shadow-sm border border-primaryBlue/10 flex-shrink-0 bg-primaryBlue">
//             <img 
//               src="https://i.ibb.co/L6VvV6n/logo-startup.png" 
//               alt="StartUp Guide Logo" 
//               className="w-full h-full object-cover p-0.5"
//               onError={(e) => {
//                 e.currentTarget.src = "https://api.dicebear.com/7.x/initials/svg?seed=SG&backgroundColor=1A237E";
//               }}
//             />
//           </div>
//           <div className="flex items-baseline gap-2">
//             <h1 className="text-lg font-black text-primaryBlue tracking-tight leading-none">StartUp Guide</h1>
//             <p className="text-[8px] text-gray-400 font-bold uppercase tracking-widest">O Caminho do Empreendedor</p>
//           </div>
//         </div> */}
//       </div>
//     </header>
//   );
// };


export default function Header() {
  const navigate = useNavigate()

  return (
    <header className="bg-white position-sticky top-[0]">
      <div className="flex h-[70px] justify-between items-center" style={{padding: '0rem 4rem', margin: 'auto'}}>
        <div className="logo">
          <h1 className="text-lg font-black tracking-tight leading-none">StartUp <span className="text-blue-500">Guide</span></h1>
        </div>
        <nav>
          <ul></ul>
        </nav>
        <div className="actions flex gap-4 items-center">
          <button onClick={() => navigate("/auth/register")} className="signIn p-2 w-[120px] rounded-[12px] bg-blue-700 text-white font-bold shadow-lg shadow-blue-500/50">Começar</button>
          <button onClick={() => navigate("/auth/login")} className="signUp p-2 text-center rounded-[12px] border-2 border-blue-500 bg-transparent text-blue-500 font-bold flex text-nowap items-center justify-center">Entrar &nbsp; &nbsp;<i className="fi fi-rr-arrow-right-to-bracket flex"></i></button>
        </div>
      </div>
    </header>
  )
};
