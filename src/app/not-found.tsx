import React from "react";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="bg-hemlock-canvas min-h-[70vh] flex items-center justify-center py-20 px-6 text-center">
      <div className="max-w-md space-y-4">
        <span className="font-sans text-xs uppercase tracking-widest text-neutral-400">
          Помилка 404
        </span>

        <h1 className="text-3xl font-light tracking-tight text-hemlock-black">
          Сторінку не знайдено

        </h1>
        <p className="text-xs text-neutral-600 font-light leading-relaxed">
          Можливо, сторінку було перенесено або вказано невірну адресу. Ви можете перейти до повного каталогу або на головну сторінку.
        </p>

        <div className="pt-6 flex justify-center gap-4 text-xs font-sans">
          <Link
            href="/"
            className="bg-hemlock-black text-white px-6 py-3 uppercase tracking-wider hover:bg-neutral-800 transition"
          >
            На головну
          </Link>

          <Link
            href="/catalog"
            className="border border-hemlock-border bg-white px-6 py-3 uppercase tracking-wider hover:border-black transition"
          >
            Каталог продукції

            </Link>
        </div>
      </div>
    </div>
  );
}
