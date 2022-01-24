FROM node:14

WORKDIR /usr/api

COPY package.json ./

RUN yarn

COPY . .

EXPOSE 3333

CMD ["yarn", "run", "dev"]
