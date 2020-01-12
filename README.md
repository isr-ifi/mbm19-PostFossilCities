To create a docker container for the flask backend:

```docker build -t flaskdock .```

To start the docker, map the file system and open the port:

```docker run -p 5000:80 --volume=PATH_TO_THE_APP_FOLDER:/app flaskdock```

To rebuild the static javascript file in the ```app/static/build``` make sure you have installed webify globaly.

Then ```browserify -t [ babelify --presets [ react ] ] src/index.js -o build/app.js``` will do the trick.