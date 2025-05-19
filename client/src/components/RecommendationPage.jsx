import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import '../styles/RecommendationPage.css';

const RecommendationPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { recommendations, aiRecommendation, currentTrends } = location.state || {};

  const renderOutfitCard = (outfit) => (
    <div className="outfit-card" key={outfit.id}>
      <h2 className="outfit-title">{outfit.title}</h2>
      <div className="outfit-image">
        <img 
          src={outfit.image} 
          alt={outfit.title} 
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = 'https://via.placeholder.com/400x300?text=Outfit+Image';
          }}
        />
      </div>
      <div className="outfit-details">
        <p className="outfit-description">{outfit.description}</p>
        <p className="color-scheme">Color Scheme: {outfit.colorScheme}</p>
        
        <div className="items-grid">
          {outfit.items.map((item, index) => (
            <div className="item-card" key={index}>
              <h3>{item.type}</h3>
              <h4>{item.name}</h4>
              <p>{item.description}</p>
              <p className="price">{item.price}</p>
              <div className="shopping-links">
                {Object.entries(item.shoppingLinks).map(([platform, link]) => (
                  <a 
                    key={platform} 
                    href={link} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="shop-link"
                  >
                    {platform}
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderTrends = () => (
    <div className="trends-section">
      <h2>Current Fashion Trends</h2>
      <div className="trends-grid">
        <div className="trend-category">
          <h3>Popular Styles</h3>
          <ul>
            {currentTrends?.trends.map((trend, index) => (
              <li key={index}>{trend}</li>
            ))}
          </ul>
        </div>
        <div className="trend-category">
          <h3>Trending Colors</h3>
          <ul>
            {currentTrends?.colors.map((color, index) => (
              <li key={index}>{color}</li>
            ))}
          </ul>
        </div>
        <div className="trend-category">
          <h3>Popular Styles</h3>
          <ul>
            {currentTrends?.styles.map((style, index) => (
              <li key={index}>{style}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );

  return (
    <div className="recommendation-page">
      <button className="back-button" onClick={() => navigate('/')}>
        ← Back to Form
      </button>

      <div className="ai-recommendation">
        <h2>AI Style Expert's Recommendation</h2>
        <div className="ai-content">
          {aiRecommendation}
        </div>
      </div>

      {renderTrends()}

      <div className="outfits-section">
        <h2>Recommended Outfits</h2>
        <div className="outfits-grid">
          {recommendations?.map(renderOutfitCard)}
        </div>
      </div>
    </div>
  );
};

export default RecommendationPage; 