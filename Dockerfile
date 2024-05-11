# Dockerfile

FROM node:17

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install
# Rebuild bcrypt inside the container
RUN npm rebuild bcrypt --build-from-source

COPY . .

EXPOSE 3000

CMD [ "node", "src/index.js" ]
