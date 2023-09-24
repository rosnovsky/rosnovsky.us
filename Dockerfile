# Use the official Node.js base image
FROM node:18-alpine AS BUILD_IMAGE

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package.json ./
COPY pnpm-lock.yaml ./

# Install dependencies
RUN npm install pnpm@8.7.4 --location=global --ddd
RUN pnpm install --ignore-workspace

# Copy the app source code to the working directory
COPY . .

# Build the Next.js application
RUN pnpm build

FROM node:18-alpine

WORKDIR /app

RUN npm i pnpm --location=global

COPY --from=BUILD_IMAGE /app/.next ./.next
COPY --from=BUILD_IMAGE /app/node_modules ./node_modules
COPY --from=BUILD_IMAGE /app/package.json ./package.json

# Expose the port the app runs on
EXPOSE 3000

# Start the application
CMD ["pnpm", "serve"]
