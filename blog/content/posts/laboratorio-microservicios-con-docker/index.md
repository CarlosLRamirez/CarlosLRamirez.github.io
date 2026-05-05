---
title: Laboratorio Microservicios con Docker
date: 2026-05-05T09:56:00-06:00
lastmod: 2026-05-05T16:08:00-06:00
draft: false
tags:
  - docker
  - lab
  - microservices
categories: []
description: ""
cover:
  image: post-cover.webp
---

 

En este laboratorio construí un demo de una aplicación web **muy básica**, para poder experimentar con la orquestación de micro-servicios en contenedores Docker, empezando desde cero de forma local y luego poder desplegarlo y escalarlo en el servicio de Amazon Elastic Container Service.. 

Dado que no soy desarrollador , mi intención no es enfocarme en el código, sino más bien entender cómo interactúa cada pieza del rompecabezas, el flujo de la comunicación entre contenedores, y  poder documentar el paso a paso de su implementación.

## Descripción General

El demo consta de tres micro-servicios contenerizados usando Docker, dos forman parte del backend y uno para el frontend el cual será la interfaz del usuario, cada microservicio de backend es un API *stateless*, la cual devuelve información cuando se le invoca.
## Diagrama a alto nivel

![](Pasted%20image%2020260505105632.png)

## Descripción de Micro-servicios  

### Servicio Usuarios

Es un API de Backend construida en Node.js/Express, la cual simula ser un catálogo de Usuarios. 

Devuelve el listado en formato JSON, al ser llamada en la ruta `/users` por el método `GET` en el puerto `3000`.

```json
{ service: "Usuarios", data: ["Alice", "Bob", "Charlie"], version: "1.0" }
```

### Servicio Productos (Backend)

Es un API de Backend construida en Node.js/Express, la cual simula ser un catálogo de Productos. 

Devuelve el listado en formato JSON, al ser llamado en la ruta `/products` por el método `GET` en el puerto `3001`.

```json
{ service: "Productos", data: ["Laptop", "Mouse", "Teclado"], version: "1.0" }
```
### Servicio FrontEnd

Página web principal construida usando HTML/CSS/Javascript puro, la cual invoca a las APIs de backend por medio de dos botones, y va colocando las respuestas en una caja de texto, agregando una estampa de tiempo de cada solicitud.

![](Pasted%20image%2020260505160449.png)

## Construcción Paso a Paso

### Crear estructura de carpetas y repositorio de Git

El primer paso es crear la siguiente estructura de carpetas con cualquier editor de código

```text
lab-microservicios/
├── servicio-frontend/
│   ├── index.html
│   ├── package.json
│   └── Dockerfile
├── servicio-usuarios/
│   ├── index.js
│   ├── package.json
│   └── Dockerfile
├── servicio-productos/
│   ├── index.js
│   ├── package.json
│   └── Dockerfile
└── docker-compose.yml
```

Luego para poder manejar versionamiento y poder subirlo a Github posteriormente, debemos iniciar la carpeta como repositorio de **Git**. 

Abrimos la terminal dentro de la carpeta principal del proyecto y usamos este comando:

```bash
git init
```

Adicionalmente se debe crear el archivo `.gitignore` en la carpeta raíz del proyecto, para que ciertas carpetas y archivos nunca se suban a un repositorio público como Github, ya sea por seguridad o para no subir archivos grandes innecesarios que puedan reconstruirse. 

En proyectos de `Node.js`y `Docker`generalmente el `.gitignore`lleva esto:

```bash
# Dependencias de Node
node_modules/
npm-debug.log

# Docker
.dockerignore

# Archivos de sistema/SO
.DS_Store
Thumbs.db

# Variables de entorno (Seguridad)
.env
```

Luego hacemos el primer `commit` con el estado actual

```bash
git add .
git commit -m "Laboratorio microservicios - Commit inicial"
```

### Conectar con Github

Ahora conectamos nuestro repositorio local con un repositorio (público o privado) en nuestra cuenta de GitHub, para esto:

