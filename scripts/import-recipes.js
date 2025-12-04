const fs = require('fs');
const path = require('path');

const recipesFile = path.join(__dirname, '../content/recipes.json');
const outputDir = path.join(__dirname, '../content/recipes');

// Read JSON file
const recipes = JSON.parse(fs.readFileSync(recipesFile, 'utf8'));

// Ensure output directory exists
if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
}

// Generate Markdown files
recipes.forEach(recipe => {
    const { slug, title, description, occupation, task, tool, content } = recipe;
    const date = new Date().toISOString().split('T')[0]; // Use current date

    const markdownContent = `---
title: "${title}"
date: "${date}"
description: "${description}"
tags: ["${occupation}", "${tool}"]
occupation: "${occupation}"
task: "${task}"
tool: "${tool}"
---

${content}
`;

    const filePath = path.join(outputDir, `${slug}.md`);
    fs.writeFileSync(filePath, markdownContent);
    console.log(`Generated: ${slug}.md`);
});

console.log('All recipes generated successfully!');
