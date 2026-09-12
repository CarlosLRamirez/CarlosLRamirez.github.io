---
title: Despliegue de una Landing Zone en AWS
date: 2026-08-12T12:41:00-06:00
lastmod: 2026-08-20T22:48:00-06:00
draft: true
tags: []
categories: []
description: ''
cover:
  image: post-cover.webp
---

Esta sección probablemente se convertira en el texto de un blog post respecto a este proyecto

## ¿De que se trata esto?

- Configurar un Landing Zone en AWS que permita sentar las bases y proveer un entorno organizado, seguro, controlado, gobernado sobre el cual pueda implementar diferentes proyectos y laboratorios, con cargas de trabajo dentro de este entorno siguientdo buenas practicas recomendadas por AWS y por la industria TI en General

## ¿Qué es un Landing Zone?

Por lo general las organizaciones y las personas inician sus primeros pasos en la nube de AWS desplegando servicios en cuentas aislada. Probablemente sin ningún tipo de estandarización o gobernanza.

Un paso natural y casi obligatorio cuando el uso de los servicios de nube empieza a proliferar en la organización y varios equipos empiezan a crear cuentas y desplegar recursos es estandarizar, agrupar todas las cuentas individuales bajo una misma organización, e implementar mecanismos de control y gobernanza que permitan el despliegue rápido de aplicaciones pero en un ambiente ordenado, escalable y seguro.

En el momento que la organización decide adoptar formalmente su camino a la nube, se introduce el concepto de *Landing Zone*, en donde la idea es que sirva de zona de aterrizaje para las aplicaciones y cargas de trabajo dentro de un entorno AWS multicuenta  y con una arquitectura adecuada.

Para implementar esta *Landing Zone*, AWS ofrece *Control Tower*, el cual permite automatizar y orquestar la implementación de otros servicios de AWS como AWS Organizations, AWS Service Catalog y AWS IAM Identity Center para construir una *Landing Zone* de forma más fácil y rápida.

Uno de los principales beneficios de implementar *Control Tower* es que permite aplicar controles (llamados *guardrails*) los cuales ayudan a evitar que existan *drifts* o desvíos entre las cuentas. **AWS Control Tower** permite adherirse de forma fácil a estándares corporativos, ayuda a establecer una base para el cumplimiento de requerimientos regulatorios y seguir las mejores prácticas de arquitectura cloud.

### Referencia

