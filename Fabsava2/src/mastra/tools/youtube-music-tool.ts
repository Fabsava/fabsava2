import { createTool } from '@mastra/core/tools';
import { z } from 'zod';

// YouTube Music arama tool'u
export const searchMusicTool = createTool({
  id: 'search-music',
  description: 'Search for music on YouTube Music',
  inputSchema: z.object({
    query: z.string().describe('Search query for music (song, artist, album)'),
  }),
  outputSchema: z.object({
    message: z.string(),
  }),
  execute: async ({ context }) => {
    return {
      message: `Searching for: ${context.query}`,
    };
  },
});

// Şarkı detayları tool'u
export const getSongDetailsTool = createTool({
  id: 'get-song-details',
  description: 'Get detailed information about a specific song',
  inputSchema: z.object({
    videoId: z.string().describe('YouTube video ID of the song'),
  }),
  outputSchema: z.object({
    message: z.string(),
  }),
  execute: async ({ context }) => {
    return {
      message: `Getting details for video: ${context.videoId}`,
    };
  },
});

// Playlist tool'u
export const getPlaylistTool = createTool({
  id: 'get-playlist',
  description: 'Get songs from a YouTube Music playlist',
  inputSchema: z.object({
    playlistId: z.string().describe('YouTube Music playlist ID'),
  }),
  outputSchema: z.object({
    message: z.string(),
  }),
  execute: async ({ context }) => {
    return {
      message: `Getting playlist: ${context.playlistId}`,
    };
  },
});

// Trend müzik tool'u
export const getTrendingMusicTool = createTool({
  id: 'get-trending-music',
  description: 'Get trending music on YouTube Music',
  inputSchema: z.object({
    country: z.string().optional().default('US').describe('Country code for trending music'),
  }),
  outputSchema: z.object({
    message: z.string(),
  }),
  execute: async ({ context }) => {
    return {
      message: `Getting trending music for: ${context.country}`,
    };
  },
});

// Get artist information tool
export const getArtistInfoTool = createTool({
  id: 'get-artist-info',
  description: 'Get information about an artist',
  inputSchema: z.object({
    artistId: z.string().describe('YouTube Music artist ID'),
  }),
  outputSchema: z.object({
    message: z.string(),
  }),
  execute: async ({ context }) => {
    return {
      message: `Getting artist info for: ${context.artistId}`,
    };
  },
});
