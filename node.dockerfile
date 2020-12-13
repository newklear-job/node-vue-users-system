FROM node:latest

RUN addgroup -g 1000 walemy && adduser -G walemy -g walemy -s /bin/sh -D walemy

RUN mkdir -p /usr/src/users-system/node

RUN chown walemy:walemy /usr/src/users-system/node
