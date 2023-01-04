FROM node:18-alpine

WORKDIR /srv/api

COPY . .

RUN npm i
RUN npm run build

EXPOSE 8080

ENTRYPOINT [ "npm", "start" ]
