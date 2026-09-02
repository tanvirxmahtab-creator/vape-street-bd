import fs from 'fs';
import path from 'path';

function copyFolderRecursiveSync(source, target) {
  if (!fs.existsSync(target)) {
    fs.mkdirSync(target, { recursive: true });
  }

  if (fs.lstatSync(source).isDirectory()) {
    const files = fs.readdirSync(source);
    files.forEach((file) => {
      const curSource = path.join(source, file);
      const curTarget = path.join(target, file);
      if (fs.lstatSync(curSource).isDirectory()) {
        copyFolderRecursiveSync(curSource, curTarget);
      } else {
        fs.copyFileSync(curSource, curTarget);
      }
    });
  }
}

const outDir = path.resolve('./out');
const rootDir = path.resolve('.');

if (fs.existsSync(outDir)) {
  console.log('Syncing Next.js export out/ directory to root...');
  copyFolderRecursiveSync(outDir, rootDir);
  console.log('✅ Sync completed successfully!');
} else {
  console.error('out/ directory does not exist.');
}
