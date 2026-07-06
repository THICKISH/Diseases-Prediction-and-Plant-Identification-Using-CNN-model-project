import OpenAI from "openai";
import { SYSTEM_PROMPT } from "../prompts.js";
import { enrichWithHerbalCatalog } from "./herbalCatalog.js";

function fallbackResponse(language = "en") {
  if (language === "ta") {
    return {
      conditionSummary: "API கீ இல்லை",
      basicTips: [
        "backend/.env-ல் AI key சேர்க்கவும் (CHAT_PROVIDER பார்க்கவும்).",
        "Groq / Gemini / OpenAI கீய்களில் ஏதாவது ஒன்றை அமைக்கவும்."
      ],
      possibleMedicines: ["Paracetamol (லேபிள்/மருத்துவர் அறிவுரைப்படி மட்டும்)"],
      herbalRemedies: [
        {
          name: "துளசி கஷாயம்",
          howToUse: "துளசி இலைகளை நீரில் கொதிக்க வைத்து சூடாக குடிக்கவும்.",
          notes: "ஒவ்வாமை இருந்தால் தவிர்க்கவும்."
        }
      ],
      precautions: ["இது demo பதில். முழு AI பதிலுக்கு .env key தேவை."],
      emergencySigns: ["மூச்சுத் திணறல்", "மார்பு வலி", "தொடர்ந்த அதிக காய்ச்சல்"]
    };
  }

  return {
    conditionSummary: "API key missing",
    basicTips: [
      "Add a free key to backend/.env — see CHAT_PROVIDER in .env.example.",
      "Options: Groq (console.groq.com), Google Gemini (aistudio.google.com), or OpenAI."
    ],
    possibleMedicines: ["Paracetamol (only if suitable and label-approved)"],
    herbalRemedies: [
      {
        name: "Tulsi (Holy Basil) decoction",
        howToUse: "Boil tulsi leaves in warm water and sip.",
        notes: "Avoid if allergy or medical contraindication exists."
      }
    ],
    precautions: ["This is demo content until you set an AI API key in backend/.env"],
    emergencySigns: ["Severe chest pain, breathlessness, persistent high fever"]
  };
}

function langInstruction(language) {
  return language === "ta"
    ? "Respond ONLY in simple Tamil. Keep all JSON field values in Tamil text. Do not use English except medicine names when needed."
    : "Respond in clear simple English.";
}

async function callOpenAIChat({ apiKey, baseURL, model, userMessage, language }) {
  const client = baseURL
    ? new OpenAI({ apiKey, baseURL })
    : new OpenAI({ apiKey });
  const completion = await client.chat.completions.create({
    model,
    response_format: { type: "json_object" },
    messages: [
      { role: "system", content: SYSTEM_PROMPT },
      {
        role: "user",
        content: `${langInstruction(language)}\n\nSymptoms/User Query: ${userMessage}`
      }
    ],
    temperature: 0.2
  });
  const content = completion.choices?.[0]?.message?.content || "{}";
  return JSON.parse(content);
}

async function callGemini({ userMessage, language }) {
  const apiKey = process.env.GEMINI_API_KEY;
  const model = process.env.GEMINI_MODEL || "gemini-2.0-flash";
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(
    model
  )}:generateContent?key=${encodeURIComponent(apiKey)}`;

  const body = {
    systemInstruction: { parts: [{ text: SYSTEM_PROMPT }] },
    contents: [
      {
        role: "user",
        parts: [
          {
            text: `${langInstruction(language)}\n\nSymptoms/User Query: ${userMessage}`
          }
        ]
      }
    ],
    generationConfig: {
      temperature: 0.2,
      responseMimeType: "application/json"
    }
  };

  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body)
  });

  if (!res.ok) {
    const errText = await res.text();
    throw new Error(`Gemini HTTP ${res.status}: ${errText}`);
  }

  const data = await res.json();
  const text = data.candidates?.[0]?.content?.parts?.[0]?.text || "{}";
  return JSON.parse(text);
}

function resolveProvider() {
  const explicit = (process.env.CHAT_PROVIDER || "").toLowerCase().trim();
  if (explicit === "openai" || explicit === "groq" || explicit === "gemini") {
    return explicit;
  }
  if (process.env.OPENAI_API_KEY) return "openai";
  if (process.env.GROQ_API_KEY) return "groq";
  if (process.env.GEMINI_API_KEY) return "gemini";
  return null;
}

export async function getMedicalChatResponse(userMessage, language = "en") {
  const provider = resolveProvider();
  if (!provider) {
    return enrichWithHerbalCatalog(fallbackResponse(language), userMessage, language);
  }

  try {
    if (provider === "groq") {
      if (!process.env.GROQ_API_KEY) {
        return enrichWithHerbalCatalog(fallbackResponse(language), userMessage, language);
      }
      const model = process.env.GROQ_MODEL || "llama-3.1-8b-instant";
      const raw = await callOpenAIChat({
        apiKey: process.env.GROQ_API_KEY,
        baseURL: "https://api.groq.com/openai/v1",
        model,
        userMessage,
        language
      });
      return enrichWithHerbalCatalog(raw, userMessage, language);
    }

    if (provider === "gemini") {
      if (!process.env.GEMINI_API_KEY) {
        return enrichWithHerbalCatalog(fallbackResponse(language), userMessage, language);
      }
      const raw = await callGemini({ userMessage, language });
      return enrichWithHerbalCatalog(raw, userMessage, language);
    }

    if (provider === "openai") {
      if (!process.env.OPENAI_API_KEY) {
        return enrichWithHerbalCatalog(fallbackResponse(language), userMessage, language);
      }
      const model = process.env.OPENAI_MODEL || "gpt-4o-mini";
      const raw = await callOpenAIChat({
        apiKey: process.env.OPENAI_API_KEY,
        baseURL: undefined,
        model,
        userMessage,
        language
      });
      return enrichWithHerbalCatalog(raw, userMessage, language);
    }
  } catch (e) {
    console.error("Chat provider error:", e.message || e);
    const failed = {
      ...fallbackResponse(language),
      conditionSummary: language === "ta" ? "AI கோரிக்கை தோல்வி" : "AI request failed",
      basicTips:
        language === "ta"
          ? [
              `Provider: ${provider}. Error: ${e.message || String(e)}`,
              "model பெயர், API key, quota ஆகியவற்றை backend/.env.example படி சரிபார்க்கவும்."
            ]
          : [
              `Provider: ${provider}. Error: ${e.message || String(e)}`,
              "Check model name, API key, and quota. See backend/.env.example."
            ]
    };
    return enrichWithHerbalCatalog(failed, userMessage, language);
  }

  return enrichWithHerbalCatalog(fallbackResponse(language), userMessage, language);
}