- [Create a Landing Zone](https://docs.aws.amazon.com/prescriptive-guidance/latest/transitioning-to-multiple-aws-accounts/create-landing-zone.html)

## ¿Porque?

Cual es el objetivo?

## Outcome / Cual es el resultado esperado?

## Cuanto me va costar?

## Que necesito para iniciar?

## Como lo voy a documentar?

## Diseño

### Documentación de referencia

- [Designing an AWS Control Tower landing zone](https://docs.aws.amazon.com/prescriptive-guidance/latest/designing-control-tower-landing-zone/introduction.html)

### Conceptos importantes de Control Tower

- Control Tower es la forma standard  de crear una Landing Zone, pero pueden existir Landing Zone personalizadas para usos muy específicos, como paso inicial se recomienda partir de Control Tower y a partir de allí evolucionar en caso haya necesidad.
- Control Tower se depliega en la cuenta que sera la management de la landing zone, ahi va crear multiples recursos para el resto de cuentas, estos recursos no deben ser modificados o borrados, ya que esto causaría un drift.
- Cuando configuramos la Landing Zone con Control Tower, automaticamente crea una Security OU que contiene las cuentas de Log Archive y Audit. Estas cuentas permiten la gestión y governanza centralizada de la landing zone a travez del monitoreo y logging* (Validar esto con la version 4.0 de Control Tower)
- Control Tower de lanza mediante un Wizard

## ¿Cómo diseñar una Landing Zone  con Control Tower?

- Parametros que debemos definir antes de lanzar el Wizard de Control Tower
  - Home Region
  - Cuenta Management
  - Nombres de las cuentas default
  - 3 emails unicos
  - Trail de CloudTrai

### Estructura de OUS (ADR 1)

```text
Root
├── Security OU (Log Archive, Audit — gestionadas por Control Tower)
├── Infrastructure OU (Shared Services / Networking)
├── Workloads OU
│   ├── Sandbox OU
│   ├── Dev OU
│   ├── Staging OU
│   └── Prod OU
└── Policy Staging OU
```

## Bitacora

### 1. Creación de Cuenta inicial y setup base

- Creación de Management Account
  - Cree una cuenta nueva desde cero
  - Account ID: 189053741492
  - Account Alias: MyLandingZone2027
  - URL: <https://189053741492.signin.aws.amazon.com/console>
  - Root: <carloslrm+ct26-mgmt@gmail.com>
  - MFA: EscalaKey / Google Auth

- Crear un IAM user, asignarle MFA y crearle Access Keys
  - User IAM: carlos.ramirez
  - MFA: EscalaKey / Google Auth
  - Le creé access keys, están en una nota de Bitwarden

> Este usuario lo borre al final

- Configurar AWS CLI con un profile para el iam user

> Este perfil lo borre y lo sustituí por otro

- Monitoreo de Gasto de la cuenta management
- Le di acceso a usuarios y roles IAM para que puedan ver informacion de Billing
- Creé un Budget
- Habilite CloudWatch para tener alertas de billing
- Creé una Alarma de Cloudwatch como respaldo

> **Note:** > De esto Grabe un video en OBS
> [Instrucciones de Claude](https://claude.ai/share/27a675c1-c2db-4f0e-96b5-4d6e005a5adb)

### 2. Desplegue de Control Tower por medio del Wizard

Tuve varios traspieses para correr el wizard, finalmente lo logre, en el proceso se crearon dos cuentas nuevas:

- LogArchive: Para los logs de Clout Trail
- Aggregator Account: Para lo de Config

Ademas cree una cuenta de Audit que luego mandé a cerrar, aún pertenece a la Organizacion pero aparece como Closed y no aparece como gestionada por Control Tower. La podria quitar de la organizacion pero necesitaria agregar ciertos requisito para convertirla en StandAlone, - sin embargo la cuetna ya esta Closed - Pienso esperar los 90 dias para ver si desaparece sola.

- Correos asignados para las cuentas de Control Tower:
  - <carloslrm+ct26-audit@gmail.com> - Audit - status: Closed
  - <carloslrm+ct26-log@gmail.com> - LogArchive
  - <carloslrm+ct26-aggregator@gmail.com> - Agreggator Account

Como parte del Wizard se activó IAM Identiy Center, con este usuario por default:

- username: <carloslrm+ct26-mgmt@gmail.com>
- url: <https://d-90667ab2ef.awsapps.com/start/#/>

> Este usuario lo borre en un paso posterior, y la url la cambie

### 3. Creación de OUs adicionales y cuenta para Policy Staging

- Cree las OUS que faltaban

  - Infrastructure OU
  - Workloads OU
    - Dev OU
    - Staging OU
    - Prod OU

- Cree la nueva cuenta con Account Factory (SCP-test)

  - Correo utilizado: <carloslrm+ct26-scp-test@gmail.com>
  - La asocié a la OU de Policy Staging

### 4. Despliegue y prueba manual de SCPs custom

- Obtuve un listado de los SCP activos por CT por default (13 de controles)

```shell
aws controltower list-enabled-controls /
--target-identifier "arn:aws:organizations::189053741492:ou/o-r1e3db1vbq/ou-wfup-c45wpcwh" /
--profile carlos.ramirez
```

- Cree el SCP No. 1 de forma Manual y lo probe en SCP -test

  - Poner aqui el `json` de la SCP

- Cree el SCP No. 2 de forma Manual y lo probe en la cuenta de SCP-test

  - Poner aqui el `json` de la SCP

- Crear el SCP No. 3 de forma manual por consola, asignarlo y probarlo

  - Crear la Service Control Policy `scp-require-mandatory-tags`
  - Descripción: `Deny EC2/RDS/S3 creation without Project and Environment tags.`
  - Policy:

  ```json
  {
  "Version": "2012-10-17",
  "Statement": [
      {
      "Sid": "DenyEC2WithoutProjectTag",
      "Effect": "Deny",
      "Action": "ec2:RunInstances",
      "Resource": "arn:aws:ec2:*:*:instance/*",
      "Condition": { "Null": { "aws:RequestTag/Project": "true" } }
      },
      {
      "Sid": "DenyEC2WithoutEnvironmentTag",
      "Effect": "Deny",
      "Action": "ec2:RunInstances",
      "Resource": "arn:aws:ec2:*:*:instance/*",
      "Condition": { "Null": { "aws:RequestTag/Environment": "true" } }
      },
      {
      "Sid": "DenyRDSWithoutProjectTag",
      "Effect": "Deny",
      "Action": "rds:CreateDBInstance",
      "Resource": "*",
      "Condition": { "Null": { "aws:RequestTag/Project": "true" } }
      },
      {
      "Sid": "DenyRDSWithoutEnvironmentTag",
      "Effect": "Deny",
      "Action": "rds:CreateDBInstance",
      "Resource": "*",
      "Condition": { "Null": { "aws:RequestTag/Environment": "true" } }
      },
      {
      "Sid": "DenyS3WithoutProjectTag",
      "Effect": "Deny",
      "Action": "s3:CreateBucket",
      "Resource": "*",
      "Condition": { "Null": { "aws:RequestTag/Project": "true" } }
      },
      {
      "Sid": "DenyS3WithoutEnvironmentTag",
      "Effect": "Deny",
      "Action": "s3:CreateBucket",
      "Resource": "*",
      "Condition": { "Null": { "aws:RequestTag/Environment": "true" } }
      }
  ]
  }
  ```

  - Adjuntar la policy a la cuenta de `Policy Staging`

### 5. Organización y modelo de permisos y accesos por IAM Identy Center e IAM

#### Creación de Grupos

Se crearon tres grupos que representan roles funcionales en IAM Identity Center

- `platform-admins` → las personas que administran la landing zone
- `developers` → las personas que despliegan cargas de trabajo
- `readonly-auditors` → las personas que solo observan

![](_attachments/Pasted%20image%2020260825T163122.png)

> **Note:** > El grupo es la identidad funcional. No importa cuántos usuarios haya en cada grupo — todos heredan las mismas reglas automáticamente.

#### Creación de Permission Sets

Se crearon tres permission sets que definen el nivel de acceso:

- [`AdministratorAccess`](_attachments/Pasted%20image%2020260825T163504.png) → acceso total a una cuenta
- [`ReadOnlyAccess`](_attachments/Pasted%20image%2020260825T163758.png) → solo lectura, sin poder modificar nada
- [`DeveloperAccess`](_attachments/Pasted%20image%2020260825T163853.png) → acceso a EC2, S3, Lambda, CloudWatch, con `iam:PassRole` restringido a servicios específicos

Los primeros dos PermisionSets, son pre-construidos por AWS, el ultimo lo constuimos de forma manual con una inline policy.

![](_attachments/Pasted%20image%2020260825T163426.png)

> **Tip:** > Un permission set es esencialmente una política IAM empaquetada que Identity Center despliega automáticamente como un rol temporal en cada cuenta donde se asigna.

- Permission set: `AdministratorAccess`

- Permission set: `ReadOnlyAccess`
- Permission Set: `DeveloperAccess`
- Inline Policiy del `DeveloperAccess`

![](_attachments/Pasted%20image%2020260825T163917.png)

```json
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Sid": "DeveloperServicesAccess",
            "Effect": "Allow",
            "Action": [
                "ec2:*",
                "s3:*",
                "lambda:*",
                "logs:*",
                "cloudwatch:*",
                "iam:GetRole",
                "iam:GetPolicy",
                "iam:ListRoles",
                "iam:ListPolicies"
            ],
            "Resource": "*"
        },
        {
            "Sid": "PassRoleToTrustedServicesOnly",
            "Effect": "Allow",
            "Action": "iam:PassRole",
            "Resource": "*",
            "Condition": {
                "StringEquals": {
                    "iam:PassedToService": [
                        "lambda.amazonaws.com",
                        "ec2.amazonaws.com"
                    ]
                }
            }
        }
    ]
}
```

- Conectar Grupos con cuentas AWS a través de permission sets.

  - Cuenta: MyLandingZone2027 (management)
    - **Grupo:** `platform-admins` -> **Permission Set:** `AdministratorAccess`
    - **Grupo:** `readonly-auditors` ->  **Permission Set:** `ReadOnlyAccess`
    - **Grupo:** `developers` -> **Permission Set:** `ReadOnlyAccess`

    ![](_attachments/Pasted%20image%2020260825T165038.png)

  - Cuenta: SCP-TEST

    - **Grupo:** `platform-admins` -> **Permission Set:** `AdministratorAccess`
    - **Grupo:** `readonly-auditors` -> **Permission Set:** `ReadOnlyAccess`

    ![](_attachments/Pasted%20image%2020260825T165051.png)

 > [!NOTE]
 > Esto significa que cuando un usuario del grupo `developers` abra el portal de Identity Center, verá la management account disponible, pero al entrar solo tendrá acceso de lectura. No puede modificar nada ahí.

#### Creación de Usuarios

- Crear usuarios y añadirlos a uno o mas grupos

  - Usuario `carlos.ramirez` miembro del grupo a `platform-admins` y `developers`
  - Usuario `carlosvsccnp` miembro del grupo a `developers`

> **Note:** > Esto significa que cuando `carlos.ramirez` se se logeé en IAM Identity Center, vera las cuentas de `MyLandingZone2027` con las opciones de entrar como `AdministratorAccess` o `ReadOnlyAccess`. Y también vera la cuenta `SCP-TEST` con la opcion de `AdministratorAccess`
>
> ![](_attachments/Pasted%20image%2020260825T174727.png)
>
> Cuando el usuario `carlosvsccnp` se logee, solo vera la cuenta `MyLandingZone` con permission set de `ReadOnlyAccess`, ya que su usuario solo esta asignado al grupo `developers`
>
> ![](_attachments/Pasted%20image%2020260825T174353.png)
>

- Por ultimo queda borrar el usuario de IAM Identy Center creado por default por el Wizard de Control Tower

  - Usuario: `carloslrm+ct26-mgmt@gmail.com`

  - El flujo completo cuando alguien se loguea

    ```text
    Usuario entra al portal de Identity Center
            ↓
    Ve las cuentas a las que tiene acceso (según los grupos a los que pertenece)
            ↓
    Elige una cuenta y un permission set
            ↓
    Identity Center genera credenciales temporales (duran 1-4 horas según configuraste)
            ↓
    El usuario opera en esa cuenta con esos permisos, y las credenciales expiran solas
    ```

    Nunca hay credenciales de larga duración involucradas en el flujo normal. Eso es exactamente lo que hace este modelo más seguro que el usuario IAM que tenías antes.

- Limpiear usuarios IAM y crear rol y usuario de emergencia `breakglass`

    Placeholder

## Cuentas y Correos

| Account      | Alias              | Correo                                 | Objetivo                                                 |
|--------------|--------------------|----------------------------------------|----------------------------------------------------------|
| 189053741492 | MyLandingZone2027  | `carloslrm+ct26-mgmt@gmail.com`        | Control Tower Management (Master)                        |
| 984419530194 | Log Archive        | `carloslrm+ct26-log@gmail.com`         | Logs de CloudTrail. Mandatoria de Control Tower.         |
| 784620264612 | Aggregator Account | `carloslrm+ct26-aggregator@gmail.com`  | Para AWS Config. Mandatoria de Control Tower.            |
| 989208155300 | Audit              | `carloslrm+ct26-audit@gmail.com`       | Creada por error. Closed. No manejada por Control Tower. |
|              | SCP Test           | `carloslrm+ct26-scp-test@gmail.com`    | Para probar SCPs en un ambiente de staging.              |
