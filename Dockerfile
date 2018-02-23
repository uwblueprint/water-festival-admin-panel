FROM node:alpine

# Create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Install app dependencies
COPY . /usr/src/app/

RUN apk add git --update-cache && \
    npm update && \
    npm install && \
    npm run bundle

EXPOSE 3000
CMD [ "npm", "start"]
