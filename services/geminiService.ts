
import { GoogleGenAI } from "@google/genai";

/**
 * AI Insight for specific retreats
 */
export const getRetreatAIInsights = async (retreatTitle: string, description: string) => {
  try {
    // Instantiate right before use to ensure most up-to-date API key from the environment
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
 * Specific Concierge for a retreat
 */
export const askZenAI = async (question: string, retreatContext: any) => {
  try {
    // Instantiate right before use to ensure most up-to-date API key from the environment
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
    // Instantiate right before use to ensure most up-to-date API key from the environment
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    // We send a summary of the marketplace context
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
      model: 'gemini-3-pro-preview', // Use Pro for the 'Deep Brain' advanced reasoning
      contents: prompt,
      config: {
        temperature: 0.8,
        thinkingConfig: { thinkingBudget: 0 } // Standard chat response prioritizing latency
      }
    });
    return response.text;
  } catch (error) {
    console.error("Deep Brain AI Error:", error);
    return "The collective consciousness is a bit cloudy. How else can I assist your search for peace?";
  }
};

/**
 * Personalized recommendations for the dashboard based on user interests
 * Fixes the error in Dashboard.tsx by providing the missing export
 */
export const getPersonalizedRecommendations = async (interests: string[]) => {
  try {
    // Instantiate right before use to ensure most up-to-date API key from the environment
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
