# Use the official Node.js base image
FROM node:21 AS BUILD_IMAGE

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package.json ./
COPY pnpm-lock.yaml ./

# Install dependencies

RUN npm install pnpm --location=global
RUN pnpm install --frozen-lockfile

COPY . .

ARG COMMIT_SHA
ARG GITHUB_ACTION_BUILD
ARG ASTRO_STUDIO_APP_TOKEN
ENV COMMIT_SHA=$COMMIT_SHA
ENV GITHUB_ACTION_BUILD=$GITHUB_ACTION_BUILD
ENV ASTRO_STUDIO_APP_TOKEN=$ASTRO_STUDIO_APP_TOKEN

RUN pnpm build

FROM node:21

WORKDIR /app

COPY --from=BUILD_IMAGE /app/dist ./dist
COPY --from=BUILD_IMAGE /app/public ./public
COPY --from=BUILD_IMAGE /app/node_modules ./node_modules
COPY --from=BUILD_IMAGE /app/package.json ./package.json

ENV HOST=0.0.0.0
ENV PORT=4321
EXPOSE 4321

# Start the application
CMD ["node", "./dist/server/entry.mjs"]
