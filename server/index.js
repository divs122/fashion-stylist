const express = require('express');
const cors = require('cors');
const axios = require('axios');
const { generateFashionRecommendation } = require('./ai-service');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Enhanced outfit database with more options and shopping platforms
const outfits = {
  casual: [
    {
      id: 1,
      title: "Casual Summer Day",
      description: "A comfortable and stylish casual outfit perfect for summer days",
      colorScheme: "Light Blue, White, and Denim",
      image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=800&auto=format&fit=crop&q=60",
      items: [
        {
          type: "Top",
          name: "Light Blue T-Shirt",
          description: "Comfortable cotton t-shirt in light blue",
          price: "$25",
          shoppingLinks: {
            "Amazon": "https://www.amazon.com",
            "H&M": "https://www.hm.com",
            "Zara": "https://www.zara.com"
          }
        },
        {
          type: "Bottom",
          name: "Blue Denim Jeans",
          description: "Classic blue denim jeans",
          price: "$45",
          shoppingLinks: {
            "Levi's": "https://www.levi.com",
            "Gap": "https://www.gap.com",
            "Uniqlo": "https://www.uniqlo.com"
          }
        },
        {
          type: "Shoes",
          name: "White Sneakers",
          description: "Clean white sneakers",
          price: "$60",
          shoppingLinks: {
            "Nike": "https://www.nike.com",
            "Adidas": "https://www.adidas.com",
            "Puma": "https://www.puma.com"
          }
        }
      ]
    },
    {
      id: 2,
      title: "Street Style Casual",
      description: "Modern street style outfit with urban vibes",
      colorScheme: "Black, White, and Gray",
      image: "https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?w=800&auto=format&fit=crop&q=60",
      items: [
        {
          type: "Top",
          name: "Graphic T-Shirt",
          description: "Urban graphic print t-shirt",
          price: "$30",
          shoppingLinks: {
            "Urban Outfitters": "https://www.urbanoutfitters.com",
            "ASOS": "https://www.asos.com",
            "Zara": "https://www.zara.com"
          }
        },
        {
          type: "Bottom",
          name: "Black Cargo Pants",
          description: "Stylish cargo pants with multiple pockets",
          price: "$55",
          shoppingLinks: {
            "H&M": "https://www.hm.com",
            "Zara": "https://www.zara.com",
            "Uniqlo": "https://www.uniqlo.com"
          }
        },
        {
          type: "Shoes",
          name: "Black Sneakers",
          description: "Comfortable black sneakers",
          price: "$70",
          shoppingLinks: {
            "Nike": "https://www.nike.com",
            "Adidas": "https://www.adidas.com",
            "Puma": "https://www.puma.com"
          }
        }
      ]
    }
  ],
  formal: [
    {
      id: 3,
      title: "Business Professional",
      description: "Classic business professional outfit",
      colorScheme: "Navy Blue, White, and Black",
      image: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=800&auto=format&fit=crop&q=60",
      items: [
        {
          type: "Top",
          name: "White Dress Shirt",
          description: "Crisp white formal shirt",
          price: "$45",
          shoppingLinks: {
            "Charles Tyrwhitt": "https://www.ctshirts.com",
            "Hugo Boss": "https://www.hugoboss.com",
            "Brooks Brothers": "https://www.brooksbrothers.com"
          }
        },
        {
          type: "Bottom",
          name: "Navy Blue Suit Pants",
          description: "Tailored navy blue suit pants",
          price: "$120",
          shoppingLinks: {
            "Hugo Boss": "https://www.hugoboss.com",
            "Brooks Brothers": "https://www.brooksbrothers.com",
            "Ralph Lauren": "https://www.ralphlauren.com"
          }
        },
        {
          type: "Shoes",
          name: "Black Oxford Shoes",
          description: "Classic black leather oxford shoes",
          price: "$150",
          shoppingLinks: {
            "Allen Edmonds": "https://www.allenedmonds.com",
            "Cole Haan": "https://www.colehaan.com",
            "Johnston & Murphy": "https://www.johnstonmurphy.com"
          }
        }
      ]
    }
  ],
  streetwear: [
    {
      id: 4,
      title: "Urban Street Style",
      description: "Modern streetwear outfit with urban aesthetics",
      colorScheme: "Black, Red, and White",
      image: "https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?w=800&auto=format&fit=crop&q=60",
      items: [
        {
          type: "Top",
          name: "Oversized Hoodie",
          description: "Comfortable oversized hoodie",
          price: "$65",
          shoppingLinks: {
            "Supreme": "https://www.supremenewyork.com",
            "Palace": "https://www.palaceskateboards.com",
            "Nike": "https://www.nike.com"
          }
        },
        {
          type: "Bottom",
          name: "Cargo Joggers",
          description: "Stylish cargo joggers",
          price: "$55",
          shoppingLinks: {
            "Nike": "https://www.nike.com",
            "Adidas": "https://www.adidas.com",
            "Puma": "https://www.puma.com"
          }
        },
        {
          type: "Shoes",
          name: "Limited Edition Sneakers",
          description: "Exclusive limited edition sneakers",
          price: "$200",
          shoppingLinks: {
            "Nike": "https://www.nike.com",
            "Adidas": "https://www.adidas.com",
            "StockX": "https://www.stockx.com"
          }
        }
      ]
    }
  ],
  boho: [
    {
      id: 5,
      title: "Bohemian Dream",
      description: "Free-spirited bohemian style outfit",
      colorScheme: "Earth Tones, Cream, and Brown",
      image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=800&auto=format&fit=crop&q=60",
      items: [
        {
          type: "Top",
          name: "Embroidered Blouse",
          description: "Flowy embroidered blouse",
          price: "$45",
          shoppingLinks: {
            "Free People": "https://www.freepeople.com",
            "Urban Outfitters": "https://www.urbanoutfitters.com",
            "Anthropologie": "https://www.anthropologie.com"
          }
        },
        {
          type: "Bottom",
          name: "Maxi Skirt",
          description: "Flowy maxi skirt with ethnic print",
          price: "$60",
          shoppingLinks: {
            "Free People": "https://www.freepeople.com",
            "Urban Outfitters": "https://www.urbanoutfitters.com",
            "Anthropologie": "https://www.anthropologie.com"
          }
        },
        {
          type: "Shoes",
          name: "Leather Sandals",
          description: "Handcrafted leather sandals",
          price: "$80",
          shoppingLinks: {
            "Free People": "https://www.freepeople.com",
            "Urban Outfitters": "https://www.urbanoutfitters.com",
            "Anthropologie": "https://www.anthropologie.com"
          }
        }
      ]
    }
  ]
};

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
    
    // Get outfits for the selected style
    let styleOutfits = outfits[style] || [];
    
    // If no specific style is selected, return outfits from all styles
    if (!style) {
      styleOutfits = Object.values(outfits).flat();
    }

    // Add current trends to each outfit
    const recommendations = styleOutfits.map(outfit => ({
      ...outfit,
      currentTrends
    }));

    res.json(recommendations);
  } catch (error) {
    console.error('Error getting recommendations:', error);
    res.status(500).json({ 
      error: 'Failed to get recommendations',
      details: error.message 
    });
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