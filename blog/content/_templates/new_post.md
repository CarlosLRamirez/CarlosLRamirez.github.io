<%*
const folderName = await tp.system.prompt("Enter slug name:");
if (!folderName) {
    new Notice("Folder creation canceled.");
    return;
}

// Function to URLerize the folder name
const urlerize = (name) => {
    return name
        .toLowerCase() // Convert to lowercase
        .replace(/[^a-z0-9\s-]/g, "") // Remove special characters
        .trim() // Trim whitespace
        .replace(/\s+/g, "-"); // Replace spaces with hyphens
};

// URLerize the folder name
const sanitizedFolderName = urlerize(folderName);

// Define the base path for folders
const basePath = "posts";
const newFolderPath = `${basePath}/${sanitizedFolderName}`;

// Create the folder
await app.vault.createFolder(newFolderPath);

// move the default untitled file
await tp.file.move(newFolderPath + '/index');

// Define YAML front matter
%>---
title:
slug: <% sanitizedFolderName %>
description:
tags:
date: <% tp.date.now("YYYY-MM-DD") %>
draft: true
image:
layout:
excludeSearch: false
unlisted: false
---

Let's write something great: