# Nahdi Tour — Artikel Interaktif: Harga Paket Umrah Ramadhan

Halaman artikel interaktif & komprehensif dibangun dengan **Next.js (App Router)**, **TypeScript**, dan **Tailwind CSS**. Topik: analisis transparan mengapa harga paket Umrah Ramadhan naik hingga 2x lipat — bedah biaya hotel Ring 1, visa, tiket, dan logistik.

Route utama: `/artikel/harga-paket-umrah-ramadhan` (root `/` melakukan redirect ke sana).

## Fitur

- **Hero** dengan badge kategori, subheadline, dan estimasi waktu baca.
- **Reading progress bar** (client component).
- **Komparasi biaya interaktif** — toggle Reguler vs 10 Hari Terakhir Ramadhan, card grid yang bisa di-expand, dan tabel ringkas dengan pengali kenaikan.
- **Simulator anggaran + CTA WhatsApp** — pilih periode & jumlah jamaah, hasilkan pesan WhatsApp terisi otomatis ke konsultan.
- **SEO lengkap**: `title`, `description`, `openGraph`, `twitter`, canonical, dan JSON-LD `Article`.
- **Next/Image** dengan placeholder Unsplash (siap diganti aset milik Nahdi Tour).

## Jalankan secara lokal

```bash
npm install
npm run dev
```

Buka http://localhost:3000 — akan otomatis diarahkan ke artikel.

Build produksi:

```bash
npm run build
npm run start
```

## Konfigurasi yang perlu disesuaikan

- **Gambar**: dua `<ArticleImage>` dan OG image memakai URL Unsplash sebagai placeholder. Ganti dengan aset resmi (mis. taruh di `/public/assets/...` lalu ubah `src`). Domain remote diatur di `next.config.ts` → `images.remotePatterns`.
- **Nomor WhatsApp**: `WHATSAPP_NUMBER` di `components/BudgetSimulatorCTA.tsx` (default `6281314542357`).
- **Angka biaya**: konstanta di `components/CostComparison.tsx` dan `components/BudgetSimulatorCTA.tsx` bersifat ilustratif.

## Push ke GitHub

Dari dalam folder `nahdi-ramadhan-app/` (repo Git tersendiri):

```bash
git init
git add .
git commit -m "feat: artikel interaktif harga paket umrah Ramadhan"
git branch -M main
git remote add origin https://github.com/<username>/nahdi-ramadhan-app.git
git push -u origin main
```

> Ganti `<username>` dengan akun/organisasi GitHub Anda. Buat repository kosong lebih dulu di GitHub (tanpa README/gitignore agar tidak konflik).

## Deploy ke Vercel

**Opsi A — via dashboard (paling mudah):**

1. Buka https://vercel.com/new dan pilih **Import Git Repository**.
2. Pilih repo `nahdi-ramadhan-app`.
3. Vercel mendeteksi Next.js otomatis — Framework Preset **Next.js**, Build Command `next build`, tanpa konfigurasi tambahan.
4. Klik **Deploy**. Setiap `git push` ke `main` akan memicu deploy otomatis.

**Opsi B — via Vercel CLI:**

```bash
npm i -g vercel
vercel        # preview deployment (jawab prompt setup)
vercel --prod # deploy ke produksi
```

Tidak ada environment variable yang wajib untuk menjalankan halaman ini.
