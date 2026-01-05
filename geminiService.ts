
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const getFashionAdvice = async (items: string[]) => {
  if (items.length === 0) return "Add items to get styling tips!";
  
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `You are a high-end fashion consultant for a luxury Indo-Western store. The customer has selected: ${items.join(", ")}. Provide a short, elegant 2-sentence styling advice summary (matching shoes, watches, or occasion suitability).`,
      config: {
        temperature: 0.7,
      }
    });
    return response.text || "No advice available at this moment.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Error getting fashion advice.";
  }
};
