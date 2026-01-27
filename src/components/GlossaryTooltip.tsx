
import React, { useState } from 'react';
import { GLOSSARY } from '../constants';

interface GlossaryTooltipProps {
  term: keyof typeof GLOSSARY;
  children: React.ReactNode;
}

const GlossaryTooltip: React.FC<GlossaryTooltipProps> = ({ term, children }) => {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <span 
      className="relative inline-block cursor-help group"
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
      onClick={() => setIsVisible(!isVisible)}
    >
      <span className="border-b border-dotted border-primaryBlue text-primaryBlue font-medium">
        {children}
      </span>
      {isVisible && (
        <div className="absolute z-50 bottom-full left-1/2 -translate-x-1/2 mb-2 w-64 p-3 bg-white text-gray-800 text-xs rounded-lg shadow-xl border border-gray-100 animate-in fade-in slide-in-from-bottom-1">
          <div className="font-bold text-primaryBlue mb-1">{term}</div>
          <div>{GLOSSARY[term]}</div>
          <div className="absolute top-full left-1/2 -translate-x-1/2 border-8 border-transparent border-t-white"></div>
        </div>
      )}
    </span>
  );
};

export default GlossaryTooltip;
