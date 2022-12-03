FROM node:14-alpine

COPY . .

RUN npm install

# Run Auth service for test
EXPOSE 3010

CMD ["npm" , "start"]