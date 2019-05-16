FROM node:8-alpine@sha256:9e818f25afa9c9155a7d129dc23a695c6abda23f218888584924987149a37db0

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
