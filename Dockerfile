FROM node:20-alpine AS build
WORKDIR /app

COPY package*.json ./
COPY . .
RUN npm install
RUN npm run build
EXPOSE 8000

CMD ["npm", "start"]

