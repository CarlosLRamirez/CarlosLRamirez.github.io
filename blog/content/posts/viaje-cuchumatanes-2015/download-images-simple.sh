#!/bin/bash
# download-images-simple.sh

echo "📥 Descargando imágenes..."

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

counter=1
for url in "${urls[@]}"; do
  filename=$(printf "img-%02d.jpg" $counter)
  echo "  └─ Descargando: $filename"
  curl -s -o "$filename" "$url"
  counter=$((counter + 1))
done

echo ""
echo "✅ Descarga completada!"
echo ""
echo "📊 Archivos descargados:"
ls -lh img-*.jpg

echo ""
echo "📋 Shortcodes figure (usando JPG):"
echo ""

for i in {1..25}; do
  filename=$(printf "img-%02d.jpg" $i)
  echo "{{< figure src=\"$filename\" caption=\"Descripción de la imagen $i\" alt=\"Viaje Chuchumatanes\" >}}"
done
