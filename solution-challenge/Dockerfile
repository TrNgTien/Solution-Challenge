FROM node:14-alpine

COPY . .

USER app

RUN npm install

# Run Auth service for test
EXPOSE 3010

RUN "cd packages/auth-service && npm start"