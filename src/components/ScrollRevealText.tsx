"use client";

import React, { useEffect, useRef, useState } from "react";

interface ScrollRevealTextProps {
  text: string;
  className?: string;
  brandKeywords?: string[];
}

export default function ScrollRevealText({
  text,
  className = "",
  brandKeywords = [
    "ТОВ",
    "«Альфа",
    "і",
    "Омега»",
    "Альфа",
    "Омега",
    "1998",
    "року.",
    "2,5",
    "тис.",
    "м²",
    "46",
    "працівниками,",
    "офсетний",
    "цифровий",
    "друк,",
    "книжкової",
    "продукції,",
  ],
}: ScrollRevealTextProps) {
  const containerRef = useRef<HTMLParagraphElement>(null);
  const [progress, setProgress] = useState(0);

  const words = text.split(/\s+/);

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!containerRef.current) return;
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const rect = containerRef.current?.getBoundingClientRect();
          if (!rect) return;

          const windowHeight = window.innerHeight;
          // Calculate visibility range: starts when element enters screen, completes around middle
          const start = windowHeight * 0.95;
          const end = windowHeight * 0.25;

          const current = (start - rect.top) / (start - end);
          const clamped = Math.max(0, Math.min(1, current));
          const rounded = Math.round(clamped * 100) / 100;

          setProgress(rounded);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, []);

  return (
    <p
      ref={containerRef}
      className={`leading-relaxed tracking-tight select-none ${className}`}
    >
      {words.map((word, index) => {
        const spread = 0.85;
        const wordWindow = 0.15;
        const wordStart = (index / (words.length - 1 || 1)) * spread;
        const wordEnd = wordStart + wordWindow;

        const rawP = (progress - wordStart) / (wordEnd - wordStart);
        const p = Math.max(0, Math.min(1, rawP));

        const cleanWord = word.replace(/[.,«»"()]/g, "");
        const isBrand =
          /\d/.test(word) ||
          /альфа|омега|edelweiss|едельвейс|edelvin/i.test(cleanWord) ||
          brandKeywords.some(
            (k) =>
              k.toLowerCase() === word.toLowerCase() ||
              k.toLowerCase() === cleanWord.toLowerCase()
          );

        // Чиста і розбірлива типографіка: плавна зміна кольору без розмивання
        const isRevealed = p > 0.35;
        const opacityAmount = Math.max(0.4, 0.4 + p * 0.6);

        return (
          <span
            key={index}
            style={{
              opacity: opacityAmount,
              transition: "opacity 0.2s ease-out, color 0.2s ease-out",
            }}
            className={`inline-block mr-[0.28em] will-change-transform ${
              isRevealed && isBrand
                ? "text-edelvin-blue font-semibold"
                : isRevealed
                ? "text-slate-950 font-normal"
                : "text-slate-500 font-light"
            }`}
          >
            {word}
          </span>
        );
      })}
    </p>
  );
}
