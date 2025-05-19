const express = require('express');
const cors = require('cors');
const axios = require('axios');
const { generateFashionRecommendation } = require('./ai-service');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Enhanced outfit database with more options and shopping platforms
const outfits = [
  {
    id: 1,
    title: 'Casual Summer Outfit',
    image: 'https://example.com/casual-summer.jpg',
    description: 'A light and comfortable outfit perfect for summer days.',
    colorScheme: 'Blue and White',
    items: [
      {
        type: 'Top',
        name: 'Light Blue Cotton T-Shirt',
        description: 'Breathable cotton t-shirt with a relaxed fit',
        price: '$29.99',
        shoppingLinks: {
          amazon: 'https://amazon.com/casual-tshirt',
          hnm: 'https://www2.hm.com/casual-tshirt',
          zara: 'https://www.zara.com/casual-tshirt',
          myntra: 'https://www.myntra.com/casual-tshirt',
          asos: 'https://www.asos.com/casual-tshirt',
          uniqlo: 'https://www.uniqlo.com/casual-tshirt'
        }
      },
      {
        type: 'Bottom',
        name: 'White Denim Shorts',
        description: 'Classic white denim shorts with a comfortable fit',
        price: '$39.99',
        shoppingLinks: {
          amazon: 'https://amazon.com/white-shorts',
          hnm: 'https://www2.hm.com/white-shorts',
          zara: 'https://www.zara.com/white-shorts',
          myntra: 'https://www.myntra.com/white-shorts',
          asos: 'https://www.asos.com/white-shorts',
          uniqlo: 'https://www.uniqlo.com/white-shorts'
        }
      },
      {
        type: 'Shoes',
        name: 'White Canvas Sneakers',
        description: 'Classic white sneakers for everyday wear',
        price: '$49.99',
        shoppingLinks: {
          amazon: 'https://amazon.com/white-sneakers',
          hnm: 'https://www2.hm.com/white-sneakers',
          zara: 'https://www.zara.com/white-sneakers',
          myntra: 'https://www.myntra.com/white-sneakers',
          asos: 'https://www.asos.com/white-sneakers',
          uniqlo: 'https://www.uniqlo.com/white-sneakers'
        }
      },
      {
        type: 'Accessories',
        name: 'Silver Chain Necklace',
        description: 'Minimalist silver chain necklace',
        price: '$19.99',
        shoppingLinks: {
          amazon: 'https://amazon.com/silver-necklace',
          hnm: 'https://www2.hm.com/silver-necklace',
          zara: 'https://www.zara.com/silver-necklace'
        }
      }
    ],
    bodyType: ['pear', 'rectangle'],
    skinTone: ['fair', 'medium'],
    style: 'casual',
    gender: 'female',
    budget: 'low',
    season: 'summer',
    occasion: 'college'
  },
  {
    id: 2,
    title: 'Formal Winter Outfit',
    image: 'https://example.com/formal-winter.jpg',
    description: 'A sophisticated outfit perfect for formal occasions.',
    colorScheme: 'Black and Grey',
    items: [
      {
        type: 'Top',
        name: 'Black Silk Blouse',
        description: 'Elegant silk blouse with a modern cut',
        price: '$89.99',
        shoppingLinks: {
          amazon: 'https://amazon.com/silk-blouse',
          hnm: 'https://www2.hm.com/silk-blouse',
          zara: 'https://www.zara.com/silk-blouse',
          myntra: 'https://www.myntra.com/silk-blouse',
          asos: 'https://www.asos.com/silk-blouse',
          uniqlo: 'https://www.uniqlo.com/silk-blouse'
        }
      },
      {
        type: 'Bottom',
        name: 'Grey Wool Trousers',
        description: 'Tailored wool trousers for a professional look',
        price: '$129.99',
        shoppingLinks: {
          amazon: 'https://amazon.com/wool-trousers',
          hnm: 'https://www2.hm.com/wool-trousers',
          zara: 'https://www.zara.com/wool-trousers',
          myntra: 'https://www.myntra.com/wool-trousers',
          asos: 'https://www.asos.com/wool-trousers',
          uniqlo: 'https://www.uniqlo.com/wool-trousers'
        }
      },
      {
        type: 'Shoes',
        name: 'Black Leather Heels',
        description: 'Classic black leather heels for formal occasions',
        price: '$79.99',
        shoppingLinks: {
          amazon: 'https://amazon.com/leather-heels',
          hnm: 'https://www2.hm.com/leather-heels',
          zara: 'https://www.zara.com/leather-heels'
        }
      },
      {
        type: 'Accessories',
        name: 'Gold Hoop Earrings',
        description: 'Elegant gold hoop earrings',
        price: '$29.99',
        shoppingLinks: {
          amazon: 'https://amazon.com/gold-hoops',
          hnm: 'https://www2.hm.com/gold-hoops',
          zara: 'https://www.zara.com/gold-hoops'
        }
      }
    ],
    bodyType: ['hourglass', 'apple'],
    skinTone: ['medium', 'dark'],
    style: 'formal',
    gender: 'female',
    budget: 'high',
    season: 'winter',
    occasion: 'office'
  },
  {
    id: 3,
    title: 'Streetwear Urban Look',
    image: 'https://example.com/streetwear.jpg',
    description: 'Modern streetwear outfit with urban vibes.',
    colorScheme: 'Black and Red',
    items: [
      {
        type: 'Top',
        name: 'Oversized Graphic T-Shirt',
        description: 'Urban graphic t-shirt with bold design',
        price: '$45.99',
        shoppingLinks: {
          amazon: 'https://amazon.com/graphic-tshirt',
          hnm: 'https://www2.hm.com/graphic-tshirt',
          zara: 'https://www.zara.com/graphic-tshirt',
          myntra: 'https://www.myntra.com/graphic-tshirt',
          asos: 'https://www.asos.com/graphic-tshirt',
          uniqlo: 'https://www.uniqlo.com/graphic-tshirt'
        }
      },
      {
        type: 'Bottom',
        name: 'Cargo Pants',
        description: 'Urban cargo pants with multiple pockets',
        price: '$59.99',
        shoppingLinks: {
          amazon: 'https://amazon.com/cargo-pants',
          hnm: 'https://www2.hm.com/cargo-pants',
          zara: 'https://www.zara.com/cargo-pants',
          myntra: 'https://www.myntra.com/cargo-pants',
          asos: 'https://www.asos.com/cargo-pants',
          uniqlo: 'https://www.uniqlo.com/cargo-pants'
        }
      }
    ],
    bodyType: ['rectangle', 'pear'],
    skinTone: ['fair', 'medium', 'dark'],
    style: 'streetwear',
    gender: 'male',
    budget: 'medium',
    season: 'fall',
    occasion: 'college'
  },
  {
    id: 4,
    title: 'Boho Summer Festival',
    image: 'https://example.com/boho-summer.jpg',
    description: 'Free-spirited boho outfit perfect for festivals.',
    colorScheme: 'Earth Tones',
    items: [
      {
        type: 'Top',
        name: 'Crochet Crop Top',
        description: 'Handmade crochet top with boho pattern',
        price: '$35.99',
        shoppingLinks: {
          amazon: 'https://amazon.com/crochet-top',
          hnm: 'https://www2.hm.com/crochet-top',
          zara: 'https://www.zara.com/crochet-top',
          myntra: 'https://www.myntra.com/crochet-top',
          asos: 'https://www.asos.com/crochet-top',
          uniqlo: 'https://www.uniqlo.com/crochet-top'
        }
      },
      {
        type: 'Bottom',
        name: 'Maxi Skirt',
        description: 'Flowing maxi skirt with ethnic print',
        price: '$49.99',
        shoppingLinks: {
          amazon: 'https://amazon.com/maxi-skirt',
          hnm: 'https://www2.hm.com/maxi-skirt',
          zara: 'https://www.zara.com/maxi-skirt',
          myntra: 'https://www.myntra.com/maxi-skirt',
          asos: 'https://www.asos.com/maxi-skirt',
          uniqlo: 'https://www.uniqlo.com/maxi-skirt'
        }
      }
    ],
    bodyType: ['hourglass', 'pear'],
    skinTone: ['fair', 'medium', 'olive'],
    style: 'boho',
    gender: 'female',
    budget: 'medium',
    season: 'summer',
    occasion: 'party'
  }
];

