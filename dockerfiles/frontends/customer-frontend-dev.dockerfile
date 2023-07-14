FROM node:18-alpine

WORKDIR /app/core
COPY core/package.json .
RUN npm install

WORKDIR /app/frontends/customer-frontend
COPY frontends/customer-frontend/package.json .
RUN npm install

EXPOSE 3000

CMD ["npm", "run", "dev"]
