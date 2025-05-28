# Dockerfile
FROM node:18-alpine

WORKDIR /app

# package.json ve lock dosyalarını kopyala, bağımlılıkları kur
COPY package*.json ./
RUN npm ci

# Kodunu kopyala, build et
COPY . .
RUN npm run build

# Uygulamanın dinlediği port
EXPOSE 8080

# Smithery için çalıştırma komutu
CMD ["node", "dist/index.js"]
