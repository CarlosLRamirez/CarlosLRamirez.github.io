---
title: "CCNA Lab - Inter-Vlan routing + Etherchannel"
date: 2022-09-27T10:00:00-06:00
draft: false
tags: ["ccna", "lab", "spanish"]
categories: ["Networking"]
description: "Laboratorio de agregación de enlaces con LACP, PAgP y manual"
series: ["CCNA"]
cover:
  image: "/images/ccna-lab-intervlan-etherchannel-topology.png"
---

Este laboratorio es el **No. 2** de **3**, los laboratorios anteriores los puede encontrar aqui, [Parte 1](/blog/posts/ccna-lab-stp/), y [Parte 3](/blog/posts/ccna-lab-dhcpv4/).

Partiendo del ejercicio anterior, ahora agregaremos enlaces redudantes entres SW1, SW2 y SW3 para formar Etherchannels entre ellos y aumentar el ancho de banda y la disponiblidad.

## Objetivo

El proposito de este laboratorio es configurar la agregación de enlaces (Etherchannels) entre los switches SW1, SW2 y SW3, implementando los protocolos PAgP, LACP, asi como de forma manual (sin protocolo).

## Topología

![topologia](/images/ccna-lab-intervlan-etherchannel-topology.png)

## Procedimiento

### Parte 1: Etherchannel entre SW2 y SW3 (LACP)

Empezamos con apagar las interfaces individuales que forman el channel-group, para evitar cualquier conflicto. Eliminamos toda la configuración previa existe en las interfaces individuales y las agregamos a un nuervo channel-group.

Luego configuramos el enlace troncal, pero esta vez a nivel de port-channel, no en las interfaces individuales

```
SW2(config)#
SW2(config)#interface range f0/21,f0/24
SW2(config-if-range)#shutdown
SW2(config-if-range)#no switchport mode trunk
SW2(config-if-range)#no switchport trunk allowed vlan
SW2(config-if-range)#no switchport trunk native vlan
SW2(config-if-range)#channel-group 1 mode active
SW2(config-if-range)#exit
SW2(config)#interface po1
SW2(config-if)#switchport mode trunk
SW2(config-if)#switchport trunk allowed vlan 10,11,12,99
SW2(config-if)#switchport trunk native vlan 99
SW2(config-if)#exit
SW2(config)#
```

Repetimos el proceso en SW3

```
SW3(config)#
SW3(config)#interface range f0/21,f0/24
SW3(config-if-range)#shutdown
SW3(config-if-range)#no switchport mode trunk
SW3(config-if-range)#no switchport trunk allowed vlan
SW3(config-if-range)#no switchport trunk native vlan
SW3(config-if-range)#channel-group 1 mode passive
SW3(config-if-range)#
SW3(config-if-range)#exit
SW3(config)#interface po1
SW3(config-if)#switchport mode trunk
SW3(config-if)#switchport trunk allowed vlan 10,11,12,99
SW3(config-if)#switchport trunk native vlan 99
SW3(config-if)#exit
SW3(config)#

```

### Parte 2: Etherchannel entre SW1 y SW3 (PAgP)

Configuramos el etherchannel en SW3 con las interfaces apagadas para evitar cualquier conflicto, primero eliminamos toda la configuración exitente en las interfaces individuales, luego las asociamos con el channel group 2 y finalmente configuramos en enlace troncal en el Port-channel.

```
SW3(config)#
SW3(config)#interface range g0/1,g0/2
SW3(config-if-range)#shutdown
SW3(config-if-range)#no switchport mode trunk
SW3(config-if-range)#no switchport trunk allowed vlan
SW3(config-if-range)#no switchport trunk native vlan
SW3(config-if-range)#channel-group 2 mode auto
SW3(config-if-range)#exit
SW3(config)#interface po2
SW3(config-if)#switchport mode trunk
SW3(config-if)#switchport trunk allowed vlan 10,11,12,99
SW3(config-if)#switchport trunk native vlan 99
SW3(config-if)#
```

Repetimos el proceso en el SW1

