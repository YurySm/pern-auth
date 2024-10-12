FROM node:18

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . ./

#ENV NODE_ENV production

#RUN npm run build

#RUN npm prune --production

#CMD [ "npm", "run", "start" ]

CMD [ "npm", "run", "dev" ]