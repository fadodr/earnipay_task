# syntax=docker/dockerfile:1

FROM node:19-alpine AS base

WORKDIR /usr/src/app

COPY package*.json .

RUN npm install

COPY . .

EXPOSE 3000

CMD ["npm", "run", "start"]