```
SW1(config)#
SW1(config)#interface range gi1/0/22-23
SW1(config-if-range)#shutdown
SW1(config-if-range)#no switchport mode trunk
SW1(config-if-range)#no switchport trunk allowed vlan
SW1(config-if-range)#no switchport trunk native vlan
SW1(config-if-range)#channel-group 1 mode desirable
SW1(config-if-range)#exit
SW1(config)#interface po1
SW1(config-if)#switchport mode trunk
SW1(config-if)#switchport trunk allowed vlan 10,11,12,99
SW1(config-if)#switchport trunk native vlan 99
SW1(config-if)#exit
SW1(config)#

```

### Parte 3: Etherchannel entre SW1 y SW2 (manual)

Repetimos los pasos anteriores, sin embargo en este caso no utilizaremos ningún protocolo para la negociación del Etherchannel, sino lo formaremos de forma "manual".

```
SW1(config)#
SW1(config)#interface range gi1/0/21,gi1/0/24
SW1(config-if-range)#shutdown
SW1(config-if-range)#no switchport mode trunk
SW1(config-if-range)#no switchport trunk allowed vlan
SW1(config-if-range)#no switchport trunk native vlan
SW1(config-if-range)#channel-group 2 mode on
SW1(config-if-range)#exit
SW1(config)#interface po2
SW1(config-if)#switchport mode trunk
SW1(config-if)#switchport trunk allowed vlan 10,11,12,99
SW1(config-if)#switchport trunk native vlan 99
SW1(config-if)#exit
SW1(config)#
```

```
SW2(config)#
SW2(config)#interface range gi0/1-2
SW2(config-if-range)#shutdown
SW2(config-if-range)#no switchport mode trunk
SW2(config-if-range)#no switchport trun allowed vlan
SW2(config-if-range)#no switchport trunk native vlan
SW2(config-if-range)#channel-group 2 mode on
SW2(config-if-range)#exit
SW2(config)#int
SW2(config)#interface po2
SW2(config-if)#switchport mode trunk
SW2(config-if)#switchport trunk allowed vlan 10,11,12,99
SW2(config-if)#switchport trunk native vlan 99
SW2(config-if)#exit
SW2(config)#


```

## Parte 4: Verificación de enlaces etherchannel

Encendemos todos los puertos troncales y verificamos que los etherchannel y los enlaces troncales esten correctos.

```
SW1(config)#
SW1(config)#interface range gi1/0/21-24
SW1(config-if-range)#no shut
```

```
SW2(config)#
SW2(config)#interface range f0/21,f0/24,g0/1-2
SW2(config-if-range)#no shutdown
```

```
SW3(config)#
SW3(config)#interface range f0/21,f0/24,g0/1-2
SW3(config-if-range)#no shutdown
```

Aqui podemos ver que los etherchannel se han establecido correctamente en los tres switches, según el protocolo configurado,

```
SW1#show etherchannel summary
Flags:  D - down        P - in port-channel
        I - stand-alone s - suspended
        H - Hot-standby (LACP only)
        R - Layer3      S - Layer2
        U - in use      f - failed to allocate aggregator
        u - unsuitable for bundling
        w - waiting to be aggregated
        d - default port


Number of channel-groups in use: 2
Number of aggregators:           2

Group  Port-channel  Protocol    Ports
------+-------------+-----------+----------------------------------------------

1      Po1(SU)           PAgP   Gig1/0/22(P) Gig1/0/23(P)
2      Po2(SU)           -      Gig1/0/21(P) Gig1/0/24(P)

```

## Conclusiones

Con este laboratorio practicamos la configuración de Etherchannel en switches CISCO, utilizando los protocolos LACP y PAgP, así como mediante forma manual.

Obervamos como se modifica la información de spanning tree al tener configurados enlaces agregados (etherchannel) en lugar de interfaces individuales.

Espero que este laboratorio sea de ayuda en tu preparación para la certificación de CCNA o para aprender de redes en general. Si crees que puede ayudar a otros, por favor compartelo.

Si encuentras algun error o punto de mejora, por favor deja tus comentarios.

Saludos,

Carlos R.
