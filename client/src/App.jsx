import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './App.css';
import RecommendationPage from './components/RecommendationPage';

const Form = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    bodyType: '',
    skinTone: '',
    style: '',
    gender: '',
    budget: '',
    season: '',
    occasion: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';
      
      // Get AI recommendation
      const aiResponse = await axios.post(`${API_URL}/api/ai-recommendation`, formData);
      
      // Get regular recommendations
      const recommendationsResponse = await axios.post(`${API_URL}/api/recommendations`, formData);
      
      if (!recommendationsResponse.data || recommendationsResponse.data.length === 0) {
        throw new Error('No outfits found for your preferences. Try different style options.');
      }
      
      // Navigate to recommendations page with data
      navigate('/recommendations', {
        state: {
          aiRecommendation: aiResponse.data.recommendation,
          recommendations: recommendationsResponse.data,
          currentTrends: aiResponse.data.currentTrends
        }
      });
    } catch (err) {
      const errorMessage = err.response?.data?.details || err.response?.data?.error || err.message || 'Failed to fetch recommendations';
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="form-container">
      <h1>AI Fashion Stylist</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Body Type:</label>
          <select name="bodyType" value={formData.bodyType} onChange={handleChange} required>
            <option value="">Select Body Type</option>
            <option value="pear">Pear</option>
            <option value="rectangle">Rectangle</option>
            <option value="hourglass">Hourglass</option>
            <option value="apple">Apple</option>
          </select>
        </div>

        <div className="form-group">
          <label>Skin Tone:</label>
          <select name="skinTone" value={formData.skinTone} onChange={handleChange} required>
            <option value="">Select Skin Tone</option>
            <option value="fair">Fair</option>
            <option value="medium">Medium</option>
            <option value="dark">Dark</option>
            <option value="olive">Olive</option>
          </select>
        </div>

        <div className="form-group">
          <label>Style:</label>
          <select name="style" value={formData.style} onChange={handleChange} required>
            <option value="">Select Style</option>
            <option value="casual">Casual</option>
            <option value="formal">Formal</option>
            <option value="streetwear">Streetwear</option>
            <option value="boho">Boho</option>
          </select>
        </div>

        <div className="form-group">
          <label>Gender:</label>
          <select name="gender" value={formData.gender} onChange={handleChange} required>
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </div>

        <div className="form-group">
          <label>Budget:</label>
          <select name="budget" value={formData.budget} onChange={handleChange} required>
            <option value="">Select Budget</option>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>

        <div className="form-group">
          <label>Season:</label>
          <select name="season" value={formData.season} onChange={handleChange} required>
            <option value="">Select Season</option>
            <option value="summer">Summer</option>
            <option value="winter">Winter</option>
            <option value="fall">Fall</option>
            <option value="spring">Spring</option>
          </select>
        </div>

        <div className="form-group">
          <label>Occasion:</label>
          <select name="occasion" value={formData.occasion} onChange={handleChange} required>
            <option value="">Select Occasion</option>
            <option value="college">College</option>
            <option value="office">Office</option>
            <option value="party">Party</option>
            <option value="casual">Casual</option>
          </select>
        </div>

        {error && <div className="error-message">{error}</div>}
        
        <button type="submit" disabled={loading}>
          {loading ? 'Getting Recommendations...' : 'Get Recommendations'}
        </button>
      </form>
    </div>
  );
};

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Form />} />
        <Route path="/recommendations" element={<RecommendationPage />} />
      </Routes>
    </Router>
  );
};

export default App; 