
import React from 'react';
import { Business } from '../types';

interface BusinessCardProps {
  business: Business;
  onClick: (business: Business) => void;
}

const FALLBACK_IMAGE = 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=1000';

const BusinessCard: React.FC<BusinessCardProps> = ({ business, onClick }) => {
  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    e.currentTarget.src = FALLBACK_IMAGE;
  };

  return (
    <div 
      onClick={() => onClick(business)}
      className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 cursor-pointer group flex flex-col h-full border border-transparent hover:border-gray-200"
    >
      <div className="relative h-48 overflow-hidden bg-gray-100">
        <img 
          src={business.imageUrl} 
          alt={business.name}
          onError={handleImageError}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
          loading="lazy"
        />
        <div className="absolute top-4 left-4 flex gap-2">
          <span className="px-3 py-1 bg-white/90 backdrop-blur-md text-primaryBlue text-[10px] font-bold uppercase rounded-full shadow-sm">
            {business.category}
          </span>
          {business.isFeatured && (
            <span className="px-3 py-1 bg-successGreen text-white text-[10px] font-bold uppercase rounded-full shadow-sm flex items-center gap-1">
              <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              Destaque
            </span>
          )}
        </div>
      </div>
      
      <div className="p-5 flex flex-col flex-grow">
        <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-primaryBlue transition-colors">
          {business.name}
        </h3>
        <p className="text-sm text-gray-500 line-clamp-2 mb-4">
          {business.description}
        </p>
        
        <div className="mt-auto space-y-3 pt-4 border-t border-gray-50">
          <div className="flex justify-between items-center text-sm">
            <span className="text-gray-400">Investimento</span>
            <span className="font-bold text-gray-900">R$ {business.financials.investment.toLocaleString('pt-BR')}</span>
          </div>
          <div className="flex justify-between items-center text-sm">
            <span className="text-gray-400">Lucro Estimado</span>
            <span className="font-bold text-successGreen">R$ {business.financials.monthlyProfit.toLocaleString('pt-BR')}/mês</span>
          </div>
          <div className="flex justify-between items-center text-sm">
            <span className="text-gray-400">Tempo de Retorno</span>
            <span className="font-medium text-primaryBlue px-2 py-0.5 bg-blue-50 rounded">{business.financials.roiMonths} meses</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BusinessCard;
