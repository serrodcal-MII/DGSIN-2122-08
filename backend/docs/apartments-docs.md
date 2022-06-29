# apartments

### Recurso base:
```.../api/v1/apartments```

### Ejemplo de un dato:
```{"country":"Spain","year":2017,"travellers":1124194,"stays":4042291,"avg":3.6}```

### Acceder a todas las estadísticas de ocupación de apartamentos turísticos
Petición:
```GET: .../apartments```
Respuesta:
```[{"country": "spain","year": 2021,"travellers": 1124194,"stays": 4042291,"avg": 3.6},{"country": "germany","year": 2021,"travellers": 33873,"stays": 182339,"avg": 5.4},{"country": "france","year": 2021,"travellers": 63315,"stays": 265877,"avg": 4.2} ...]```

### Crear una nueva estadística de ocupación de apartamentos turísticos
Petición:
```POST: .../apartments/```
```{"country":"spain","year":2021,"travellers":1124194,"stays":4042291,"avg":3.6}```
Respuesta
```201 Created```

### Eliminar todos las estadísticas de ocupación de apartamentos turísticos
Petición:
```DELETE: .../apartments/```
Respuesta
```204 No Content```

### Actualizar las estadísticas de ocupación de apartamentos turísticos
Petición:
```PUT: .../apartments/```
```{"province": "sevilla","year": 2021,"month": "december","travellers": 1234,"stays": 5678,"avg": 2.1}```
Respuesta
```405 Method Not Allowed```

### Acceder a una estadística de ocupación de apartamento turístico concreta
Petición:
```GET: .../apartments/spain/2021```
Respuesta:
```{"country": "spain","year": 2021,"travellers": 1124194,"stays": 4042291,"avg": 3.6}```

### Actualizar una estadística de ocupación de apartamento turístico concreta
Petición:
```PUT: .../apartments/spain/2021```
```{"country":"spain","year":2021,"travellers":1100000,"stays":4000000,"avg":2.0}```
Respuesta:
```{"country":"spain","year":2021,"travellers":1100000,"stays":4000000,"avg":2.0}```

### Eliminar una estadística de ocupación de apartamento turístico concreta
Petición:
```DELETE: .../apartments/spain/2021```
Respuesta
```204 No Content```