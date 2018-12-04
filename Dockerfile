FROM node:8-alpine@sha256:fa979a27cee3c8664a689e27e778b766af72da52920454160421854027374f09

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
