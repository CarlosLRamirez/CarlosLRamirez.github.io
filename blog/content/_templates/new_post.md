<%*
const folderName = await tp.system.prompt("Enter slug name:");
if (!folderName) {
    new Notice("Folder creation canceled.");
    return;
}

// Function to URLerize the folder name
const urlerize = (name) => {
    return name
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, "")
        .trim()
        .replace(/\s+/g, "-");
};

const sanitizedFolderName = urlerize(folderName);
const basePath = "posts";
const newFolderPath = `${basePath}/${sanitizedFolderName}`;

await app.vault.createFolder(newFolderPath);
await tp.file.move(newFolderPath + '/index');
%>---
title:
date: <% tp.date.now("YYYY-MM-DDTHH:mm:ssZ") %>
draft: true
description:
tags: []
categories: []
---

