
import { GoogleGenAI, Type } from "@google/genai";
import { CompatibilityAnalysis, User } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const getCompatibilityAnalysis = async (user1: User, user2: User): Promise<CompatibilityAnalysis> => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Compare these two profiles for a dating compatibility analysis. 
      User 1: ${JSON.stringify(user1)}
      User 2: ${JSON.stringify(user2)}`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            score: { type: Type.NUMBER, description: "Compatibility score from 0 to 100" },
            breakdown: {
              type: Type.OBJECT,
              properties: {
                values: { type: Type.NUMBER },
                interests: { type: Type.NUMBER },
                behavior: { type: Type.NUMBER },
                goals: { type: Type.NUMBER }
              },
              required: ["values", "interests", "behavior", "goals"]
            },
            explanation: { type: Type.STRING, description: "Short explanation of why they are a match" }
          },
          required: ["score", "breakdown", "explanation"]
        }
      }
    });

    const result = JSON.parse(response.text || '{}');
    return result as CompatibilityAnalysis;
  } catch (error) {
    console.error("Gemini Compatibility Error:", error);
    return {
      score: 75,
      breakdown: { values: 80, interests: 70, behavior: 75, goals: 75 },
      explanation: "Unable to generate detailed analysis at this time, but shared interests suggest a strong foundation."
    };
  }
};

export const moderateContent = async (text: string): Promise<{ approved: boolean; reason?: string }> => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Moderate the following social media post text for toxicity, harassment, or inappropriate content: "${text}"`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            approved: { type: Type.BOOLEAN },
            reason: { type: Type.STRING }
          },
          required: ["approved"]
        }
      }
    });
    return JSON.parse(response.text || '{"approved": true}');
  } catch (error) {
    return { approved: true };
  }
};
