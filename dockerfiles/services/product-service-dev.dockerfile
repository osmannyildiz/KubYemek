FROM node:18-alpine

WORKDIR /app/core
COPY core/package.json .
RUN npm install
COPY core/. .

WORKDIR /app/services/product-service
COPY services/product-service/package.json .
RUN npm install
COPY services/product-service/. .

EXPOSE 80

CMD ["npm", "run", "dev"]
