<%*
const postTitle = await tp.system.prompt("Enter post title:");
if (!postTitle) {
    new Notice("Post creation canceled.");
    return;
}

// Function to create URL slug from title
const slugify = (name) => {
    return name
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, "")
        .trim()
        .replace(/\s+/g, "-");
};

const slug = slugify(postTitle);
const basePath = "posts";
const newFolderPath = `${basePath}/${slug}`;

await app.vault.createFolder(newFolderPath);
await tp.file.move(newFolderPath + '/index');
%>---
title: <% postTitle %>
date: <% tp.date.now("YYYY-MM-DDTHH:mm:ssZ") %>
draft: true
description:
tags: []
categories: []
aliases:
  - <% postTitle %>
---

Start writing here...

