import { Mastra } from '@mastra/core/mastra';
import { PinoLogger } from '@mastra/loggers';
import { LibSQLStore } from '@mastra/libsql';
import { MCPClient } from '@mastra/mcp';

import { weatherAgent } from './agents/weather-agent';
import { musicWeatherAgent } from './agents/music-weather-agent';
import { musicAgent } from './agents/music-agent';

// YouTube Music MCP Client
export const youtubeMusicMCP = new MCPClient({
  servers: {
    'youtube-music-mcp': {
      command: 'npx',
      args: [
        '-y',
        '@smithery/cli@latest',
        'run',
        '@Utku-Unluer/youtube-music-mcp',
        '--key',
        'd03796c0-558c-4e02-8f7f-a14fdf0c2db9',
        '--profile',
        'international-fox-vDzpC6'
      ],
    },
  },
});

export const mastra = new Mastra({
  agents: { weatherAgent, musicWeatherAgent, musicAgent },
  storage: new LibSQLStore({
    url: ":memory:",
  }),
  logger: new PinoLogger({
    name: 'Mastra',
    level: 'info',
  }),
});
