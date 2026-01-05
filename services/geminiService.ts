
import { GoogleGenAI } from "@google/genai";
import { AspectRatio } from "../types";

/**
 * AI Insight for specific retreats
 */
export const getRetreatAIInsights = async (retreatTitle: string, description: string) => {
  try {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Generate a short "AI Insight" for this retreat. Focus on who would benefit most and a "vibe" summary in 3 bullet points. 
      Title: ${retreatTitle}
      Description: ${description}`,
      config: {
        temperature: 0.7,
      },
    });
    return response.text;
  } catch (error) {
    console.error("Gemini AI error:", error);
    return "AI Insights currently unavailable. This retreat is perfect for those seeking peace and renewal.";
  }
};

/**
 * Generate an AI Sanctuary Visual
 */
export const generateSanctuaryVisual = async (prompt: string, aspectRatio: AspectRatio = "16:9") => {
  try {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: {
        parts: [
          {
            text: `A high-end, hyper-realistic, atmospheric wellness sanctuary scene. Theme: ${prompt}. Cinematic lighting, 8k resolution, serene colors, professional architectural photography style, no people, peaceful environment.`,
          },
        ],
      },
      config: {
        imageConfig: {
          aspectRatio: aspectRatio
        }
      }
    });

    for (const part of response.candidates?.[0]?.content?.parts || []) {
      if (part.inlineData) {
        return `data:image/png;base64,${part.inlineData.data}`;
      }
    }
    return null;
  } catch (error) {
    console.error("Image generation error:", error);
    return null;
  }
};

/**
 * Specific Concierge for a retreat
 */
export const askZenAI = async (question: string, retreatContext: any) => {
  try {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    const prompt = `
      You are Zen Brain AI, an expert concierge for ZenMarket retreats.
      RETREAT DETAILS:
      Title: ${retreatContext.title}
      Price: $${retreatContext.price}
      Location: ${retreatContext.location.city}, ${retreatContext.location.country}
      
      USER QUESTION: ${question}
      Answer accurately and professionally. Keep it under 80 words.
    `;
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
    });
    return response.text;
  } catch (error) {
    return "I'm focusing on my breath right now. Please ask again in a moment.";
  }
};

/**
 * Global Marketplace Assistant (Deep Brain AI)
 */
export const askDeepBrainAI = async (message: string, allRetreats: any[]) => {
  try {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    const contextSummary = allRetreats.slice(0, 10).map(r => `${r.title} in ${r.location.country} ($${r.price})`).join(', ');
    
    const prompt = `
      You are the "Deep Brain AI" for ZenMarket, a global wellness marketplace with 450+ retreats.
      
      MARKETPLACE CONTEXT:
      - Total retreats: 450
      - Categories: Yoga, Meditation, Detox, Leadership, Healing, etc.
      - Sample listings: ${contextSummary}...
      
      USER REQUEST: "${message}"
      
      YOUR ROLE:
      1. Act as a high-level wellness architect.
      2. If they ask for recommendations, suggest categories or countries based on their vibe.
      3. Be encouraging, spiritual, yet professional.
      4. Always mention that ZenMarket has a full event calendar for browsing.
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-3-pro-preview',
      contents: prompt,
      config: {
        temperature: 0.8,
        thinkingConfig: { thinkingBudget: 0 }
      }
    });
    return response.text;
  } catch (error) {
    console.error("Deep Brain AI Error:", error);
    return "The collective consciousness is a bit cloudy. How else can I assist your search for peace?";
  }
};

/**
 * AI Insight for a specific date on the calendar
 */
export const getCalendarDayInsight = async (date: string, events: any[]) => {
  try {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    const eventTitles = events.map(e => `${e.title} (${e.category})`).join(', ');
    const prompt = `
      I am looking at ${date} on my wellness calendar.
      The following retreats are starting or active: ${eventTitles}.
      
      Act as a Zen Concierge. Give a 2-sentence summary of why this date is special for someone looking for a retreat, and pick the "Best Value" or "Most Transformative" option from the list. 
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
      config: { temperature: 0.7 }
    });
    return response.text;
  } catch (error) {
    return "This date offers a beautiful array of opportunities for growth and stillness.";
  }
};

/**
 * Personalized recommendations for the dashboard
 */
export const getPersonalizedRecommendations = async (interests: string[]) => {
  try {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Based on the user's interests: ${interests.join(', ')}, provide a short, inspiring recommendation (one sentence) for their next wellness retreat.`,
      config: {
        temperature: 0.8,
      },
    });
    return response.text;
  } catch (error) {
    console.error("Personalized Recs Error:", error);
    return "Find a peaceful forest retreat to reconnect with your practice.";
  }
};

/**
 * AI Trip Planner: Generates a detailed itinerary
 */
export interface TripPlanParams {
  type: string;
  duration: number;
  budget: number;
  interests: string;
}

export const generateItinerary = async (params: TripPlanParams) => {
  try {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    const prompt = `
      You are the "Zen Journey Architect". Create a premium wellness trip itinerary.
      
      TRIP PARAMETERS:
      - Type: ${params.type}
      - Duration: ${params.duration} days
      - Budget: $${params.budget}
      - Interests: ${params.interests}
      
      REQUIRED OUTPUT (Markdown format):
      1. **Overview**: A 2-sentence summary of the trip's spirit.
      2. **Suggested Retreat Style**: What kind of center or location matches this best.
      3. **Day-by-Day Journey**: High-level focus for each day.
      4. **Travel Tips**: 3 practical tips for this specific type of travel.
      
      Be inspiring, professional, and use wellness-oriented language.
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-3-pro-preview',
      contents: prompt,
      config: {
        temperature: 0.8,
        thinkingConfig: { thinkingBudget: 32768 }
      }
    });
    return response.text;
  } catch (error) {
    console.error("Itinerary Error:", error);
    return "I was unable to visualize your journey at this moment. Please try again when the stars align.";
  }
};
