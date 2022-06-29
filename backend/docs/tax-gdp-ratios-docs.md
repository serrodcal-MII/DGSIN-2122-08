# tax-gdp-ratios

### Recurso base:
```.../api/v1/tax-gdp-ratios```

### Ejemplo de un dato:
```{"country":"Spain","year":2017,"gdp_per_capita":39528.9253872668,"total_tax_revenues":34.585022,"population":46647425}```

### Acceder a todos los ingresos tributarios
Petición:
```GET: .../tax-gdp-ratios```
Respuesta:
```[{"country":"Spain","year":2017,"gdp_per_capita":39528.9253872668,"total_tax_revenues":34.585022,"population":46647425},{"country":"Spain","year":2018,"gdp_per_capita":40312.5475864011,"total_tax_revenues":35.278682,"population":46692863},{"country":"Spain","year":2019,"gdp_per_capita":40805.9169678996,"total_tax_revenues":35.297445,"population":46736782} ... ]```

### Crear un nuevo ingreso tributario
Petición:
```POST: .../tax-gdp-ratios/```
```{"country":"Poland","year":2017,"gdp_per_capita":30064.5034841771,"total_tax_revenues":35.028093,population":37953176}```
Respuesta
```201 Created```

### Eliminar todos los ingresos tributarios
Petición:
```DELETE: .../tax-gdp-ratios/```
Respuesta
```204 No Content```

### Actualizar los ingresos tributarios
Petición:
```PUT: .../tax-gdp-ratios/```
```{"country":"Sweden","year":2017,"gdp_per_capita":51947.9542478244,"total_tax_revenues":44.724065,population":9904895}```
Respuesta
```405 Method Not Allowed```

### Acceder a un ingreso tributario concreto
Petición:
```GET: .../tax-gdp-ratios/Spain/2017```
Respuesta:
```{"country":"Spain","year":2017,"gdp_per_capita":39528.9253872668,"total_tax_revenues":34.585022,"population":46647425}```

### Actualizar un ingreso tributario concreto
Petición:
```PUT: .../tax-gdp-ratios/Spain/2017```
```{"country":"Spain","year":2017,"gdp_per_capita":10,"total_tax_revenues":20,"population":30}```
Respuesta:
```{"country":"Spain","year":2017,"gdp_per_capita":10,"total_tax_revenues":20,"population":30}```

### Eliminar un ingreso tributario concreto
Petición:
```DELETE: .../tax-gdp-ratios/Spain/2017```
Respuesta
```204 No Content```