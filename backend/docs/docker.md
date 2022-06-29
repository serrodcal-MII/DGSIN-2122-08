> docker build -t serrodcal/dgsin2122-08-back:1.0.0 .

> docker run --rm --name dgsin -ti -p 8080:8080 -e DB_USER=<user> -e DB_PASS=<pass> serrdocal/dgsin2122-08-back:1.0.0