# base node image
FROM node:20 as base

# Set the working directory in the container
WORKDIR /app

# Install Yarn at the beginning to ensure it's available
# RUN npm install -g yarn

# Install all node_modules, including dev dependencies
FROM base as deps

# Copy package.json, yarn.lock, and tsconfig.json to the working directory
COPY package.json yarn.lock tsconfig.json ./

# Install dependencies using Yarn
RUN yarn install

# Build the app
FROM base as build

# Set the environment variable for production
ENV NODE_ENV=production

# Copy installed dependencies from deps stage
COPY --from=deps /app/node_modules ./node_modules

# Copy the rest of the application code
COPY . .

# Build the application using Yarn
RUN yarn build

# Finally, build the production image with minimal footprint
FROM base

# Set the environment variable for production
ENV NODE_ENV=production

# Set the working directory in the container
WORKDIR /app

# Copy runtime dependencies from deps stage
COPY --from=deps /app/node_modules ./node_modules

# Copy the built application from the build stage
COPY --from=build /app/build ./build
COPY --from=build /app/public ./public
COPY --from=build /app/package.json ./package.json

# Assuming your server is set to listen on port 3000
EXPOSE 3000

# Command to run the application
CMD ["yarn", "run", "start"]
