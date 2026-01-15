---
title: "CCNA Lab - Inter-Vlan routing + DHCPv4"
date: 2022-09-27T12:00:00-06:00
draft: false
tags: ["ccna", "lab", "spanish"]
categories: ["Networking"]
description: "Configurar un servidor DHCPv4 en un switch multicapa"
cover:
  image: "/images/ccna-lab-intervlan-dhcpv4-topology.png"
---

Este laboratorio es el **No. 3**  de **3**, los laboratorios anteriores los puede encontrar aqui, [Parte 1](/blog/posts/ccna-lab-stp/), y [Parte 2](/blog/posts/ccna-lab-etherchannel/).

Partiendo del ejercicio anterior, ahora vamos a agregar un serviodor DHCPv4 en SW1, el cual proveera de IPs a las VLANs de usuarios, exceptuando la vlan de administración de equipos de red.

## Objetivo

Configurar un servidor DHCPv4 en un switch multicapa, en una red multi vlan. El servidor DHCP debe proveer IPs dese la 10 hasta la 99.

## Topología

![topologia](/images/ccna-lab-intervlan-dhcpv4-topology.png)

## Procedimiento

# Parte 1: Rango de direcciones excluidas

```
SW1(config)#
SW1(config)#ip dhcp excluded-address 192.168.10.1 192.168.10.9
SW1(config)#ip dhcp excluded-address 192.168.10.100 192.168.10.254
SW1(config)#ip dhcp excluded-address 192.168.11.1 192.168.11.9
SW1(config)#ip dhcp excluded-address 192.168.11.100 192.168.11.254
SW1(config)#ip dhcp excluded-address 192.168.12.1 192.168.12.9
SW1(config)#ip dhcp excluded-address 192.168.12.100 192.168.12.254
SW1(config)#
```

# Parte2: Configuración de los pools de DHCP

```
SW1(config)#
SW1(config)#ip dhcp pool students
SW1(dhcp-config)#network 192.168.10.0 255.255.255.0
SW1(dhcp-config)#default-router 192.168.10.1
SW1(dhcp-config)#dns-server 8.8.8.8
SW1(dhcp-config)#domain-name mylab.com
SW1(dhcp-config)#exit
SW1(config)#
SW1(config)#ip dhcp pool teachers
SW1(dhcp-config)#network 192.168.11.0 255.255.255.0
SW1(dhcp-config)#default-router 192.168.11.1
SW1(dhcp-config)#dns-server 8.8.8.8
SW1(dhcp-config)#domain-name mylab.com
SW1(dhcp-config)#exit
SW1(config)#
SW1(config)#ip dhcp pool staff
SW1(dhcp-config)#network 192.168.12.0 255.255.255.0
SW1(dhcp-config)#default-router 192.168.12.1
SW1(dhcp-config)#dns-server 8.8.8.8
SW1(dhcp-config)#domain-name mylab.com
SW1(dhcp-config)#exit
SW1(config)#
```

# Parte 3: Prueba

Aqui podemos ver que el servidor DHCP esta entregando direcciones IP de acuerdo al rango indicado.

![](/images/ccna-lab-intervlan-dhcpv4-test1.png)


## Conclusiones

Con este laboratorio practicamos la configuración de un servidor DHCP en un dispositivo CISCO para proveer de direcciones IP en un entorno multi vlan.

Espero que este laboratorio sea de ayuda en tu preparación para la certificación de CCNA o para aprender de redes en general. Si crees que puede ayudar a otros, por favor compartelo.

Si encuentras algun error o punto de mejora, por favor deja tus comentarios.

Saludos,

Carlos R.
