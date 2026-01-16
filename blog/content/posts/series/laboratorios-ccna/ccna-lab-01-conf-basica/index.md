---
title: "CCNA - Laboratorio 1: Comandos Básicos de IOS"
date: 2022-09-13T12:00:00-06:00
draft: false
tags:
  - ccna
  - lab
  - spanish
categories:
  - Networking
description: Comandos básicos de Cisco IOS
series:
  - CCNA
comments: true
cover:
  image: comandos-basicos-ios-cover.jpg
  relative: true
aliases:
  - "CCNA - Laboratorio No. 1: Comandos Básicos de Cisco IOS"
---

Si estas empezando en el mundo de Cisco y en la configuración de routers o switches, ya sea que tengas la suerte de contar con equipo físico para tus prácticas o estas trabajando en Packet Tracer, este post es para ti.

A continuación encontrarás los comandos básicos e iniciales que necesitas saber cuando estas empezando a configurar equipos Cisco con IOS.

## Comandos de Navegación por IOS

### Pasar de EXEC mode a Privileged EXEC mode

```text
Switch>enable
Switch#
```

### Pasar a modo de configuración global

```text
Switch#configure terminal
Switch(config)#
```

### Configurar hostname

```text
Switch(config)#hostname CCNA1
CCNA1(config)#
```

### Configurar password de consola

```text
CCNA1(config)#line console 0
CCNA1(config-line)#password cisco
CCNA1(config-line)#login
CCNA1(config-line)#exit
CCNA1(config)#
```

### Configurar password de modo privilegiado

En este ejemplo utilizamos el password "class" para el modo EXEC privilegidado.

```text
CCNA1(config)#enable password class
CCNA1(config)#
```

### Configurar password de modo privilegiado (mas seguro)

Con este comando configuramos el password "class" para EXEC privilegiado, pero la diferencia es que la contraseña se guarda encriptada en el archivo de configuración, lo cual lo hace mas seguro.

```text
CCNA1(config)#enable secret class
CCNA1(config)#
```

### Para borrar el password de modo privilegiado (menos seguro)

```text
CCNA1(config)#no enable password
CCNA1(config)#
```

### Encryptar contraseñas en el archivo de configuración

```text
CCNA1(config)#service password-encryption
CCNA1(config)#
```

### Configurar IP en SVI (VLAN 1) para administración

```text
CCNA1(config)#interface vlan 1
CCNA1(config-if)#ip address 192.168.0.5 255.255.255.0
CCNA1(config-if)#no shutdown
CCNA1(config-if)#exit
CCNA1(config)#
```

### Configurar acceso por Telnet al switch

```text
CCNA1(config)#line vty 0 15
CCNA1(config-line)#password cisco
CCNA1(config-line)#login
CCNA1(config-line)#transport input telnet
CCNA1(config-line)#exit
CCNA1(config)#
```

### Guardar configuración en la NVRAM

```text
CCNA1#copy running-config startup-config
CCNA1#
```

## Procedimientos para asegurar el equipo

### Configurar el nombre de dominio

Este es un pre-requisito para habilitar SSH

```text
R1(config)#ip domain-name cisco.gt
```

### Habilitación de SSH

```text
R1(config)#hostname R1
R1(config)#ip domain-name cisco.gt
R1(config)#crypto key generate rsa
1024
R1(config)#username admin secret Abcd1234
R1(config)#line vty 0 15
R1(config-line)#transport input ssh
R1(config-line)#login local
R1(config-line)#exit
R1(config)#ip ssh version 2
```

### Cambiar el nivel de privilegios de un usuario (0-15)

```text
R1(config)#username admin privilege 15
```

### Forzar mínimo de 10 caracteres en contraseñas

```text
R1(config)#security passwords min-length 10
```

### Bloquear un usuario por 120s si tiene 3 intentos fallidos en 60s

```text
R1(config)#login block-for 120 attempts 3 within 60
```

### Configurar el cierre automático de sesión por inactividad

La sesión se cerrará después de 5 minutos y 30 segundos de inactividad.
El valor por defecto es de 10 minutos.

```text
R1(config-line)# exec-timeout 5 30
```

## Otros comandos útiles para la operación

### Deshabilitar la búsqueda de DNS

```text
Switch(config)#no ip domain-lookup
```

## Conclusión

Estos son los comandos que necesitas para hacer la configuración inicial de cualquier dispositivo Cisco, y te serán de gran utilidad en tu operación diaria.

Espero que te sirva, si tienes algún otro comando que creas que se debe agregar, sugierelo en los comentarios.
