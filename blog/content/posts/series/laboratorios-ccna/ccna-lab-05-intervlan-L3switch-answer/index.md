---
title: CCNA Lab - Inter Vlan Routing with Multilayer Switch - Lab Solution
slug: "ccna-lab-05-intervlan-l3switch-answer"
date: 2022-09-26T14:00:00-06:00
draft: false
tags:
  - ccna
  - lab
  - spanish
categories:
  - Networking
description: Configurar una red con 3 VLAN usando un switch multilayer para enrutamiento Inter VLAN - Solución
series:
  - CCNA
cover:
  image: ccna-lab-05-cover.webp
---
En este artículo encontraras la solución paso a paso para configurar enrutamiento inter-vlan en routers Cisco multicapa, mediante interfaces  tipo SVI. Para ver las instrucciones de este laboratorio, ve primero [aquí](../ccna-lab-04-intervlan-l3switch/index.md).

## Solución paso a paso

### Parte 1: Parámetros iniciales (opcional)

#### SW1

```text
Switch>
Switch>enable
Switch#configure terminal
Enter configuration commands, one per line.  End with CNTL/Z.
Switch(config)#hostname SW1
SW1(config)#banner motd "advertencia, prohibido acceso no autorizado"
SW1(config)#line console 0
SW1(config-line)#password cisco
SW1(config-line)#login
SW1(config-line)#exit
SW1(config)#enable secret class
SW1(config)#service password-encryption
SW1(config)#exit
SW1#
```

#### SW2

```text
Switch>
Switch>enable
Switch#configure terminal
Enter configuration commands, one per line.  End with CNTL/Z.
Switch(config)#hostname SW2
SW2(config)#banner motd "advertencia, prohibido el acceso no autorizado"
SW2(config)#line console 0
SW2(config-line)#password cisco
SW2(config-line)#login
SW2(config-line)#exit
SW2(config)#enable secret class
SW2(config)#service password-encryption
SW2(config)#exit
SW2#
```

#### MainSW

```text
Switch>
Switch>enable
Switch#configure terminal
Enter configuration commands, one per line.  End with CNTL/Z.
Switch(config)#hostname MainSW
MainSW(config)#banner motd "advertencia, prohibido acceso no autorizado"
MainSW(config)#line console 0
MainSW(config-line)#password cisco
MainSW(config-line)#login
MainSW(config-line)#exit
MainSW(config)#enable secret class
MainSW(config)#service password-encryption
MainSW(config)#
MainSW(config)#exit
MainSW#
```

### Parte 2: Acceso por SSH

#### SW1, SW2 y MainSW

```
MainSW#
MainSW#configure terminal
MainSW(config)#ip domain-name mylab.com
MainSW(config)#crypto key generate rsa
The name for the keys will be: MainSW.mylab.com
Choose the size of the key modulus in the range of 360 to 2048 for your
  General Purpose Keys. Choosing a key modulus greater than 512 may take
  a few minutes.

How many bits in the modulus [512]: 1024
% Generating 1024 bit RSA keys, keys will be non-exportable...[OK]

MainSW(config)#username admin secret letmein
MainSW(config)#username admin privilege 15
MainSW(config)#line vty 0 15
MainSW(config-line)#transport input ssh
MainSW(config-line)#login local
MainSW(config-line)#exit
MainSW(config)#ip ssh version 2
MainSW(config)#
MainSW(config)#exit
MainSW#
```

### Parte 3: VLANs y puertos de switch

