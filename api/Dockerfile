# Stage 1: Build
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# Stage 2: Production Runtime
FROM node:20-alpine
WORKDIR /app

# Set production environment
ENV NODE_ENV=production

# Install only production dependencies
COPY package*.json ./
RUN npm ci --only=production

# Copy built app and config
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/.env ./ 

# Create data directory for SQLite and set permissions
RUN mkdir -p /app/data && chown -R node:node /app/data

# Run as non-root user for security
USER node

EXPOSE 3001
CMD ["npm", "run", "start:prod"]
