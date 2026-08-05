---
title: "{{ replace .File.ContentBaseName "-" " " | title }}"
date: {{ .Date }}
draft: true

# Peso: controla el orden en la portada. Menor = aparece primero.
weight: 10

# Sector en vez del nombre del cliente.
sector: "Banca regional · Centroamérica"
role: "Cloud Technical Program Manager"
period: "2024 – 2025"

# Opcional: da idea del tamaño sin revelar al cliente.
# scale: "12 cuentas AWS · 40+ microservicios · 3 países"

# Aparecen como chips. Los primeros 5 se muestran en la tarjeta de portada.
stack:
  - "AWS Control Tower"
  - "Transit Gateway"
  - "Terraform"

# Resumen de una o dos líneas: es lo que se lee en la tarjeta de portada
# y lo que sale en Google y al compartir el link.
summary: ""

# Resultados medibles. Es la parte que más pesa en un portafolio.
outcomes:
  - ""
---

## Contexto

Cuál era la situación y por qué el proyecto existía.

## Enfoque

Las decisiones de arquitectura y los tradeoffs que evaluaste.

## Resultado

Qué quedó en producción y qué cambió para el negocio.
