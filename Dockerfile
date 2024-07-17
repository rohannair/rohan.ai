# Base node image
FROM node:20 as base

# Set the working directory in the container
WORKDIR /app

# Install Bun
RUN npm install -g bun

# Install all dependencies, including dev dependencies
FROM base as deps

# Copy package files
COPY package.json bun.lockb ./

# Install dependencies using Bun
RUN bun install

# Build the app
FROM base as build

# Set the environment variable for production
ENV NODE_ENV=production

# Copy installed dependencies from deps stage
COPY --from=deps /app/node_modules ./node_modules

# Copy the rest of the application code
COPY . .

# Build the application using Bun
RUN bun run build

# Finally, build the production image with minimal footprint
FROM node:20-slim

RUN npm install -g bun

# Set the environment variable for production
ENV NODE_ENV=production

# Set the working directory in the container
WORKDIR /app

# Copy runtime dependencies from deps stage
COPY --from=deps /app/node_modules ./node_modules

# Copy the built application from the build stage
COPY --from=build /app/build ./build
# COPY --from=build /app/public ./public
COPY --from=build /app/package.json ./package.json

# Assuming your server is set to listen on port 3000
EXPOSE 3000

# Command to run the application
CMD ["bun", "run", "start"]