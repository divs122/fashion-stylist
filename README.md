# AI Fashion Stylist

An intelligent fashion recommendation system that provides personalized outfit suggestions based on user preferences and current fashion trends.

## Features

- AI-powered outfit recommendations
- Real-time fashion trends
- Personalized style suggestions based on:
  - Body type
  - Skin tone
  - Style preferences
  - Budget
  - Season
  - Occasion
- Shopping links for each item
- Modern, responsive UI
- Multiple outfit categories:
  - Casual
  - Formal
  - Streetwear
  - Boho

## Tech Stack

- Frontend:
  - React
  - React Router
  - Axios
  - CSS3

- Backend:
  - Node.js
  - Express
  - Google Gemini AI
  - CORS

## Setup Instructions

1. Clone the repository:
```bash
git clone https://github.com/yourusername/ai-fashion-stylist.git
cd ai-fashion-stylist
```

2. Install backend dependencies:
```bash
cd server
npm install
```

3. Create a `.env` file in the server directory:
```
PORT=5000
GEMINI_API_KEY=your_gemini_api_key
```

4. Install frontend dependencies:
```bash
cd ../client
npm install
```

5. Start the backend server:
```bash
cd ../server
node index.js
```

6. Start the frontend development server:
```bash
cd ../client
npm start
```

7. Open http://localhost:3000 in your browser

## Project Structure

```
ai-fashion-stylist/
├── client/                 # Frontend React application
│   ├── public/
│   └── src/
│       ├── components/     # React components
│       ├── styles/         # CSS files
│       └── App.jsx         # Main application component
├── server/                 # Backend Node.js application
│   ├── ai-service.js       # AI integration service
│   └── index.js           # Main server file
├── .gitignore
└── README.md
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details. 