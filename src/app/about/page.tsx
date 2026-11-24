"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ShieldCheck,
  Zap,
  HeartHandshake,
  Truck,
  Layers,
  Printer,
  BookOpen,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  Target,
  FileSpreadsheet,
} from "lucide-react";
import ScrollRevealText from "@/components/ScrollRevealText";
import FullWidthVideoSection from "@/components/FullWidthVideoSection";
import { useLanguage } from "@/context/LanguageContext";

const trustIcons = [
  ShieldCheck,
  Zap,
  HeartHandshake,
  Sparkles,
  Layers,
  Target,
  Printer,
  Truck,
];

const productIcons = [
  BookOpen,
  FileSpreadsheet,
  Sparkles,
  Layers,
  ShieldCheck,
  Printer,
];

// Scroll fade-in animation container
function ScrollFadeIn({
  children,
  className = "",
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const rect = el.getBoundingClientRect();
    if (rect.top > window.innerHeight) {
      setIsVisible(false);

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.unobserve(el);
          }
        },
        { threshold: 0.05, rootMargin: "0px 0px 50px 0px" }
      );

      observer.observe(el);
      return () => observer.disconnect();
    }
  }, []);

  return (
    <div
      ref={ref}
      style={{
        transitionDelay: `${delay}ms`,
      }}
      className={`transition-all duration-700 ease-out will-change-transform ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
      } ${className}`}
    >
      {children}
    </div>
  );
}

// Parallax scroll image component
function ScrollParallaxImage({
  src,
  alt,
}: {
  src: string;
  alt: string;
}) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let ticking = false;

    const updateParallax = () => {
      const el = containerRef.current;
      if (!el) return;

      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;

      if (rect.bottom < -100 || rect.top > vh + 100) {
        ticking = false;
        return;
      }

      const total = vh + rect.height;
      const current = vh - rect.top;
      const progress = Math.max(0, Math.min(1, current / total));

      const translateY = (0.5 - progress) * 36;
      const opacity = progress < 0.1 ? Math.max(0.7, 0.7 + (progress / 0.1) * 0.3) : 1;

      el.style.transform = `translate3d(0, ${translateY.toFixed(1)}px, 0)`;
      el.style.opacity = opacity.toFixed(2);

      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(updateParallax);
        ticking = true;
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    updateParallax();

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative aspect-[4/3] w-full overflow-hidden shadow-sm bg-white will-change-transform rounded-xs border border-slate-200"
      style={{
        transform: "translate3d(0, 0px, 0)",
        transition: "opacity 0.2s ease-out",
      }}
    >
      <Image
        src={src}
        alt={alt}
        fill
        sizes="(max-width: 768px) 100vw, 50vw"
        className="object-cover transition-transform duration-700 hover:scale-105"
      />
    </div>
  );
}

