FROM node:14.15.3

WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH

COPY .env ./
COPY .npmrc ./
COPY patches ./patches
COPY package*.json ./
RUN npm install
RUN patch-package

COPY . ./

CMD ["npm", "start"]
