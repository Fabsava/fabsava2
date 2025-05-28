# Fabsava2 - AI Assistant with Weather & Music

A powerful AI assistant built with Mastra framework that combines weather information and YouTube Music capabilities.

## 🌟 Features

### 🌤️ Weather Assistant

- Real-time weather information for any location
- Detailed weather data (temperature, humidity, wind, conditions)
- Multi-language location support
- Weather condition descriptions

### 🎵 YouTube Music Integration

- Search for songs, artists, albums, and playlists
- Get detailed song information including lyrics
- Artist information and discography
- Trending music by country
- Playlist exploration

### 🤖 AI Agents

- **Weather Agent**: Specialized weather assistant
- **Music Agent**: YouTube Music specialist
- **Music & Weather Agent**: Combined assistant that can suggest music based on weather conditions

## 🛠️ Technology Stack

- **Framework**: Mastra AI Framework
- **Model**: OpenAI GPT-4o-mini
- **Database**: LibSQL for memory storage
- **APIs**:
  - Open-Meteo (Weather data)
  - YouTube Music MCP Server
- **Language**: TypeScript
- **Deployment**: Smithery Platform

## 🚀 Getting Started

### Prerequisites

- Node.js >= 20.9.0
- npm or yarn
- Expo CLI (for mobile app)

### Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd Fabsava2
```

2. Install backend dependencies:

```bash
npm install
```

3. Install mobile app dependencies:

```bash
npm run mobile:install
```

### Running the Application

#### Backend Server

```bash
# Development server with auto-reload
npm run server:dev

# Or production server
npm run server
```

#### Mobile App

```bash
# Start Expo development server
npm run mobile

# Or manually
cd mobile-app
npx expo start
```

#### Full Stack Development

1. Start backend server: `npm run server:dev`
2. Start mobile app: `npm run mobile`
3. Scan QR code with Expo Go app on your phone

## 📁 Project Structure

```
Fabsava2/
├── src/
│   ├── mastra/
│   │   ├── agents/
│   │   │   ├── weather-agent.ts          # Weather specialist
│   │   │   ├── music-agent.ts            # Music specialist
│   │   │   └── music-weather-agent.ts    # Combined agent
│   │   ├── tools/
│   │   │   ├── weather-tool.ts           # Weather API integration
│   │   │   └── youtube-music-tool.ts     # YouTube Music MCP tools
│   │   └── index.ts                      # Main Mastra configuration
│   ├── api/
│   │   └── chat.ts                       # Chat API endpoints
│   └── server.ts                         # Express server
├── mobile-app/
│   ├── App.tsx                           # React Native mobile app
│   ├── package.json                      # Mobile dependencies
│   └── app.json                          # Expo configuration
├── package.json                          # Backend dependencies
├── smithery.yaml                         # Deployment configuration
└── Dockerfile
```

## 🔧 Configuration

### MCP Server Configuration

The YouTube Music MCP server is configured with:

- Server: `@Utku-Unluer/youtube-music-mcp`
- API Key: `d03796c0-558c-4e02-8f7f-a14fdf0c2db9`
- Profile: `international-fox-vDzpC6`

### Available Tools

#### Weather Tools

- `weatherTool`: Get current weather for any location

#### Music Tools

- `searchMusicTool`: Search for music on YouTube Music
- `getSongDetailsTool`: Get detailed song information
- `getArtistInfoTool`: Get artist information and discography
- `getPlaylistTool`: Get playlist contents
- `getTrendingMusicTool`: Get trending music by country

## 🎯 Usage Examples

### Weather Queries

- "What's the weather in New York?"
- "How's the weather in İstanbul today?"
- "Tell me about the weather conditions in Tokyo"

### Music Queries

- "Search for songs by Taylor Swift"
- "What's trending in music right now?"
- "Find me some relaxing music"
- "Get details about this song: [video-id]"

### Combined Queries

- "What's the weather like and suggest some music for this weather"
- "It's raining, what music would you recommend?"
- "Give me upbeat music for this sunny day"

## 🚀 Deployment

### Using Smithery

```bash
# Deploy to Smithery platform
npm run build
# Follow Smithery deployment instructions
```

### Using Docker

```bash
# Build Docker image
docker build -t fabsava2 .

# Run container
docker run -p 8080:8080 fabsava2
```

## 📊 API Endpoints

When deployed, the application exposes:

- HTTP endpoint on port 8080
- MCP endpoint at `/mcp`

## 🔍 Scripts

- `npm run dev`: Start development server
- `npm run build`: Build the project
- `npm run install-deps`: Install dependencies
- `npm run weather-forecast-mcp5`: Inspect weather MCP
- `npm run youtube-music-mcp`: Inspect YouTube Music MCP

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

ISC License

## 🆘 Support

For issues and questions:

1. Check the documentation
2. Review the code examples
3. Create an issue in the repository

---

Built with ❤️ using Mastra AI Framework
