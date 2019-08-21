FROM node:8-alpine@sha256:e1d58a32a7303b3f95f64fe13f2c6679e42879f02a2b77e06771a023e7706e02

RUN apk add --no-cache \
  gettext \
  imagemagick \
  librsvg \
  ttf-dejavu

COPY . /srv/app

WORKDIR /srv/app
ENV NODE_ENV $NODE_ENV
CMD node out/main.js
EXPOSE 80
