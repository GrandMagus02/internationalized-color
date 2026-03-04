/**
 * Fix corrupted sources lines in locale files.
 * The previous fix script turned ]', into ]',  (added extra quote after ])
 */
import { readdir } from 'node:fs/promises';

const localesDir = `${import.meta.dir}/../src/locales`;

async function main() {
  const files = (await readdir(localesDir))
    .filter(f => f.endsWith('.ts') && f !== 'index.ts')
    .sort();

  let totalFixed = 0;
  for (const file of files) {
    const filePath = `${localesDir}/${file}`;
    let content = await Bun.file(filePath).text();

    // Fix sources lines: ]', should be ],
    const fixed = content.replace(
      /^(\s*sources:\s*\[.*\])',$/gm,
      '$1,'
    );

    if (fixed !== content) {
      await Bun.write(filePath, fixed);
      console.log(`Fixed: ${file}`);
      totalFixed++;
    }
  }
  console.log(`Total: ${totalFixed}`);
}

main().catch(console.error);
