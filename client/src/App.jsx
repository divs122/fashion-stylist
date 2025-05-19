import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [formData, setFormData] = useState({
    bodyType: '',
    skinTone: '',
    style: '',
    gender: '',
    budget: '',
    season: '',
    occasion: ''
  });
  const [recommendations, setRecommendations] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    
    try {
      // Get AI recommendation
      const aiResponse = await axios.post('http://localhost:5000/api/ai-recommendation', formData);
      
      // Get regular recommendations
      const regularResponse = await axios.post('http://localhost:5000/api/recommendations', formData);
      
      setRecommendations({
        aiRecommendation: aiResponse.data.recommendation,
        currentTrends: aiResponse.data.currentTrends,
        outfits: regularResponse.data
      });
    } catch (error) {
      console.error('Error:', error);
      const errorMessage = error.response?.data?.details || error.response?.data?.error || error.message;
      setError(`Failed to fetch recommendations: ${errorMessage}`);
    } finally {
      setLoading(false);
    }
  };

  const renderShoppingLinks = (links) => {
    return (
      <div className="shopping-links">
        {Object.entries(links).map(([store, url]) => (
          <a 
            key={store} 
            href={url} 
            target="_blank" 
            rel="noopener noreferrer"
            className="store-link"
          >
            {store.charAt(0).toUpperCase() + store.slice(1)}
          </a>
        ))}
      </div>
    );
  };

  const renderTrends = (trends) => {
    if (!trends) return null;
    return (
      <div className="trends-section">
        <h4>Current Trends</h4>
        <div className="trends-grid">
          <div className="trend-category">
            <h5>Popular Styles</h5>
            <ul>
              {trends.trends.map((trend, index) => (
                <li key={index}>{trend}</li>
              ))}
            </ul>
          </div>
          <div className="trend-category">
            <h5>Trending Colors</h5>
            <ul>
              {trends.colors.map((color, index) => (
                <li key={index}>{color}</li>
              ))}
            </ul>
          </div>
          <div className="trend-category">
            <h5>Popular Styles</h5>
            <ul>
              {trends.styles.map((style, index) => (
                <li key={index}>{style}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="app">
      <header>
        <h1>Virtual Fashion Stylist</h1>
        <p>Get personalized outfit recommendations based on your preferences</p>
      </header>

      <form onSubmit={handleSubmit}>
        <div>
          <label>Body Type</label>
          <select name="bodyType" value={formData.bodyType} onChange={handleChange} required>
            <option value="">Select Body Type</option>
            <option value="pear">Pear</option>
            <option value="apple">Apple</option>
            <option value="hourglass">Hourglass</option>
            <option value="rectangle">Rectangle</option>
          </select>
        </div>
        <div>
          <label>Skin Tone</label>
          <select name="skinTone" value={formData.skinTone} onChange={handleChange} required>
            <option value="">Select Skin Tone</option>
            <option value="fair">Fair</option>
            <option value="medium">Medium</option>
            <option value="olive">Olive</option>
            <option value="dark">Dark</option>
          </select>
        </div>
        <div>
          <label>Style</label>
          <select name="style" value={formData.style} onChange={handleChange} required>
            <option value="">Select Style</option>
            <option value="casual">Casual</option>
            <option value="formal">Formal</option>
            <option value="streetwear">Streetwear</option>
            <option value="boho">Boho</option>
            <option value="ethnic">Ethnic</option>
            <option value="sporty">Sporty</option>
          </select>
        </div>
        <div>
          <label>Gender</label>
          <select name="gender" value={formData.gender} onChange={handleChange} required>
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
        </div>
        <div>
          <label>Budget</label>
          <input 
            type="text" 
            name="budget" 
            value={formData.budget} 
            onChange={handleChange} 
            placeholder="Enter Budget (e.g., $100-200)" 
            required 
          />
        </div>
        <div>
          <label>Season</label>
          <select name="season" value={formData.season} onChange={handleChange} required>
            <option value="">Select Season</option>
            <option value="summer">Summer</option>
            <option value="winter">Winter</option>
            <option value="spring">Spring</option>
            <option value="fall">Fall</option>
          </select>
        </div>
        <div>
          <label>Occasion</label>
          <select name="occasion" value={formData.occasion} onChange={handleChange} required>
            <option value="">Select Occasion</option>
            <option value="college">College</option>
            <option value="party">Party</option>
            <option value="office">Office</option>
          </select>
        </div>
        <button type="submit">Get Recommendations</button>
      </form>

      {error && <div className="error">{error}</div>}
      
      {loading && (
        <div className="loading">
          <div className="spinner"></div>
          <p>Getting your personalized recommendations...</p>
        </div>
      )}

      {recommendations && (
        <div className="recommendations">
          {recommendations.aiRecommendation && (
            <div className="ai-recommendation">
              <h2>AI Style Expert Recommendation</h2>
              <div className="recommendation-content">
                {recommendations.aiRecommendation}
              </div>
            </div>
          )}

          {recommendations.currentTrends && (
            <div className="trends-section">
              <h2>Current Fashion Trends</h2>
              <div className="trends-grid">
                <div className="trend-category">
                  <h3>Popular Styles</h3>
                  <ul>
                    {recommendations.currentTrends.trends.map((trend, index) => (
                      <li key={index}>{trend}</li>
                    ))}
                  </ul>
                </div>
                <div className="trend-category">
                  <h3>Trending Colors</h3>
                  <ul>
                    {recommendations.currentTrends.colors.map((color, index) => (
                      <li key={index}>{color}</li>
                    ))}
                  </ul>
                </div>
                <div className="trend-category">
                  <h3>Popular Styles</h3>
                  <ul>
                    {recommendations.currentTrends.styles.map((style, index) => (
                      <li key={index}>{style}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          )}

          <h2>Recommended Outfits</h2>
          <div className="outfits-grid">
            {recommendations.outfits.map((outfit) => (
              <div key={outfit.id} className="outfit-card">
                <h3>{outfit.title}</h3>
                <img src={outfit.image} alt={outfit.title} />
                <p className="outfit-description">{outfit.description}</p>
                <div className="color-scheme">
                  <p>Color Scheme: {outfit.colorScheme}</p>
                </div>
                {renderTrends(outfit.currentTrends)}
                <div className="outfit-items">
                  {outfit.items.map((item, itemIndex) => (
                    <div key={itemIndex} className="item-card">
                      <div className="item-header">
                        <h4>{item.type}</h4>
                        <span className="item-price">{item.price}</span>
                      </div>
                      <h5 className="item-name">{item.name}</h5>
                      <p className="item-description">{item.description}</p>
                      {renderShoppingLinks(item.shoppingLinks)}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default App; 