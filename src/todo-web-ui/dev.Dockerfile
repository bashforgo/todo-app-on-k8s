FROM node:13.10-alpine as build

WORKDIR /src
COPY package.json .
COPY package-lock.json .
RUN npm ci

FROM node:13.10-alpine

WORKDIR /src
COPY --from=build /src .
COPY . .

ENTRYPOINT npm start
EXPOSE 80
