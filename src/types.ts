
export type Category = 'Varejo' | 'Gastronomia' | 'Automotivo' | 'Saúde/Beleza' | 'Serviços Gerais';

export interface FinancialData {
  investment: number;
  monthlyProfit: number;
  roiMonths: number;
  margin: number;
}

export interface Checklist {
  equipment: string[];
  team: string[];
  location: string[];
}

export interface RiskAnalysis {
  seasonality: string;
  competition: string;
  entryBarriers: string;
}

export interface Bureaucracy {
  cnae: string;
  legalType: string;
  permits: string[];
}

export interface Business {
  id: string;
  name: string;
  category: Category;
  description: string;
  imageUrl: string;
  isFeatured: boolean;
  financials: FinancialData;
  checklist: Checklist;
  risks: RiskAnalysis;
  bureaucracy: Bureaucracy;
  expertTips: string[];
}

export type AppState = 'feed' | 'details' | 'search';
