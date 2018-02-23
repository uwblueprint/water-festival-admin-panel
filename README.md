## Water Festival Admin Panel

### Setup
* Clone `https://github.com/uwblueprint/water-festival-admin-panel/`
* Install Docker `https://docs.docker.com/engine/installation/`
* Run `docker-composer up` in cloned repo
* Client will run on `localhost:3000`


### Takedown
* `Ctrl-C` should stop the server
* `docker-compose down` will remove the container


### Update Image
* To update the docker image run `docker-compose build` and then `docker-compose
  up` to star the container again

### Development
* `npm run bundle-dev` will run webpack in "watch" mode
* `npm start` will run the server in "watch" mode with nodemon
