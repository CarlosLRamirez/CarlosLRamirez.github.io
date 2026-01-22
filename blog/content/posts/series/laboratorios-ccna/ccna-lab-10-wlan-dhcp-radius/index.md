---
title: "CCNA Lab 10: Redes Inalámbricas Empresariales con WLC, DHCP y Autenticación RADIUS"
date: 2022-10-13T08:01:00
draft: false
description: "Implementa una red WiFi empresarial completa con Wireless LAN Controller (WLC), autenticación segura mediante servidor RADIUS, servidor DHCP centralizado, segmentación por VLANs, y configuración de redes para usuarios generales e invitados. Incluye Inter-VLAN routing y DHCP relay."
tags:
  - ccna
  - lab
  - spanish
categories:
  - Networking
aliases:
  - "CCNA Lab 10: WLAN, DHCPv4, RADIUS"
cover:
  image: ccna-lab-10-cover.webp
---

## Introducción

Las redes inalámbricas empresariales requieren mucho más que simplemente conectar un access point. Necesitas segmentación de usuarios, autenticación segura, gestión centralizada y asignación automática de direcciones IP. Este laboratorio te enseña a construir una infraestructura WiFi profesional que cumple con estos requisitos.

Configurarás un Wireless LAN Controller (WLC) para gestionar múltiples access points, crear dos redes WiFi separadas (una para empleados y otra para invitados), implementarás autenticación segura con servidor RADIUS usando WPA2-Enterprise, y automatizarás la asignación de IPs con un servidor DHCP centralizado. Las VLANs separarán el tráfico, y el Inter-VLAN routing permitirá la comunicación controlada entre segmentos.

Esta arquitectura es estándar en empresas, universidades y organizaciones que necesitan WiFi seguro y escalable. Dominar estos conceptos te prepara para implementar y administrar redes inalámbricas en entornos reales.

## Tabla de Contenidos