// Enable CORS for all routes
app.use(cors({
  origin: 'http://localhost:3000',
  methods: ['GET', 'POST'],
  credentials: true
}));

app.use(express.json());

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Server error:', err);
  res.status(500).json({ error: 'Internal server error' });
});

// Function to fetch real-time fashion trends
async function fetchFashionTrends() {
  try {
    // This is a placeholder for actual API integration
    return {
      trends: ['oversized', 'minimalist', 'sustainable'],
      colors: ['sage green', 'terracotta', 'navy'],
      styles: ['athleisure', 'workwear', 'vintage']
    };
  } catch (error) {
    console.error('Error fetching fashion trends:', error);
    return null;
  }
}

// Recommendations endpoint
app.post('/api/recommendations', async (req, res) => {
  try {
    const { bodyType, skinTone, style, gender, budget, season, occasion } = req.body;
    
    // Get current fashion trends
    const currentTrends = await fetchFashionTrends();
    
    // Filter outfits based on user preferences
    const filteredOutfits = outfits.filter(outfit => {
      return (
        outfit.bodyType.includes(bodyType) &&
        outfit.skinTone.includes(skinTone) &&
        outfit.style === style &&
        outfit.gender === gender &&
        outfit.season === season &&
        outfit.occasion === occasion
      );
    });

    // Add current trends to each outfit
    const recommendations = filteredOutfits.map(outfit => ({
      ...outfit,
      currentTrends
    }));

    res.json(recommendations);
  } catch (error) {
    console.error('Error getting recommendations:', error);
    res.status(500).json({ error: 'Failed to get recommendations' });
  }
});

// AI Recommendation endpoint
app.post('/api/ai-recommendation', async (req, res) => {
  try {
    const userPreferences = req.body;
    
    // Generate AI recommendation
    const aiRecommendation = await generateFashionRecommendation(userPreferences);
    
    // Get current fashion trends
    const currentTrends = await fetchFashionTrends();
    
    // Combine AI recommendation with current trends
    const response = {
      recommendation: aiRecommendation,
      currentTrends
    };

    res.json(response);
  } catch (error) {
    console.error('Error getting AI recommendation:', error);
    res.status(500).json({ 
      error: 'Failed to get AI recommendation',
      details: error.message 
    });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
}); 