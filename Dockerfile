FROM node:14-alpine

ENV NODE_ENV production

WORKDIR /usr/src/app

COPY package*.json ./

RUN apk update
RUN apk add curl python --no-cache --virtual build-dependencies build-base gcc

RUN npm ci --only=production

COPY . .

EXPOSE 80

CMD [ "npm", "run", "startProduction" ]
