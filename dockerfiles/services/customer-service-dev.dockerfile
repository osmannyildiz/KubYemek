FROM node:18-alpine

WORKDIR /app/core
COPY core/package.json .
RUN npm install
# COPY core/. .

WORKDIR /app/services/customer-service
COPY services/customer-service/package.json .
RUN npm install
# COPY services/customer-service/. .

EXPOSE 80

CMD ["npm", "run", "dev"]
