---
title: Trunking entre VLANs
date: 2025-01-15T11:00:00-06:00
draft: true
tags:
  - ccna
  - vlan
  - trunk
  - networking
categories:
  - Networking
description: Configuración de enlaces trunk para comunicación entre VLANs
cover:
  image: trunk-diagram.png
  alt: Diagrama de Trunk Port
  relative: true
comments: true
aliases:
  - Trunking VLANs
---

## ¿Qué es un Trunk?

Un **trunk** es un enlace entre switches que transporta tráfico de múltiples VLANs usando etiquetado 802.1Q.

## Prerequisitos

Antes de continuar, asegúrate de entender los [[fundamentos-vlans|fundamentos de VLANs]].

## Protocolo 802.1Q

El estándar IEEE 802.1Q agrega un tag de 4 bytes al frame Ethernet para identificar la VLAN.

### Componentes del Tag

- **TPID:** Tag Protocol Identifier (0x8100)
- **PRI:** Priority (3 bits)
- **CFI:** Canonical Format Indicator (1 bit)
- **VID:** VLAN ID (12 bits) - soporta hasta 4096 VLANs

## Configuración de Trunk
```cisco
Switch(config)# interface gi0/1
Switch(config-if)# switchport mode trunk
Switch(config-if)# switchport trunk allowed vlan 10,20,30
Switch(config-if)# switchport trunk native vlan 99
```

## Verificación
```cisco
Switch# show interfaces trunk

Port        Mode         Encapsulation  Status        Native vlan
Gi0/1       on           802.1q         trunking      99

Port        Vlans allowed on trunk
Gi0/1       10,20,30
```

## VLAN Nativa

⚠️ **Importante:** La VLAN nativa debe ser la misma en ambos extremos del trunk.

## Troubleshooting Común

### Problema 1: Native VLAN Mismatch
```cisco
%CDP-4-NATIVE_VLAN_MISMATCH: Native VLAN mismatch
```

**Solución:** Verificar VLAN nativa en ambos switches.

### Problema 2: VLANs no permitidas

Verificar con:
```cisco
Switch# show interfaces trunk | include allowed
```

## Artículos Relacionados

- [[fundamentos-vlans|Fundamentos de VLANs]] (anterior)
- [[inter-vlan-routing|Inter-VLAN Routing]] (próximo)

## Referencias

- IEEE 802.1Q Standard
- Cisco Switching Guide