FROM node:12.16.3-alpine

COPY entrypoint.sh /entrypoint.sh
COPY dist /dist

ENTRYPOINT ["/entrypoint.sh"]