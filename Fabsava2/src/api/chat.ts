import { Request, Response } from 'express';
import { mastra } from '../mastra/index';

export async function handleChatRequest(req: Request, res: Response) {
  try {
    const { message, agent = 'musicWeatherAgent' } = req.body;

    if (!message || typeof message !== 'string') {
      return res.status(400).json({
        error: 'Message is required and must be a string',
      });
    }

    // Agent'ı seç
    const selectedAgent = mastra.agents[agent];
    if (!selectedAgent) {
      return res.status(400).json({
        error: `Agent '${agent}' not found. Available agents: ${Object.keys(mastra.agents).join(', ')}`,
      });
    }

    // Agent ile konuş
    const response = await selectedAgent.generate(message, {
      userId: req.ip || 'anonymous',
    });

    return res.json({
      response: response.text,
      agent: agent,
      timestamp: new Date().toISOString(),
    });

  } catch (error) {
    console.error('Chat API Error:', error);
    return res.status(500).json({
      error: 'Internal server error',
      message: error instanceof Error ? error.message : 'Unknown error',
    });
  }
}

export async function getAvailableAgents(req: Request, res: Response) {
  try {
    const agents = Object.keys(mastra.agents).map(key => ({
      id: key,
      name: mastra.agents[key].name,
    }));

    return res.json({
      agents,
      default: 'musicWeatherAgent',
    });
  } catch (error) {
    console.error('Agents API Error:', error);
    return res.status(500).json({
      error: 'Internal server error',
    });
  }
}
