FROM node:12.13.0

WORKDIR /usr/src/app

COPY package*.json ./

ENV MONGODB_URI='mongodb://localhost:27017/books'

RUN npm install

COPY . .

EXPOSE 3000

CMD ["npm", "start"]
