
import { GoogleGenAI, Type } from "@google/genai";
import { SongAnalysis } from "../types";

const GEN_AI_MODEL = 'gemini-3-flash-preview';

export const analyzeSong = async (file: File): Promise<SongAnalysis> => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
  
  // Convert file to base64
  const base64Data = await new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result as string;
      const base64 = result.split(',')[1];
      resolve(base64);
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });

  const response = await ai.models.generateContent({
    model: GEN_AI_MODEL,
    contents: [
      {
        parts: [
          {
            inlineData: {
              mimeType: file.type,
              data: base64Data,
            },
          },
          {
            text: "Analyze this audio/video song. Extract the full lyrics and provide structured information about the song's title, artist, genre, mood, themes, and a brief musical analysis.",
          },
        ],
      },
    ],
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          title: { type: Type.STRING },
          artist: { type: Type.STRING },
          lyrics: { type: Type.STRING },
          genre: { type: Type.STRING },
          mood: { type: Type.STRING },
          themes: {
            type: Type.ARRAY,
            items: { type: Type.STRING },
          },
          musicalAnalysis: { type: Type.STRING },
        },
        required: ["title", "artist", "lyrics", "genre", "mood", "themes", "musicalAnalysis"],
      },
    },
  });

  const text = response.text;
  if (!text) throw new Error("No response from AI");
  
  return JSON.parse(text) as SongAnalysis;
};
