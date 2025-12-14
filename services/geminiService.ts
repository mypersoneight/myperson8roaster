import { GoogleGenAI } from "@google/genai";
import { RoastRequest } from '../types';
import { SYSTEM_INSTRUCTION, PERSONA_PROMPTS, LEVEL_INSTRUCTIONS } from '../constants';

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const generateRoast = async (request: RoastRequest): Promise<string> => {
  try {
    const model = 'gemini-2.5-flash';
    
    const personaInstruction = PERSONA_PROMPTS[request.persona];
    const levelInstruction = LEVEL_INSTRUCTIONS[request.level];
    
    const prompt = `
      TASK: Generate a roast.
      
      PARAMETERS:
      - Target Criticism/Context: "${request.criticism}"
      - Roast Category: ${request.category}
      - Persona: ${request.persona}
      - Intensity Level: ${request.level} / 5
      
      INSTRUCTIONS:
      1. ${personaInstruction}
      2. ${levelInstruction}
      3. Focus the roast specifically on their ${request.category}.
      4. Keep it under 280 characters.
      
      RESPONSE:
    `;

    const response = await ai.models.generateContent({
      model,
      contents: prompt,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        temperature: 0.8 + (request.level * 0.1), // Increase chaos with level
      }
    });

    return response.text || "I'm speechless. Not because you got me, but because I'm rebooting.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    throw new Error("My wit circuits are fried. Try again later.");
  }
};
