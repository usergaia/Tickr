FROM node:20-alpine

# install curl for health checks
RUN apk add --no-cache curl

WORKDIR /usr/src/app

COPY package*.json ./

COPY . .
RUN npm install --include=dev && npm run build

EXPOSE 1000

CMD ["npm", "start"]

