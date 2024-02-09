FROM node
RUN mkdir /mobile
WORKDIR /mobile

COPY ./package.json ./
COPY . .
RUN rm -rf node_modules
RUN rm -rf yarn.lock
RUN yarn install

