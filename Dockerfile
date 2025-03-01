FROM node:8-alpine@sha256:38f7bf07ffd72ac612ec8c829cb20ad416518dbb679768d7733c93175453f4d4

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
