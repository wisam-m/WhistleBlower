FROM node:16
# Create app directory
WORKDIR /usr/src/app
COPY package*.json ./

ENV GOOGLE_APPLICATION_CREDENTIALS="cscc09-webapp-44e2bb29839f.json"
RUN npm install
COPY . .

EXPOSE 8080

CMD [ "node", "index.js" ]
