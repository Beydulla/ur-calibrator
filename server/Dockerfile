FROM node:10.16.3

RUN mkdir /usr/src/server

WORKDIR /usr/src/server

COPY package*.json ./

RUN npm install

COPY . ./

EXPOSE 3800

CMD [ "node", "index.js" ]