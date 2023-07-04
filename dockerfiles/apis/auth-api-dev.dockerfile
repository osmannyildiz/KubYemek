FROM node:18-alpine

WORKDIR /app/core
COPY core/package.json .
RUN npm install
COPY core/. .

WORKDIR /app/apis/auth-api
COPY apis/auth-api/package.json .
RUN npm install
COPY apis/auth-api/. .

EXPOSE 80

CMD ["npm", "run", "dev"]
