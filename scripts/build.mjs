import { rmSync, mkdirSync, cpSync } from 'node:fs';

rmSync('dist', { recursive: true, force: true });

mkdirSync('dist',           { recursive: true });
mkdirSync('dist/calc/src',  { recursive: true });

cpSync('homepage/index.html', 'dist/index.html');

cpSync('index.html',          'dist/calc/index.html');
cpSync('src/calculator.js',   'dist/calc/src/calculator.js');
cpSync('src/style.css',       'dist/calc/src/style.css');
cpSync('src/ui.js',           'dist/calc/src/ui.js');

console.log('Build complete -> dist/');