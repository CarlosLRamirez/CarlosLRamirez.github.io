#!/bin/bash
echo "Directorio actual: $(pwd)"
echo "Descargando una imagen de prueba..."
curl -v -o test-img.jpg "https://carloslramirez.wordpress.com/wp-content/uploads/2016/09/chuchumatanes_sep2015-1.jpg?w=1536"
echo ""
echo "¿Se descargó?"
ls -lh test-img.jpg
file test-img.jpg