- Crea el repo en la web de GitHub (vacío, sin README ni licencia).
- Utiliza estos comandos en la terminal desde la carpeta principal del proyecto, cambiando `TU_USUARIO/TU_REPOSITORIO.git` con la ruta del repositorio recién creado
    
    ```bash
    git remote add origin https://github.com/TU_USUARIO/TU_REPOSITORIO.git
    git branch -M main
    git push -u origin main
    ```

> **Note:** Por el momento aún no hay código de aplicación pero puedes ver la estructura de carpetas y archivos hasta este punto en este [commit](https://github.com/CarlosLRamirez/lab-microservicios/tree/8a5c2bbd7c9c13ba0e77350b12225014893a7b6b) (Me faltó agregar el `docker-compose.yml` el cual agregué después.)

### Agregar el código de aplicación

Copiar y pegar el siguiente código de aplicación en cada uno de los archivos `index` de cada servicio.

####  Servicio Usuarios (`servicio-usuarios/index.js`)

**Puerto:** 3000 | **Ruta:** `/users`

```js
const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 3000;

// Middleware para permitir peticiones desde otros orígenes (como tu frontend)
app.use(cors());

app.get('/users', (req, res) => {
    res.json({ 
        service: "Usuarios", 
        data: ["Alice", "Bob", "Charlie"], 
        version: "1.0",
        timestamp: new Date().toISOString()
    });
});

app.listen(PORT, () => {
    console.log(`🚀 Servicio Usuarios corriendo en http://localhost:${PORT}`);
});
```

####  Servicio Productos (`servicio-productos/index.js`)

**Puerto:** 3001 | **Ruta:** `/products`

```js
const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 3001;

// Middleware para permitir peticiones desde otros orígenes
app.use(cors());

app.get('/products', (req, res) => {
    res.json({ 
        service: "Productos", 
        data: ["Laptop", "Mouse", "Teclado"], 
        version: "1.0",
        timestamp: new Date().toISOString()
    });
});

