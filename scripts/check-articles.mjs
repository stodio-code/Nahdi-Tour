#!/usr/bin/env node
/**
 * Pemeriksa artikel Nahdi Tour.
 *
 * Membaca semua kartu di Artikel.html (properti `href:` di objek DATA), lalu memastikan
 * setiap halaman tujuannya memuat:
 *   1. Google Analytics (G-GX1CGTPR4T)
 *   2. share-card.js (kotak penulis + tombol Bagikan), dengan path yang benar
 *
 * Pemakaian:
 *   node scripts/check-articles.mjs         -> hanya memeriksa (exit 1 jika ada yang kurang)
 *   node scripts/check-articles.mjs --fix   -> memasang yang kurang secara otomatis
 */
import { readFileSync, writeFileSync, existsSync, statSync } from 'node:fs';
import { join, dirname, relative, posix } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const FIX = process.argv.includes('--fix');
const GA_ID = 'G-GX1CGTPR4T';
const GA_SNIPPET = `<!-- Google tag (gtag.js) -->
<script async src="https://www.googletagmanager.com/gtag/js?id=${GA_ID}"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', '${GA_ID}');
</script>
`;

const listing = readFileSync(join(ROOT, 'Artikel.html'), 'utf8');
const hrefs = [...listing.matchAll(/href:\s*'([^']+)'/g)].map((m) => m[1]).filter((h) => !/^https?:/.test(h));

if (!hrefs.length) {
  console.error('Tidak ada href artikel yang ditemukan di Artikel.html. Format DATA mungkin berubah.');
  process.exit(1);
}

let problems = 0, fixed = 0;
for (const href of hrefs) {
  let file = join(ROOT, decodeURIComponent(href.split(/[?#]/)[0]));
  if (href.endsWith('/') || (existsSync(file) && statSync(file).isDirectory())) file = join(file, 'index.html');
  const rel = relative(ROOT, file);
  if (!existsSync(file)) { console.error(`✗ ${href}: file ${rel} tidak ditemukan`); problems++; continue; }

  const depth = rel.split(/[\\/]/).length - 1;
  const scriptSrc = posix.join(...Array(depth).fill('..'), 'share-card.js');
  const tag = `<script src="${scriptSrc}" defer></script>`;

  let html = readFileSync(file, 'utf8');
  const missing = [];
  if (!html.includes(GA_ID)) missing.push('Google Analytics');
  const m = html.match(/<script[^>]+src="([^"]*share-card\.js)"/);
  if (!m) missing.push('share-card.js');
  else if (m[1] !== scriptSrc && m[1] !== '/share-card.js') missing.push(`path share-card.js salah ("${m[1]}", seharusnya "${scriptSrc}")`);

  if (!missing.length) { console.log(`✓ ${rel}`); continue; }

  if (FIX) {
    if (!html.includes(GA_ID)) html = html.replace('</head>', GA_SNIPPET + '</head>');
    if (m) html = html.replace(m[0], `<script src="${scriptSrc}"`);
    else html = html.replace('</body>', tag + '\n</body>');
    writeFileSync(file, html);
    console.log(`✎ ${rel}: dipasang (${missing.join(', ')})`);
    fixed++;
  } else {
    console.error(`✗ ${rel}: kurang ${missing.join(', ')}`);
    problems++;
  }
}

console.log(`\n${hrefs.length} artikel diperiksa` + (FIX ? `, ${fixed} diperbaiki.` : `, ${problems} bermasalah.`));
if (problems) {
  if (!FIX) console.error('Jalankan: node scripts/check-articles.mjs --fix');
  process.exit(1);
}
