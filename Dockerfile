FROM node:9.11.2-alpine

WORKDIR /app/

COPY ./package.json /app/package.json

RUN npm install

COPY . .

EXPOSE 8080

ENV PORT=8080

CMD ["npm", "start"]
