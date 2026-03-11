import { renameSync, readdirSync, lstatSync, readFileSync, writeFileSync } from 'fs';
import { join } from 'path';

function walkDir(dir, callback) {
  readdirSync(dir).forEach(f => {
    let dirPath = join(dir, f);
    let isDirectory = lstatSync(dirPath).isDirectory();
    isDirectory ? walkDir(dirPath, callback) : callback(dirPath);
  });
}

// 1. Rename files .jsx -> .tsx, .js -> .ts
walkDir('./src', (filePath) => {
  if (filePath.endsWith('.jsx')) {
    renameSync(filePath, filePath.replace(/\.jsx$/, '.tsx'));
  } else if (filePath.endsWith('.js') && !filePath.endsWith('.config.js')) {
    renameSync(filePath, filePath.replace(/\.js$/, '.ts'));
  }
});

// 2. Move directories (using mv command externally later or renameSync here)
try { renameSync('./src/components/sections', './src/sections'); } catch (e) {}
try { renameSync('./src/components/3d', './src/three'); } catch (e) {}

// 3. Update imports in all .ts and .tsx files
walkDir('./src', (filePath) => {
  if (filePath.endsWith('.tsx') || filePath.endsWith('.ts')) {
    let contents = readFileSync(filePath, 'utf-8');
    
    // Replace extension references if any
    contents = contents.replace(/\.jsx/g, '');
    contents = contents.replace(/\.js/g, '');
    
    // Replace old paths: ./components/sections -> ./sections or ../components/sections -> ../sections
    // Because deep relative paths can be tricky, let's do simple naive replaces first for imports
    contents = contents.replace(/components\/sections/g, 'sections');
    contents = contents.replace(/components\/3d/g, 'three');
    
    // Remove .jsx from imports if present
    writeFileSync(filePath, contents, 'utf-8');
  }
});

// Specially update App.tsx to point to correct locations
let appTsx = readFileSync('./src/App.tsx', 'utf-8');
appTsx = appTsx.replace(/\.\/components\/sections\//g, './sections/');
// We don't have exactly 3d in App.jsx but let's just make sure.
writeFileSync('./src/App.tsx', appTsx, 'utf-8');

console.log('Restructure complete');
