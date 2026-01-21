---
title: CCNA Lab - Inter Vlan Routing with Multilayer Switch - Lab Instructions
slug: "ccna-lab-04-intervlan-l3switch"
date: 2022-09-26T12:00:00-06:00
draft: false
tags:
  - ccna
  - lab
  - spanish
categories:
  - Networking
description: Configurar una red con 3 VLAN usando un switch multilayer para enrutamiento Inter VLAN
series:
  - CCNA
cover:
  image: ccna-lab-04-cover.webp
---

## Objetivo

El proposito de este laboratorio es configurar una red con 3 VLAN, una para cada departamento de la organización y 1 VLAN adicional para la administración de los equipos de red (mgmt). Para el enrutamiento Inter VLAN se tiene un switch multilayer (L2/L3) con SVI's configuradas en cada VLAN.

## Topología de Red


![Toplogía](ccna-lab-intervlan-L3swtich-topology.png)

## Información General

### Tabla de VLANs

| Vlan ID |    Name     |         Subnet |
| ------- | :---------: | -------------: |
| 10      | engineering | 172.16.10.0/24 |
| 11      | operations  | 172.16.11.0/24 |
| 12      |  markeing   | 172.16.11.0/24 |
| 99      |    mgmt     | 172.16.99.0/24 |

### Asignación de puertos y direccionamiento IP

| Device |   Port    | Port Type |   Vlan(s)   | IP address    |
| ------ | :-------: | :-------: | :---------: | ------------- |
| SW1    |  Fa0/1-5  |  Access   | engineering |               |
| SW1    | Fa0/6-10  |  Access   | operations  |               |
| SW1    | Fa0/11-15 |  Access   |  marketing  |               |
| SW1    |  VLAN 99  |   Route   |    mgmt     | 172.16.99.101 |
| SW1    |   Gi0/1   |   Trunk   |     ALL     |               |
| SW2    |  Fa0/1-5  |  Access   | engineering |               |
| SW2    | Fa0/6-10  |  Access   | operations  |               |
| SW2    | Fa0/11-15 |  Access   |  marketing  |               |
| SW2    |  VLAN 99  |   Route   |    mgmt     | 172.16.99.102 |
| SW2    |   Gi0/1   |   Trunk   |     ALL     |               |
| MainSW |  Gi1/0/1  |   Trunk   |     ALL     |               |
| MainSW |  Gi1/0/2  |   Trunk   |     ALL     |               |
| MainSW |  VLAN 10  |   Route   | engineering | 172.16.10.1   |
| MainSW |  VLAN 11  |   Route   | operations  | 172.16.11.1   |
| MainSW |  VLAN 12  |   Route   |  marketing  | 172.16.12.1   |
| MainSW |  VLAN 99  |   Route   |    mgmt     | 172.16.99.1   |
| eng1   |    eth    |  Access   | engineering | 172.16.10.100 |
| eng2   |    eth    |  Access   | engineering | 172.16.10.101 |
| op1    |    eth    |  Access   | operations  | 172.16.11.100 |
| op2    |    eth    |  Access   | operations  | 172.16.11.101 |
| mkt1   |    eth    |  Access   |  marketing  | 172.16.12.100 |
| mkt2   |    eth    |  Access   |  marketing  | 172.16.12.101 |

## Instrucciones

### Parte 1: Parametros iniciales (opcional)

- En todos los dispositivos, configure el nombre de host,
- Configure un mensaje del dia que contenga la palabra `advertencia`
- Proteja el acceso a consola con el password `cisco`
- Proteja el acceso a EXE privilegiado con `class`
- Encripte las contraseñas en el archivo de configuración

### Parte 2: Acceso por SSH

- Configure un nombre de dominio `mylab.com`
- Genere un par de llaves RSA con **1024 bits** para habilitar SSH.
- Cree un usuario `admin` con contraseña segura `letmein` y el **máximo** privilegio
- Habilite el acceso por SSH en todas las terminales virtuales disponibles, asegurese de utilizar la base de datos local para la autenticación de usuarios.
- Asegurese de estar utilizndo la version 2 del protocolo

### Parte 3: VLANs y puertos de switch

- Configure las VLANs en SW1, SW2 y MainSW de acuerdo a la información proporcionada en [tabla de vlans](#tabla-de-vlans)

- Configure los puertos de acceso en SW1 y SW2 según la información proporcionada en la [tabla de asignación de puertos](#asignación-de-puertos-y-direccionamiento-ip)

- Configure los enlaces troncales en SW1, SW2 y MainSW de forma estática, de acuerdo con la [tabla de asignación de puertos](#asignación-de-puertos-y-direccionamiento-ip). **_Unicamente debe permitir el tráfico de las vlans utilizadas en el ejercicio y rechazar cualquier trafico que pertenezca a otra VLAN._**

- Habilite las interfaces de administración en SW1 y SW2 y asigne las direcciónes IP, de acuerdo con la información [proporcionada](#asignación-de-puertos-y-direccionamiento-ip).
- Configure lo necesario para que el switch puede ser alcanzado desde redes externas

### Parte 4: Enrutamiento inter vlan

- Habilite el enrutamiento inter-vlan en MainSW mediante la configuración de las SVIs correspondientes, según lo indicado en la [tabla](#asignación-de-puertos-y-direccionamiento-ip), no olvide habilitar en enrutamiento IPv4 en el router multicapa.

### Parte 5: Direcciones de los hosts

- Asigne las direcciones IP a las PC's de acuerdo a la información [proporcionada](#asignación-de-puertos-y-direccionamiento-ip)

### Parte 6: Pruebas

- Si realizó toda la configuración correctamente, debe de poder hacer ping desde cualquier computadora a los demas host, incluyendo las SVI de los switches y las interfaces del router.
- Debe poder acceder por SSH a los switches y al router desde cualquier computadora.

Intenta realizar el laboratorio por tu cuenta, si tiene alguna duda, puede consultar la solución [aqui](../ccna-lab-05-intervlan-l3switch-answer/index.md)

Espero este laboratorio sea de ayuda en tu preparación para la certificación de CCNA o para aprender de redes en general. Si crees que puede ayudar a otros, por favor compártelo.

Si encuentras algún error o punto de mejora, por favor deja tus comentarios.

Saludos,

Carlos R.
