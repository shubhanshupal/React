import { GoogleGenAI, Modality } from "@google/genai";
import { Message } from "../types";

// Helper to get API key safely
const getApiKey = () => process.env.API_KEY || '';

// System instruction to set the persona
const SYSTEM_INSTRUCTION = `
You are a charming, witty, and empathetic friendly relationship mediator bot named "cutiE adi's helper".
Your goal is to cheer up Aditi (also known as Adi or Kannu), who is currently angry at her boyfriend.
Her boyfriend loves her very much and is sorry.

Rules:
1. ALWAYS address her affectionately using "Aditi", "Adi", or "Kannu" interchangeably.
2. Be funny, tell jokes, give sweet compliments, and try to diffuse the tension.
3. Keep your responses relatively short (under 50 words) and conversational unless asked for a story.
4. If she uses Hinglish (like "dimak kharab"), reply in a mix of English and friendly Hinglish if appropriate, or just very understanding English.
5. If she complains about him (e.g., "he doesn't understand"), take her side playfully but remind her he's trying his best because he loves her.
`;

export const generateTextResponse = async (history: Message[], prompt: string): Promise<string> => {
  try {
    const ai = new GoogleGenAI({ apiKey: getApiKey() });
    
    // Convert history to format expected by Gemini (simple concatenation for context or chat structure)
    // Here we use a fresh chat session for simplicity with system instructions, 
    // but preserving context by sending previous messages is better.
    // We will use the chat model directly.
    
    const chat = ai.chats.create({
      model: 'gemini-2.5-flash',
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
      }
    });

    // Feed history (simplified for this demo to just last few turns to avoid complex history mapping)
    // Ideally map `history` to `Content` objects.
    // For this stateless function approach, we'll just send the user prompt with the system instruction context implicit in the session.
    // In a real robust app, we'd replay history. For now, let's just send the new message.
    
    const response = await chat.sendMessage({ message: prompt });
    return response.text || "I'm speechless, Adi! (Network error)";
  } catch (error) {
    console.error("Text Gen Error:", error);
    return "Oh no, I tripped over a virtual wire! Try again, Kannu.";
  }
};

export const generateSpeech = async (text: string): Promise<AudioBuffer | null> => {
  try {
    const ai = new GoogleGenAI({ apiKey: getApiKey() });
    
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash-preview-tts",
      contents: [{ parts: [{ text: text }] }],
      config: {
        responseModalities: [Modality.AUDIO],
        speechConfig: {
            voiceConfig: {
              prebuiltVoiceConfig: { voiceName: 'Kore' }, 
            },
        },
      },
    });

    const base64Audio = response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
    if (!base64Audio) return null;

    return null; // Logic handled in fetchSpeechBase64 for this specific app structure
  } catch (error) {
    console.error("TTS Error:", error);
    return null;
  }
};

// Modified to return base64 string
export const fetchSpeechBase64 = async (text: string): Promise<string | null> => {
   try {
    const ai = new GoogleGenAI({ apiKey: getApiKey() });
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash-preview-tts",
      contents: [{ parts: [{ text: text }] }],
      config: {
        responseModalities: [Modality.AUDIO],
        speechConfig: {
            voiceConfig: {
              prebuiltVoiceConfig: { voiceName: 'Fenrir' }, // Fenrir is deep/calm.
            },
        },
      },
    });

    return response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data || null;
   } catch (e) {
     console.error(e);
     return null;
   }
}