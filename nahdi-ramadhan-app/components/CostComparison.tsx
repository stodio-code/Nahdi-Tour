"use client";

import { useMemo, useState } from "react";

type Row = {
  key: string;
  label: string;
  note: string;
  regular: number;
  ramadan: number;
  detail: string;
};

/**
 * Estimasi rata-rata pasar musim 2025–2026 (per jamaah, kelas menengah).
 * Angka ilustratif untuk kalibrasi keputusan — bukan tarif resmi Nahdi Tour.
 */
const ROWS: Row[] = [
  {
    key: "hotel",
    label: "Hotel Ring 1 (Makkah)",
    note: "Sistem sewa blok 30 hari vs harga malaman reguler",
    regular: 9_500_000,
    ramadan: 24_000_000,
    detail:
      "Di 10 malam terakhir, hotel pelataran hampir tidak menjual harga per malam. Travel wajib mengontrak blok kamar sepanjang periode Ramadhan (kerap 30 hari) — modal dibayar penuh di muka meski jamaah hanya menginap beberapa malam.",
  },
  {
    key: "flight",
    label: "Tiket Pesawat Direct",
    note: "Keterbatasan landing slot & lonjakan permintaan global",
    regular: 12_000_000,
    ramadan: 21_500_000,
    detail:
      "Slot pendaratan di Jeddah/Madinah terbatas dan diperebutkan operator seluruh dunia. Penerbangan langsung (direct) yang paling nyaman adalah yang paling cepat habis, sehingga harga kursi melonjak tajam.",
  },
  {
    key: "ground",
    label: "Transportasi Bus & Handling",
    note: "Surcharge musim puncak & penutupan jalur ring",
    regular: 3_000_000,
    ramadan: 6_500_000,
    detail:
      "Penutupan sebagian jalur di area ring memaksa rekayasa rute, titik turun lebih jauh, dan penambahan tim handling lapangan. Vendor bus menerapkan surcharge musim puncak untuk ketersediaan armada.",
  },
  {
    key: "ops",
    label: "Muthawwif & Operasional Lapangan",
    note: "Rasio pendamping diperketat saat kepadatan puncak",
    regular: 2_500_000,
    ramadan: 4_500_000,
    detail:
      "Kepadatan ekstrem menuntut rasio pembimbing per jamaah yang lebih ketat, jam kerja lebih panjang, serta cadangan tim untuk skenario jamaah terpisah dari rombongan.",
  },
];

const SEASONS = {
  regular: {
    id: "regular" as const,
    title: "Musim Reguler",
    subtitle: "Di luar puncak",
    field: "regular" as const,
    accent: "text-primary-700",
    ring: "ring-primary-200",
    chip: "bg-primary-50 text-primary-800 ring-1 ring-primary-100",
  },
  ramadan: {
    id: "ramadan" as const,
    title: "10 Hari Terakhir Ramadhan",
    subtitle: "Puncak permintaan global",
    field: "ramadan" as const,
    accent: "text-gold-900",
    ring: "ring-gold-100",
    chip: "bg-gold-50 text-gold-900 ring-1 ring-gold-100",
  },
};

const rupiah = (n: number) =>
  new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(n);

