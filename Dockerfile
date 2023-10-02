# Use the official Node.js base image
FROM node:18-alpine AS BUILD_IMAGE

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package.json ./
COPY pnpm-lock.yaml ./

# Install dependencies
# RUN npm install pnpm@8.7.4 --location=global --ddd
RUN npm install

COPY . .

RUN npm run build

FROM node:18-alpine

WORKDIR /app

# RUN npm i pnpm --location=global

COPY --from=BUILD_IMAGE /app/dist ./dist
COPY --from=BUILD_IMAGE /app/public ./public
COPY --from=BUILD_IMAGE /app/node_modules ./node_modules
COPY --from=BUILD_IMAGE /app/package.json ./package.json

ENV HOST=0.0.0.0
ENV PORT=4321
EXPOSE 4321

# Start the application
CMD ["node", "./dist/server/entry.mjs"]
