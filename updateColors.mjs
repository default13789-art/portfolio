import { readFileSync, writeFileSync } from 'fs';
import { join } from 'path';
import { readdirSync, lstatSync } from 'fs';

function walkDir(dir, callback) {
  readdirSync(dir).forEach(f => {
    let dirPath = join(dir, f);
    let isDirectory = lstatSync(dirPath).isDirectory();
    isDirectory ? walkDir(dirPath, callback) : callback(dirPath);
  });
}

walkDir('./src', (filePath) => {
  if (filePath.endsWith('.tsx') || filePath.endsWith('.ts') || filePath.endsWith('.css')) {
    let contents = readFileSync(filePath, 'utf-8');
    
    // Replace hex codes
    let newContents = contents
      .replace(/#050505/gi, '#050510') // Dark bg
      .replace(/#1A1A2E/gi, '#050510') // other dark bg
      .replace(/#00f3ff/gi, '#00F5FF') // neon cyan
      .replace(/#ff00ff/gi, '#8A2BE2') // neon purple
      .replace(/#d946ef/gi, '#8A2BE2'); // magenta -> purple

    // Apply specific Framer motion imports mapping in App.tsx to setup suspense fallback, etc
    
    if (newContents !== contents) {
      writeFileSync(filePath, newContents, 'utf-8');
    }
  }
});

console.log('Color updates complete');
