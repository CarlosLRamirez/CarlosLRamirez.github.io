#!/bin/bash
# download-convert-images.sh

POST_DIR="/"
cd "$POST_DIR" || exit

echo "📥 Descargando imágenes..."

# Array de URLs
urls=(
  "https://carloslramirez.wordpress.com/wp-content/uploads/2016/09/chuchumatanes_sep2015-1.jpg?w=1536"
  "https://carloslramirez.wordpress.com/wp-content/uploads/2016/09/chuchumatanes_sep2015-2.jpg"
  "https://carloslramirez.wordpress.com/wp-content/uploads/2016/09/chuchumatanes_sep2015-3.jpg?w=1536"
  "https://carloslramirez.wordpress.com/wp-content/uploads/2016/09/chuchumatanes_sep2015-4.jpg?w=1536"
  "https://carloslramirez.wordpress.com/wp-content/uploads/2016/09/chuchumatanes_sep2015-5.jpg?w=1536"
  "https://carloslramirez.wordpress.com/wp-content/uploads/2016/09/chuchumatanes_sep2015-6.jpg?w=1536"
  "https://carloslramirez.wordpress.com/wp-content/uploads/2016/09/chuchumatanes_sep2015-7.jpg?w=1536"
  "https://carloslramirez.wordpress.com/wp-content/uploads/2016/09/chuchumatanes_sep2015-8.jpg?w=1536"
  "https://carloslramirez.wordpress.com/wp-content/uploads/2016/09/chuchumatanes_sep2015-9.jpg?w=1536"
  "https://carloslramirez.wordpress.com/wp-content/uploads/2016/09/chuchumatanes_sep2015-10.jpg?w=1536"
  "https://carloslramirez.wordpress.com/wp-content/uploads/2016/09/chuchumatanes_sep2015-11.jpg?w=1536"
  "https://carloslramirez.wordpress.com/wp-content/uploads/2016/09/chuchumatanes_sep2015-12.jpg?w=1536"
  "https://carloslramirez.wordpress.com/wp-content/uploads/2016/09/chuchumatanes_sep2015-13.jpg?w=1536"
  "https://carloslramirez.wordpress.com/wp-content/uploads/2016/09/chuchumatanes_sep2015-14.jpg?w=1536"
  "https://carloslramirez.wordpress.com/wp-content/uploads/2016/09/chuchumatanes_sep2015-15.jpg?w=1536"
  "https://carloslramirez.wordpress.com/wp-content/uploads/2016/09/chuchumatanes_sep2015-16.jpg?w=1536"
  "https://carloslramirez.wordpress.com/wp-content/uploads/2016/09/chuchumatanes_sep2015-17.jpg?w=1536"
  "https://carloslramirez.wordpress.com/wp-content/uploads/2016/09/chuchumatanes_sep2015-18.jpg?w=1536"
  "https://carloslramirez.wordpress.com/wp-content/uploads/2016/09/chuchumatanes_sep2015-20.jpg?w=1536"
  "https://carloslramirez.wordpress.com/wp-content/uploads/2016/09/chuchumatanes_sep2015-19.jpg?w=1536"
  "https://carloslramirez.wordpress.com/wp-content/uploads/2016/09/chuchumatanes_sep2015-21.jpg?w=1536"
  "https://carloslramirez.wordpress.com/wp-content/uploads/2016/09/chuchumatanes_sep2015-22.jpg?w=1536"
  "https://carloslramirez.wordpress.com/wp-content/uploads/2016/09/chuchumatanes_sep2015-23.jpg?w=1536"
  "https://carloslramirez.wordpress.com/wp-content/uploads/2016/09/chuchumatanes_sep2015-24.jpg?w=1536"
  "https://carloslramirez.wordpress.com/wp-content/uploads/2016/09/chuchumatanes_sep2015-25.jpg?w=1536"
)

# Descargar imágenes
counter=1
for url in "${urls[@]}"; do
  filename=$(printf "img-%02d.jpg" $counter)
  echo "  └─ Descargando: $filename"
  curl -s -o "$filename" "$url"
  counter=$((counter + 1))
done

echo ""
echo "🔄 Convirtiendo a WebP..."

# Convertir a WebP
for img in img-*.jpg; do
  output="${img%.jpg}.webp"
  echo "  └─ Convirtiendo: $img → $output"
  convert "$img" -resize 1200x800\> -quality 85 "$output"
  # Eliminar JPG original después de convertir
  rm "$img"
done

echo ""
echo "✅ Proceso completado!"
echo ""
echo "📋 Shortcodes figure para tu markdown:"
echo ""

# Generar shortcodes
for i in {1..25}; do
  filename=$(printf "img-%02d.webp" $i)
  echo "{{< figure src=\"$filename\" caption=\"Descripción de la imagen $i\" alt=\"Chuchumatanes\" >}}"
done

echo ""
echo "📝 Copia los shortcodes arriba y reemplaza los captions con descripciones reales."