export default function AboutPage() {
  const { t, setIsCatalogOpen } = useLanguage();
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeProductionTab, setActiveProductionTab] = useState(0);
  const [activeTrustIndex, setActiveTrustIndex] = useState(0);
  const [isHoveringCarousel, setIsHoveringCarousel] = useState(false);
  const trustScrollRef = useRef<HTMLDivElement>(null);
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Слідкування за скролом для тонкого індикатора вгорі
  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (totalScroll > 0) {
        setScrollProgress((window.scrollY / totalScroll) * 100);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const trustPillars = t.aboutPage.trustItems.map((item, idx) => ({
    ...item,
    icon: trustIcons[idx % trustIcons.length],
  }));

  const productionLines = t.aboutPage.prodTabs;

  const productsList = t.aboutPage.productsList.map((prod, idx) => ({
    ...prod,
    accentIcon: productIcons[idx % productIcons.length],
  }));

  const timelineMilestones = t.aboutPage.milestones;

  const scrollToTrustIndex = (targetIndex: number) => {
    if (!trustScrollRef.current) return;
    const container = trustScrollRef.current;
    const cards = container.children;
    if (!cards || cards.length === 0) return;

    const safeIndex = ((targetIndex % trustPillars.length) + trustPillars.length) % trustPillars.length;
    const firstCard = cards[0] as HTMLElement;
    const targetCard = cards[safeIndex] as HTMLElement;

    if (safeIndex === 0) {
      container.scrollTo({ left: 0, behavior: "smooth" });
    } else if (targetCard && firstCard) {
      const scrollOffset = targetCard.offsetLeft - firstCard.offsetLeft;
      container.scrollTo({ left: scrollOffset, behavior: "smooth" });
    }
    setActiveTrustIndex(safeIndex);
  };

  const scrollTrust = (direction: "left" | "right") => {
    const nextIdx =
      direction === "left"
        ? (activeTrustIndex - 1 + trustPillars.length) % trustPillars.length
        : (activeTrustIndex + 1) % trustPillars.length;
    scrollToTrustIndex(nextIdx);
  };

  const handleTrustScroll = () => {
    if (!trustScrollRef.current) return;
    const container = trustScrollRef.current;
    if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);

    scrollTimeoutRef.current = setTimeout(() => {
      const firstCard = container.firstElementChild as HTMLElement;
      if (!firstCard) return;

      const cardWidth = firstCard.offsetWidth + 24;
      const index = Math.round(container.scrollLeft / cardWidth);
      const safeIndex = Math.max(0, Math.min(trustPillars.length - 1, index));

      setActiveTrustIndex(safeIndex);
    }, 50);
  };

  // Автоматичний плавний слайдер з паузою при ховері
  useEffect(() => {
    const interval = setInterval(() => {
      if (isHoveringCarousel) return;
      setActiveTrustIndex((prev) => {
        const next = (prev + 1) % trustPillars.length;
        if (trustScrollRef.current) {
          const container = trustScrollRef.current;
          const cards = container.children;
          if (cards && cards.length > 0) {
            const firstCard = cards[0] as HTMLElement;
            const nextCard = cards[next] as HTMLElement;
            if (next === 0) {
              container.scrollTo({ left: 0, behavior: "smooth" });
            } else if (nextCard && firstCard) {
              const scrollOffset = nextCard.offsetLeft - firstCard.offsetLeft;
              container.scrollTo({ left: scrollOffset, behavior: "smooth" });
            }
          }
        }
        return next;
      });
    }, 3500);

    return () => clearInterval(interval);
  }, [trustPillars.length, isHoveringCarousel]);

  return (
    <div className="min-h-screen bg-white text-slate-900 selection:bg-edelvin-blue selection:text-white relative">
      
      {/* Top scroll progress bar */}
      <div
        style={{ width: `${scrollProgress}%` }}
        className="fixed top-0 left-0 h-[3px] bg-edelvin-blue z-50 pointer-events-none transition-all duration-150"
      />

            {/* Hero Section with Ambient Video */}
            <section className="relative pt-20 pb-20 md:pt-28 md:pb-28 border-b border-slate-200 overflow-hidden bg-slate-950 text-white">
        <div className="absolute inset-0 pointer-events-none opacity-25 mix-blend-screen filter contrast-125 brightness-95">
          <video
            src="/videos/plant-hero.mp4"
            poster="/videos/plant-hero-poster.jpg"
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover scale-105"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950/75 via-slate-950/85 to-slate-950 pointer-events-none" />

        <div className="relative z-10 w-full max-w-[1520px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-10">
          
          <div className="max-w-5xl mx-auto text-center mb-8 sm:mb-12">
            <span className="font-sans text-xs font-bold tracking-[0.28em] text-blue-400 uppercase inline-block mb-4">
              ПРО ВИРОБНИЧИЙ КОМПЛЕКС • ТОВ «АЛЬФА І ОМЕГА»
            </span>
            <h1 className="font-serif text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-normal tracking-tight text-white leading-[1.05]">
              {t.aboutPage.heroTitle1} <br />
              <span className="italic font-light text-blue-400">{t.aboutPage.heroTitle2}</span>
            </h1>
          </div>

          <div className="max-w-4xl mx-auto text-center py-2">
            <p className="text-lg sm:text-xl md:text-2xl text-slate-300 leading-relaxed font-light">
              {t.aboutPage.manifesto}
            </p>
          </div>

          {/* Action Links */}
          <div className="mt-12 flex flex-wrap items-center justify-center gap-6 sm:gap-10">
            <button
              type="button"
              onClick={() => {
                window.scrollTo({ top: 0, behavior: "smooth" });
                setIsCatalogOpen(true);
              }}
              className="inline-flex items-center gap-3 text-xs sm:text-sm font-bold tracking-[0.2em] uppercase text-slate-950 bg-white hover:bg-blue-400 hover:text-slate-950 px-8 py-4 transition-all duration-300 cursor-pointer shadow-lg hover:shadow-2xl hover:-translate-y-0.5"
            >
              <span>{t.aboutPage.catalogBtn}</span>
              <ArrowRight className="w-4 h-4 text-slate-950" />
            </button>

            <Link
              href="/capabilities"
              className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold tracking-[0.2em] uppercase text-white hover:text-blue-400 border-b-2 border-white/40 hover:border-blue-400 pb-1.5 transition-all cursor-pointer"
            >
              <span>{t.header.capabilities}</span>
              <ArrowRight className="w-3.5 h-3.5 text-blue-400" />
            </Link>
          </div>

        </div>
      </section>

            {/* 2. НАША МІСІЯ / ВІЗІЯ / НАША МЕТА (Елегантний ритм блоків)   */}
            <section className="py-20 lg:py-28 bg-white border-b border-slate-200">
        <div className="w-full max-w-[1520px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-10">
          
          <div className="space-y-24 lg:space-y-32">
            
            {/* 1. Наша місія */}
            <ScrollFadeIn>
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">
                <div className="lg:col-span-6 order-2 lg:order-1">
                  <ScrollParallaxImage
                    src="/images/team/team-office.jpg"
                    alt="Команда та технічний відділ ТОВ «Альфа і Омега»"
                  />
                </div>

                <div className="lg:col-span-6 space-y-4 order-1 lg:order-2">
                  <span className="font-sans text-xs font-bold tracking-[0.25em] text-edelvin-blue uppercase block">
                    {t.aboutPage.missionTag}
                  </span>
                  <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-normal text-slate-950 leading-tight">
                    {t.aboutPage.missionTitle}
                  </h2>
                  <p className="text-base sm:text-lg text-slate-600 font-normal leading-relaxed pt-2">
                    {t.aboutPage.missionDesc}
                  </p>
                </div>
              </div>
            </ScrollFadeIn>

            {/* 2. Візія */}
            <ScrollFadeIn>
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">
                <div className="lg:col-span-6 space-y-4">
                  <span className="font-sans text-xs font-bold tracking-[0.25em] text-edelvin-blue uppercase block">
                    {t.aboutPage.visionTag}
                  </span>
                  <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-normal text-slate-950 leading-tight">
                    {t.aboutPage.visionTitle}
                  </h2>
                  <p className="text-base sm:text-lg text-slate-600 font-normal leading-relaxed pt-2">
                    {t.aboutPage.visionDesc}
                  </p>
                </div>

                <div className="lg:col-span-6">
                  <ScrollParallaxImage
                    src="/images/production/plant-facade.png"
                    alt="Виробничий комплекс ТОВ «Альфа і Омега» у Вінниці"
                  />
                </div>
              </div>
            </ScrollFadeIn>

            {/* 3. Наша мета */}
            <ScrollFadeIn>
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">
                <div className="lg:col-span-6 order-2 lg:order-1">
                  <ScrollParallaxImage
                    src="/images/cases/luxury-restaurant-menu.jpg"
                    alt="Зразки твердої палітурки 7БЦ та ресторанної поліграфії"
                  />
                </div>

                <div className="lg:col-span-6 space-y-4 order-1 lg:order-2">
                  <span className="font-sans text-xs font-bold tracking-[0.25em] text-edelvin-blue uppercase block">
                    {t.aboutPage.goalTag}
                  </span>
                  <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-normal text-slate-950 leading-tight">
                    {t.aboutPage.goalTitle}
                  </h2>
                  <p className="text-base sm:text-lg text-slate-600 font-normal leading-relaxed pt-2">
                    {t.aboutPage.goalDesc}
                  </p>
                </div>
              </div>
            </ScrollFadeIn>

          </div>
        </div>
      </section>

            {/* 3. ЧОМУ НАМ ДОВІРЯЮТЬ (Карусель на чистому білому фоні)     */}
            <section className="py-20 lg:py-28 border-b border-slate-200 overflow-hidden bg-white">
        <div className="w-full max-w-[1520px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-10">
          
          <ScrollFadeIn>
            <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 pb-6 border-b border-slate-200 gap-6">
              <div>
                <span className="font-sans text-xs font-bold tracking-[0.25em] text-edelvin-blue uppercase block mb-2">
                  {t.aboutPage.trustTag}
                </span>
                <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-normal text-slate-950 tracking-tight">
                  {t.aboutPage.trustTitle}
                </h2>
              </div>

              {/* Навігація каруселі */}
              <div className="flex items-center gap-4 self-start sm:self-auto">
                <span className="font-sans text-xs font-bold text-slate-500 tracking-wider">
                  0{activeTrustIndex + 1} / 0{trustPillars.length}
                </span>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => scrollTrust("left")}
                    aria-label="Попередній слайд"
                    className="w-10 h-10 rounded-xs border border-slate-300 bg-white hover:border-slate-950 flex items-center justify-center text-slate-800 hover:text-slate-950 shadow-xs hover:shadow-md transition-all cursor-pointer"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => scrollTrust("right")}
                    aria-label="Наступний слайд"
                    className="w-10 h-10 rounded-xs border border-slate-300 bg-white hover:border-slate-950 flex items-center justify-center text-slate-800 hover:text-slate-950 shadow-xs hover:shadow-md transition-all cursor-pointer"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </ScrollFadeIn>

          {/* Карусель на чистому білому тлі */}
          <div
            ref={trustScrollRef}
            onScroll={handleTrustScroll}
            onMouseEnter={() => setIsHoveringCarousel(true)}
            onMouseLeave={() => setIsHoveringCarousel(false)}
            onTouchStart={() => setIsHoveringCarousel(true)}
            onTouchEnd={() => setIsHoveringCarousel(false)}
            className="flex gap-5 sm:gap-6 overflow-x-auto no-scrollbar scroll-smooth snap-x snap-proximity py-4 -mx-4 px-4 sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8 xl:-mx-10 xl:px-10 [&::-webkit-scrollbar]:hidden"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {trustPillars.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div
                  key={idx}
                  className="w-[280px] sm:w-[340px] lg:w-[380px] shrink-0 snap-start p-7 sm:p-8 border border-slate-200 bg-white hover:border-slate-950 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between rounded-xs"
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between pb-3.5 border-b border-slate-200">
                      <span className="font-serif text-3xl font-light text-slate-400">
                        {item.num}
                      </span>
                      <Icon className="w-5 h-5 text-edelvin-blue" />
                    </div>

                    <h3 className="font-serif text-2xl sm:text-3xl font-normal text-slate-950 leading-snug">
                      {item.title}
                    </h3>

                    <p className="text-sm sm:text-base text-slate-700 font-normal leading-relaxed">
                      {item.desc}
                    </p>
                  </div>

                  <div className="pt-4 mt-6 border-t border-slate-200 flex items-center justify-between text-xs font-sans font-medium tracking-widest text-slate-500 uppercase">
                    <span>ТОВ «Альфа і Омега»</span>
                    <span>{idx + 1} / 8</span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Індикатор прогресу */}
          <div className="mt-8 flex items-center justify-center gap-2">
            {trustPillars.map((_, dotIdx) => (
              <button
                key={dotIdx}
                type="button"
                onClick={() => scrollToTrustIndex(dotIdx)}
                aria-label={`Перейти до слайду ${dotIdx + 1}`}
                className={`transition-all duration-300 rounded-full cursor-pointer ${
                  activeTrustIndex === dotIdx
                    ? "w-8 h-1.5 bg-slate-950"
                    : "w-2 h-1.5 bg-slate-300 hover:bg-slate-500"
                }`}
              />
            ))}
          </div>

        </div>
      </section>

            {/* Production Facilities */}
            <section className="py-20 lg:py-28 bg-white border-b border-slate-200">
        <div className="w-full max-w-[1520px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-10">
          
          <ScrollFadeIn>
            <div className="mb-12 pb-6 border-b border-slate-200">
              <span className="font-sans text-xs font-bold tracking-[0.25em] text-edelvin-blue uppercase block mb-2">
                {t.aboutPage.prodTag}
              </span>
              <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-normal text-slate-950 tracking-tight">
                {t.aboutPage.prodTitle}
              </h2>
            </div>
          </ScrollFadeIn>

          {/* Активний напрямок */}
          {(() => {
            const current = productionLines[activeProductionTab] || productionLines[0];
            return (
              <ScrollFadeIn>
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center mb-16">
                  <div className="lg:col-span-6 space-y-6">
                    <span className="text-xs font-sans font-bold tracking-widest text-edelvin-blue uppercase block">
                      {current.category}
                    </span>
                    <h3 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-slate-950 leading-tight">
                      {current.title}
                    </h3>

                    <p className="text-base sm:text-lg text-slate-600 font-normal leading-relaxed">
                      {current.description}
                    </p>

                    <div className="space-y-3 pt-2">
                      {current.features.map((feat, fIdx) => (
                        <div key={fIdx} className="flex items-start gap-3.5 text-base sm:text-lg text-slate-900 font-normal">
                          <span className="text-edelvin-blue font-bold text-lg mt-0.5">•</span>
                          <span>{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="lg:col-span-6">
                    <div className="relative aspect-[16/10] bg-slate-950 overflow-hidden shadow-xl border border-slate-200 rounded-xs group">
                      <Image
                        src={
                          activeProductionTab === 0
                            ? "/images/cases/fest-limited-edition.jpg"
                            : activeProductionTab === 1
                            ? "/images/production/roll-label-machine.png"
                            : activeProductionTab === 2
                            ? "/images/cases/luxury-restaurant-menu.jpg"
                            : activeProductionTab === 3
                            ? "/images/cases/kids-books-games.png"
                            : "/images/cases/luxury-resort-navigation.jpg"
                        }
                        alt={current.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent flex items-end p-6">
                        <span className="text-base text-white tracking-wide font-normal">
                          {current.category} • ТОВ «Альфа і Омега»
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </ScrollFadeIn>
            );
          })()}

          {/* Інші напрямки виробництва — інтерактивні чисті картки */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 pt-10 border-t border-slate-200">
            {productionLines
              .map((line, idx) => ({ line, idx }))
              .filter(({ idx }) => idx !== activeProductionTab)
              .map(({ line, idx }, cardIdx) => (
                <ScrollFadeIn key={line.id} delay={cardIdx * 70}>
                  <div
                    onClick={() => setActiveProductionTab(idx)}
                    className="cursor-pointer group p-7 bg-white border border-slate-200 shadow-xs hover:border-slate-950 hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 rounded-xs h-full flex flex-col justify-between"
                  >
                    <div>
                      <span className="text-[11px] font-sans font-bold text-edelvin-blue uppercase tracking-widest block mb-2">
                        {line.category}
                      </span>
                      <h4 className="font-serif text-2xl text-slate-950 font-normal group-hover:text-edelvin-blue transition-colors leading-snug">
                        {line.title}
                      </h4>
                      <p className="text-sm text-slate-600 font-normal leading-relaxed line-clamp-3 mt-3">
                        {line.description}
                      </p>
                    </div>

                    <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-bold uppercase tracking-wider text-slate-950 group-hover:text-edelvin-blue transition-colors">
                      <span>Переглянути</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </ScrollFadeIn>
              ))}
          </div>

        </div>
      </section>

            {/* Product Highlights */}
            <section className="py-20 lg:py-28 border-b border-slate-200 bg-white">
        <div className="w-full max-w-[1520px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-10">
          
          <ScrollFadeIn>
            <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-14 pb-6 border-b border-slate-200 gap-6">
              <div>
                <span className="font-sans text-xs font-bold tracking-[0.25em] text-edelvin-blue uppercase block mb-2">
                  {t.aboutPage.productsTag}
                </span>
                <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-normal text-slate-950 tracking-tight">
                  {t.aboutPage.productsTitle}
                </h2>
              </div>

              <Link
                href="/catalog"
                className="text-xs sm:text-sm font-bold tracking-[0.2em] uppercase text-slate-950 hover:text-edelvin-blue border-b-2 border-slate-950 hover:border-edelvin-blue pb-1 transition-all inline-flex items-center gap-2 cursor-pointer"
              >
                <span>{t.aboutPage.productsBtn}</span>
                <ArrowRight className="w-4 h-4 text-edelvin-blue" />
              </Link>
            </div>
          </ScrollFadeIn>

          {/* 6 виробів без сірих плашок — чисті білі картки з ховером */}
          <div className="max-w-5xl mx-auto grid grid-cols-2 sm:grid-cols-3 gap-6 sm:gap-8">
            {productsList.map((prod, idx) => {
              const Icon = prod.accentIcon;
              return (
                <ScrollFadeIn key={idx} delay={idx * 60}>
                  <Link
                    href={prod.link}
                    className="p-6 bg-white border border-slate-200 hover:border-slate-950 hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 rounded-xs flex flex-col justify-between group h-full block cursor-pointer"
                  >
                    <div>
                      <div className="relative aspect-[4/3] bg-white border border-slate-100 flex items-center justify-center mb-4 group-hover:scale-105 transition-transform duration-500">
                        <Icon className="w-8 h-8 text-slate-500 group-hover:text-edelvin-blue transition-colors" />
                      </div>

                      <span className="text-xs font-sans font-bold tracking-wider text-slate-400 uppercase block mb-1">
                        {prod.category}
                      </span>
                      <h3 className="font-serif text-xl sm:text-2xl font-normal text-slate-950 group-hover:text-edelvin-blue transition-colors leading-snug">
                        {prod.title}
                      </h3>
                      <p className="text-sm text-slate-600 font-normal leading-relaxed line-clamp-2 mt-2">
                        {prod.desc}
                      </p>
                    </div>

                    <div className="mt-6 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold uppercase tracking-wider text-slate-950 group-hover:text-edelvin-blue transition-colors">
                      <span>Детальніше</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </Link>
                </ScrollFadeIn>
              );
            })}
          </div>

        </div>
      </section>

            {/* 6. НАША ІСТОРІЯ (Хроніка розвитку та мудборд світлин)         */}
            <section className="py-20 lg:py-28 bg-white">
        <div className="w-full max-w-[1520px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-10">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
            
            {/* Ліва колонка: Заголовок + таймлайн */}
            <div className="lg:col-span-5">
              <ScrollFadeIn>
                <div className="mb-12 pb-6 border-b border-slate-200">
                  <span className="font-sans text-xs font-bold tracking-[0.25em] text-edelvin-blue uppercase block mb-2">
                    {t.aboutPage.historyTag}
                  </span>
                  <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-normal text-slate-950 tracking-tight">
                    {t.aboutPage.historyTitle}
                  </h2>
                  <p className="text-base sm:text-lg text-slate-600 font-normal mt-3 leading-relaxed">
                    {t.aboutPage.historyDesc}
                  </p>
                </div>
              </ScrollFadeIn>

              {/* Хронологічна лінія */}
              <div className="relative border-l-2 border-slate-300 ml-4 sm:ml-6 pl-6 sm:pl-8 space-y-12">
                {timelineMilestones.map((m, idx) => (
                  <ScrollFadeIn key={idx} delay={idx * 50}>
                    <div className="relative group">
                      <div className="absolute -left-[31px] sm:-left-[39px] top-1.5 w-3 h-3 rounded-full bg-slate-950 ring-4 ring-white shadow-sm group-hover:scale-125 transition-transform" />

                      <div className="space-y-1">
                        <div className="flex flex-wrap items-baseline gap-2">
                          {m.prefix && (
                            <span className="font-serif text-lg sm:text-xl text-edelvin-blue font-black lowercase mr-0.5">
                              {m.prefix}
                            </span>
                          )}
                          <span className="font-serif text-3xl sm:text-4xl font-normal text-slate-950">
                            {m.year}
                          </span>
                          {m.suffix && (
                            <span className="font-serif text-sm sm:text-base text-edelvin-blue font-bold tracking-tight">
                              {m.suffix}
                            </span>
                          )}
                          {m.month ? (
                            <span className="text-xs sm:text-sm font-sans font-bold uppercase text-edelvin-blue tracking-wider ml-1">
                              {m.month}
                            </span>
                          ) : null}
                        </div>

                        <h3 className="font-serif text-2xl font-normal text-slate-950 mt-1">
                          {m.title}
                        </h3>

                        <p className="text-base sm:text-lg text-slate-700 font-normal leading-relaxed pt-1">
                          {m.text}
                        </p>
                      </div>
                    </div>
                  </ScrollFadeIn>
                ))}
              </div>
            </div>

            {/* Права колонка: Мудборд світлин підприємства */}
            <div className="lg:col-span-7">
              <ScrollFadeIn delay={100}>
                <div className="flex items-center justify-between pb-3.5 mb-6 border-b border-slate-200">
                  <span className="text-xs font-sans tracking-widest text-slate-800 uppercase font-bold">
                    {t.aboutPage.historySub}
                  </span>
                  <span className="text-sm text-slate-600 font-normal">
                    {t.aboutPage.historyDesc.includes("25+") ? "Вінниця • 25 років разом" : "Vinnytsia • Since 1998"}
                  </span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3.5 items-start">
                  
                  {/* Колонка 1 */}
                  <div className="space-y-3.5">
                    <div className="relative aspect-square w-full overflow-hidden bg-white border border-slate-200 shadow-sm rounded-xs group">
                      <Image src="/images/production/plant-facade.png" alt="Виробничий комплекс ТОВ «Альфа і Омега» 2500 м²" fill sizes="25vw" className="object-cover group-hover:scale-108 transition-transform duration-700" />
                    </div>
                    <div className="relative aspect-[3/4] w-full overflow-hidden bg-white border border-slate-200 shadow-sm rounded-xs group">
                      <Image src="/images/cases/luxury-hospitality.jpg" alt="Преміальна готельна поліграфія" fill sizes="25vw" className="object-cover group-hover:scale-108 transition-transform duration-700" />
                    </div>
                    <div className="relative aspect-[16/10] w-full overflow-hidden bg-white border border-slate-200 shadow-sm rounded-xs group">
                      <Image src="/images/production/roll-label-machine.png" alt="Промислова рулонна лінія" fill sizes="25vw" className="object-cover group-hover:scale-108 transition-transform duration-700" />
                    </div>
                  </div>

                  {/* Колонка 2 */}
                  <div className="space-y-3.5">
                    <div className="relative aspect-[2/3] w-full overflow-hidden bg-white border border-slate-200 shadow-sm rounded-xs group">
                      <Image src="/images/production/office-team.jpg" alt="Команда та препрес-відділ" fill sizes="25vw" className="object-cover group-hover:scale-108 transition-transform duration-700" />
                    </div>
                    <div className="relative aspect-square w-full overflow-hidden bg-white border border-slate-200 shadow-sm rounded-xs group">
                      <Image src="/images/cases/retail-srp-display.png" alt="Упаковка Showbox SRP" fill sizes="25vw" className="object-cover group-hover:scale-108 transition-transform duration-700" />
                    </div>
                    <div className="relative aspect-[3/4] w-full overflow-hidden bg-white border border-slate-200 shadow-sm rounded-xs group">
                      <Image src="/images/cases/luxury-restaurant-menu.jpg" alt="Ресторанні меню з золоченням" fill sizes="25vw" className="object-cover group-hover:scale-108 transition-transform duration-700" />
                    </div>
                  </div>

                  {/* Колонка 3 */}
                  <div className="space-y-3.5 col-span-2 sm:col-span-1">
                    <div className="relative aspect-[4/3] w-full overflow-hidden bg-white border border-slate-200 shadow-sm rounded-xs group">
                      <Image src="/images/cases/kids-books-games.png" alt="Дитячі розвиваючі книги та ігри" fill sizes="25vw" className="object-cover group-hover:scale-108 transition-transform duration-700" />
                    </div>
                    <div className="relative aspect-[3/4] sm:aspect-[9/16] w-full overflow-hidden bg-white border border-slate-200 shadow-sm rounded-xs group">
                      <Image src="/images/labels/label-kvass.png" alt="Фігурні висічні етикетки" fill sizes="25vw" className="object-cover group-hover:scale-108 transition-transform duration-700" />
                    </div>
                    <div className="relative aspect-square w-full overflow-hidden bg-white border border-slate-200 shadow-sm rounded-xs group">
                      <Image src="/images/cases/luxury-boutique-souvenirs.jpg" alt="Подарункові кашировані бокси" fill sizes="25vw" className="object-cover group-hover:scale-108 transition-transform duration-700" />
                    </div>
                  </div>

                </div>
              </ScrollFadeIn>
            </div>

          </div>

        </div>
      </section>

    </div>
  );
}
