FROM node:13.10-alpine as build

WORKDIR /src
COPY package.json .
COPY package-lock.json .
RUN npm ci

COPY . .
RUN npm run build

FROM nginx:1.17
COPY --from=build /src/www /usr/share/nginx/html
