FROM node:10.16.3

RUN mkdir /usr/src/client

WORKDIR /usr/src/client

COPY package*.json ./

RUN npm install

COPY . ./

EXPOSE 3200

CMD [ "npm", "start" ]