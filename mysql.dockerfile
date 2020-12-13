FROM mysql:latest

RUN addgroup -g 1000 walemy && adduser -G walemy -g walemy -s /bin/sh -D walemy

RUN mkdir -p /var/lib/mysql

RUN chown walemy:walemy /var/lib/mysql
