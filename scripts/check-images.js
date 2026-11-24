const fs = require('fs');
const path = require('path');

const content = fs.readFileSync('src/data/catalog.ts', 'utf8');
const lines = content.split('\n');
const imgs = [];

for (const line of lines) {
  const match = line.match(/image:\s*"([^"]+)"/);
  if (match) {
    imgs.push(match[1]);
  }
}

console.log('Total catalog images found:', imgs.length);
const missing = imgs.filter(p => !fs.existsSync(path.join('public', p)));
console.log('Missing images:', missing);
if (missing.length === 0) {
  console.log('All catalog images exist cleanly in public/!');
}
