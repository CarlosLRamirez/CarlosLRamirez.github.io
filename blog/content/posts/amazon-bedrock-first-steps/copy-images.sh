#!/bin/bash

# Script to copy images from Obsidian vault to Hugo post

SOURCE_DIR="/Users/carlos.ramirez/projects/CerebroDigital2025/3 Resources/305 Procedimientos/305.02 Laboratorios/_attachments"
DEST_DIR="/Users/carlos.ramirez/projects/CarlosLRamirez.github.io/blog/content/posts/amazon-bedrock-first-steps"

# Array of images to copy
images=(
    "Pasted image 20251208160241.png"
    "Pasted image 20251208161224.png"
    "Pasted image 20251208163809.png"
    "Pasted image 20251208165442.png"
    "Pasted image 20251208165639.png"
    "Pasted image 20251208165817.png"
    "Pasted image 20251208165922.png"
    "Pasted image 20251208213651.png"
    "Pasted image 20251209060453.png"
    "Pasted image 20251209060843.png"
    "Pasted image 20251209061047.png"
    "Pasted image 20251209062312.png"
    "Pasted image 20251209063254.png"
    "Pasted image 20251209063733.png"
    "Pasted image 20251209063952.png"
    "Pasted image 20251209064138.png"
    "Pasted image 20251209064527.png"
    "Pasted image 20251209064929.png"
    "Pasted image 20251209065011.png"
    "Pasted image 20251209065216.png"
    "Pasted image 20251209065409.png"
    "Pasted image 20251209182747.png"
)

echo "Copying images from Obsidian vault to Hugo post..."
echo "Source: $SOURCE_DIR"
echo "Destination: $DEST_DIR"
echo ""

count=0
for img in "${images[@]}"; do
    if [ -f "$SOURCE_DIR/$img" ]; then
        cp "$SOURCE_DIR/$img" "$DEST_DIR/"
        echo "✓ Copied: $img"
        ((count++))
    else
        echo "✗ Not found: $img"
    fi
done

echo ""
echo "Done! Successfully copied $count out of ${#images[@]} images."