- Configure las VLANs en SW1, SW2 y MainSW de acuerdo a la información proporcionada en la [Tabla de VLANs](../ccna-lab-04-intervlan-l3switch/index.md#Tabla%20de%20VLANs) en las [instrucciones](../ccna-lab-04-intervlan-l3switch/index.md) del laboratorio.

#### SW1, SW2 y MainSW

```text
MainSW#
MainSW#configure terminal
Enter configuration commands, one per line.  End with CNTL/Z.
MainSW(config)#vlan 10
MainSW(config-vlan)#name engineering
MainSW(config-vlan)#exit
MainSW(config)#vlan 11
MainSW(config-vlan)#name operations
MainSW(config-vlan)#exit
MainSW(config)#vlan 12
MainSW(config-vlan)#name marketing
MainSW(config-vlan)#exit
MainSW(config)#vlan 99
MainSW(config-vlan)#name mgmt
MainSW(config-vlan)#exit
MainSW(config)#
```

- Configure los puertos de acceso en SW1 y SW2 según la información proporcionada en la [tabla de asignación de puertos](../ccna-lab-04-intervlan-l3switch/index.md#Asignación%20de%20puertos%20y%20direccionamiento%20IP)

#### Repetir para SW1 y SW2

```
SW1(config)#
SW1(config)#int
SW1(config)#interface r
SW1(config)#interface range Fa0/1-5
SW1(config-if-range)#switchport mode access
SW1(config-if-range)#switchport access vlan 10
SW1(config-if-range)#exit
SW1(config)#interface range Fa0/6-10
SW1(config-if-range)#switchport mode access
SW1(config-if-range)#switchport access vlan 11
SW1(config-if-range)#exit
SW1(config)#interface range Fa0/11-15
SW1(config-if-range)#switchport mode access
SW1(config-if-range)#switchport access vlan 12
SW1(config-if-range)#exit
SW1(config)#
```

- Configure los enlaces troncales en SW1, SW2 y MainSW de forma **estática**, de acuerdo con la [tabla de asignación de puertos](../ccna-lab-04-intervlan-l3switch/index.md#Asignación%20de%20puertos%20y%20direccionamiento%20IP)

> **Unicamente debe permitir el tráfico de las vlans utilizadas en el ejercicio y rechazar cualquier trafico que pertenezca a otra VLAN.**

#### SW1 y SW2

```text
SW1(config)#
SW1(config)#interface G0/1
SW1(config-if)#switchport mode trunk
SW1(config-if)#switchport trunk allowed vlan 10,11,12,99
SW1(config-if)#exit
SW1(config)#
```

#### MainSW

```text
MainSW(config)#
MainSW(config)#interface range G1/0/1-2
MainSW(config-if-range)#switchport mode trunk
MainSW(config-if-range)#switchport trunk allowed vlan 10,11,12,99
MainSW(config-if-range)#exit
MainSW(config)#
```

- Habilite las interfaces de administración en SW1 y SW2 y asigne las direcciónes IP, de acuerdo con la información [proporcionada](../ccna-lab-04-intervlan-l3switch/index.md#Asignación%20de%20puertos%20y%20direccionamiento%20IP)
- Configure lo necesario para que el switch puede ser alcanzado desde redes externas

#### SW1

```
SW1(config)#
SW1(config)#interface vlan 99
SW1(config-if)#ip address 172.16.99.101 255.255.255.0
SW1(config-if)#exit
SW1(config)#ip default-gateway 172.16.99.1
SW1(config)#
```

#### SW2

```
SW2(config)#
SW2(config)#interface vlan 99
SW2(config-if)#ip address 172.16.99.102 255.255.255.0
SW2(config-if)#exit
SW2(config)#ip default-gateway 172.16.99.1
SW2(config)#
```

### Parte 4: Enrutamiento inter vlan

- Habilite el enrutamiento inter-vlan en MainSW mediante la configuración de las SVIs correspondientes, según lo indicado en la tabla [proporcionada](../ccna-lab-04-intervlan-l3switch/index.md#Asignación%20de%20puertos%20y%20direccionamiento%20IP), no olvide habilitar en enrutamiento IPv4 en el router multicapa.

#### MainSW

```
MainSW(config)#
MainSW(config)#interface vlan 10
MainSW(config-if)#ip address 172.16.10.1 255.255.255.0
MainSW(config-if)#exit
MainSW(config)#interface vlan 11
MainSW(config-if)#ip address 172.16.11.1 255.255.255.0
MainSW(config-if)#exit
MainSW(config)#interface vlan 12
MainSW(config-if)#ip address 172.16.12.1 255.255.255.0
MainSW(config-if)#exit
MainSW(config)#interface vlan 99
MainSW(config-if)#ip address 172.16.99.1 255.255.255.0
MainSW(config-if)#exit
MainSW(config)#
MainSW(config)#ip routing
MainSW(config)#
MainSW(config)#exit
MainSW#
```

### Parte 5: Direcciones de los hosts

- Asigne las direcciones IP a las PC's de acuerdo a la información [proporcionada](../ccna-lab-04-intervlan-l3switch/index.md#Asignación%20de%20puertos%20y%20direccionamiento%20IP).
#### Ejemplo: PC eng1

![PC configuration eng1](ccna-lab-intervlan-L3swtich-eng1.png)

#### Ejemplo: PC mkt2

![PC mkt2 configuration](ccna-lab-intervlan-L3swtich-mkt2.png)

### Parte 6: Pruebas

- Si realizó toda la configuración correctamente, debe de poder hacer ping desde cualquier computadora a los demas host, incluyendo las SVI de los switches y las interfaces del router.
- Debe poder acceder por SSH a los switches y al router desde cualquier computadora.

### Prueba de ping

![ping test](ccna-lab-intervlan-L3swtich-test1.png)

#### Prueba de SSH

![ssh test](ccna-lab-intervlan-L3swtich-test2.png)

---

Intenta realizar el laboratorio por tu cuenta, si tienes dudas puedes consultar el archivo de Packet Tracer con toda la configuración [aquí](ccna-lab-intervlan-L3switch-answer.pkt)

Espero este laboratorio sea de ayuda en tu preparación para la certificación de CCNA o para aprender de redes en general. Si crees que puede ayudar a otros, por favor compártelo.

Si encuentras algún error o punto de mejora, por favor deja tus comentarios.

Saludos,

Carlos R.
