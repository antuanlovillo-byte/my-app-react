import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const SYSTEM_INSTRUCTION = `Eres un asistente pastoral católico amable, sabio y ortodoxo.
Tus respuestas deben ser consistentes con la teología católica, el Catecismo y la tradición de la Iglesia.
Utiliza un tono respetuoso, sereno y empático.
Si se te pide una oración, compón una oración hermosa o proporciona una tradicional.
Si se te pide consejo, ofrece consuelo espiritual basado en la fe.
Mantén las respuestas concisas pero significativas, a menos que se solicite una explicación detallada.`;

export const generateDailyReflection = async (): Promise<{ title: string; content: string; quote: string }> => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: "Genera una breve reflexión espiritual católica para hoy. Incluye un título inspirador, un pasaje bíblico corto (cita) y un cuerpo de reflexión de unos 2 párrafos.",
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        responseMimeType: "application/json",
        responseSchema: {
          type: "OBJECT",
          properties: {
            title: { type: "STRING" },
            quote: { type: "STRING" },
            content: { type: "STRING" }
          }
        }
      }
    });

    const jsonText = response.text;
    if (!jsonText) throw new Error("No text returned");
    return JSON.parse(jsonText);

  } catch (error) {
    console.error("Error generating reflection:", error);
    return {
      title: "Paz y Bien",
      quote: "Venid a mí todos los que estáis trabajados y cargados, y yo os haré descansar. - Mateo 11:28",
      content: "Hoy es un buen día para recordar que no estamos solos en nuestras luchas. La gracia de Dios es suficiente para cada momento. Tómate un momento para respirar y agradecer por el don de la vida."
    };
  }
};

export const chatWithChaplain = async (message: string, history: {role: string, parts: {text: string}[]}[]): Promise<string> => {
    try {
        const chat = ai.chats.create({
            model: 'gemini-3-flash-preview',
            config: {
                systemInstruction: SYSTEM_INSTRUCTION,
            },
            history: history
        });

        const response = await chat.sendMessage({ message });
        return response.text || "Lo siento, no puedo responder en este momento. Por favor, intenta orar en silencio por un momento.";
    } catch (error) {
        console.error("Chat error:", error);
        return "Hubo un error al conectar con el asistente espiritual. Por favor verifica tu conexión.";
    }
}

export const generateSpecificPrayer = async (intention: string): Promise<string> => {
    try {
        const response = await ai.models.generateContent({
            model: 'gemini-3-flash-preview',
            contents: `Escribe una oración católica corta y hermosa para la siguiente intención: "${intention}".`,
            config: {
                systemInstruction: SYSTEM_INSTRUCTION
            }
        });
        return response.text || "Señor, escucha nuestra oración.";
    } catch (error) {
        return "Dios todopoderoso, ponemos esta intención en tus manos divinas. Hágase tu voluntad. Amén.";
    }
}