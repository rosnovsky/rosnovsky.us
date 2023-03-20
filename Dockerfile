FROM node:16.15.0-alpine
EXPOSE 3000 9229

WORKDIR /home/app

COPY package.json /home/app/
COPY package-json.lock /home/app/

RUN npm ci

COPY . /home/app

RUN pnpm run build

CMD ./scripts/start.sh
