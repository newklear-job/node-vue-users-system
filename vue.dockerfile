FROM node:latest

USER 1000:1000

WORKDIR /usr/src/users-system/vue

CMD [ "npm", "run", "serve" ]