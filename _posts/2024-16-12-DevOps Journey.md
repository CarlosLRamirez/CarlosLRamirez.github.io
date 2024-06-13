---
layout: post
title: DevOps labs (WIP)
subtitle: DevOps Journey Documentation
cover-img:
thumbnail-img:
share-img: 
tags: [devops, cicd, spanish]
---


# Laboratorio 1 - Aplicación Web en NGINX (Manual)

En este laboratorio se describe el paso a paso para desplegar una aplicación web simple en un servidor NGINX. El proceso se hará manualmente, mediante un pull del código de un repositorio en GitHub.

Aunque aún no aplicamos ningún proceso de CI/CD, considero que es importante experimentar el proceso manual para entender mejor cuando vayamos a automatizarlo.

![alt text](../assets/img/Lab1-webapp-nginix-manual.drawio.png)

## 1. Crear un nuevo repositorio en GitHub

- Haz clic en el botón + en la esquina superior derecha y selecciona "New repository".
- Ingresa el nombre del repositorio, por ejemplo, `my-webapp`.
- Opcional: Agrega una descripción.
- Puedes dejar el repositorio como público o privado.
- No inicialices el repositorio con un README, .gitignore o licencia, ya que lo haremos desde la línea de comandos.
- Haz clic en "Create repository".

## 2. Convertir el directorio local a un repositorio de Git y sincronizarlo con GitHub

El directorio donde tengamos el código de la aplicación web (archivos HTML, CSS, JS), lo convertimos en un repositorio de Git y lo sincronizamos con el repositorio remoto recién creado en GitHub.

- Inicializar el repositorio de Git localmente:
  ```bash
  cd ~/projects/my-web-app
  git init
  git add .
  git commit -m "Initial commit"
  ```
- Conectar el repositorio local a GitHub:
  ```bash
  git remote add origin https://github.com/CarlosLRamirez/my-simple-web-app.git
  git branch -M main
  git push -u origin main
  ```

## 3. Instalación de NGINX en el servidor Ubuntu

TODO: Agregar el paso a paso

## 4. Configuración del sitio con la aplicación web en el servidor NGINX

- Crear el directorio donde estará ubicada la aplicación web:
  ```bash
  sudo mkdir -p /var/www/my-webapp
  ```
- Modificar el archivo de configuración de sitios de NGINX:
  ```bash
  sudo nano /etc/nginx/sites-available/my-webapp
  ```

- El archivo debe contener el siguiente contenido:
  ```nginx
  server {
      listen 80;
      server_name 172.16.101.128;

      root /var/www/my-webapp;
      index index.html;

      location / {
          try_files $uri $uri/ =404;
      }
  }
  ```

  Cambia `server_name` por el nombre del servidor y la IP por el URL del servidor.

- Completar la configuración de NGINX y reiniciar el servidor:
  ```bash
  sudo ln -s /etc/nginx/sites-available/my-webapp /etc/nginx/sites-enabled/
  sudo nginx -t
  sudo systemctl restart nginx
  ```

## 5. Clonar el repositorio de la aplicación web en el servidor NGINX

- Cambiar el propietario del directorio:
  ```bash
  sudo chown -R ubuntu:ubuntu /var/www/my-webapp
  ```

- Cambiar los permisos del directorio:
  ```bash
  sudo chmod -R 755 /var/www/my-webapp
  ```
- Verificar el acceso a GitHub desde el servidor:
  ```bash
  ssh -T git@github.com
  ```

  Deberías ver un mensaje de bienvenida de GitHub si tu configuración SSH es correcta. En caso contrario, debes agregar una clave SSH en GitHub.

## 6. Flujo para actualizar y re-desplegar la aplicación web

Cuando hayas hecho un cambio en la aplicación web, por ejemplo, modificar el código HTML, debes agregar los cambios, realizar un commit al repositorio y un push al repositorio remoto en GitHub.

Esto se hace en la PC local, o donde estemos trabajando el desarrollo de la aplicación:
```shell
cd ~/projects/my-web-app
git add .
git commit -m "Update web app"
git push origin main
```

En el servidor NGINX, ahora debemos hacer un pull del repositorio para actualizar el código de la aplicación web:
```shell
cd /var/www/my-webapp
git pull origin main
```

Reiniciar el servidor NGINX si es necesario:
```shell
sudo systemctl restart nginx
```

