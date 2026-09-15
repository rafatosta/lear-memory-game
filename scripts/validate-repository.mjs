import { access } from 'node:fs/promises';
const needed = ['README.md', 'src/app/App.tsx', 'src/domain/memory.ts', '.github/workflows/ci.yml'];
for (const file of needed) await access(new URL(`../${file}`, import.meta.url));
console.log('Repository valid.');
