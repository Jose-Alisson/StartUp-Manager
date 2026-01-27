
import React, { useState, useEffect } from 'react';
import { Business } from '../types';
import GlossaryTooltip from './GlossaryTooltip';

interface SimulatorProps {
  business: Business;
}

const Simulator: React.FC<SimulatorProps> = ({ business }) => {
  const [userInvestment, setUserInvestment] = useState(business.financials.investment);
  const [projections, setProjections] = useState({
    revenue: 0,
    netProfit: 0,
    roi: 0
  });

  useEffect(() => {
    // Basic simulation logic based on sector margins
    const margin = business.financials.margin;
    const estMonthlyRevenue = (userInvestment * 0.4); // Simplified: Assume monthly revenue is ~40% of Capex for small businesses
    const estMonthlyProfit = estMonthlyRevenue * margin;
    const estRoi = estMonthlyProfit > 0 ? (userInvestment / estMonthlyProfit) : 0;

    setProjections({
      revenue: estMonthlyRevenue,
      netProfit: estMonthlyProfit,
      roi: estRoi
    });
  }, [userInvestment, business]);

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
      <h3 className="text-xl font-bold text-primaryBlue mb-4 flex items-center gap-2">
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
        </svg>
        Simulador de Investimento
      </h3>

      <div className="mb-8">
        <div className="flex justify-between items-center mb-2">
          <label className="text-sm font-semibold text-gray-600">Quanto você pretende investir?</label>
          <span className="text-primaryBlue font-bold text-lg">R$ {userInvestment.toLocaleString('pt-BR')}</span>
        </div>
        <input 
          type="range" 
          min={business.financials.investment * 0.5} 
          max={business.financials.investment * 3} 
          step={500}
          value={userInvestment}
          onChange={(e) => setUserInvestment(Number(e.target.value))}
          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-primaryBlue"
        />
        <div className="flex justify-between text-xs text-gray-400 mt-1">
          <span>Iniciante</span>
          <span>Escalável</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-4 bg-gray-50 rounded-lg border border-gray-100">
          <div className="text-xs text-gray-500 uppercase font-bold mb-1">Faturamento Estimado</div>
          <div className="text-xl font-bold text-gray-800">R$ {projections.revenue.toLocaleString('pt-BR', { maximumFractionDigits: 0 })}/mês</div>
          <div className="text-[10px] text-gray-400 mt-1">*Baseado no setor de {business.category}</div>
        </div>
        
        <div className="p-4 bg-green-50 rounded-lg border border-green-100">
          <div className="text-xs text-green-600 uppercase font-bold mb-1">
            Lucro Líquido
          </div>
          <div className="text-xl font-bold text-successGreen">R$ {projections.netProfit.toLocaleString('pt-BR', { maximumFractionDigits: 0 })}/mês</div>
          <div className="text-[10px] text-green-600 mt-1">Margem de {(business.financials.margin * 100).toFixed(0)}%</div>
        </div>

        <div className="p-4 bg-blue-50 rounded-lg border border-blue-100">
          <div className="text-xs text-blue-600 uppercase font-bold mb-1">
            <GlossaryTooltip term="ROI">Tempo de Retorno</GlossaryTooltip>
          </div>
          <div className="text-xl font-bold text-primaryBlue">{projections.roi.toFixed(1)} meses</div>
          <div className="text-[10px] text-blue-600 mt-1">Estimativa de payback</div>
        </div>
      </div>
    </div>
  );
};

export default Simulator;
