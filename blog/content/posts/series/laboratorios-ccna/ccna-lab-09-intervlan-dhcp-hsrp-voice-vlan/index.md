---
title: "CCNA Lab 9: Red Empresarial con Inter-VLAN, DHCP, HSRP y Telefonía IP"
date: 2022-10-13T08:00:00
draft: false
description: Aprende a configurar una red empresarial completa con enrutamiento Inter-VLAN usando sub-interfaces, servidor DHCP centralizado, redundancia de gateway con HSRP, VLANs de voz para telefonía IP, y conectividad a Internet mediante OSPF y NAT. Incluye configuración de Etherchannel y DHCP relay.
tags:
  - ccna
  - lab
  - spanish
categories:
  - Networking
aliases:
  - "CCNA Lab 9: Intervlan + DHCPv4 + HSRP + Voice Vlan"
cover:
  image: ccna-lab-09-cover.webp
---

## Introducción

En redes empresariales modernas, la convergencia de datos y voz sobre la misma infraestructura es esencial para reducir costos y simplificar la administración. Este laboratorio te enseña a construir una red completa que integra múltiples tecnologías fundamentales: segmentación con VLANs para separar tráfico de datos, voz e IoT; enrutamiento Inter-VLAN para comunicación entre segmentos; HSRP para redundancia de gateway; DHCP centralizado para automatizar la asignación de IPs; y conectividad a Internet mediante OSPF y NAT.

Configurarás dos routers core en alta disponibilidad, switches de acceso con VLANs de voz para telefonía IP, un servidor DHCP dedicado, y enlaces redundantes usando Etherchannel. Este escenario refleja arquitecturas reales donde la disponibilidad, escalabilidad y separación del tráfico son requisitos críticos.

Al completar este laboratorio, dominarás cómo estas tecnologías trabajan juntas para crear una infraestructura de red empresarial robusta, escalable y lista para producción.

**Última actualización:** 29/agosto/2024

## Tabla de Contenidos

