FROM node:19-alpine3.16
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

RUN npm install -g pnpm

COPY ./package.json .
COPY ./pnpm-lock.yaml .
COPY ./ .
RUN pnpm install
RUN npm run build

EXPOSE 3000