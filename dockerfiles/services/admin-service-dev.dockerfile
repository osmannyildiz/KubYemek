FROM node:18-alpine

WORKDIR /app/core
COPY core/package.json .
RUN npm install
COPY core/. .

WORKDIR /app/services/admin-service
COPY services/admin-service/package.json .
RUN npm install
COPY services/admin-service/. .

EXPOSE 80

CMD ["npm", "run", "dev"]
