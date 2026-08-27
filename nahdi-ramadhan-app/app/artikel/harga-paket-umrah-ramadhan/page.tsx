import type { Metadata } from "next";
import Link from "next/link";
import ReadingProgress from "@/components/ReadingProgress";
import CostComparison from "@/components/CostComparison";
import ArticleImage from "@/components/ArticleImage";
import BudgetSimulatorCTA from "@/components/BudgetSimulatorCTA";

const TITLE =
  "Kenapa Harga Paket Umrah Ramadhan Naik 2x Lipat? Rincian Realistis Biaya Hotel & Visa";
const DESCRIPTION =
  "Analisis transparan operasional industri travel: mengapa harga paket Umrah Ramadhan melonjak. Bedah realistis biaya hotel Ring 1, visa, tiket direct, dan logistik lapangan — plus kapan waktu berangkat paling efisien.";
const URL = "https://nahditour.com/artikel/harga-paket-umrah-ramadhan";
const OG_IMAGE =
  "https://images.unsplash.com/photo-1519074002996-a69e7ac46a42?auto=format&fit=crop&w=1200&q=80";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  keywords: [
    "harga paket umrah ramadhan",
    "biaya umrah ramadhan",
    "hotel ring 1 makkah",
    "visa umrah",
    "umrah 10 hari terakhir ramadhan",
    "Nahdi Tour",
  ],
  alternates: { canonical: URL },
  openGraph: {
    type: "article",
    url: URL,
    siteName: "Nahdi Tour",
    title: TITLE,
    description: DESCRIPTION,
    locale: "id_ID",
    images: [
      {
        url: OG_IMAGE,
        width: 1200,
        height: 630,
        alt: "Kepadatan pelataran Masjidil Haram saat malam Ramadhan",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
    images: [OG_IMAGE],
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: TITLE,
  description: DESCRIPTION,
  image: OG_IMAGE,
  author: { "@type": "Organization", name: "Nahdi Tour", url: "https://nahditour.com" },
  publisher: {
    "@type": "Organization",
    name: "Nahdi Tour",
    url: "https://nahditour.com",
  },
  datePublished: "2026-08-27",
  dateModified: "2026-08-27",
  mainEntityOfPage: { "@type": "WebPage", "@id": URL },
};

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ReadingProgress />

      {/* Top bar merek */}
      <header className="border-b border-slate-100">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-5 py-4">
          <Link
            href="/artikel/harga-paket-umrah-ramadhan"
            className="font-display text-lg font-extrabold tracking-tight text-primary-900"
          >
            Nahdi<span className="text-gold-700">Tour</span>
          </Link>
          <nav className="text-sm font-medium text-slate600">
            <span className="rounded-full bg-primary-50 px-3 py-1.5 text-primary-800 ring-1 ring-primary-100">
              Artikel
            </span>
          </nav>
        </div>
      </header>

      {/* HERO */}
      <section className="bg-gradient-to-b from-primary-50/60 to-white">
        <div className="mx-auto max-w-article px-5 pb-10 pt-12 sm:pt-16">
          <span className="inline-flex items-center gap-2 rounded-full bg-primary-900 px-3.5 py-1.5 text-xs font-bold uppercase tracking-wide text-white">
            <span className="h-1.5 w-1.5 rounded-full bg-gold-500" />
            Analisis &amp; Transparansi Biaya
          </span>

          <h1 className="mt-5 font-display text-3xl font-extrabold leading-[1.15] text-primary-900 sm:text-[2.6rem]">
            Kenapa Harga Paket Umrah Ramadhan Naik 2x Lipat?
            <span className="mt-1 block text-primary-700">
              Rincian Realistis Biaya Hotel &amp; Visa
            </span>
          </h1>

          <p className="mt-5 text-lg leading-relaxed text-slate600">
            Kami buka apa adanya struktur biaya di baliknya. Bukan sekadar
            “musim ramai”, tapi bagaimana modal operasional (COGS) sebuah paket
            justru melonjak — dan mengapa margin travel sering kali menipis,
            bukan membengkak.
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-slate600">
            <span className="inline-flex items-center gap-2">
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <circle cx="12" cy="12" r="10" />
                <path d="M12 6v6l4 2" />
              </svg>
              Estimasi baca 4 menit
            </span>
            <span className="inline-flex items-center gap-2">
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M3 7v10a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-6l-2-2H5a2 2 0 0 0-2 2Z" />
              </svg>
              Oleh Tim Riset Operasional Nahdi Tour
            </span>
          </div>
        </div>
      </section>

      {/* BODY */}
      <article className="prose-article mx-auto max-w-article px-5 pb-8">
        {/* Pembuka */}
        <h2 className="font-display text-2xl font-extrabold text-primary-900">
          Membongkar Paradoks Margin Keuntungan
        </h2>
        <p>
          Ada asumsi yang sangat umum: harga naik saat Ramadhan berarti travel
          mengambil <strong>markup profit</strong> lebih besar. Kenyataan
          operasionalnya justru sering berkebalikan. Di puncak musim, margin
          bersih banyak penyelenggara umrah <em>menipis</em>, karena kenaikan
          harga jual tidak sepenuhnya menutup lonjakan modal pokok
          (Cost of Goods Sold / COGS).
        </p>
        <p>
          Bayangkan sebuah paket sebagai keranjang berisi komponen: kamar hotel,
          kursi pesawat, visa, bus, muthawwif, hingga konsumsi. Ketika{" "}
          <strong>permintaan global</strong> menuju satu titik yang sama —
          10 hari terakhir Ramadhan — hampir setiap komponen di keranjang itu
          naik serentak, dibayar di muka, dan dengan syarat yang lebih kaku.
          Yang Anda lihat sebagai “harga 2x lipat” sebenarnya adalah cerminan
          modal yang juga hampir 2x lipat.
        </p>

        {/* Komparasi interaktif */}
        <CostComparison />

        {/* Logika hotel */}
        <h2 className="font-display text-2xl font-extrabold text-primary-900">
          Logika Biaya Hotel: Menyewa Blok, Bukan Malam
        </h2>
        <p>
          Komponen paling dramatis ada di hotel Ring 1 — deretan menara yang
          menempel pada pelataran Masjidil Haram. Di musim reguler, travel bisa
          membeli kamar per malam sesuai kebutuhan. Di 10 malam terakhir
          Ramadhan, model itu nyaris hilang. Hotel menerapkan{" "}
          <strong>sistem sewa blok</strong>: kamar dikontrak untuk rentang panjang
          (kerap 30 hari penuh Ramadhan) dan dibayar dimuka.
        </p>
        <p>
          Artinya, meskipun jamaah Anda hanya menginap 5–6 malam, travel telah
          menanggung biaya kontrak jauh lebih panjang untuk mengamankan kamar di
          lokasi terbaik. Risiko kamar kosong sepenuhnya ada di penyelenggara,
          bukan hotel. Inilah alasan struktural kenapa harga per jamaah di Ring 1
          bisa melompat 2–3 kali lipat.
        </p>

        {/* Gambar 1 */}
        <ArticleImage
          src="https://images.unsplash.com/photo-1519074002996-a69e7ac46a42?auto=format&fit=crop&w=1600&q=80"
          alt="Kepadatan pelataran Masjidil Haram dan deretan hotel Ring 1 saat malam Ramadhan"
          caption="Tingginya permintaan global atas kamar hotel di pelataran utama Masjidil Haram selama Ramadhan menjadi pemicu utama kenaikan harga berbasis sistem sewa blok."
          priority
        />

        {/* Logistik & transportasi */}
        <h2 className="font-display text-2xl font-extrabold text-primary-900">
          Logistik &amp; Transportasi: Beban yang Tak Terlihat di Brosur
        </h2>
        <p>
          Setelah hotel dan tiket, ada lapisan biaya yang jarang dibicarakan tapi
          sangat nyata: <strong>logistik lapangan</strong>. Selama puncak
          Ramadhan, otoritas kerap menutup sebagian jalur di area ring demi
          mengurai kepadatan. Bus tidak lagi bisa menurunkan jamaah tepat di
          depan hotel; titik turun bergeser lebih jauh dan rute harus direkayasa.
        </p>
        <p>
          Konsekuensinya berantai: waktu tempuh bertambah, vendor bus menetapkan{" "}
          <strong>surcharge musim puncak</strong>, dan travel harus menambah tim
          handling untuk mengawal perpindahan jamaah lansia, penanganan koper,
          serta skenario jamaah yang terpisah dari rombongan di tengah lautan
          manusia. Setiap tambahan personel dan armada adalah biaya riil yang
          masuk ke struktur paket.
        </p>

        {/* Gambar 2 */}
        <ArticleImage
          src="https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=1600&q=80"
          alt="Tim operasional dan penanganan logistik jamaah umrah di terminal keberangkatan"
          caption="Penanganan operasional dan rekayasa jalur khusus jamaah selama musim puncak Ramadhan membutuhkan alokasi tim lapangan ekstra."
        />

        {/* Keputusan finansial */}
        <h2 className="font-display text-2xl font-extrabold text-primary-900">
          Keputusan Finansial: Awal Ramadhan vs 10 Malam Terakhir
        </h2>
        <p>
          Memahami struktur biaya membawa kita ke keputusan yang paling penting
          bagi keluarga: <strong>kapan berangkat</strong>. Ini bukan soal mana
          yang “lebih baik” secara mutlak, melainkan <em>trade-off</em> yang
          jujur antara kenyamanan fisik dan efisiensi biaya.
        </p>
        <h3 className="font-display text-xl font-bold text-primary-900">
          Opsi A — 10 Malam Terakhir
        </h3>
        <p>
          Momentum spiritual tertinggi: peluang Lailatul Qadar, i&apos;tikaf di
          Masjidil Haram, dan atmosfer yang tak tergantikan. Harganya paling
          tinggi, kepadatannya paling ekstrem, dan stamina fisik menjadi faktor
          penentu kenyamanan.
        </p>
        <h3 className="font-display text-xl font-bold text-primary-900">
          Opsi B — Awal Ramadhan
        </h3>
        <p>
          Anda tetap mendapatkan keutamaan umrah di bulan Ramadhan, namun dengan
          kepadatan yang jauh lebih terkendali dan biaya yang bisa lebih hemat{" "}
          <strong>hingga 35–40%</strong>. Blok hotel belum sepenuhnya di puncak,
          slot penerbangan lebih longgar, dan mobilitas di lapangan lebih lega —
          pilihan rasional bagi jamaah lansia atau keluarga dengan anak.
        </p>

        {/* CTA interaktif */}
        <BudgetSimulatorCTA />

        <p>
          Apa pun pilihan Anda, prinsip kami tetap sama: keputusan terbaik lahir
          dari informasi yang utuh. Bila Anda sedang membandingkan beberapa paket
          dari travel mana pun, tim Nahdi Tour siap membantu membaca rinciannya
          secara netral — agar setiap rupiah yang Anda keluarkan benar-benar
          Anda pahami.
        </p>
      </article>

      {/* Footer */}
      <footer className="mt-8 border-t border-slate-100 bg-primary-950 text-primary-100">
        <div className="mx-auto max-w-5xl px-5 py-10">
          <p className="font-display text-lg font-extrabold text-white">
            Nahdi<span className="text-gold-500">Tour</span>
          </p>
          <p className="mt-2 max-w-md text-sm leading-relaxed text-primary-200">
            Analisis dan transparansi biaya perjalanan ibadah. Artikel ini
            bersifat edukatif; angka merupakan estimasi pasar musim 2025–2026 dan
            bukan penawaran resmi.
          </p>
          <p className="mt-6 text-xs text-primary-300">
            © {new Date().getFullYear()} Nahdi Tour. Seluruh hak cipta
            dilindungi.
          </p>
        </div>
      </footer>
    </>
  );
}
