# dgsin-2122-08

Este es el repositorio del proyecto backend desarrollado por el grupo `08` de la asignatura DGSIN del máster MII.

## Requisitos

* npm (version `8.5.2`)
* node (version `v17.6.0`)
* heroku (version `7.59.2`)

Más información sobre cómo instalar estas herramientas en [docs/](docs).

### Paquetes

* express (version `4.17.3`)
* body-parser (version `1.19.2`)
* cors (version `2.8.5`)
* mongodb (version `4.4.0`)

**Nota**: instalar con: `npm install <package_name> --save`

## Ejecutar

Para ejecutar el proyecto ejecutar el siguiente comandos:

```shell script
$ npm start
```

**Nota**: se necesitan dos variables de entorno con la NPA de la base de datos `DB_USER`y `DB_PASS`. Adicionalmente, la variable `DB_URL` puede ser seteada como sigue: `DB_URL=gsdin2122-08.ya6o4.mongodb.net/gdsin2122-08-db?retryWrites=true&w=majority`.

### Docker

Ejecutar el [backend](https://hub.docker.com/r/serrodcal/dgsin2122-08-back) con Docker:

```shell script
$ docker run --rm --name dgsin -ti -p 8080:8080 -e DB_USER=<user> -e DB_PASS=<pass> serrdocal/dgsin2122-08-back:1.0.0
```

## Autores

* [Guiomar](https://github.com/guiferbri)
* [Sergio](https://github.com/serrodcal)