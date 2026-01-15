---
title: "Como crear y asegurar una cuenta nueva en AWS desde Cero"
date: 2024-07-20T10:00:00-06:00
draft: false
tags: ["aws", "lab", "spanish"]
categories: ["AWS"]
description: "Guia paso a paso para crear y configurar de forma segura tu primera cuenta de AWS"
cover:
  image: "/images/aws_console_dark.jpg"
---

## Objetivo

El objetivo de este laboratorio es guiar a los usuarios en el proceso de creación y configuración segura de su primera cuenta de AWS. Está diseñado para aquellos que desean aprender los fundamentos de la nube, específicamente en AWS, y dar sus primeros pasos de manera segura, tomando las precauciones adecuadas para monitorear los costos asociados con el uso de AWS.

## Tabla de Contenido

- [Paso 1:Crear de una cuenta en AWS](#paso-1crear-de-una-cuenta-en-aws)
- [Paso 2:Agregar autenticación multifactor (MFA) al usuario root](#paso-2agregar-autenticación-multifactor-mfa-al-usuario-root)
- [Paso 3:Configuraciones adicionales recomendadas en la Cuenta](#paso-3configuraciones-adicionales-recomendadas-en-la-cuenta)
- [Paso 4: Crear un usuario IAM como Administrador](#paso-4-crear-un-usuario-iam-como-administrador)
- [Paso 5: Crear un presupuesto para la cuenta una alerta por correo.](#paso-5-crear-un-presupuesto-para-la-cuenta-una-alerta-por-correo)

Última revisón: 14/Oct/2024

## Paso 1:Crear de una cuenta en AWS

- Navega a <https://aws.amazon.com/> y haz clic en "Crear Cuenta de AWS" o "Create AWS Account" dependiendo del idioma en que aparezca.
  ![Pasted image 20240718071533](/images/Pasted%20image%2020240718071533.png)
- Ingresa la dirección de correo electrónico asociada a la cuenta, esta debe ser **única** y a la vez es el usuario Root de la cuenta, **este no se puede cambiar una vez creada la cuenta**.
- En la dirección de correo puedes usar un dirección de **alias** como por ejemplo `micorreo+alias@gmail`, con esto puedes usar la misma cuenta de correo principal (e.g. `micorreo@gmail.com`) multiples veces.

> **Nota:** Esto lo he comprobado con Gmail, pero tambien debería funcionar con otros proveedores de correo.

- Completa el nombre de la cuenta, en mi caso el nombre elegido es DevOps2024General, (esto **si se puede cambiar** después), y haz click en el botón de **Verify email address**.

![](/images/Pasted%20image%2020240720163225.png)

- Al correo de la cuenta llegará un código de verificación, ingresarlo para verificar que el correo nos pertenece.
  ![Pasted image 20240718072847](/images/Pasted%20image%2020240718072847.png)
- Ingresa el password para el usuario **root**, se recomienda usar un password fuerte y anotar este password en un lugar seguro, en un proximo paso agregaremos un **segundo factor de autenticación** para el usuario root (recomendado).
  ![Pasted image 20240718072934](/images/Pasted%20image%2020240718072934.png)
- Completa información de contacto, en tipo de cuenta selecciona **Personal**, y acepta los términos de servicio.
  ![Pasted image 20240718073342](/images/Pasted%20image%2020240718073342.png)![Pasted image 20240718073532](/images/Pasted%20image%2020240718073532.png)
- Ingresa la información de tarjeta de crédito (es posible que haga un cargo temporal de $1 USD, para comprobar la tarjeta. AWS no te realizará ningún otro cargó a menos que despliegues recursos que estén fuera de la capa gratuita.

- Luego debes agregar nuevamente tu número telefónico para comprobar tu identidad mediante la confirmación de un código que llegará por SMS o llamada telefónica.

> **Nota:** En mi caso seleccioné SMS y el código me llegó por medio de Whatsapp desde una cuenta llamada VerifyHubs).

![Pasted image 20240718074121](/images/Pasted%20image%2020240718074121.png)

- Luego de verificar el código recibido continuas con el siguiente paso.
  ![Pasted image 20240718074223](/images/Pasted%20image%2020240718074223.png)
- Ahora debemos selecciona el plan de soporte, el cual será **Basic Support** el cual incluye lo básico y es gratuito.
  ![Pasted image 20240718074442](/images/Pasted%20image%2020240718074442.png)
- Listo, con eso hemos completado el proceso de creación de la cuenta de AWS, luego nos dirigimos a la consola principal de AWS mediante el botón naranja grande **Go to the AWS Management Console.**
  ![Pasted image 20240718074513](/images/Pasted%20image%2020240718074513.png)
- Este es el panel principal de la consola de AWS, puede que algunos widgets todavía se estén actualizando. En la parte superior derecha aparece el nombre que asignamos a la cuenta y mas a la izquierda la región seleccionada, esta puede ser diferente de acuerdo al lugar donde te encuentres.
  ![Pasted image 20240718074545](/images/Pasted%20image%2020240718074545.png)
- Un paso importante es anotar el ID de la cuenta y guardarlo en un lugar seguro, ese ID es único para tu cuenta de AWS, puedes cambiar el nombre o alias, pero al final el ID es lo que identifica tu cuenta.
- Para ver el Account ID, haz clic en el menu desplegable al lado del nombre de la cuenta.

![Pasted image 20240718095856](/images/Pasted%20image%2020240718095856.png)

- Listo ya tienes creada tu primera cuenta en AWS, para salir no olvides darle click en Sign Out.

![Pasted image 20240718100009](/images/Pasted%20image%2020240718100009.png)

- Para entrar nuevamente a la consola de AWS puedes utilizar este [enlace](https://console.aws.amazon.com/console/home?nc2=h_ct&src=header-signin) el cual te lleva a la pagina de login principal.
- En esta pagina tienes la opción de entrar con el usuario **Root**, o un usuario IAM, en este punto aún no hemos creado un usuario IAM, por lo que ingresamos con el usuario Root.
- Selecciona donde dice **Root user** e ingresa la cuenta de correo electrónico que utilizaste para crear la cuenta.

![Pasted image 20240719053659](/images/Pasted%20image%2020240719053659.png)

- Es posible que te pida validar un código Captcha.

![Pasted image 20240719053959](/images/Pasted%20image%2020240719053959.png)

- Luego ingresa la contraseña del usuario **Root**.

![Pasted image 20240719054529](/images/Pasted%20image%2020240719054529.png)

- Te pedirá verificar un código enviado a tu correo electrónico.

![Pasted image 20240719054123](/images/Pasted%20image%2020240719054123.png)

- Y listo, te encuentras de nuevo en la consola de AWS.

![Pasted image 20240719054313](/images/Pasted%20image%2020240719054313.png)

## Paso 2:Agregar autenticación multifactor (MFA) al usuario root

Como lo comprobaste en la sección anterior, para poder acceder a tu cuenta con el usuario Root solo es necesario que alguien tenga acceso a la dirección de correo electrónico de la cuenta y a la contraseña, para que se pueda tener acceso COMPLETO a la cuenta de AWS.

Es por eso que es altamente recomendable que agregues Multiple Factor de Autenticación para el usuario Root de la cuenta, con esto agregar una capa extra de seguridad.

- Vamos al menú desplegable al lado del nombre de la cuenta y seleccionamos **Security credentials**

![Pasted image 20240719054704](/images/Pasted%20image%2020240719054704.png)

- Esto te lleva a una consola especial para el usuario **Root** donde puedes modificar algunos datos como el password de Root. En la parte de abajo aparece la opción de asignar un dispositivo MFA al usuario Root, haz clic el botón donde dice **Assign MFA device.**

![Pasted image 20240719054935](/images/Pasted%20image%2020240719054935.png)

Puedes agregar diferentes tipos de dispositivos de MFA los cuales pueden ser una llave física de seguridad, o una aplicación de autenticación en el móvil como Microsoft Autheticator o Google Authenticator, o un disopositovo tipo token para generer claves temporales. En este caso estoy utilizando la aplicación Google Authenticator y los pasos se describen a continuacion:

- Ingresa un nombre para el dispositivo MFA que vamos a agregar.
- Selecciona Auhtenticator App en el tipo de dispositivo.

![Pasted image 20240719062406](/images/Pasted%20image%2020240719062406.png)

- Luego haz clic donde dice Show QR code para que te muestre el codigo QR el cual debes escanear desde la aplicación de autenticación en el móvil.
- En la aplicación se generará código de autenticación el cual debes ingresar donde dice MFA Code 1.
- Luego debes esperar un tiempo determinado para que la aplicación del movil genere un nuevo codigo de autenticacion, este lo debes ingresar donde dice MFA Code 2
- Una vez hayas ingresado los dos codigos de autenticación consecutivos de manera correcta, el dispositivo será dado de alta.

![Pasted image 20240719062514](/images/Pasted%20image%2020240719062514.png)

- Al completar los pasos anteriores ya te aparece un dispositivo de MFA tipo Virtual asociado al usuario **Root**, el cual debes utilizar cada vez que ingresemos con a la cuenta con dicho usuario (**es decir casi nunca!**)

![Pasted image 20240719062841](/images/Pasted%20image%2020240719062841.png)

## Paso 3:Configuraciones adicionales recomendadas en la Cuenta

### 3.1 Agregar información de otros contactos en la cuenta

> **Importante:** Los siguientes pasos los debes hacer ingresando con el usuario **Root**.

- En la consola principal de AWS, debes ir al menu desplegable de la esquina superior derecha donde esta el nombre de la cuenta, y hacer clic en **Account**.

![Pasted image 20240718074833](/images/Pasted%20image%2020240718074833.png)

- Esto te lleva a la consola de Billing and Cost Management, donde **podras** ver los datos generales de la cuenta, como el ID y nombre de la cuenta, así como la información de contacto principal.

![Pasted image 20240719052459](/images/Pasted%20image%2020240719052459.png)

- Adicionalmente al contacto principal puedes agregar los contactos de **Billing**, **Operations** y Security, en una **organización** es muy probable que los encargados de cada uno de estos temas sean personas diferentes, sin embargo en este caso que es unicamente para uso personal y aprendizaje, coloca tus datos para los tres.

![Pasted image 20240718075026](/images/Pasted%20image%2020240718075026.png)

### 3.2 Habilitar usuario IAM para ver información de Facturación

- El siguiente paso es habilitar para que los usuarios IAM puedan acceder a la información de facturación, con esto no será necesario acceder con el usuario **Root** para ver datos de costos y facturación. Recordemos que debemos utilizar el usuario Root lo menos posible.

- En la pantalla de Billing and Cost Management de la cuenta, ve a la sección donde dice **IAM users and role access to Billing information** como se muestra en la imagen y haz click en **Edit**.

![Pasted image 20240718094345](/images/Pasted%20image%2020240718094345.png)

- Cheqea la opción de **Activate IAM Access** y haz clic en **Update**.

![Pasted image 20240718094419](/images/Pasted%20image%2020240718094419.png)

- Luego puedes comprobar que esta opción ha sido activada.

![Pasted image 20240718094448](/images/Pasted%20image%2020240718094448.png)

## Paso 4: Crear un usuario IAM como Administrador

Otro paso altamente recomendado es crear un usuario tipo IAM con permisos de administrador a la cuenta, con el cual podremos hace todo (o casi todo) lo que hace el usuario Root y así no usar Root en la operación normal de la cuenta.

- En la consola principal de administración de AWS, ve al servicio de IAM, para esto puede escribir IAM en la barra de búsqueda en la parte superior, y te mostrará el acceso a la consola del servicio IAM

![Pasted image 20240719063436](/images/Pasted%20image%2020240719063436.png)

- Una vez en la página con el Dashboard principal de IAM, haz click en **Users** en el menu del lado izquierdo.

![Pasted image 20240719063733](/images/Pasted%20image%2020240719063733.png)

- En este punto no tienes ningún usuario IAM en la cuenta, para crear uno nuevo haz click en **Crear Users** .

![Pasted image 20240719063820](/images/Pasted%20image%2020240719063820.png)

- Ingresa el nombre del usuario a crear, en este caso el usuario se llamará `IAMadmin`
- Cheque la opción para que el usuario tenga acceso a la consola de AWS.
- El la sección de User Type selecciona que quieres crear un usuario de IAM.
- Para el password de consola, selecciona la opción de auto-generar el password.
- Por ultimo seleccionar para que el usuario cambie su contraseña en el proximo login, y haz click en el boton de siguiente.

![Pasted image 20240719064912](/images/Pasted%20image%2020240719064912.png)

- En la siguiente pagina debes definir que permisos tendrá este usuario, esto lo podemos hacer ya sea agregando el usuario a algún grupo existente, copiando los permisos de otro usuario, o asignando una politica directamente al usuario.
- Selecciona la opción de _Attachar_ las políticas directamente al usuario.

> **Nota:** Para una gestión mas ordenada de usuarios y permisos se recomienda la creación de grupos y asignar policies a los mismos en lugar de asignar políticas a usuarios individuales

- En la sección de _Permission policies_ debes agregar la política llamada `AdministratorAccess`, la puedes buscar en la opción de búsqueda y luego marcar el checkbox en la política.
- Una vez seleccionada, ve a la parte de abajo y dale click en Next.

![Pasted image 20240719065237](/images/Pasted%20image%2020240719065237.png)

- Comprueba que todo este correcto y haz click en **Create User**

![Pasted image 20240719065844](/images/Pasted%20image%2020240719065844.png)

- En la siguiente pantalla podemos ver la URL para poder hacer el login a la cuenta directamente.
- Tambien podemos ver el password temporal al hacer click en Show y tenemos la opción de descargar estos datos en un archivo .csv (recomendado).
- Una vez anotada dicha información, podemos regresar a la lista de usuarios haciendo click en **Return to users lists.**

> **Importante:** Esta es la única oportunidad para ver la contraseña o descargar el archivo con las credenciales

![](/images/Pasted%20image%2020240720151446.png)

- A continuación debes cerrar la sesión actual haciendo click en el botón de **Sign-out**, el cual se encuentra en el menú desplegable de la parte superior derecha.

![Pasted image 20240719072409](/images/Pasted%20image%2020240719072409.png)

- Ingresa nuevamente a la cuenta utilizando la URL que anotaste en el paso anterior, o colocando el ID de la cuenta, de cualquier forma debes vas a llegar a esta pantalla de login.
- Ingresa el ID de la cuenta, el IAM que acabas de crear y la contraseña temporal que anotaste.

![Pasted image 20240719072808](/images/Pasted%20image%2020240719072808.png)

- A a continuación tendrás la opción de cambiar la contraseña temporal actual auto-generada por una nueva, te recomiendo utilizar un password fuerte de preferencia utilizando un generador de contraseñas. (No olvides almacenar esta contraseña en un lugar seguro)

![Pasted image 20240719073106](/images/Pasted%20image%2020240719073106.png)

- Ahora (al igual como hicimos con el usuario Root) vamos a agregar un MFA al usuario IAM recién creado, recordemos que dicho usuario tiene permisos full a la cuenta por lo que debemos asegurarlo de la misma forma.

- Debes ir nuevamente al servicio de IAM ya sea buscándolo en la barra de búsqueda o probablemnte te aparezca en los servicios visitados recientemente.

![Pasted image 20240719073429](/images/Pasted%20image%2020240719073429.png)

- Haz clic en **Users** para ir a la pagina de administración de usuarios IAM.

![Pasted image 20240719073506](/images/Pasted%20image%2020240719073506.png)

- Haz clic en el nombre del usuario recién creado, en este caso `IAMadmin`.

![Pasted image 20240719070710](/images/Pasted%20image%2020240719070710.png)

- Luego en el panel del usuario selecciona la pestaña de **Security Credentials**

![](/images/Pasted%20image%2020240720153018.png)

- Ve a la sección de Multi-factor authentication (MFA) y selecciona el botón de **Assign MFA device**, para agregar un nuevo dispositivo.

![Pasted image 20240719070843](/images/Pasted%20image%2020240719070843.png)

- Realizamos el mismo proceso del usuario Root utilizado en la sección anterior.

![Pasted image 20240719070924](/images/Pasted%20image%2020240719070924.png)

> **Importante:** Identifica correctamente cada usuario en la aplicación de autenticación para no equivocarnos al momento de ingresar el código MFA, esto empezará a cobrar relevancia cuando tengas a muchos MFA para diferentes usuarios , en multiples cuentas.

- Listo, ahora si estas listos para empezar a utilizar la cuenta de AWS de forma segura, con un usuario IAM con MFA.

![Pasted image 20240719072213](/images/Pasted%20image%2020240719072213.png)

## Paso 5: Crear un presupuesto para la cuenta una alerta por correo

- En la consola principal de AWS, ve al menú desplegable en la parte superior derecha y selecciona **Billing and Cost Management.**

![](/images/Pasted%20image%2020240720154716.png)

- Esto te llevara la consola principal de Costos y Facturación de AWS (Billing and Cost Management), aquí selecciona la opción de Presupuestos (**Budgets**) en el menu principal de la derecha.

![](/images/Pasted%20image%2020240720155026.png)

- En esta sección podemos crear y administrar los diferentes presupuestos que creemos para nuestra cuenta.
- Para crear un nuevo presupuesto haz clic en **Create a Budget**.

![](/images/Pasted%20image%2020240720155057.png)

- AWS ya cuenta con un template para crear un budget cero (0) costo, para que en caso de tener algún consumo en AWS este genere una alerta, para esto selecciona las opciones mostradas en la imagen:
  - Use a template (simplified)
  - Zero spend budget
  - Ingresa el nombre del presupuesto, en donde puedes dejar el nombre predefinido de `My Zero-Spend Budget´.

![](/images/Pasted%20image%2020240720155239.png)

- Adicionalmente puedes agregar las direcciones de correo electrónico donde desees que lleguen las notificaciones, estas pueden ser un máximo de 10, y pueden ir separadas por coma (,).
- Se enviará una notificación en caso se incurra en un gasto mayor a $0.01 USD
- Una vez este todo listo, haz click en el botón de Create Budget.

![](/images/Pasted%20image%2020240720155748.png)

- Al final de este paso tendrás creado un presupuesto y una alerta programada en caso tu cuenta de AWS incurra en algún costo mas allá de $0.01 USD.

![](/images/Pasted%20image%2020240720160047.png)

Ya tienes una cuenta de AWS asegurada y lista para empezar a desplegar recursos con la tranquilidad que si incurres en algún costo te llegará una alerta inmediata.
