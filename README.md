# AI-Powered Fashion Stylist

An intelligent fashion recommendation system that provides personalized outfit suggestions based on user preferences and current fashion trends.

## Features

- AI-powered outfit recommendations
- Real-time fashion trends
- Multiple shopping platform links (Amazon, H&M, Zara, Myntra, ASOS, Uniqlo)
- Personalized suggestions based on:
  - Body Type
  - Skin Tone
  - Style Preferences
  - Gender
  - Budget
  - Season
  - Occasion

## Tech Stack

- Frontend: React.js
- Backend: Node.js, Express.js
- AI Integration: Google Gemini AI
- Styling: CSS3

## Setup Instructions

1. Clone the repository:
```bash
git clone https://github.com/yourusername/fashion-stylist.git
cd fashion-stylist
```

2. Install backend dependencies:
```bash
cd server
npm install
```

3. Install frontend dependencies:
```bash
cd ../client
npm install
```

4. Create a `.env` file in the server directory:
```
PORT=5000
GEMINI_API_KEY=your_gemini_api_key_here
```

5. Start the backend server:
```bash
cd server
node index.js
```

6. Start the frontend development server:
```bash
cd client
npm start
```

7. Open http://localhost:3000 in your browser

## Usage

1. Fill out the preference form with your:
   - Body Type
   - Skin Tone
   - Style
   - Gender
   - Budget
   - Season
   - Occasion

2. Click "Get Recommendations" to receive:
   - AI-powered outfit suggestions
   - Current fashion trends
   - Detailed outfit items with shopping links

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details. 