FROM node:18-alpine

WORKDIR /app/core
COPY core/package.json .
RUN npm install
# COPY core/. .

WORKDIR /app/apis/admin-api
COPY apis/admin-api/package.json .
RUN npm install
# COPY apis/admin-api/. .

EXPOSE 80

CMD ["npm", "run", "dev"]