- [Topología](#topología)
- [Archivo Packet Tracer](#archivo-packet-tracer)
- [Parámetros de Configuración](#parámetros-de-configuración)
- [Procedimiento Paso a Paso](#procedimiento-paso-a-paso)
  - [1. Definición de VLANs](#1-definición-de-vlans)
  - [2. Puertos Troncales](#2-puertos-troncales)
  - [3. Puertos de Acceso](#3-puertos-de-acceso)
  - [4. Enrutamiento Inter-VLAN](#4-enrutamiento-inter-vlan)
  - [5. Servidor DHCP](#5-servidor-dhcp)
  - [6. Configuración de WLC y Redes WiFi](#6-configuración-de-wlc-y-redes-wifi)
  - [7. Servidor RADIUS](#7-servidor-radius)
  - [8. Clientes WiFi](#8-clientes-wifi)
- [Conclusión](#conclusión)

## Topología

![Topologia](LabTopology-WLANIntegrado.png)

## Archivo Packet Tracer

[Configuración final](ccna-lab-10-packettracer-final.pkt)

## Parámetros de Configuración

### VLANs y Subnets
| Nombre         | Vlan ID | Subnet         |
| -------------- | ------- | -------------- |
| Datos          | VLAN 2  | 192.168.2.0/24 |
| Wifi_general   | VLAN 3  | 192.168.3.0/24 |
| Wifi_invitados | VLAN 4  | 192.168.4.0/24 |
| Servidores     | VLAN 99 | 192.168.4.0/24 |

- Utilizar VLAN 99 para management y como vlan nativa
- **Inter-vlan routing:**
	- Aplicar Routing-on-stick
	- Como default gateway dejar la primera IP de cada subnet
- **Servidor DHCP**
	- Utilizar un Router como servidor DHCP
	- Entregar direcciones desde la 100 hasta la 119, para cada subnet
- **Wireless LAN Controller**
	- Crear una Wifi general y una Wifi Invitados y asignar segun la VLAN correspondiente
- Servidor Radius
	- secret: `Cisco123`
- Crear 2 usuarios
    - User: `user1` / contraseña: `12345`
    - User: `user2` / contraseña: `12345`

## Procedimiento Paso a Paso

### 1. Definición de VLANs

```
DIST(config)#vlan 2
DIST(config-vlan)#name Datos
DIST(config-vlan)#vlan 3
DIST(config-vlan)#name Wifi_general
DIST(config-vlan)#vlan 4
DIST(config-vlan)#name Wifi_invitados
DIST(config-vlan)#vlan 99
DIST(config-vlan)#name Servidores
DIST(config-vlan)#exit
DIST(config)#
```
### 2. Puertos Troncales

```
DIST(config)#interface range Gi0/1-2,Fa0/3
DIST(config-if-range)#switchport mode trunk
DIST(config-if-range)#switchport trunk allowed vlan 2,3,4,99
DIST(config-if-range)#switchport trunk native vlan 99
DIST(config-if-range)#exit
```

```
LAN(config)#
LAN(config)#interface range gi0/1,f0/24
LAN(config-if-range)#switchport mode trunk
LAN(config-if-range)#switchport trunk allowed vlan 2,3,4,99
LAN(config-if-range)#switchport trunk native vlan 99
LAN(config-if-range)#exit
```

```
DATACENTER(config)#interface range gi0/2,f0/24
DATACENTER(config-if-range)#switchport mode trunk
DATACENTER(config-if-range)#switchport trunk allowed vlan 2,3,4,99
DATACENTER(config-if-range)#exit
```
### 3. Puertos de Acceso

```
LAN(config)#interface fa0/1
LAN(config-if)#switchport mode access 
LAN(config-if)#switchport acces vlan 2
LAN(config-if)#exit
LAN(config)#
```

```
DATACENTER(config)#interface range f0/21-23
DATACENTER(config-if-range)#switchport mode access
DATACENTER(config-if-range)#switchport access vlan 99
DATACENTER(config-if-range)#exit
```
### 4. Enrutamiento Inter-VLAN (Incluido el DHCP Relay)
```
IVR(config)#interface gi0/0/0.2
IVR(config-subif)#encapsulation dot1q 2
IVR(config-subif)#ip address 192.168.2.1 255.255.255.0
IVR(config-subif)#ip helper-address 192.168.99.253
IVR(config-subif)#exit
IVR(config)#

IVR(config)#interface gi0/0/0.3
IVR(config-subif)#encapsulation dot1q 3
IVR(config-subif)#ip address 192.168.3.1 255.255.255.0
IVR(config-subif)#ip helper-address 192.168.99.253
IVR(config-subif)#exit
IVR(config)#

IVR(config)#interface gi0/0/0.4
IVR(config-subif)#encapsulation dot1q 4
IVR(config-subif)#ip address 192.168.4.1 255.255.255.0
IVR(config-subif)#ip helper-address 192.168.99.253
IVR(config-subif)#exit
IVR(config)#

IVR(config)#interface gi0/0/0.99
IVR(config-subif)#encapsulation dot1q 99 native
IVR(config-subif)#ip address 192.168.99.1 255.255.255.0
IVR(config-subif)#exit
IVR(config)#

IVR(config)#interface gi0/0/0
IVR(config-if)#no shutdown
IVR(config-if)#exit
IVR(config-if)#
```

### 5. DHCP Server

```
DHCP(config)#interface gi0/0/0
DHCP(config-if)#ip address 192.168.99.253 255.255.255.0
DHCP(config-if)#no shutdown
DHCP(config-if)#exit
DHCP(config)#ip route 0.0.0.0 0.0.0.0 192.168.99.1
DHCP(config)#ip dhcp excluded-address 192.168.2.1 192.168.2.99
DHCP(config)#ip dhcp excluded-address 192.168.2.120 192.168.2.254
DHCP(config)#ip dhcp excluded-address 192.168.3.1 192.168.3.99
DHCP(config)#ip dhcp excluded-address 192.168.3.120 192.168.3.254
DHCP(config)#ip dhcp excluded-address 192.168.4.1 192.168.4.99
DHCP(config)#ip dhcp excluded-address 192.168.4.120 192.168.4.254
DHCP(config)#ip dhcp excluded-address 192.168.99.1 192.168.99.99
DHCP(config)#ip dhcp excluded-address 192.168.99.120 192.168.99.254
DHCP(config)#ip dhcp pool datos
DHCP(dhcp-config)#network 192.168.2.0 255.255.255.0
DHCP(dhcp-config)#default-router 192.168.2.1
DHCP(dhcp-config)#dns-server 8.8.8.8
DHCP(dhcp-config)#ip dhcp pool wifi_general
DHCP(dhcp-config)#network 192.168.3.0 255.255.255.0
DHCP(dhcp-config)#default-router 192.168.3.1
DHCP(dhcp-config)#dns-server 8.8.8.8
DHCP(dhcp-config)#ip dhcp pool wifi_invitados
DHCP(dhcp-config)#network 192.168.4.0 255.255.255.0
DHCP(dhcp-config)#default-router 192.168.4.1
DHCP(dhcp-config)#dns-server 8.8.8.8
DHCP(dhcp-config)#ip dhcp pool servidores
DHCP(dhcp-config)#network 192.168.99.0 255.255.255.0
DHCP(dhcp-config)#default-router 192.168.99.1
DHCP(dhcp-config)#dns-server 8.8.8.8
DHCP(dhcp-config)#
```

### 6. Configuración de WLC y Redes WiFi
   
#### 6.1 Interfaces  

Controller > Interfaces
![wlan all interfaces](wlan_interfaces_all.png)

**Interfaz para wlan "general" - Vlan 3**
Controller > Interfacez > general
![wlan interface general](wlan_interface_general.png)  

**Interfaz para wlan "invitados" - Vlan 4**
Controller > Interfacez > invitados
![wlan interface invitados](wlan_interface_guest.png)


#### 6.2 Configuración de Servidor RADIUS (AAA) en la WLC
![wlan radius server](wlan_radius_server.png)

![wlan radius server summary](wlan_radius_servers_summary.png)


#### 6.3 Configuración de las Redes WLAN

WLANs
![picture 24](wlan_WLANs.png)


**WLAN General**

WLANs > Create New > Go
![wlan general new](wlan_wifi_general_new.png)

WLANs > wifi_general > General
![picture 18](wlan_wifi_general_generaltab.png)

WLANs > wifi_general > Security > Layer 2
![picture 21](wlan_wifi_general_securityL2.png)

WLANs > wifi_general > Security > AAA
![picture 20](wlan_wifi_general_securityaaa.png)

WLANs > wifi_general > Advanced
![picture 23](wlan_wifi_general_advanced.png)  


**WLAN Invitados**

WLANs > Create New > Go
![wlan invitados new](wlan_wifi_invitados_new.png)

WLANs > wifi_invitados > General
![wlan invitados general](wlan_wifi_invitados_general.png)

WLANs > wifi_invitados > Security > Layer 2
![wlan invidatos securityl2](wlan_wifi_invitados_securityl2.png)

WLANs > wifi_invitados > Security > AAA
![wlan invidatos securityaaa](wlan_wifi_invitados_securityaaa.png)

WLANs > wifi_invitados > Advanced
![wlan invidatos advanced](wlan_wifi_invitados_advanced.png)


### 7. Servidor RADIUS

![picture 28](radius_ipaddress.png)

![picture 29](radius_AAAservice.png)  


### 8. Clientes WiFi

![picture 31](wifi_client_step1.png)  

![picture 36](wifi_client_step2.png)  

![picture 32](wifi_client_step3.png)  

![picture 33](wifi_client_step4.png)  

![picture 34](wifi_client_step5.png)  

![picture 37](wifi_client_step6.png)  

![picture 40](wifi_client_step7.png)  

![picture 41](wifi_client_step8.png)  

![picture 42](wifi_client_step9.png)  

![picture 43](wifi_client_step10.png)  

## Conclusión

Este laboratorio demuestra cómo construir una infraestructura WiFi empresarial completa y segura. Has implementado exitosamente:

- **Gestión centralizada** con Wireless LAN Controller (WLC) para administrar múltiples access points
- **Segmentación de usuarios** con VLANs separadas para empleados, invitados, datos y servidores
- **Autenticación segura** mediante servidor RADIUS con WPA2-Enterprise (802.1X)
- **Automatización** con servidor DHCP centralizado usando DHCP relay
- **Enrutamiento Inter-VLAN** para comunicación controlada entre segmentos
- **Dos redes WiFi** con diferentes niveles de acceso y seguridad

La clave de este laboratorio es entender la arquitectura de una red WiFi empresarial: el WLC gestiona centralizadamente todos los access points, cada red WiFi se mapea a una VLAN específica, RADIUS proporciona autenticación robusta verificando credenciales de usuarios, y DHCP relay permite que un servidor centralizado asigne IPs a todas las VLANs.

Esta arquitectura es fundamental en entornos empresariales donde:
- Necesitas separar el tráfico de empleados del de invitados
- Requieres autenticación por usuario (no solo una contraseña compartida)
- Debes gestionar múltiples access points desde un punto central
- La seguridad y escalabilidad son prioridades

Practica configurando diferentes políticas de seguridad para cada WLAN, experimenta con diferentes métodos de autenticación, y observa cómo el WLC facilita la gestión comparado con configurar cada AP individualmente.

**¡Excelente trabajo implementando WiFi empresarial! Esta habilidad es muy demandada en el mercado laboral.**  


