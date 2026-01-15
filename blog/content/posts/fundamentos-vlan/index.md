---
title: Fundamentos de VLANs
date: 2025-01-15T10:00:00-06:00
draft: false
tags:
  - ccna
  - vlan
  - networking
categories:
  - Networking
description: Conceptos básicos de VLANs y su importancia en redes modernas
cover:
  image: vlan-diagram.png
  alt: Diagrama de VLANs
  relative: true
comments: true
aliases:
  - Fundamentos de VLANs
---

## ¿Qué es una VLAN?

Una VLAN (Virtual Local Area Network) es una red lógica que agrupa dispositivos, independientemente de su ubicación física.

## Beneficios de VLANs

- **Segmentación:** Separa broadcast domains
- **Seguridad:** Aísla tráfico sensible
- **Flexibilidad:** Reorganiza red sin cambiar cableado
- **Rendimiento:** Reduce broadcast traffic

## Tipos de VLANs

### VLAN de Datos
Para tráfico de usuarios normales.

### VLAN de Voz
Dedicada para telefonía IP.

### VLAN Nativa
VLAN sin etiquetar en trunk ports.

## Comandos Básicos
```cisco
Switch(config)# vlan 10
Switch(config-vlan)# name VENTAS
Switch(config-vlan)# exit

Switch(config)# interface fa0/1
Switch(config-if)# switchport mode access
Switch(config-if)# switchport access vlan 10
```

## Siguiente Tema

En el próximo artículo veremos cómo configurar [[trunking-vlans|trunking entre switches]].

[[trunking-vlans]]

[[posts/trunking-vlans/index.md]]

[[posts/fundamentos-vlan/index.md]]

[[posts/trunking-vlans/index.md]]

[[posts/fundamentos-vlan/index.md]]



## Recursos

- Cisco CCNA Documentation
- RFC 802.1Q