"use client";

import { useEffect, useState } from "react";

/**
 * Bar progres baca tipis di puncak halaman.
 * Melacak posisi scroll relatif terhadap tinggi dokumen.
 */
export default function ReadingProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const update = () => {
      const scrollTop = window.scrollY;
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      setProgress(Math.min(100, Math.max(0, pct)));
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  return (
    <div
      className="fixed inset-x-0 top-0 z-50 h-1 bg-transparent"
      aria-hidden="true"
    >
      <div
        className="h-full bg-primary-600 transition-[width] duration-100 ease-out"
        style={{
          width: `${progress}%`,
          boxShadow: "0 0 8px rgb(75 86 186 / 0.5)",
        }}
      />
    </div>
  );
}
