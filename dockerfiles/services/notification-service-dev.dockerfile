FROM node:18-alpine

WORKDIR /app/core
COPY core/package.json .
RUN npm install
# COPY core/. .

WORKDIR /app/services/notification-service
COPY services/notification-service/package.json .
RUN npm install
# COPY services/notification-service/. .

EXPOSE 80

CMD ["npm", "run", "dev"]
