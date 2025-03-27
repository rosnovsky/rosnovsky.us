# Use the official Node.js base image
FROM node:21 AS build-image

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
ENV COMMIT_SHA=$COMMIT_SHA
ENV GITHUB_ACTION_BUILD=$GITHUB_ACTION_BUILD

RUN pnpm build

FROM node:22

WORKDIR /app

COPY --from=build-image /app/dist ./dist
COPY --from=build-image /app/public ./public
COPY --from=build-image /app/node_modules ./node_modules
COPY --from=build-image /app/package.json ./package.json

ENV HOST=0.0.0.0
ENV PORT=4321
EXPOSE 4321

# Start the application
CMD ["node", "./dist/server/entry.mjs"]
