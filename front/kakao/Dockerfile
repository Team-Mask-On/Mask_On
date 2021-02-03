FROM node:14.15.3

WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH

ENV REACT_APP_KAKAO_APP_KEY=
ENV REACT_APP_API_URL=
ENV REACT_APP_REFRESH_TERM=

COPY .npmrc ./
COPY patches ./patches
COPY package*.json ./
RUN npm install
RUN patch-package

COPY . ./

CMD ["npm", "start"]
