FROM node:14.15.3

WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH

ENV REACT_APP_KAKAO_APP_KEY=246af9ae489b0b20f3e990802dbec5f4
ENV REACT_APP_API_URL=http://3.35.82.17:8000
ENV REACT_APP_REFRESH_TERM=30000

COPY .npmrc ./
COPY patches ./patches
COPY package*.json ./
RUN npm install
RUN patch-package

COPY . ./

CMD ["npm", "start"]
