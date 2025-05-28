import { createTool } from '@mastra/core/tools';
import { MCPClient } from '@mastra/mcp';
import { z } from 'zod';

// YouTube Music MCP Client configuration
const youtubeMusicMCP = new MCPClient({
  servers: {
    'youtube-music-mcp': {
      command: 'npx',
      type: 'stdio',
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

// Search music tool
export const searchMusicTool = createTool({
  id: 'search-music',
  description: 'Search for music on YouTube Music',
  inputSchema: z.object({
    query: z.string().describe('Search query for music (song, artist, album)'),
    limit: z.number().optional().default(10).describe('Number of results to return (default: 10)'),
  }),
  outputSchema: z.object({
    results: z.array(z.object({
      title: z.string(),
      artist: z.string(),
      album: z.string().optional(),
      duration: z.string().optional(),
      videoId: z.string(),
      thumbnails: z.array(z.object({
        url: z.string(),
        width: z.number(),
        height: z.number(),
      })).optional(),
    })),
    query: z.string(),
    totalResults: z.number(),
  }),
  execute: async ({ context }) => {
    try {
      const result = await youtubeMusicMCP.callTool('youtube-music-mcp', 'search', {
        query: context.query,
        limit: context.limit,
      });
      
      return {
        results: result.results || [],
        query: context.query,
        totalResults: result.results?.length || 0,
      };
    } catch (error) {
      throw new Error(`Failed to search music: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  },
});

// Get song details tool
export const getSongDetailsTool = createTool({
  id: 'get-song-details',
  description: 'Get detailed information about a specific song',
  inputSchema: z.object({
    videoId: z.string().describe('YouTube video ID of the song'),
  }),
  outputSchema: z.object({
    title: z.string(),
    artist: z.string(),
    album: z.string().optional(),
    duration: z.string(),
    videoId: z.string(),
    description: z.string().optional(),
    viewCount: z.number().optional(),
    likeCount: z.number().optional(),
    thumbnails: z.array(z.object({
      url: z.string(),
      width: z.number(),
      height: z.number(),
    })).optional(),
    lyrics: z.string().optional(),
  }),
  execute: async ({ context }) => {
    try {
      const result = await youtubeMusicMCP.callTool('youtube-music-mcp', 'get_song_details', {
        videoId: context.videoId,
      });
      
      return result;
    } catch (error) {
      throw new Error(`Failed to get song details: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
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
    name: z.string(),
    description: z.string().optional(),
    subscriberCount: z.string().optional(),
    thumbnails: z.array(z.object({
      url: z.string(),
      width: z.number(),
      height: z.number(),
    })).optional(),
    topSongs: z.array(z.object({
      title: z.string(),
      videoId: z.string(),
      duration: z.string().optional(),
    })).optional(),
    albums: z.array(z.object({
      title: z.string(),
      browseId: z.string(),
      year: z.string().optional(),
    })).optional(),
  }),
  execute: async ({ context }) => {
    try {
      const result = await youtubeMusicMCP.callTool('youtube-music-mcp', 'get_artist', {
        artistId: context.artistId,
      });
      
      return result;
    } catch (error) {
      throw new Error(`Failed to get artist info: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  },
});

// Get playlist tool
export const getPlaylistTool = createTool({
  id: 'get-playlist',
  description: 'Get songs from a YouTube Music playlist',
  inputSchema: z.object({
    playlistId: z.string().describe('YouTube Music playlist ID'),
    limit: z.number().optional().default(50).describe('Number of songs to return (default: 50)'),
  }),
  outputSchema: z.object({
    title: z.string(),
    description: z.string().optional(),
    trackCount: z.number(),
    duration: z.string().optional(),
    thumbnails: z.array(z.object({
      url: z.string(),
      width: z.number(),
      height: z.number(),
    })).optional(),
    tracks: z.array(z.object({
      title: z.string(),
      artist: z.string(),
      album: z.string().optional(),
      duration: z.string().optional(),
      videoId: z.string(),
    })),
  }),
  execute: async ({ context }) => {
    try {
      const result = await youtubeMusicMCP.callTool('youtube-music-mcp', 'get_playlist', {
        playlistId: context.playlistId,
        limit: context.limit,
      });
      
      return result;
    } catch (error) {
      throw new Error(`Failed to get playlist: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  },
});

// Get trending music tool
export const getTrendingMusicTool = createTool({
  id: 'get-trending-music',
  description: 'Get trending music on YouTube Music',
  inputSchema: z.object({
    country: z.string().optional().default('US').describe('Country code for trending music (default: US)'),
    limit: z.number().optional().default(20).describe('Number of trending songs to return (default: 20)'),
  }),
  outputSchema: z.object({
    trending: z.array(z.object({
      title: z.string(),
      artist: z.string(),
      videoId: z.string(),
      thumbnails: z.array(z.object({
        url: z.string(),
        width: z.number(),
        height: z.number(),
      })).optional(),
      viewCount: z.string().optional(),
    })),
    country: z.string(),
    totalResults: z.number(),
  }),
  execute: async ({ context }) => {
    try {
      const result = await youtubeMusicMCP.callTool('youtube-music-mcp', 'get_trending', {
        country: context.country,
        limit: context.limit,
      });
      
      return {
        trending: result.trending || [],
        country: context.country,
        totalResults: result.trending?.length || 0,
      };
    } catch (error) {
      throw new Error(`Failed to get trending music: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  },
});
