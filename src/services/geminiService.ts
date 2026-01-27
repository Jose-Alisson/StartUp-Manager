
import { GoogleGenAI } from "@google/genai";
import { Business, Category } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export async function searchNewBusinessIdea(query: string): Promise<Business | null> {
  if (!process.env.API_KEY) return null;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Gere uma estrutura de dados JSON para um novo modelo de negócio baseado no seguinte tema: "${query}". 
      Siga exatamente esta interface TypeScript:
      interface Business {
        name: string;
        category: 'Varejo' | 'Gastronomia' | 'Automotivo' | 'Saúde/Beleza' | 'Serviços Gerais';
        description: string;
        imageUrl: string; // IMPORTANTE: Gere uma URL temática usando: https://loremflickr.com/1000/700/[ALWAYS-USE-ENGLISH-KEYWORDS-HERE]
        isFeatured: boolean;
        financials: { investment: number; monthlyProfit: number; roiMonths: number; margin: number; };
        checklist: { equipment: string[]; team: string[]; location: string[]; };
        risks: { seasonality: string; competition: string; entryBarriers: string; };
        bureaucracy: { cnae: string; legalType: string; permits: string[]; };
        expertTips: string[];
      }
      Utilize dados médios do mercado brasileiro (Sebrae/Associações). 
      Responda APENAS o JSON puro. Não inclua Markdown.`,
      config: {
        tools: [{ googleSearch: {} }],
        responseMimeType: "application/json",
      }
    });

    const jsonText = response.text.trim();
    const data = JSON.parse(jsonText);
    return { ...data, id: Math.random().toString(36).substr(2, 9) };
  } catch (error) {
    console.error("Error generating business plan:", error);
    return null;
  }
}
