# Backend con express y NodeJS

Autor: Alexandro Marcelo
Fecha de creación: 21/04/2021

Aplicación de backend en express usando NodeJS
Aplicación que permite realizar operaciones CRUD de usuarios a un servicio backend

## Requerimientos

* node v13.7.0 +
* npm v6.14.6 +
* nodemon v2.0.2 +
* Insomnia. Cliente HTTP (insomnia/Postman)

## Pasos seguidos para la creación de proyectos similares a este

1. Abrir la terminal, cambiarse al directorio deseado donde estará el proyecto y escribir lo siguiente:

```bash
npm init
```

2. Seguir los pasos para configurar los metadatos del proyecto
3. Instalar las librerías que requiere el proyecto:

```bash
npm install express cors
```

4. Agregar un script para desarrollo local con nodemon dentro de package.json, lo siguiente

```
"scripts": {
    "start": "nodemon src/index.js"
}
```

## Correr localmente

1. Clonar este repositorio

2. Navegar a la ruta del proyecto (Backend/) e instalar las dependencias con el siguiente comando:

```bash
npm install
```

4. Correr la aplicación con el siguiente comando:

```bash
npm start
```

5. Utilizar el cliente HTTP y usar las rutas siguientes:

URL base: http://localhost:4000

```
GET /user
    Obtener los usuarios
    response: {
        "status": Int,
        "data": [ {"id": Int, "nombre": string, "correo": string} ]
    }
POST /user
    Insertar un usuario
    body: {
        "nombre": string,
        "correo": string
    }
    response: {
        "status": Int,
        "data": {"id":Int} || string
    }
PUT /user
    Actualizar un usuario dado su id
    body: {
        "id": Int,
        "nombre": string,
        "correo": string
    }
    response: {
        "status": Int,
        "data": string
    }

DELETE /user
    Eliminar un usuario dado su id
    body: {
        "id": Int
    }
    response: {
        "status": Int,
        "data": string
    }
```

## JWT

Para poder utilizar las rutas de manera más segura se utilizaría la librería [jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken), la cual nos permite crear tokens que se guardan del lado del cliente para validar que la petición que se está haciendo se encuentre autorizada, sin la necesidad de contar con un servidor ni manejo de sesiones. 
Para poder agregar JWT al proyecto se utiliza de manera de _middleware_, donde se pone detrás de cada petición que se requiera autorización, siendo que se ejecute antes del código de una ruta y si se encuentra válido avanza a la siguiente ejecución de la ruta, de otra manera se puede responder con un 402 o 403 y detener las siguientes ejecuciones.
Para agregar una ruta autorizada, me gusta tener una carpeta llamada _Auth_ donde se encuentran todas las distintas maneras que se puede autorizar una ruta dentro de un archivo por separado. 
Crearía una variable de entorno con la llave secreta de las firmas que se harán.
Firmaría los JWT con el algoritmo _HS256_, donde incluiría el id del usuario, la fecha de expiración del token, el nombre del usuario, y posiblemente otros valores que requiera la aplicación, evitando datos "confidenciales".
Crearía, en este ejemplo, el archivo _index.js_ donde checaría primero si existe el JWT dentro de la petición (dentro de un _header_), si no existe rechazo la petición, si existe valido la información con la función 'jwt.verify(token, "secret");', si arroja error rechazo la petición, de otra manera valido la información que guardé dentro del token como una validación extra.
