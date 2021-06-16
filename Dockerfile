FROM node:16-alpine@sha256:6b56197d33a56cd45d1d1214292b8851fa1b91b2ccc678cee7e5fd4260bd8fae

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
