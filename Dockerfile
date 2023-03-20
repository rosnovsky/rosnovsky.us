FROM node:10.15.0-alpine
EXPOSE 3000 9229

WORKDIR /home/app

COPY package.json /home/app/
COPY pnpm-lock.yaml /home/app/

RUN npm i -g pnpm

RUN pnpm ci

COPY . /home/app

RUN pnpm run build

CMD ./scripts/start.sh
