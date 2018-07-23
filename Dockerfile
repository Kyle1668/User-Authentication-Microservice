FROM node:9.11.2-alpine

WORKDIR /app/

COPY ./package.json /app/package.json
RUN npm install -only=production

COPY . .

EXPOSE 8080

ENV PORT=8080
ENV JWT_EXPIRATION=40
ENV NODE_ENV=production

CMD ["npm", "run", "prod"]