export default function CostComparison() {
  const [season, setSeason] = useState<"regular" | "ramadan">("ramadan");
  const [open, setOpen] = useState<string | null>(null);

  const totals = useMemo(() => {
    const regular = ROWS.reduce((s, r) => s + r.regular, 0);
    const ramadan = ROWS.reduce((s, r) => s + r.ramadan, 0);
    return { regular, ramadan, multiplier: ramadan / regular };
  }, []);

  const active = SEASONS[season];

  return (
    <section
      aria-label="Komparasi biaya reguler vs Ramadhan"
      className="not-prose my-12"
    >
      {/* Toggle musim */}
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h3 className="font-display text-2xl font-extrabold text-primary-900">
            Bedah Komponen Biaya (COGS)
          </h3>
          <p className="mt-1 text-sm text-slate600">
            Geser untuk membandingkan struktur modal dua musim. Klik tiap kartu
            untuk melihat logika di baliknya.
          </p>
        </div>

        <div
          role="tablist"
          aria-label="Pilih musim"
          className="inline-flex self-start rounded-full bg-primary-50 p-1 ring-1 ring-primary-100"
        >
          {(["regular", "ramadan"] as const).map((s) => (
            <button
              key={s}
              role="tab"
              aria-selected={season === s}
              onClick={() => setSeason(s)}
              className={`rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
                season === s
                  ? "bg-primary-700 text-white shadow-sm"
                  : "text-primary-800 hover:bg-primary-100"
              }`}
            >
              {SEASONS[s].title}
            </button>
          ))}
        </div>
      </div>

      {/* Card grid */}
      <div className="grid gap-4 sm:grid-cols-2">
        {ROWS.map((row) => {
          const value = row[active.field];
          const delta = row.ramadan / row.regular;
          const isOpen = open === row.key;
          return (
            <div
              key={row.key}
              className={`rounded-2xl border border-slate-200 bg-white p-5 shadow-sm ring-1 transition-shadow hover:shadow-md ${active.ring}`}
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="font-display text-base font-bold text-primary-900">
                    {row.label}
                  </p>
                  <p className="mt-0.5 text-xs text-slate600">{row.note}</p>
                </div>
                <span
                  className={`shrink-0 rounded-full px-2.5 py-1 text-xs font-bold ${active.chip}`}
                >
                  {delta.toFixed(1)}×
                </span>
              </div>

              <p
                className={`mt-4 font-display text-2xl font-extrabold tabular-nums ${active.accent}`}
              >
                {rupiah(value)}
              </p>

              <button
                onClick={() => setOpen(isOpen ? null : row.key)}
                aria-expanded={isOpen}
                className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-primary-700 hover:text-primary-900"
              >
                {isOpen ? "Tutup rincian" : "Kenapa berbeda?"}
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className={`transition-transform ${isOpen ? "rotate-180" : ""}`}
                  aria-hidden="true"
                >
                  <path d="m6 9 6 6 6-6" />
                </svg>
              </button>

              {isOpen && (
                <p className="mt-3 animate-fade-up border-t border-slate-100 pt-3 text-sm leading-relaxed text-slate600">
                  {row.detail}
                </p>
              )}
            </div>
          );
        })}
      </div>

      {/* Tabel ringkas */}
      <div className="mt-6 overflow-x-auto rounded-2xl border border-slate-200">
        <table className="w-full min-w-[560px] border-collapse text-sm">
          <thead>
            <tr className="bg-primary-900 text-left text-white">
              <th className="px-4 py-3 font-semibold">Komponen</th>
              <th className="px-4 py-3 text-right font-semibold">Reguler</th>
              <th className="px-4 py-3 text-right font-semibold">
                10 Hari Terakhir
              </th>
              <th className="px-4 py-3 text-right font-semibold">Kenaikan</th>
            </tr>
          </thead>
          <tbody>
            {ROWS.map((row, i) => (
              <tr
                key={row.key}
                className={i % 2 ? "bg-primary-50/40" : "bg-white"}
              >
                <td className="px-4 py-3 font-medium text-primary-900">
                  {row.label}
                </td>
                <td className="px-4 py-3 text-right tabular-nums text-slate600">
                  {rupiah(row.regular)}
                </td>
                <td className="px-4 py-3 text-right font-semibold tabular-nums text-gold-900">
                  {rupiah(row.ramadan)}
                </td>
                <td className="px-4 py-3 text-right font-bold tabular-nums text-primary-700">
                  {(row.ramadan / row.regular).toFixed(1)}×
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr className="border-t-2 border-primary-200 bg-primary-100/60">
              <td className="px-4 py-3 font-display font-extrabold text-primary-900">
                Total Modal (COGS)
              </td>
              <td className="px-4 py-3 text-right font-bold tabular-nums text-primary-900">
                {rupiah(totals.regular)}
              </td>
              <td className="px-4 py-3 text-right font-bold tabular-nums text-gold-900">
                {rupiah(totals.ramadan)}
              </td>
              <td className="px-4 py-3 text-right font-extrabold tabular-nums text-primary-800">
                {totals.multiplier.toFixed(1)}×
              </td>
            </tr>
          </tfoot>
        </table>
      </div>

      <p className="mt-3 text-xs leading-relaxed text-slate-500">
        *Angka adalah estimasi rata-rata pasar musim 2025–2026 per jamaah untuk
        ilustrasi struktur biaya, bukan tarif resmi Nahdi Tour. Komponen di atas
        adalah modal (COGS) sebelum margin, pajak, dan biaya administrasi.
      </p>
    </section>
  );
}
