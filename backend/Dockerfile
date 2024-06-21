FROM node:18

RUN apt-get update && apt-get install -y graphicsmagick ghostscript

WORKDIR /app

COPY package*.json ./
COPY tsconfig*.json ./

RUN npm install

COPY . .

RUN npm run build

EXPOSE 8200

CMD ["npm", "run", "start:prod"]