app.listen(PORT, () => {
    console.log(`🚀 Servicio Productos corriendo en http://localhost:${PORT}`);
});
```

####  Servicio Front-End `servicio-frontend/index.html`:  

Pagina Web principal que hace consultas hacia las APIs de backend al presionar dos botones, y transforma la respuesta en un log en tiempo real, permitiendo ver el momento de la respuesta.

```html
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <title>Log de Microservicios</title>
    <style>
        body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; text-align: center; padding: 30px; background: #eceff1; }
        .controls { background: white; padding: 20px; border-radius: 10px; box-shadow: 0 4px 6px rgba(0,0,0,0.1); display: inline-block; margin-bottom: 20px; }
        button { padding: 12px 20px; font-size: 14px; cursor: pointer; margin: 5px; border-radius: 5px; border: none; color: white; font-weight: bold; transition: 0.3s; }
        .btn-users { background-color: #0288d1; }
        .btn-users:hover { background-color: #01579b; }
        .btn-products { background-color: #388e3c; }
        .btn-products:hover { background-color: #1b5e20; }
        .btn-clear { background-color: #757575; }
        
        #log-container { 
            max-width: 800px; 
            margin: 0 auto; 
            text-align: left; 
            background: #263238; 
            color: #80cbc4; 
            padding: 15px; 
            border-radius: 8px; 
            height: 400px; 
            overflow-y: auto; 
            font-family: 'Courier New', Courier, monospace;
            box-shadow: inset 0 0 10px #000;
        }
        .log-entry { border-bottom: 1px solid #37474f; padding: 8px 0; font-size: 13px; }
        .timestamp { color: #ffca28; font-weight: bold; margin-right: 10px; }
    </style>
</head>
<body>
    <h1>Laboratorio de Microservicios</h1>
    
    <div class="controls">
        <button class="btn-users" onclick="llamarAPI(3000, 'users')">Consultar Usuarios</button>
        <button class="btn-products" onclick="llamarAPI(3001, 'products')">Consultar Productos</button>
        <button class="btn-clear" onclick="document.getElementById('log-container').innerHTML = ''">Limpiar Log</button>
    </div>

    <div id="log-container">
        </div>

    <script>
        async function llamarAPI(puerto, endpoint) {
            const container = document.getElementById('log-container');
            const timestamp = new Date().toLocaleTimeString();
            
            try {
                const response = await fetch(`http://localhost:${puerto}/${endpoint}`);
                const data = await response.json();
                
                // Creamos el nuevo elemento de log
                const entry = document.createElement('div');
                entry.className = 'log-entry';
                entry.innerHTML = `<span class="timestamp">[${timestamp}]</span> <strong>${endpoint.toUpperCase()}:</strong> ${JSON.stringify(data)}`;
                
                // Lo agregamos al inicio para ver lo más nuevo arriba
                container.prepend(entry);
                
            } catch (error) {
                const entry = document.createElement('div');
                entry.className = 'log-entry';
                entry.style.color = '#ff5252';
                entry.innerHTML = `<span class="timestamp">[${timestamp}]</span> <strong>ERROR:</strong> No se pudo conectar con el puerto ${puerto}`;
                container.prepend(entry);
            }
        }
    </script>
</body>
</html>
```

### Archivos `package.json` 

Para que Docker pueda "contenerizar" las aplicaciones según el microservicio debemos indicarle qué librerías debería descargar para que la aplicación pueda ejecutarse. Esto lo hacemos mediante el archivo `package.json`en cada carpeta del microservicio.

Es importante notar que **solo los servicios de Backend (Node.js) necesitan este archivo**. El Frontend, al ser HTML estático servido por **Nginx**, no lo requiere para funcionar, aunque agregué uno básico por mantener la estructura uniforme.

Copia y pega estos bloques de código en cada archivo según el servicio.

#### 1. `servicio-usuarios/package.json`

```json
{
  "name": "servicio-usuarios",
  "version": "1.0.0",
  "description": "Microservicio de Usuarios - Lab AWS",
  "main": "index.js",
  "scripts": {
    "start": "node index.js"
  },
  "dependencies": {
    "cors": "^2.8.5",
    "express": "^4.18.2"
  }
}
```


#### 2. `servicio-productos/package.json`

```json
{
  "name": "servicio-productos",
  "version": "1.0.0",
  "description": "Microservicio de Productos - Lab AWS",
  "main": "index.js",
  "scripts": {
    "start": "node index.js"
  },
  "dependencies": {
   "cors": "^2.8.5", 
    "express": "^4.18.2"
  }
}
```

#### 3. `servicio-frontend/package.json` (Opcional)


```json
{
  "name": "servicio-frontend",
  "version": "1.0.0",
  "description": "Interfaz de monitoreo para el Laboratorio",
  "private": true
}
```

### Archivos Dockerfile

El archivo `Dockerfile` contiene las instrucciones necesarias para poder construir la imagen del contenedor de cada microservicio, en este se incluye una imagen que se utiliza como base, y sobre esta Docker copia los archivos que va a necesitar, instala dependencias, define comandos , etc. Para esto utiliza un enfoque en capas, donde cada elemento se instala sobre otro.

Copia y pega estos bloques de código en cada archivo según el servicio.
#### 1. Dockerfile: Servicio Usuarios

**Ubicación:** `servicio-usuarios/Dockerfile`

```dockerfile
# 1. Definimos la imagen base: una versión ligera de Node.js sobre Alpine Linux
FROM node:18-alpine

# 2. Creamos y nos movemos a la carpeta /app dentro del contenedor
WORKDIR /app

# 3. Copiamos solo el manifiesto de dependencias primero
# Esto permite que Docker guarde en caché el 'npm install' si no hay cambios aquí
COPY package.json .

# 4. Instalamos las librerías necesarias (Express y CORS)
RUN npm install

# 5. Copiamos el resto del código fuente (index.js) al contenedor
COPY index.js .

# 6. Informamos que el contenedor escuchará en el puerto 3000 (documentación)
EXPOSE 3000

# 7. Comando principal para arrancar el microservicio al iniciar el contenedor
CMD ["node", "index.js"]
```

---

#### 2. Dockerfile: Servicio Productos

**Ubicación**: `servicio-productos/Dockerfile`

```dockerfile
# 1. Usamos la misma base ligera de Node.js
FROM node:18-alpine

# 2. Establecemos el directorio de trabajo
WORKDIR /app

# 3. Copiamos el package.json para aprovechar la caché de capas de Docker
COPY package.json .

# 4. Instalamos dependencias
RUN npm install

# 5. Copiamos el archivo de lógica del microservicio
COPY index.js .

# 6. Este servicio está configurado para el puerto 3001
EXPOSE 3001

# 7. Ejecutamos la aplicación
CMD ["node", "index.js"]
```

---
#### 3. Dockerfile: Servicio Frontend

**Ubicación**: `servicio-frontend/Dockerfile`

```dockerfile
# 1. Para el frontend usamos Nginx, un servidor web de alto rendimiento y bajo consumo
FROM nginx:alpine

# 2. Copiamos nuestro archivo HTML al directorio donde Nginx busca contenido para servir
# Reemplazamos el archivo por defecto de Nginx por el nuestro
COPY index.html /usr/share/nginx/html/index.html

# 3. Nginx por defecto corre en el puerto 80 (el estándar para tráfico web HTTP)
EXPOSE 80

# Nota: Nginx arranca automáticamente al iniciar el contenedor, 
# por lo que no es estrictamente necesario poner un CMD aquí.
```

### Archivo `docker-compose.yml`

Finalmente debemos decirle a `Docker` cómo "orquestar" todos los contenedores que conforman nuestra aplicación, es decir qué microservicios la conforman, cómo se comunican entre ellos, y en qué puertos se exponen.

```yaml
version: '3.8' # Versión del motor de compose

services:
  # --- Microservicio de Usuarios ---
  usuarios:
    build: ./servicio-usuarios # Ruta a su carpeta y Dockerfile
    container_name: mslab-usuarios
    ports:
      - "3000:3000" # [Puerto PC]:[Puerto Contenedor]
    networks:
      - mslab-network

  # --- Microservicio de Productos ---
  productos:
    build: ./servicio-productos
    container_name: mslab-productos
    ports:
      - "3001:3001"
    networks:
      - mslab-network

  # --- Microservicio Frontend ---
  frontend:
    build: ./servicio-frontend
    container_name: mslab-frontend
    ports:
      - "8080:80" # Entraremos por http://localhost:8080
    networks:
      - mslab-network
    # Le decimos que espere a que los backends estén listos
    depends_on:
      - usuarios
      - productos

# Definimos una red privada para que se vean entre ellos (opcional pero pro)
networks:
  mslab-network:
    driver: bridge
```

### Levantar en Local

Finalmente debemos probar que todo funcione y "levantar" el proyecto en local, para esto necesitamos tener Docker Desktop instalado en nuestra computadora.

Puedes descargar Docker Desktop para tu sistema operativo [aquí](https://www.docker.com/products/docker-desktop/) 

Una vez instalado Docker Desktop construimos las imágenes y desplegamos los contenedores para los tres microservicios.

Debes abrir la terminal en la carpeta principal del proyecto y ejecutar el comando:

```bash
docker-compose up --build
```

Al final debe salir un mensaje como este:

```bash
 ✔ Image lab-microservicios-usuarios        Built                                                                                                                    8.1s
 ✔ Image lab-microservicios-productos       Built                                                                                                                    8.1s
 ✔ Image lab-microservicios-frontend        Built                                                                                                                    8.1s
 ✔ Network lab-microservicios_mslab-network Created                                                                                                                  0.0s
 ✔ Container mslab-productos                Created                                                                                                                  0.0s
 ✔ Container mslab-usuarios                 Created                                                                                                                  0.0s
 ✔ Container mslab-frontend                 Created 
```

Una vez terminado debería poder acceder a la página principal colocando esta URL `http://localhost:8080/` en el navegador.

## Conclusiones

Felicidades, hemos desplegado una mini-aplicación básica la cual está conformada por tres contenedores corriendo cada uno un pequeño microservicio, El siguiente paso es desplegar dicha aplicación en la nube de AWS mediante el servicio de Amazon ECS Fargate.


