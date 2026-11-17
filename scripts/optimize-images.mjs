#!/usr/bin/env node
/**
 * Optimizes product images before uploading them to Supabase Storage.
 *
 * Usage:
 *   npm run images:optimize -- <input-dir> <output-dir>
 *
 * For each image in <input-dir> it writes:
 *   <name>.webp        max 1200 px wide, quality 80
 *   <name>-thumb.webp  max 480 px wide, quality 80
 *
 * Run it locally; it is not part of the build.
 */
import { mkdir, readdir } from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

const SUPPORTED_EXTENSIONS = new Set(['.png', '.jpg', '.jpeg', '.webp', '.avif', '.tif', '.tiff']);
const VARIANTS = [
  { suffix: '', width: 1200 },
  { suffix: '-thumb', width: 480 },
];
const QUALITY = 80;

async function main() {
  const [inputDir, outputDir] = process.argv.slice(2);

  if (!inputDir || !outputDir) {
    console.error('Uso: npm run images:optimize -- <carpeta-entrada> <carpeta-salida>');
    process.exit(1);
  }

  let entries;
  try {
    entries = await readdir(inputDir, { withFileTypes: true });
  } catch (error) {
    console.error(`No se pudo leer la carpeta de entrada "${inputDir}": ${error.message}`);
    process.exit(1);
  }

  await mkdir(outputDir, { recursive: true });

  const images = entries.filter(
    (entry) => entry.isFile() && SUPPORTED_EXTENSIONS.has(path.extname(entry.name).toLowerCase()),
  );

  if (images.length === 0) {
    console.warn('No se encontraron imágenes compatibles en la carpeta de entrada.');
    return;
  }

  let failures = 0;
  for (const image of images) {
    const source = path.join(inputDir, image.name);
    const baseName = path.parse(image.name).name;

    try {
      for (const variant of VARIANTS) {
        const target = path.join(outputDir, `${baseName}${variant.suffix}.webp`);
        await sharp(source)
          .rotate()
          .resize({ width: variant.width, withoutEnlargement: true })
          .webp({ quality: QUALITY })
          .toFile(target);
      }
      console.log(`OK  ${image.name}`);
    } catch (error) {
      failures += 1;
      console.error(`ERR ${image.name}: ${error.message}`);
    }
  }

  console.log(`\n${images.length - failures} de ${images.length} imágenes optimizadas en "${outputDir}".`);
  if (failures > 0) process.exit(1);
}

main();
