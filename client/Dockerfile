FROM node:18-alpine

RUN mkdir app

WORKDIR /app

COPY package.json ./
COPY vite.config.ts ./
COPY tsconfig.json ./
COPY tsconfig.node.json ./
COPY .prettierrc ./
COPY postcss.config.cjs ./
COPY tailwind.config.js ./
COPY index.html ./
COPY .eslintrc.js ./
COPY .gitignore ./
COPY public public

RUN yarn install
COPY src src
