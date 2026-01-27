
import React, { useState } from 'react';
import { Business } from '../types';
import Simulator from './Simulator';
import GlossaryTooltip from './GlossaryTooltip';

interface BusinessDetailsProps {
  business: Business;
  onBack: () => void;
}

type Tab = 'checklist' | 'viability' | 'bureaucracy' | 'expert';

const FALLBACK_HERO = 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=1200';

const BusinessDetails: React.FC<BusinessDetailsProps> = ({ business, onBack }) => {
  const [activeTab, setActiveTab] = useState<Tab>('checklist');

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    e.currentTarget.src = FALLBACK_HERO;
  };

  const tabs: { id: Tab; label: string; icon: React.ReactNode }[] = [
    { 
      id: 'checklist', 
      label: 'Execução', 
      icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" strokeWidth={2}/></svg> 
    },
    { 
      id: 'viability', 
      label: 'Viabilidade', 
      icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" strokeWidth={2}/></svg> 
    },
    { 
      id: 'bureaucracy', 
      label: 'Burocracia', 
      icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" strokeWidth={2}/></svg> 
    },
    { 
      id: 'expert', 
      label: 'Dicas', 
      icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" strokeWidth={2}/></svg> 
    },
  ];

  return (
    <div className="max-w-4xl mx-auto pb-20 px-4 pt-4">
      <button 
        onClick={onBack}
        className="mb-6 flex items-center gap-2 text-gray-500 hover:text-primaryBlue font-semibold transition-colors"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        Voltar para a busca
      </button>

      <div className="bg-white rounded-3xl overflow-hidden shadow-sm mb-8">
        {/* Banner Visual sem Texto */}
        <div className="h-64 relative bg-gray-200">
          <img 
            src={business.imageUrl} 
            alt={business.name} 
            onError={handleImageError}
            className="w-full h-full object-cover" 
          />
        </div>

        {/* Métricas Principais */}
        <div className="grid grid-cols-2 md:grid-cols-4 border-b border-gray-100 divide-x divide-gray-100">
          <div className="p-6 text-center">
            <div className="text-xs text-gray-400 font-bold uppercase mb-1">
              <GlossaryTooltip term="CAPEX">Investimento</GlossaryTooltip>
            </div>
            <div className="text-xl font-bold text-primaryBlue">R$ {business.financials.investment.toLocaleString('pt-BR')}</div>
          </div>
          <div className="p-6 text-center">
            <div className="text-xs text-gray-400 font-bold uppercase mb-1">Lucro Estimado</div>
            <div className="text-xl font-bold text-successGreen">R$ {business.financials.monthlyProfit.toLocaleString('pt-BR')}</div>
          </div>
          <div className="p-6 text-center">
            <div className="text-xs text-gray-400 font-bold uppercase mb-1">Retorno (Payback)</div>
            <div className="text-xl font-bold text-gray-800">{business.financials.roiMonths} meses</div>
          </div>
          <div className="p-6 text-center">
            <div className="text-xs text-gray-400 font-bold uppercase mb-1">
              <GlossaryTooltip term="Margem de Lucro">Margem</GlossaryTooltip>
            </div>
            <div className="text-xl font-bold text-gray-800">{(business.financials.margin * 100).toFixed(0)}%</div>
          </div>
        </div>

        {/* Identificação do Negócio (Deslocado para baixo das métricas) */}
        <div className="p-8 bg-gray-50">
          <span className="px-3 py-1 bg-primaryBlue/10 text-primaryBlue text-xs font-bold rounded-full mb-3 inline-block">
            {business.category}
          </span>
          <h2 className="text-3xl font-black text-primaryBlue mb-2 leading-tight">{business.name}</h2>
          <p className="text-gray-600 max-w-3xl leading-relaxed">{business.description}</p>
        </div>
      </div>

      <Simulator business={business} />

      <div className="mt-8">
        <div className="flex bg-gray-100 p-1 rounded-xl mb-6">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-lg text-sm font-bold transition-all ${
                activeTab === tab.id 
                  ? 'bg-white text-primaryBlue shadow-sm' 
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              {tab.icon}
              <span className="hidden sm:inline">{tab.label}</span>
            </button>
          ))}
        </div>

        <div className="bg-white rounded-2xl p-8 shadow-sm min-h-[400px]">
          {activeTab === 'checklist' && (
            <div className="animate-in fade-in slide-in-from-right-2 duration-300">
              <h4 className="text-xl font-bold text-gray-900 mb-6">Checklist de Execução</h4>
              <div className="space-y-8">
                <div>
                  <h5 className="text-xs font-black text-primaryBlue uppercase tracking-widest mb-3 flex items-center gap-2">
                    <span className="w-1.5 h-4 bg-primaryBlue rounded-full"></span> Equipamentos Necessários
                  </h5>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {business.checklist.equipment.map((item, i) => (
                      <div key={i} className="flex items-center gap-3 p-3 bg-appBg rounded-xl border border-gray-100">
                        <input type="checkbox" className="w-5 h-5 rounded border-gray-300 text-primaryBlue focus:ring-primaryBlue" />
                        <span className="text-sm font-medium text-gray-700">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <h5 className="text-xs font-black text-primaryBlue uppercase tracking-widest mb-3 flex items-center gap-2">
                    <span className="w-1.5 h-4 bg-primaryBlue rounded-full"></span> Equipe e Funções
                  </h5>
                  <div className="flex flex-wrap gap-2">
                    {business.checklist.team.map((role, i) => (
                      <span key={i} className="px-4 py-2 bg-blue-50 text-primaryBlue text-xs font-bold rounded-full border border-blue-100">
                        {role}
                      </span>
                    ))}
                  </div>
                </div>
                <div>
                  <h5 className="text-xs font-black text-primaryBlue uppercase tracking-widest mb-3 flex items-center gap-2">
                    <span className="w-1.5 h-4 bg-primaryBlue rounded-full"></span> Localização Ideal
                  </h5>
                  <ul className="list-disc list-inside space-y-2 text-sm text-gray-600">
                    {business.checklist.location.map((loc, i) => (
                      <li key={i}>{loc}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'viability' && (
            <div className="animate-in fade-in slide-in-from-right-2 duration-300">
              <h4 className="text-xl font-bold text-gray-900 mb-6">Mapa de Viabilidade e Riscos</h4>
              <div className="grid gap-6">
                <div className="p-5 border border-amber-100 bg-amber-50 rounded-2xl">
                  <h5 className="text-amber-800 font-bold mb-1 flex items-center gap-2">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" strokeWidth={2}/></svg>
                    Sazonalidade
                  </h5>
                  <p className="text-sm text-amber-900/70">{business.risks.seasonality}</p>
                </div>
                <div className="p-5 border border-red-100 bg-red-50 rounded-2xl">
                  <h5 className="text-red-800 font-bold mb-1 flex items-center gap-2">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" strokeWidth={2}/></svg>
                    Concorrência
                  </h5>
                  <p className="text-sm text-red-900/70">{business.risks.competition}</p>
                </div>
                <div className="p-5 border border-gray-100 bg-gray-50 rounded-2xl">
                  <h5 className="text-gray-800 font-bold mb-1 flex items-center gap-2">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" strokeWidth={2}/></svg>
                    Barreiras de Entrada
                  </h5>
                  <p className="text-sm text-gray-900/70">{business.risks.entryBarriers}</p>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'bureaucracy' && (
            <div className="animate-in fade-in slide-in-from-right-2 duration-300">
              <h4 className="text-xl font-bold text-gray-900 mb-6">Legalização Simplificada</h4>
              <div className="space-y-6">
                <div className="flex items-start gap-4 p-4 border border-gray-100 rounded-2xl bg-appBg">
                  <div className="p-3 bg-white rounded-xl shadow-sm">
                    <svg className="w-6 h-6 text-primaryBlue" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" strokeWidth={2}/>
                    </svg>
                  </div>
                  <div>
                    <h5 className="font-bold text-gray-800"><GlossaryTooltip term="CNAE">CNAE Recomendado</GlossaryTooltip></h5>
                    <p className="text-sm text-gray-600 font-mono bg-white px-2 py-1 rounded inline-block mt-1">{business.bureaucracy.cnae}</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 border border-gray-100 rounded-2xl bg-appBg">
                  <div className="p-3 bg-white rounded-xl shadow-sm">
                    <svg className="w-6 h-6 text-primaryBlue" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" strokeWidth={2}/>
                    </svg>
                  </div>
                  <div>
                    <h5 className="font-bold text-gray-800">Modelo de Formalização</h5>
                    <p className="text-sm text-gray-600 mt-1">{business.bureaucracy.legalType}</p>
                    <p className="text-[10px] text-gray-400 mt-1 uppercase font-bold tracking-wider">Consulte um contador para ME</p>
                  </div>
                </div>

                <div>
                  <h5 className="text-xs font-black text-primaryBlue uppercase tracking-widest mb-3 flex items-center gap-2">
                    Principais Alvarás
                  </h5>
                  <div className="space-y-2">
                    {business.bureaucracy.permits.map((permit, i) => (
                      <div key={i} className="flex items-center gap-3 text-sm text-gray-600">
                        <div className="w-1.5 h-1.5 bg-primaryBlue rounded-full"></div>
                        {permit}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'expert' && (
            <div className="animate-in fade-in slide-in-from-right-2 duration-300">
              <h4 className="text-xl font-bold text-gray-900 mb-6">Dicas de Especialistas</h4>
              <div className="space-y-4">
                {business.expertTips.map((tip, i) => (
                  <div key={i} className="p-5 border-l-4 border-successGreen bg-green-50 rounded-r-2xl">
                    <p className="text-gray-800 italic">"{tip}"</p>
                    <div className="mt-3 flex items-center gap-2">
                      <div className="w-6 h-6 bg-successGreen rounded-full flex items-center justify-center text-[10px] text-white font-bold">SG</div>
                      <span className="text-[10px] font-bold text-successGreen uppercase tracking-widest">Especialista StartUp Guide</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BusinessDetails;
