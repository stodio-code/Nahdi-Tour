"use client";

import { useMemo, useState } from "react";

const WHATSAPP_NUMBER = "6281314542357"; // Konsultan Nahdi Tour

type Timing = "awal" | "akhir";

const BASE_PER_PAX = 30_000_000; // basis ilustrasi paket 10 malam terakhir
const EARLY_DISCOUNT = 0.37; // hemat ~37% jika ambil awal Ramadhan

const rupiah = (n: number) =>
  new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(n);

export default function BudgetSimulatorCTA() {
  const [timing, setTiming] = useState<Timing>("akhir");
  const [pax, setPax] = useState(2);

  const estimate = useMemo(() => {
    const perPax =
      timing === "akhir"
        ? BASE_PER_PAX
        : Math.round((BASE_PER_PAX * (1 - EARLY_DISCOUNT)) / 100_000) * 100_000;
    return { perPax, total: perPax * pax };
  }, [timing, pax]);

  const waLink = useMemo(() => {
    const label =
      timing === "akhir" ? "10 Malam Terakhir Ramadhan" : "Awal Ramadhan";
    const message = `Assalamualaikum Nahdi Tour, saya ingin simulasi anggaran Umrah Ramadhan.

• Periode: ${label}
• Jumlah jamaah: ${pax} orang
• Estimasi awal saya: ${rupiah(estimate.total)}

Mohon dibantu rincian realistis biaya hotel, visa, dan logistiknya. Terima kasih.`;
    return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
  }, [timing, pax, estimate.total]);

  return (
    <section
      aria-label="Simulasi anggaran Ramadhan"
      className="not-prose my-14 overflow-hidden rounded-3xl bg-primary-900 text-white shadow-xl ring-1 ring-primary-800"
    >
      <div className="grid gap-8 p-7 sm:p-10 md:grid-cols-[1.1fr_1fr]">
        {/* Kiri: kontrol */}
        <div>
          <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-primary-100 ring-1 ring-white/15">
            Simulasi Interaktif
          </span>
          <h3 className="mt-4 font-display text-2xl font-extrabold leading-tight sm:text-3xl">
            Hitung Anggaran Ramadhan Anda
            <span className="block text-primary-200">Awal vs Akhir</span>
          </h3>

          {/* Timing */}
          <div className="mt-6">
            <p className="mb-2 text-sm font-medium text-primary-100">
              Pilih periode keberangkatan
            </p>
            <div className="grid grid-cols-2 gap-2">
              {(
                [
                  { id: "awal", t: "Awal Ramadhan", s: "Hemat ~35–40%" },
                  { id: "akhir", t: "10 Malam Terakhir", s: "Puncak momentum" },
                ] as { id: Timing; t: string; s: string }[]
              ).map((opt) => (
                <button
                  key={opt.id}
                  onClick={() => setTiming(opt.id)}
                  aria-pressed={timing === opt.id}
                  className={`rounded-xl px-4 py-3 text-left transition-colors ${
                    timing === opt.id
                      ? "bg-white text-primary-900 shadow"
                      : "bg-white/5 text-primary-100 ring-1 ring-white/10 hover:bg-white/10"
                  }`}
                >
                  <span className="block text-sm font-bold">{opt.t}</span>
                  <span className="block text-xs opacity-80">{opt.s}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Pax */}
          <div className="mt-5">
            <label
              htmlFor="pax"
              className="mb-2 block text-sm font-medium text-primary-100"
            >
              Jumlah jamaah:{" "}
              <span className="font-bold text-white">{pax} orang</span>
            </label>
            <input
              id="pax"
              type="range"
              min={1}
              max={10}
              value={pax}
              onChange={(e) => setPax(Number(e.target.value))}
              className="w-full accent-gold-500"
            />
          </div>
        </div>

        {/* Kanan: hasil + CTA */}
        <div className="flex flex-col justify-between rounded-2xl bg-white/5 p-6 ring-1 ring-white/10">
          <div>
            <p className="text-sm text-primary-100">Estimasi per jamaah</p>
            <p className="font-display text-2xl font-extrabold tabular-nums text-gold-100">
              {rupiah(estimate.perPax)}
            </p>

            <div className="mt-4 border-t border-white/10 pt-4">
              <p className="text-sm text-primary-100">
                Total untuk {pax} jamaah
              </p>
              <p className="font-display text-3xl font-extrabold tabular-nums text-white">
                {rupiah(estimate.total)}
              </p>
            </div>

            {timing === "awal" && (
              <p className="mt-3 animate-fade-up rounded-lg bg-gold-500/15 px-3 py-2 text-xs text-gold-100 ring-1 ring-gold-500/25">
                Anda menghemat sekitar{" "}
                <strong className="font-bold">
                  {rupiah(BASE_PER_PAX * pax - estimate.total)}
                </strong>{" "}
                dengan memilih awal Ramadhan.
              </p>
            )}
          </div>

          <a
            href={waLink}
            target="_blank"
            rel="noopener noreferrer"
            className="group mt-6 inline-flex items-center justify-center gap-2 rounded-xl bg-gold-500 px-5 py-3.5 font-display text-base font-bold text-primary-950 shadow-lg transition-transform hover:-translate-y-0.5 hover:bg-gold-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="currentColor"
              aria-hidden="true"
            >
              <path d="M12.04 2c-5.46 0-9.9 4.44-9.9 9.9 0 1.75.46 3.45 1.32 4.95L2 22l5.3-1.38a9.9 9.9 0 0 0 4.74 1.2h.01c5.46 0 9.9-4.44 9.9-9.9 0-2.64-1.03-5.13-2.9-7A9.82 9.82 0 0 0 12.04 2Zm5.8 14.16c-.24.68-1.42 1.32-1.95 1.36-.5.05-.98.23-3.3-.7-2.8-1.1-4.58-3.96-4.72-4.15-.14-.19-1.13-1.5-1.13-2.86 0-1.36.71-2.03.96-2.31.25-.28.55-.35.73-.35.18 0 .37 0 .53.01.17.01.4-.06.62.48.24.56.81 1.94.88 2.08.07.14.12.31.02.5-.09.19-.14.31-.28.48-.14.17-.29.37-.42.5-.14.14-.28.29-.12.57.17.28.74 1.22 1.59 1.98 1.1.98 2.02 1.28 2.3 1.42.28.14.44.12.6-.07.17-.19.7-.81.88-1.09.18-.28.37-.23.62-.14.25.09 1.6.76 1.87.9.28.14.46.21.53.32.07.12.07.65-.17 1.33Z" />
            </svg>
            Konsultasi via WhatsApp
          </a>
          <p className="mt-2 text-center text-[11px] text-primary-200">
            Diskusi netral, tanpa tekanan penjualan.
          </p>
        </div>
      </div>
    </section>
  );
}
