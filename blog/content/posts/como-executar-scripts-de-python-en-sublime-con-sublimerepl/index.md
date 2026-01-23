---
title: Como executar scripts de Python en Sublime con SublimeREPL
date: 2020-05-01
draft: false
description:
tags:
  - python
  - sublime
  - programming
categories:
  - Programming
aliases:
  - Como executar scripts de Python en Sublime con SublimeREPL
cover:
  image: post-cover.webp
---

> *Este articulo fue publicado originalmente en [Medium](https://medium.com/@carloslrm/como-executar-scripts-de-python-en-sublime-con-sublimerepl-87ff0ab5e7c5), y migrado a este blog el 23/01/2025*

---

Esta es una guía de como “ejecutar” o “correr” codigo de Python directamtene dentro de Sublime, sin necesidad de movernos a la terminal, para eso usamos la herramienta SublimeREPL, sin embargo ademas de instalarla debemos cambiar algunas cosas para que funcione adecuadamente:

1. Instalar SublimeREPL con el PackageControl de Sublime
2. En el menu de Sublime abrimos Preference > Browse Packages, y nos abre la carpeta donde estan todos los paquetes que tenemos instalados
3. Abrimos la carpeta de SublimeREPL y buscamos el siguiente archivo `SublimeREPL\config\Python\Main.sublime-menu`
4. Editamos el archivo `Main.sublime-menu` , buscamos el bloque que empieza con `{"command": "repl_open",` , agregamos `"-i"` en siguiente linea `"cmd": ["python", "-u", "-i", "$file_basename"],` . El bloque completo debe quedar asi:

```yaml
{"command": "repl_open",  
              "caption": "Python - RUN current file",  
              "id": "repl_python_run",  
              "mnemonic": "R",  
              "args": {  
                  "type": "subprocess",  
                  "encoding": "utf8",  
                  "cmd": ["python", "-u", "-i", "$file_basename"],  
                  "cwd": "$file_path",  
                  "syntax": "Packages/Python/Python.tmLanguage",  
                  "external_id": "python",  
                  "extend_env": {"PYTHONIOENCODING": "utf-8"}  
                  }  
               }, 
```

5. Luego, en en el menu de Sublime vamos _Tools > Build System > NewBuildSystem_, y en el archivo nuevo colocamos el siguiente codigo.

```yaml
{  
    "target": "run_existing_window_command",   
    "id": "repl_python_run",  
    "file": "config/Python/Main.sublime-menu"  
}
```

y grabamos el archivo con un cualquier nombre, cuya extension es _.sublime-build._

6. Luego, vamos a _Tools > Build System >_ y seleccioamos de la lista el _Build Systems_ que acabamos de crear.

7. Finalmente, ya podemos utilizar SublimeREPL para ejecutar directamente nuestro codigo de Python. para ello tecleamos Ctrl+B, desde el archivo con el codigo que queremos ejecutar, y se abre otra pestaña con la consola y el resultado de la ejecucion.

Estos pasos los encontré en este video, aunque en el video cambian la ruta de la instalaciónn de Python, en mi caso yo la deje por defecto como `python`

[https://www.youtube.com/watch?v=rIl0mmYSPIc](https://www.youtube.com/watch?v=rIl0mmYSPIc)