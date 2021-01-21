FROM node:14.15.3

WORKDIR /home/react/kakao
ENV PATH /app/node_modules/.bin:$PATH

COPY package*.json ./
RUN npm install

COPY . .

CMD ["npm", "start"]