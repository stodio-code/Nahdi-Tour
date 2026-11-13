# Nahdi Tour — panduan repo

Situs statis (HTML + Tailwind CDN), di-deploy otomatis oleh Vercel dari branch `main`. Tidak ada build step.

## Checklist wajib saat membuat artikel baru

Berlaku untuk artikel biasa (`nama-artikel.html` di root) maupun artikel + simulator (`nama-tool/index.html`).

1. **Mulai dari template.** Untuk artikel biasa, salin `Artikel Detail.html` atau artikel yang sudah ada. Pertahankan struktur `main > article > .artikel-body`.
   Untuk artikel + simulator, ikuti struktur halaman tool yang ada: `main > section.hero` (badge, `<h1>`, `.meta` berisi "N menit baca", `figure.hero-figure img`) lalu `article.article > .wrap-narrow`.
2. **Google Analytics** `G-GX1CGTPR4T` ada di `<head>`.
3. **Tombol Bagikan.** Tambahkan tepat sebelum `</body>`:
   - artikel di root: `<script src="share-card.js" defer></script>`
   - artikel di subfolder: `<script src="../share-card.js" defer></script>`
4. **Meta share.** Isi `og:title` (ringkas, dipakai sebagai judul kartu share untuk halaman tool), `og:image`, dan `<link rel="canonical">`.
5. **Daftarkan kartunya** di objek `DATA` pada `Artikel.html` (`judul`, `kat`, `tgl`, `foto`, `href`), dan tambahkan URL-nya di `sitemap.xml`.
   Kartu otomatis diurutkan dari `tgl` terbaru ke terlama, jadi posisinya di dalam `DATA` tidak berpengaruh. Tulis `tgl` dengan format "13 November 2026" (nama bulan Indonesia), karena format lain tidak bisa diurutkan dan akan jatuh ke paling bawah.
6. **Jalankan pemeriksa** sebelum commit:
   ```
   node scripts/check-articles.mjs        # cek semua artikel di Artikel.html
   node scripts/check-articles.mjs --fix  # pasang GA / share-card.js yang kurang
   ```
   Pemeriksa yang sama berjalan di GitHub Actions untuk setiap PR dan push ke `main`.

## Tracking GA4 yang sudah ada

- Halaman tool: `tool_start`, `tool_complete`, `wa_click` (parameter `tool_name`). Klik di kotak penulis (`.nt-author`) sengaja tidak dihitung sebagai `tool_start`.
- Halaman Layanan (`layanan-cards.js`): `wa_click`, `partner_click`.
- Semua artikel (`share-card.js`): `share_open`, `share` (parameter `method`).