- [Topología de Red](#topología-de-red)
- [Archivo Packet Tracer](#archivo-packet-tracer)
- [Configuración Paso a Paso](#configuración-paso-a-paso)
  - [Parámetros Básicos](#parámetros-básicos)
  - [Creación de VLANs](#creación-de-vlans)
  - [Puertos de Acceso](#puertos-de-acceso)
  - [Puertos de Uplink](#puertos-de-uplink)
  - [Trunks en los Switches de Distribución](#trunks-en-los-switches-de-distribución)
  - [Intervlan Routing y HSRP](#intervlan-routing-y-hsrp)
  - [Servidor DHCP (Router)](#servidor-dhcp-router)
  - [DHCP Relay (Helper Address)](#dhcp-relay-helper-address)
  - [Enlaces WAN y OSPF](#enlaces-wan-y-ospf)
  - [Configuración de NAT con Sobrecarga (PAT)](#configuración-de-nat-con-sobrecarga-pat)
- [Pruebas](#pruebas)
- [Conclusión](#conclusión)

## Topología de Red

![07-CCNALab-Topologia](ccna-lab-09-topology.png)

## Archivo Packet Tracer

Laboratorio en Packet Tracer con la configuración [final](ccna-lab-09-packettracer-final.pkt).

## Configuración Paso a Paso

### Parámetros Básicos

En todos los dispostivos de red:

```bash
hostname ISP
ip domain-name edutek.edu
enable secret cisco
no ip domain-lookup 
service password-encryption
line console 0
password cisco
login
logging synchronous 
exit
crypto key generate rsa
1024
ip ssh version 2
username admin secret cisco
username admin privilege 15
line vty 0 15
login local
transport input ssh 
exit
```

### Creación de VLANs

En TODOS los switches:

```bash
vlan 2
name datos
vlan 3
name voip
vlan 4
name iot
vlan 10
name it
exit
```


### Puertos de Acceso

En los switches de ACCESO:

```bash
interface range fa0/1-20
description pc_telefono
switchport mode access
switchport access vlan 2
switchport voice vlan 3
interface range fa0/21-24
description iot
switchport mode access
switchport access vlan 4
exit
```

### Puertos de Uplink

En los switches de ACCESO:

```bash
interface range gi0/1-2
description uplink
switchport mode trunk
switchport trunk allowed vlan 2,3,4,10
switchport trunk native vlan 10
exit
```

### Trunks en los Switches de Distribución

En los switches de distribución:

```bash
interface range fa0/19-24
switchport mode trunk
switchport trunk allowed vlan 2,3,4,10
switchport trunk native vlan 10
exit
interface range fa0/20-21
description etherchannel
shutdown
channel-group 1 mode active
interface po1
switchport mode trunk
switchport trunk allowed vlan 2,3,4,10
switchport trunk native vlan 10
interface range fa0/20-21
no shutdown
exit
```

### Intervlan Routing y HSRP

#### CORE1

```bash
interface gi0/0/0.2
encapsulation dot1q 2
ip address 192.168.2.2 255.255.255.0
standby 2 ip 192.168.2.1
standby 2 priority 200
standby 2 preempt
exit

interface gi0/0/0.3
encapsulation dot1q 3
ip address 192.168.3.2 255.255.255.0
standby 3 ip 192.168.3.1
standby 3 priority 200
standby 3 preempt
exit

interface gi0/0/0.4
encapsulation dot1q 4
ip address 192.168.4.2 255.255.255.0
standby 4 ip 192.168.4.1
standby 4 priority 200
standby 4 preempt
exit

interface gi0/0/0.10
encapsulation dot1q 10 native
ip address 192.168.10.2 255.255.255.0
standby 10 ip 192.168.10.1
standby 10 priority 200
standby 10 preempt
exit

interface gi0/0/0
no shutdown
exit
```

#### CORE2

```bash
interface gi0/0/0.2
encapsulation dot1q 2
ip address 192.168.2.3 255.255.255.0
standby 2 ip 192.168.2.1
exit

interface gi0/0/0.3
encapsulation dot1q 3
ip address 192.168.3.3 255.255.255.0
standby 3 ip 192.168.3.1
exit

interface gi0/0/0.4
encapsulation dot1q 4
ip address 192.168.4.3 255.255.255.0
standby 4 ip 192.168.4.1
exit

interface gi0/0/0.10
encapsulation dot1q 10 native
ip address 192.168.10.3 255.255.255.0
standby 10 ip 192.168.10.1
exit

interface gi0/0/0
no shutdown
exit
```


---

> [!NOTE] 
> #### Ejemplo de configuracion de HSRP con SVIs (Switches L3):
>
> CORE1: 
> 
> ```
> interface vlan 2
> ip address 192.168.2.2 255.255.255.0
> standby 2 ip 192.168.2.1
> standby 10 priority 200
> standby 10 preempt
> no shutdown
> exit
> ```
> 
> CORE2: 
> ```
> interface vlan 2
> ip address 192.168.2.3 255.255.255.0
> standby 2 ip 192.168.2.1
> standby 10 priority 200
> standby 10 preempt
> no shutdown
> exit
> ```

---
### Servidor DHCP (Router)

```bash
hostname DHCP
interface gi0/0
ip address 192.168.2.99 255.255.255.0
no shutdown
exit
ip route 0.0.0.0 0.0.0.0 192.168.2.1

ip dhcp excluded-address 192.168.2.1 192.168.2.99
ip dhcp excluded-address 192.168.3.1 192.168.3.99
ip dhcp excluded-address 192.168.4.1 192.168.4.99
ip dhcp excluded-address 192.168.10.1 192.168.10.99

ip dhcp pool datos
network 192.168.2.0 255.255.255.0
default-router 192.168.2.1
dns-server 8.8.8.8
domain-name edutek.edu

ip dhcp pool voip
network 192.168.3.0 255.255.255.0
default-router 192.168.3.1
dns-server 8.8.8.8
domain-name edutek.edu

ip dhcp pool iot
network 192.168.4.0 255.255.255.0
default-router 192.168.4.1
dns-server 8.8.8.8
domain-name edutek.edu

ip dhcp pool it
network 192.168.10.0 255.255.255.0
default-router 192.168.10.1
dns-server 8.8.8.8
domain-name edutek.edu
exit
```

### DHCP Relay (Helper Address) - Ambos Core 

```bash
interface gi0/0/0.3
ip helper-address 192.168.2.99
interface gi0/0/0.4
ip helper-address 192.168.2.99
interface gi0/0/0.10
ip helper-address 192.168.2.99
exit
```

### Enlaces WAN y OSPF

En CORE1

```bash
interface Se0/1/0
description to CORE2
ip address 10.0.0.10 255.255.255.252
no shutdown
interface Se0/1/1
description to ISP
ip address 10.0.0.1 255.255.255.252
no shutdown
exit

router ospf 1
router-id 1.1.1.1
passive-interface GigabitEthernet0/0/0.2
passive-interface GigabitEthernet0/0/0.3
passive-interface GigabitEthernet0/0/0.4
passive-interface GigabitEthernet0/0/0.10
network 10.0.0.0 0.0.0.3 area 0
network 10.0.0.8 0.0.0.3 area 0
network 192.168.2.0 0.0.0.255 area 0
network 192.168.3.0 0.0.0.255 area 0
network 192.168.4.0 0.0.0.255 area 0
network 192.168.10.0 0.0.0.255 area 0
exit


```

En CORE2

```bash
interface Se0/1/0
description to CORE1
ip address 10.0.0.9 255.255.255.252
no shutdown
interface Se0/1/1
description to ISP
ip address 10.0.0.6 255.255.255.252
no shutdown
exit

router ospf 1
router-id 2.2.2.2
passive-interface GigabitEthernet0/0/0.2
passive-interface GigabitEthernet0/0/0.3
passive-interface GigabitEthernet0/0/0.4
passive-interface GigabitEthernet0/0/0.10
network 10.0.0.4 0.0.0.3 area 0
network 10.0.0.8 0.0.0.3 area 0
network 192.168.2.0 0.0.0.255 area 0
network 192.168.3.0 0.0.0.255 area 0
network 192.168.4.0 0.0.0.255 area 0
network 192.168.10.0 0.0.0.255 area 0
exit


```

En ISP

```bash
interface Se0/1/0
description to CORE1
ip address 10.0.0.2 255.255.255.252
no shutdown
interface Se0/1/1
description to CORE2
ip address 10.0.0.5 255.255.255.252
no shutdown
exit
interface G0/0
description INTERNET
ip address 200.10.10.2 255.255.255.252
no shutdown
exit

ip route 0.0.0.0 0.0.0.0 200.10.10.1

router ospf 1
router-id 3.3.3.3
network 10.0.0.4 0.0.0.3 area 0
network 10.0.0.0 0.0.0.3 area 0
default-information originate 
exit

```

### Configuración de NAT con Sobrecarga (PAT) con la IP de Interfaz

```bash
access-list 1 permit 192.168.2.0 0.0.0.255
access-list 1 permit 192.168.3.0 0.0.0.255
access-list 1 permit 192.168.4.0 0.0.0.255
access-list 1 permit 192.168.10.0 0.0.0.255
ip nat inside source list 1 interface GigabitEthernet0/0 overload
interface GigabitEthernet0/0
ip nat outside
interface Serial0/1/0
ip nat inside
interface Serial0/1/1
ip nat inside
exit
```


## Pruebas

- Debe existir conectividad entre PCs, Teléfono y dispositivo IoT.
- PCs, Teléfonos e IoT deben obtener IP por DHCP según el segmento de red que le corresponde.
- Las PCs deben poder alcanzar por el explorador http://web.cisco.lab

## Conclusión

Este laboratorio demuestra cómo construir una red empresarial completa que integra múltiples tecnologías críticas en un solo entorno funcional. Has configurado exitosamente:

- **Segmentación de red** con VLANs separadas para datos, voz, IoT y administración
- **Enrutamiento Inter-VLAN** usando sub-interfaces para comunicación entre segmentos
- **Alta disponibilidad** mediante HSRP en los routers core, eliminando puntos únicos de fallo
- **Automatización** con servidor DHCP centralizado y DHCP relay para todas las VLANs
- **Telefonía IP** con VLANs de voz dedicadas para calidad de servicio
- **Redundancia de enlaces** usando Etherchannel entre switches de distribución
- **Enrutamiento dinámico** con OSPF para propagación de rutas
- **Conectividad a Internet** con NAT/PAT para traducción de direcciones

La clave de este laboratorio es entender cómo estas tecnologías interactúan: HSRP proporciona la IP virtual que usa DHCP como default gateway, DHCP relay permite centralizar el servidor DHCP, las VLANs de voz garantizan calidad para telefonía, y OSPF con NAT habilitan salida a Internet. Esta arquitectura de dos capas (acceso y distribución/core) es común en redes empresariales medianas.

Dominar esta configuración te prepara para implementar redes reales donde la convergencia de servicios, redundancia y escalabilidad son fundamentales. Practica provocando fallos (apagar CORE1, desconectar enlaces) para observar cómo HSRP y OSPF mantienen la conectividad automáticamente.

**¡Felicitaciones por completar este laboratorio de integración! Continúa practicando y experimentando con diferentes escenarios para consolidar tu conocimiento.**






