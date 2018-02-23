FROM node:alpine

# Create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Install app dependencies
COPY . /usr/src/app/

RUN apk add git --update-cache && \
    apk --no-cache add --virtual native-deps \
    git g++ gcc libgcc libstdc++ linux-headers make python && \
    npm update && \
    npm install node-gyp -g &&\
    npm install && \
    npm rebuild bcrypt --build-from-source && \
    npm cache clean --force &&\
    npm run bundle

#    npm install && \
#    npm install --build-from-source=bcrypt && \
# Have to add this because bcrypt is misbehaving
#    npm rebuild bcrypt --build-from-source && \

EXPOSE 3000
CMD [ "npm", "start"]
