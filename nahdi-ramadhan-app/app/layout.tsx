import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-display",
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://nahditour.com"),
  title: {
    default: "Nahdi Tour — Analisis & Transparansi Biaya Umrah",
    template: "%s — Nahdi Tour",
  },
  description:
    "Analisis operasional industri travel umrah dari Nahdi Tour: rincian realistis biaya hotel, visa, dan logistik.",
  authors: [{ name: "Nahdi Tour", url: "https://nahditour.com" }],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className={jakarta.variable}>
      <body className="font-body bg-white text-ink">{children}</body>
    </html>
  );
}
