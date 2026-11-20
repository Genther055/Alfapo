"use client";

import React, { useEffect } from "react";
import Link from "next/link";

export default function ErrorBoundary({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Application error:", error);
  }, [error]);

  return (
    <div className="bg-hemlock-canvas min-h-[70vh] flex items-center justify-center py-20 px-6 text-center">
      <div className="max-w-md space-y-4 bg-white border border-hemlock-border p-8">
        <span className="font-sans text-xs uppercase tracking-widest text-neutral-400">
          Збій завантаження
        </span>
        <h2 className="text-2xl font-light tracking-tight text-hemlock-black">
          Виникла технічна помилка
        </h2>
        <p className="text-xs text-neutral-600 font-light leading-relaxed">
          Інтерфейс не зміг відобразити цей розділ. Спробуйте оновити стан сторінки або поверніться на головну.
        </p>
        <div className="pt-6 flex justify-center gap-3 text-xs font-sans">
          <button
            onClick={() => reset()}
            className="bg-hemlock-black text-white px-5 py-2.5 uppercase tracking-wider hover:bg-neutral-800 transition"
          >
            Спробувати знову
          </button>
          <Link
            href="/"
            className="border border-hemlock-border bg-white px-5 py-2.5 uppercase tracking-wider hover:border-black transition"
          >
            На головну
          </Link>
        </div>
      </div>
    </div>
  );
}
