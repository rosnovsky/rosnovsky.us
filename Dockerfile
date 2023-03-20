FROM node:16.15.0-alpine
EXPOSE 3000 9229

WORKDIR /home/app

COPY package.json /home/app/
COPY pnpm-lock.yaml /home/app/

RUN npm i -g pnpm

RUN corepack enable
RUN corepack prepare pnpm@latest-7 --activate

RUN pnpm i

COPY . /home/app

RUN pnpm run build

CMD ./scripts/start.sh
