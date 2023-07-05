FROM node:18-alpine

WORKDIR /app/core
COPY core/package.json .
RUN npm install
# COPY core/. .

WORKDIR /app/services/order-service
COPY services/order-service/package.json .
RUN npm install
# COPY services/order-service/. .

EXPOSE 80

CMD ["npm", "run", "dev"]
