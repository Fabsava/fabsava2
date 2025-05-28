# Dockerfile
FROM node:18-alpine

WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm ci

# Copy everything & build
COPY . .
RUN npm run build

# Expose the same port as in smithery.yaml
EXPOSE 8080

# Launch your MCP HTTP server
CMD ["node", "dist/index.js"]
