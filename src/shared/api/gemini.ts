const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

const GEMINI_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`;

export const sendToGemini = async (prompt: string): Promise<string> => {
  try {
    const response = await fetch(GEMINI_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [{ text: prompt }],
          },
        ],
      }),
    });

    const data = await response.json();

    if (data.candidates && data.candidates.length > 0) {
      return data.candidates[0].content.parts[0].text;
    } else {
      return "AI не дал ответа.";
    }
  } catch (error) {
    console.error("Ошибка при запросе к Gemini:", error);
    return "Произошла ошибка при запросе к Gemini.";
  }
};
