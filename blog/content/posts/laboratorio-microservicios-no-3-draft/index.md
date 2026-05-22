---
title: Laboratorio Microservicios No 3 - Draft
date: 2026-05-20T06:49:00-06:00
lastmod: 2026-05-21T06:17:00-06:00
draft: true
tags: []
categories: []
description: ''
cover:
  image: post-cover.webp
---

## Paso 1: Crear la base de Networking

A diferencia del laboratorio anterior donde usamos la VPC por defecto (default), en entornos empresariales o "de la vida real" no es recomendable utilizarla. En su lugar, lo ideal es crear una VPC personalizada (custom) con nuestro propio direccionamiento IP, y eso es justamente lo que haremos en este paso. 
### Plan de Direccionamiento IP

Antes de comenzar con la creación de la VPC, subredes y demás componentes, debemos tener un plan de IPs claro que considere tanto la arquitectura actual como futuros crecimientos o extensiones. En este caso, he elegido un bloque CIDR `/19` para la VPC, lo cual nos permite tener 32 subredes `/24`. Estas se pueden distribuir en 4 Zonas de Disponibilidad (AZ), colocando 8 subredes en cada una, lo cual considero que ofrece una holgura suficiente en caso de que nuestra arquitectura crezca o se vuelva más robusta.

Para este laboratorio, sin embargo, únicamente vamos a provisionar 4 subredes (2 públicas y 2 privadas) distribuidas en 2 Zonas de Disponibilidad. No obstante, en caso de que necesitemos ampliar en el futuro, nuestro diseño de red ya estará listo. ¡Esta es la mentalidad que debemos tener como arquitectos de nube!

### 1.1 Crear la VPC

Vamos a crear el VPC sin usar el "*Wizard*", lo haremos "a pie" para entender mejor cada componente.

> **Tip:** > Asegurate que esta en la regíon de N. Virgina (us-east-1) antes de continuar

Vamos a la consola de AWS → busca **VPC** → **Your VPCs** → **Create VPC** y seleccionamos *VPC only* 

|Campo|Valor|
|---|---|
|Name tag|`mslab-vpc`|
|IPv4 CIDR|`10.0.0.0/19`|
|IPv6|No IPv6 CIDR block|
|Tenancy|Default|

Click **Create VPC**.

![](Pasted%20image%2020260521054713.png)

Una vez creado vamos a la VPC  → **Actions** → **Edit VPC settings** y activamos:

- **Enable DNS hostnames** ✅
- **Enable DNS resolution** ✅

![](Pasted%20image%2020260521055030.png)

Estos settings permiten que los recursos dentro de la VPC se resuelvan por nombre DNS en vez de solo por IP,  esto es necesario para que el ALB y los VPC Endpoints funcionen correctamente en labs futuros.

### 1.2 Crear las Subnets

Ahora vamos a crear las 4 subnets que usaremos en este laboratorio. Las subnets son subdivisiones de nuestra VPC — en este caso vamos a tener 2 subnets públicas (donde vivirá el ALB) y 2 subnets privadas (reservadas para labs futuros), distribuidas en 2 Availability Zones para tener redundancia.

Vamos al **VPC Dashboard** → **Subnets** → **Create subnet**

![](Pasted%20image%2020260521055605.png)

Seleccionamos la VPC `mslab-vpc` y agrega las 4 subnets de una sola vez con el botón **Add new subnet**:

| Subnet   | Subnet Name               | Availability Zone | IPv4 CIDR      |
| -------- | ------------------------- | ----------------- | -------------- |
| Subnet 1 | `mslab-subnet-public-1a`  | `us-east-1a`      | `10.0.0.0/24`  |
| Subnet 2 | `mslab-subnet-private-1a` | `us-east-1a`      | `10.0.4.0/24`  |
| Subnet 3 | `mslab-subnet-public-1b`  | `us-east-1b`      | `10.0.8.0/24`  |
| Subnet 4 | `mslab-subnet-private-1b` | `us-east-1b`      | `10.0.12.0/24` |
Click **Create subnets**.

![](Pasted%20image%2020260521060003.png)

