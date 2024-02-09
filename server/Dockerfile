FROM node:18-alpine

COPY package.json ./
COPY tsconfig.json ./
COPY railway.yml ./
COPY .gitignore ./

RUN yarn install

# Installation de FFmpeg à l'aide de apk
RUN apk update && \
    apk add --no-cache ffmpeg

COPY src src
RUN yarn build

RUN mkdir -p ./uploads && \
    chmod -R 755 ./uploads
    
RUN mkdir -p ./uploads/tempUploads && \
    chmod -R 755 ./uploads/tempUploads

RUN mkdir -p ./uploads/finalUploads && \
    chmod -R 755 ./uploads/finalUploads


CMD ["yarn", "start"]
