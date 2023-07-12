FROM node:18-alpine

WORKDIR /app/core
COPY core/package.json .
RUN npm install

WORKDIR /app/services/order-service
COPY services/order-service/package.json .
RUN npm install

EXPOSE 80

CMD ["npm", "run", "dev"]
