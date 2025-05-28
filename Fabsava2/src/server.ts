import express from 'express';
import cors from 'cors';
import { handleChatRequest, getAvailableAgents } from './api/chat';

const app = express();
const PORT = process.env.PORT || 8080;

// Middleware
app.use(cors({
  origin: ['http://localhost:19006', 'http://localhost:3000', 'exp://192.168.1.100:19000'], // Expo ve web için
  credentials: true,
}));
app.use(express.json());

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// Chat API
app.post('/api/chat', handleChatRequest);

// Agents API
app.get('/api/agents', getAvailableAgents);

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Fabsava Music API server running on port ${PORT}`);
  console.log(`📱 Mobile app can connect to: http://localhost:${PORT}`);
  console.log(`🌐 Web interface: http://localhost:${PORT}/health`);
});

export default app;
