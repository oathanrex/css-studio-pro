import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const rootDir = __dirname;
const distDir = path.join(rootDir, 'dist');
const templateHtmlDist = path.join(distDir, 'template.html');

// 1. Copy dist/template.html to dist/index.html
if (fs.existsSync(templateHtmlDist)) {
  fs.copyFileSync(templateHtmlDist, path.join(distDir, 'index.html'));
  fs.copyFileSync(templateHtmlDist, path.join(rootDir, 'index.html'));
  fs.copyFileSync(templateHtmlDist, path.join(rootDir, '404.html'));
  console.log('✓ Synced compiled HTML to index.html and 404.html');
}

// 2. Sync assets from dist/assets to root/assets
const distAssets = path.join(distDir, 'assets');
const rootAssets = path.join(rootDir, 'assets');
if (fs.existsSync(distAssets)) {
  if (fs.existsSync(rootAssets)) {
    fs.rmSync(rootAssets, { recursive: true, force: true });
  }
  fs.cpSync(distAssets, rootAssets, { recursive: true });
  console.log('✓ Synced assets directory');
}

// 3. Ensure SEO and meta files exist in root and dist
const staticFiles = ['favicon.svg', 'robots.txt', 'sitemap.xml'];
for (const file of staticFiles) {
  const pubPath = path.join(rootDir, 'public', file);
  if (fs.existsSync(pubPath)) {
    fs.copyFileSync(pubPath, path.join(rootDir, file));
    fs.copyFileSync(pubPath, path.join(distDir, file));
  }
}

// 4. Ensure .nojekyll
fs.writeFileSync(path.join(rootDir, '.nojekyll'), '');
fs.writeFileSync(path.join(distDir, '.nojekyll'), '');
console.log('✓ Verified .nojekyll');
