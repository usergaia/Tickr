FROM node:20-alpine

WORKDIR /usr/src/app

COPY package*.json ./

COPY . .

# accept build argument for API URL
ARG NEXT_PUBLIC_API_URL=http://localhost:1000
ENV NEXT_PUBLIC_API_URL=$NEXT_PUBLIC_API_URL

RUN npm install --include=dev && npm run build

EXPOSE 3000

CMD ["npm", "start"]
