To create a docker container for the flask backend:

```docker build -t flaskdock .```

To start the docker, map the file system and open the port:

```docker run -p 5000:80 --volume=PATH_TO_THE_APP_FOLDER:/app flaskdock```

To rebuild the static javascript file in the first install all node modules via ```npm install``` (in ```./app/static```), then ```npx webpack``` will do the trick.