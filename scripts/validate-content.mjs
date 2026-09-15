import { readFile } from 'node:fs/promises';
const content = await readFile(new URL('../src/content/game-content.ts', import.meta.url), 'utf8');
if (!content.includes('memoryCards') || !content.includes('biomeItems') || !content.includes('educationalFacts')) throw new Error('Game content configuration is incomplete.');
console.log('Content valid.');
