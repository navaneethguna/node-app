FROM node:18-alpine
RUN apk update && apk add dos2unix


WORKDIR /usr/src/app

COPY ./src ./src
COPY ./db ./db
COPY package.json package-lock.json nest-cli.json tsconfig.build.json tsconfig.json ./
RUN find /usr/src/app -type f -exec dos2unix {} \;

RUN npm install
RUN npm run build

ENV PORT 3000
ENV PORT 9229
EXPOSE 3000

CMD [ "npm", "run", "start:prod" ]