Luego hay una opción importante en las subnets públicas que debemos configurar para que cualquier recurso que se lance en esas subnets reciba automáticamente una IP pública.

Seleccionamos `mslab-subnet-public-1a` → **Actions** → **Edit subnet settings** → activamos **Enable auto-assign public IPv4 address** ✅, y repetimos para `mslab-subnet-public-1b`.

![](Pasted%20image%2020260521061534.png)

### 1.3 Crear el Internet Gateway

---


## Paso N: Agregar variable de entorno al frontend

Vamos a cambiar la URLs en el frontend para que estas no estén hardcodeadeas sino que sean variables de entorno en tiempo de arranque, y sean inyectadas en el HTML una vez NGINX arranque y empiece a servir.

1.1 Lo primero que tenemos que hacer es modificar el código en frontend para agregar unas variables que servirán como placeholders para las URLs.

- En el archivo `index.html` modificamos el bloque `API_URLS` por el siguiente código

```js
const API_URLS = {
    users:    '__USERS_API_URL__',
    products: '__PRODUCTS_API_URL__'
};
```

> **Note:** Nota
> El doble guion es una convención de nomenclatura utilizada para marcar *placeholders*, es decir valores literales en el código que serán reemplazados por el valor real en tiempo de arranque. Esta convención es popular en setups con NGINX y scripts de entrypoint porque es fácilmente identificable y poco probable que colisione con valores reales.

1.2 Debemos crear un script que sustituye los placeholders antes de arrancar NGINX en el contenedor.

- Creamos el archivo `entrypoint.sh` en el directorio de `servicio-frontend` y pegamos este código

```sh
#!/bin/sh
sed -i "s|__USERS_API_URL__|${USERS_API_URL}|g" /usr/share/nginx/html/index.html
sed -i "s|__PRODUCTS_API_URL__|${PRODUCTS_API_URL}|g" /usr/share/nginx/html/index.html
exec nginx -g 'daemon off;'
```

1.3 Agregamos el script en el `Dockerfile` para usarlo como ENTRYPOINT

En Docker, el ENTRYPOINT es el comando que se ejecuta cuando el contenedor arranca, anteriormente no teniamos nigun especificado en el `Dockerfile` porque la imagen base `nginx:alpine` por defecto arranca `nginx` directametne, sin embargo en nuestro caso creamos un script personalizado que  antes de arrancar `nginx` sustituye las variables de las URLS por variables de entorno.

> **Importante:** > EL comando `exec` al final del script es imperante porque le dice a Docker que el proceso de nginx debe quedar como proceso principal del contenedor (PID 1) en lugar del shell mismo. Esto es necesario para que Docker pueda enviarle señales directamente a nginx (como SIGTERM al detener el contenedor) lo que permite un shutdown limpio. Sin exec, el PID 1 sería el shell, nginx quedaría como proceso hijo y Docker no podría terminarlo correctamente.

- Abrimos el archivo `Dockerfile` del `servicio-frontend` y agregamos la las lineas correspondientes para que quede este esta manera:

```dockerfile
FROM nginx:alpine
COPY index.html /usr/share/nginx/html/index.html
COPY entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh
EXPOSE 80
ENTRYPOINT ["/entrypoint.sh"]
```

1.4 Probamos que siga corriendo el local con docker-compose

- Agregamos las variables al servicio de frontend en el archivo `docker-compose.yml`

```yaml
services:
  frontend:
    build: ./servicio-frontend
    ports:
      - "8080:80"
    environment:
      - USERS_API_URL=http://localhost:3000/users
      - PRODUCTS_API_URL=http://localhost:3001/products
```

- Ejecutamos `docker-compose up --build` para forzar la re-construcción de la imagen, y probamos la aplicación web y el llamado a los servicios de backend, con esto comprobamos que las URLS del backend se están inyectando correctamente en el arranque del contenedor y ya no estan "quemadas" en nuestro código de frontend.

- En el caso que necesitemos cambiar las URLs, solo necesitamos sustituir el valor de las variables en el archivo `docker-compose.yml` y volver correr `docker-compose up` sin necesidad de recosntruir la imagen.






