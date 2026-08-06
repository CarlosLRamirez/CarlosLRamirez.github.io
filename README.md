# carloslramirez.com

Repositorio del código de mi [sitio web personal](https://www.carloslramirez.com).
Es un monorepo multi-sitio que se publica en GitHub Pages sobre el dominio raíz.

## Estructura

| Carpeta          | Tecnología     | Se sirve en                     |
| ---------------- | -------------- | ------------------------------- |
| `landing-source/`| Astro          | `/` (landing + portafolio + CV) |
| `blog/`          | Hugo (PaperMod)| `/blog/`                        |
| —                | Quartz (repo aparte) | `/notes/` *(no vive en este repo)* |

Todo el contenido del landing/portafolio vive en `landing-source/src/data/site.ts`.

## Despliegue

`.github/workflows/deploy.yml` se ejecuta en cada `push` a `master`. En **cada**
corrida reconstruye **ambos** sitios (Astro y Hugo), los ensambla en un solo
`public/` y despliega todo el artefacto — nunca uno queda desactualizado.

> Si un push no dispara el workflow (p. ej. un incidente de GitHub), lánzalo
> manualmente: pestaña **Actions → Deploy Multi-Site to GitHub Pages → Run workflow**,
> o `gh workflow run "Deploy Multi-Site to GitHub Pages" --ref master`.

## Correr en local, paso a paso

Requisitos: Node ≥ 22.12 y Hugo extended (`brew install hugo`).

### Opción A — Solo el sitio Astro (desarrollo rápido, con recarga en caliente)

```bash
cd landing-source
npm install        # solo la primera vez
npm run dev
```

Abre <http://localhost:4321/>. Los cambios en `src/**` se recargan al instante.

> Los enlaces **Blog** y **Notes** darán 404 aquí: son builds aparte que no
> existen en el servidor de desarrollo de Astro. Es lo esperado.

### Opción B — El sitio completo (Astro + blog Hugo, igual que producción)

Reproduce lo que hace el CI y sírvelo todo junto:

```bash
# desde la raíz del repo
rm -rf public && mkdir -p public

# 1) Astro -> raíz
cd landing-source && npm install && npm run build && cp -r dist/. ../public/ && cd ..

# 2) blog Hugo -> /blog
cd blog && hugo --minify --baseURL "http://localhost:8000/blog/" -d ../public/blog && cd ..

# 3) servir todo
python3 -m http.server 8000 --directory public
```

Abre <http://localhost:8000/> (landing + portafolio) y <http://localhost:8000/blog/>.
Ahora el enlace **Blog** sí resuelve. `public/` está en `.gitignore`, así que este
build de prueba no se versiona.

Para detener el servidor: `kill $(lsof -ti:8000)`.
