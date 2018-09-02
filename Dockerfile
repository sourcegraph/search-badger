FROM node:8-alpine@sha256:cf4ea9156ef964eaf0c4df65da3f4fed7358dbe31149ca105c7684a5858195d8

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
