const { GoogleGenerativeAI } = require('@google/generative-ai');

// Initialize Gemini AI with fallback
let genAI;
try {
  genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
} catch (error) {
  console.warn('Gemini API key not found. Using fallback recommendations.');
}

// Function to generate AI fashion recommendations
async function generateFashionRecommendation(userPreferences) {
  try {
    // If no API key is available, return fallback recommendations
    if (!genAI) {
      return generateFallbackRecommendation(userPreferences);
    }

    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    const prompt = `You are a professional fashion stylist. Given these preferences:
      Body Type: ${userPreferences.bodyType}
      Skin Tone: ${userPreferences.skinTone}
      Style: ${userPreferences.style}
      Gender: ${userPreferences.gender}
      Season: ${userPreferences.season}
      Occasion: ${userPreferences.occasion}
      Budget: ${userPreferences.budget}
      
      Please provide a detailed outfit recommendation that matches these preferences. Include:
      1. A complete outfit description with specific items
      2. Why this outfit works for the given preferences
      3. Style tips and suggestions
      4. Current fashion trends that complement this look
      
      Format your response in a clear, structured way with bullet points and sections.`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error('Error generating AI recommendation:', error);
    return generateFallbackRecommendation(userPreferences);
  }
}

// Fallback recommendation generator
function generateFallbackRecommendation(userPreferences) {
  return `Based on your preferences:
    • Body Type: ${userPreferences.bodyType}
    • Style: ${userPreferences.style}
    • Season: ${userPreferences.season}
    • Occasion: ${userPreferences.occasion}

    Here's a personalized outfit recommendation:

    1. Complete Outfit:
       - A well-fitted ${userPreferences.style} outfit suitable for ${userPreferences.season}
       - Colors that complement your ${userPreferences.skinTone} skin tone
       - Items appropriate for ${userPreferences.occasion}

    2. Why This Works:
       - Flatters your ${userPreferences.bodyType} body type
       - Matches your preferred ${userPreferences.style} style
       - Perfect for ${userPreferences.season} weather
       - Suitable for ${userPreferences.occasion} occasions

    3. Style Tips:
       - Focus on proper fit for your body type
       - Choose colors that enhance your natural features
       - Layer appropriately for the season
       - Accessorize to complete the look

    4. Current Trends:
       - Sustainable fashion choices
       - Mix of classic and modern pieces
       - Focus on comfort and style
       - Versatile wardrobe essentials`;
}

module.exports = {
  generateFashionRecommendation
}; 