"use client";

import React, { useRef, useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight, ArrowUpRight } from "lucide-react";

export interface CarouselItem {
  id: string;
  title: string;
  subtitle?: string;
  category?: string;
  image: string;
  description?: string;
  badge?: string;
  link?: string;
}

interface ProductCarouselProps {
  title?: string;
  subtitle?: string;
  eyebrow?: string;
  items: CarouselItem[];
  aspectRatio?: "square" | "video" | "portrait" | "tall";
  viewAllLink?: string;
  viewAllText?: string;
  className?: string;
}

export default function ProductCarousel({
  title,
  subtitle,
  eyebrow,
  items,
  aspectRatio = "video",
  viewAllLink,
  viewAllText = "Переглянути всі",
  className = "",
}: ProductCarouselProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);

  const checkScroll = () => {
    const el = scrollRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 10);
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 10);

    // Розрахунок приблизного індексу
    const cardWidth = el.clientWidth > 768 ? el.clientWidth / 3 : el.clientWidth * 0.85;
    const index = Math.round(el.scrollLeft / cardWidth);
    setCurrentIndex(Math.min(items.length - 1, Math.max(0, index)));
  };

  useEffect(() => {
    checkScroll();
    window.addEventListener("resize", checkScroll);
    return () => window.removeEventListener("resize", checkScroll);
  }, [items]);

  const scroll = (direction: "left" | "right") => {
    const el = scrollRef.current;
    if (!el) return;
    const scrollAmount = el.clientWidth * 0.75;
    el.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  };

  const getAspectClass = () => {
    switch (aspectRatio) {
      case "square":
        return "aspect-square";
      case "portrait":
        return "aspect-[3/4]";
      case "tall":
        return "aspect-[2/3]";
      case "video":
      default:
        return "aspect-[16/10]";
    }
  };

  return (
    <div className={`relative ${className}`}>
      {/* Шапка каруселі з навігаційними стрілками */}
      {(title || eyebrow || viewAllLink) && (
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            {eyebrow && (
              <span className="font-sans text-[11px] font-bold tracking-[0.22em] text-edelvin-blue uppercase block mb-2">
                {eyebrow}
              </span>
            )}
            {title && (
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-slate-950 tracking-tight">
                {title}
              </h2>
            )}
            {subtitle && (
              <p className="text-slate-600 text-sm sm:text-base font-normal mt-2 max-w-2xl">
                {subtitle}
              </p>
            )}
          </div>

          <div className="flex items-center gap-3 self-end md:self-auto shrink-0">
            {viewAllLink && (
              <Link
                href={viewAllLink}
                className="hidden sm:inline-flex items-center gap-1.5 text-xs font-sans font-bold uppercase tracking-wider text-slate-900 hover:text-edelvin-blue border-b border-slate-900 hover:border-edelvin-blue pb-0.5 transition-colors mr-3"
              >
                <span>{viewAllText}</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
            )}

            {/* Ліва стрілка */}
            <button
              type="button"
              onClick={() => scroll("left")}
              disabled={!canScrollLeft}
              className={`w-10 h-10 rounded-full border flex items-center justify-center transition-all cursor-pointer ${
                canScrollLeft
                  ? "border-slate-300 text-slate-900 hover:border-slate-950 hover:bg-slate-950 hover:text-white"
                  : "border-slate-200 text-slate-300 cursor-not-allowed"
              }`}
              aria-label="Попередній слайд"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            {/* Права стрілка */}
            <button
              type="button"
              onClick={() => scroll("right")}
              disabled={!canScrollRight}
              className={`w-10 h-10 rounded-full border flex items-center justify-center transition-all cursor-pointer ${
                canScrollRight
                  ? "border-slate-300 text-slate-900 hover:border-slate-950 hover:bg-slate-950 hover:text-white"
                  : "border-slate-200 text-slate-300 cursor-not-allowed"
              }`}
              aria-label="Наступний слайд"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}

      {/* Горизонтальний скрол-контейнер */}
      <div
        ref={scrollRef}
        onScroll={checkScroll}
        className="flex gap-5 sm:gap-6 overflow-x-auto no-scrollbar scroll-smooth pb-4 pt-1 snap-x snap-mandatory"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {items.map((item, idx) => (
          <div
            key={item.id}
            className="w-[85vw] sm:w-[360px] md:w-[400px] shrink-0 snap-start flex flex-col justify-between bg-white border border-slate-200/90 hover:border-slate-950 hover:shadow-xl transition-all duration-300 rounded-xs group overflow-hidden"
          >
            {/* Зображення */}
            <div className={`relative ${getAspectClass()} w-full bg-slate-50 overflow-hidden`}>
              <Image
                src={item.image}
                alt={item.title}
                fill
                sizes="(max-width: 768px) 85vw, 400px"
                className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
              />
            </div>

            {/* Текстовий контент картки */}
            <div className="p-5 sm:p-6 flex flex-col flex-1 justify-between">
              <div>
                {item.category && (
                  <span className="text-[10px] sm:text-xs font-sans font-bold tracking-widest text-edelvin-blue uppercase block mb-1.5">
                    {item.category}
                  </span>
                )}
                <h3 className="font-serif text-xl sm:text-2xl font-normal text-slate-950 group-hover:text-edelvin-blue transition-colors leading-snug">
                  {item.title}
                </h3>
                {item.subtitle && (
                  <p className="font-sans text-xs text-slate-500 font-medium mt-1">
                    {item.subtitle}
                  </p>
                )}
                {item.description && (
                  <p className="text-xs sm:text-sm text-slate-600 font-normal mt-2.5 leading-relaxed line-clamp-3">
                    {item.description}
                  </p>
                )}
              </div>

              {item.link && (
                <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between text-xs font-sans font-bold">
                  <Link
                    href={item.link}
                    className="text-slate-950 uppercase tracking-wider group-hover:text-edelvin-blue inline-flex items-center gap-1.5"
                  >
                    <span>Детальніше</span>
                    <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </Link>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Нижня пагінація / смуга прогресу */}
      <div className="mt-4 flex items-center justify-between text-xs font-sans text-slate-400">
        <span>
          {String(currentIndex + 1).padStart(2, "0")} / {String(items.length).padStart(2, "0")}
        </span>
        <div className="flex gap-1.5">
          {items.map((_, i) => (
            <span
              key={i}
              className={`h-1 rounded-full transition-all duration-300 ${
                i === currentIndex ? "w-6 bg-slate-950" : "w-2 bg-slate-200"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
