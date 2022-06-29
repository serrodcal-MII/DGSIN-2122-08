# Heroku

Para logarse en heroku hacer:

```shell script
$ heroku login
```

Para crear un proyecto en heroku hacer:

```shell script
$ heroku create <project_name>
```

**Nota**: hacer esto sólo la primera vez.

Para añadir un proyecto existente hacer:

```shell script
$ heroku git:remote -a <project_name>
```

Desplegar con:

```shell script
$ git push heroku
```

Ver los logs con:

```shell script
$ heroku logs
```

