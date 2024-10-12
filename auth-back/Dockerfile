FROM node:18-alpine

WORKDIR /app

COPY package*.json ./

RUN npm ci

COPY . .

#EXPOSE 5000

#CMD [ "npx", "prisma", "db", "push" ]
#CMD [ "npm", "run", "dev" ]