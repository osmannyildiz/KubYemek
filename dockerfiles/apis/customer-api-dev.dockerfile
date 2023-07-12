FROM node:18-alpine

WORKDIR /app/core
COPY core/package.json .
RUN npm install

WORKDIR /app/apis/customer-api
COPY apis/customer-api/package.json .
RUN npm install

EXPOSE 80

CMD ["npm", "run", "dev"]
