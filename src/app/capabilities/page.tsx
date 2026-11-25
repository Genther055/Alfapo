"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, Check, Phone, Mail } from "lucide-react";
import ScrollRevealText from "@/components/ScrollRevealText";
import FullWidthVideoSection from "@/components/FullWidthVideoSection";

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
        isVisible
          ? "opacity-100 translate-y-0"
          : "opacity-0 translate-y-6"
      } ${className}`}
    >
      {children}
    </div>
  );
}

// Компонент плавної появи фото з м'яким паралакс-ефектом при скролі
function ScrollParallaxCard({
  src,
  alt,
  title,
  sub,
  aspect = "aspect-square",
}: {
  src: string;
  alt: string;
  title: string;
  sub: string;
  aspect?: string;
}) {
  const cardRef = useRef<HTMLDivElement>(null);

  return (
    <ScrollFadeIn className="h-full">
      <div
        ref={cardRef}
        className="bg-white border border-slate-200 hover:border-slate-950 hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 p-6 sm:p-7 flex flex-col justify-between group rounded-xs h-full"
      >
        <div className={`relative ${aspect} bg-white overflow-hidden border border-slate-100 flex items-center justify-center p-3 mb-6`}>
          <Image
            src={src}
            alt={alt}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
            className="object-contain p-2 group-hover:scale-110 transition-transform duration-700 ease-out"
          />
        </div>
        <div>
          <h3 className="font-serif text-2xl sm:text-[26px] text-slate-950 block leading-snug group-hover:text-edelvin-blue transition-colors">
            {title}
          </h3>
          <p className="text-xs sm:text-sm text-slate-500 block mt-2 font-normal leading-relaxed">
            {sub}
          </p>
        </div>
      </div>
    </ScrollFadeIn>
  );
}

export default function CapabilitiesPage() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    category: "Харчові продукти",
    runSize: "5 000 шт",
    formatType: "Рулон",
    message: "",
  });

  const [activeStep, setActiveStep] = useState<number>(0);

  // Слідкування за прогресом скролу для тонкого індикатора
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
  };

  const steps = [
    {
      num: "01",
      title: "Бриф / макет",
      desc: "отримуємо задачу, файл або ідею",
    },
    {
      num: "02",
      title: "Матеріал",
      desc: "підбираємо основу, клей та формат",
    },
    {
      num: "03",
      title: "Тест",
      desc: "робимо зразок і затверджуємо",
    },
    {
      num: "04",
      title: "Тираж",
      desc: "друк, порізка, пакування, доставка",
    },
  ];

  const formats = [
    {
      title: "Рулон",
      subtitle: "для автоматичного нанесення",
    },
    {
      title: "Лист",
      subtitle: "для малих партій та стікерів",
    },
    {
      title: "Фігурна висічка",
      subtitle: "наклейки нестандартної форми",
    },
    {
      title: "Довгі етикетки",
      subtitle: "склад, інструкції, штрихкоди",
    },
    {
      title: "Квадрат / круг",
      subtitle: "харчова продукція, промо, QR",
    },
    {
      title: "Розгортки",
      subtitle: "коробки та пакування",
    },
  ];

  return (
    <div className="bg-white text-slate-900 selection:bg-edelvin-blue selection:text-white relative">
      
      {/* Top scroll progress bar */}
      <div
        style={{ width: `${scrollProgress}%` }}
        className="fixed top-0 left-0 h-[3px] bg-edelvin-blue z-50 pointer-events-none transition-all duration-150"
      />

            {/* Hero Section with Ambient Factory Video */}
            <section className="relative pt-24 pb-20 md:pt-32 md:pb-28 border-b border-slate-200 overflow-hidden bg-slate-950 text-white">
        {/* Subtle Ambient Video Background */}
        <div className="absolute inset-0 pointer-events-none opacity-30 mix-blend-screen filter contrast-125 brightness-90">
          <video
            src="/videos/hero-ambient.mp4"
            poster="/videos/hero-ambient-poster.jpg"
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover scale-105"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950/70 via-slate-950/85 to-slate-950 pointer-events-none" />

        <div className="relative z-10 max-w-[1520px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-10">
          
          <div className="max-w-5xl mx-auto text-center space-y-7">
            <span className="font-sans text-xs font-bold tracking-[0.28em] text-blue-400 uppercase inline-block">
              ПОВНИЙ ЦИКЛ ПОЛІГРАФІЇ ТА РУЛОННОЇ ЕТИКЕТКИ • ТОВ «АЛЬФА І ОМЕГА»
            </span>

            <h1 className="font-serif text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-normal tracking-tight text-white leading-[1.02]">
              Одна виробнича база. <br />
              <span className="italic font-light text-blue-400">
                Рішення для різних ринків.
              </span>
            </h1>

            <div className="max-w-3xl mx-auto pt-2">
              <p className="text-lg sm:text-xl md:text-2xl text-slate-300 leading-relaxed font-light">
                Від інженерного макета до багатотисячної серійної лінійки без посередників.
              </p>
            </div>

            <div className="pt-6 flex flex-wrap items-center justify-center gap-6 sm:gap-10">
              <a
                href="#order-form"
                className="inline-flex items-center gap-3 text-xs sm:text-sm font-bold tracking-[0.2em] uppercase text-slate-950 bg-white hover:bg-blue-400 hover:text-slate-950 px-8 py-4 transition-all duration-300 cursor-pointer shadow-lg hover:shadow-2xl hover:-translate-y-0.5 group"
              >
                <span>Підібрати рішення під продукт</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>

              <a
                href="#solutions"
                className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold tracking-[0.2em] uppercase text-white hover:text-blue-400 border-b-2 border-white/40 hover:border-blue-400 pb-1 transition-all cursor-pointer"
              >
                <span>Каталог зразків за категоріями</span>
                <ArrowUpRight className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Capability Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-5 mt-20 pt-12 border-t border-white/15">
            {[
              { title: "Харчові продукти", anchor: "#food" },
              { title: "Напої", anchor: "#drinks" },
              { title: "E-commerce", anchor: "#horeca" },
              { title: "Косметика", anchor: "#nonfood" },
              { title: "Фарма", anchor: "#packaging" },
              { title: "Преміальні лінійки", anchor: "#sku" },
            ].map((market, idx) => (
              <ScrollFadeIn key={market.title} delay={idx * 60}>
                <a
                  href={market.anchor}
                  className="p-6 bg-slate-900/80 backdrop-blur-xs border border-white/10 hover:border-blue-400 hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 rounded-xs flex flex-col justify-between group text-left cursor-pointer h-full"
                >
                  <span className="font-serif text-lg sm:text-xl text-white group-hover:text-blue-400 transition-colors">
                    {market.title}
                  </span>
                  <span className="font-sans text-[11px] text-slate-400 uppercase tracking-wider mt-4 flex items-center gap-1 group-hover:text-white transition-colors">
                    <span>Дивитись</span>
                    <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                  </span>
                </a>
              </ScrollFadeIn>
            ))}
          </div>

        </div>
      </section>

            {/* Production Credentials */}
            <section className="py-20 lg:py-28 border-b border-slate-200 bg-white">
        <div className="max-w-[1520px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-10">
          
          <ScrollFadeIn>
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 pb-6 border-b border-slate-200 gap-6">
              <div>
                <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-normal text-slate-950 tracking-tight">
                  Виробництво, якому можна довіряти
                </h2>
              </div>
              <p className="text-base sm:text-lg text-slate-600 font-normal max-w-md leading-relaxed">
                Коротко про компанію
              </p>
            </div>
          </ScrollFadeIn>

          {/* 4 Метрики: чиста типографіка */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 py-12 border-b border-slate-200">
            <ScrollFadeIn delay={0}>
              <div className="group">
                <span className="font-serif text-4xl sm:text-5xl lg:text-6xl font-normal text-slate-950 block group-hover:text-edelvin-blue transition-colors whitespace-nowrap">
                  1998
                </span>
                <span className="text-xs sm:text-sm text-slate-500 mt-2 block font-normal whitespace-nowrap">
                  рік заснування
                </span>
              </div>
            </ScrollFadeIn>

            <ScrollFadeIn delay={80}>
              <div className="group">
                <span className="font-serif text-4xl sm:text-5xl lg:text-6xl font-normal text-slate-950 block group-hover:text-edelvin-blue transition-colors whitespace-nowrap">
                  5500 м²
                </span>
                <span className="text-xs sm:text-sm text-slate-500 mt-2 block font-normal whitespace-nowrap">
                  власної інфраструктури
                </span>
              </div>
            </ScrollFadeIn>

            <ScrollFadeIn delay={160}>
              <div className="group">
                <span className="font-serif text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-normal text-slate-950 block group-hover:text-edelvin-blue transition-colors whitespace-nowrap">
                  ≈1 000 000
                </span>
                <span className="text-xs sm:text-sm text-slate-500 mt-2 block font-normal whitespace-nowrap">
                  од. продукції щомісяця
                </span>
              </div>
            </ScrollFadeIn>

            <ScrollFadeIn delay={240}>
              <div className="group">
                <div className="flex items-baseline gap-2 sm:gap-3 whitespace-nowrap">
                  <span className="font-serif text-4xl sm:text-5xl lg:text-6xl font-normal text-slate-950 block group-hover:text-edelvin-blue transition-colors">
                    ISO
                  </span>
                  <span className="text-[10px] sm:text-xs font-sans font-bold px-2 py-0.5 bg-slate-950 text-white rounded-xs">
                    CERTIFIED
                  </span>
                </div>
                <span className="text-xs sm:text-sm text-slate-500 mt-2 block font-normal whitespace-nowrap">
                  9001 / 14001
                </span>
              </div>
            </ScrollFadeIn>
          </div>

          {/* 3 Принципи + Фото будівлі */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center pt-16">
            
            <div className="lg:col-span-6 space-y-10">
              <ScrollFadeIn delay={0}>
                <div className="pl-6 border-l-2 border-slate-950 hover:border-edelvin-blue transition-colors">
                  <h3 className="font-serif text-3xl sm:text-4xl font-normal text-slate-950">
                    Повний цикл
                  </h3>
                  <p className="text-sm sm:text-base text-slate-600 font-normal mt-2 leading-relaxed">
                    Від задуму — до готового продукту
                  </p>
                </div>
              </ScrollFadeIn>

              <ScrollFadeIn delay={100}>
                <div className="pl-6 border-l-2 border-slate-950 hover:border-edelvin-blue transition-colors">
                  <h3 className="font-serif text-3xl sm:text-4xl font-normal text-slate-950">
                    Стабільність
                  </h3>
                  <p className="text-sm sm:text-base text-slate-600 font-normal mt-2 leading-relaxed">
                    власне виробництво, досвід роботи з корпоративними замовленнями
                  </p>
                </div>
              </ScrollFadeIn>

              <ScrollFadeIn delay={200}>
                <div className="pl-6 border-l-2 border-slate-950 hover:border-edelvin-blue transition-colors">
                  <h3 className="font-serif text-3xl sm:text-4xl font-normal text-slate-950">
                    Масштабування
                  </h3>
                  <p className="text-sm sm:text-base text-slate-600 font-normal mt-2 leading-relaxed">
                    серійні лінійки продукції з єдиною дизайн-системою
                  </p>
                </div>
              </ScrollFadeIn>
            </div>

            <div className="lg:col-span-6">
              <ScrollFadeIn delay={150}>
                <div className="relative aspect-[4/3] bg-white overflow-hidden border border-slate-200 shadow-xl group">
                  <Image
                    src="/images/capabilities/facility-building.png"
                    alt="Виробничий комплекс ТОВ «Альфа і Омега», м. Вінниця"
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent opacity-80" />
                  <div className="absolute bottom-6 left-6 right-6 text-white">
                    <span className="font-serif text-2xl sm:text-3xl font-normal block">
                      Виробничий комплекс «Альфа і Омега»
                    </span>
                    <span className="text-xs text-slate-300 block mt-1 font-normal">
                      м. Вінниця, вул. 600-річчя, 17
                    </span>
                  </div>
                </div>
              </ScrollFadeIn>
            </div>

          </div>

        </div>
      </section>

            {/* Industry Capabilities */}
            <div id="solutions" className="space-y-0">
        
        {/* Розділ: Харчова продукція та retail */}
        <section id="food" className="py-20 lg:py-28 border-b border-slate-200 bg-white">
          <div className="max-w-[1520px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-10">
            
            <ScrollFadeIn>
              <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 pb-6 border-b border-slate-200 gap-6">
                <div>
                  <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-normal text-slate-950 tracking-tight">
                    Харчова продукція та retail
                  </h2>
                </div>
                <p className="text-base sm:text-lg text-slate-600 font-normal max-w-lg leading-relaxed">
                  Етикетка має продавати, інформувати й витримувати умови зберігання
                </p>
              </div>
            </ScrollFadeIn>

            {/* Production Advantages */}
            <ScrollFadeIn delay={100}>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 py-8 border-t border-b border-slate-200 mb-14">
                <div className="space-y-1">
                  <h4 className="font-serif text-2xl sm:text-3xl text-slate-950 font-normal">Полиці та холодильники</h4>
                  <p className="text-sm sm:text-base text-slate-600 font-normal leading-relaxed">
                    підбір клею і матеріалу під температуру та вологість
                  </p>
                </div>
                <div className="space-y-1">
                  <h4 className="font-serif text-2xl sm:text-3xl text-slate-950 font-normal">Дрібний текст</h4>
                  <p className="text-sm sm:text-base text-slate-600 font-normal leading-relaxed">
                    склад, поживна цінність, терміни, штрихкоди, QR
                  </p>
                </div>
                <div className="space-y-1">
                  <h4 className="font-serif text-2xl sm:text-3xl text-slate-950 font-normal">Візуальна відмінність</h4>
                  <p className="text-sm sm:text-base text-slate-600 font-normal leading-relaxed">
                    етикетка адаптується до позиціонування продукту
                  </p>
                </div>
              </div>
            </ScrollFadeIn>

            {/* Зразки продукції з паралакс-ефектом та збільшенням */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
              <ScrollParallaxCard
                src="/images/capabilities/mockup-spirits-gold.jpg"
                alt="Етикетка для міцних напоїв"
                title="Етикетка для міцних напоїв"
                sub="Вологостійка основа • Глибокий темний друк"
              />
              <ScrollParallaxCard
                src="/images/capabilities/mockup-craft-distillery.jpg"
                alt="Фігурна етикетка для дистилерії"
                title="Фігурна етикетка для дистилерії"
                sub="Кругова контурна висічка • Крафтовий стиль"
              />
              <ScrollParallaxCard
                src="/images/capabilities/mockup-food-retail.jpg"
                alt="Етикетка для напівфабрикатів"
                title="Етикетка для напівфабрикатів"
                sub="Стійкість до конденсату та низьких температур"
              />
              <ScrollParallaxCard
                src="/images/capabilities/mockup-seafood-gourmet.jpg"
                alt="Етикетка для рибної продукції"
                title="Етикетка для рибної продукції"
                sub="Стійкість до жирів, розсолів та вологи"
              />
            </div>

          </div>
        </section>

        {/* ВІДЕО-ПРОЦЕС: КОМПЛЕКС РУЛОННОЇ ЕТИКЕТКИ VOREY VD3350 ТА KONICA MINOLTA */}
        <FullWidthVideoSection
          videoSrc="/videos/roll-label-vorey.mp4"
          posterSrc="/videos/roll-label-vorey-poster.jpg"
          eyebrow="ЦИФРОВИЙ РУЛОННИЙ ДРУК ТА ФІГУРНА ВИСІЧКА"
          title="Промислова фінішна лінія етикетки Vorey VD3350"
          description="Повний цикл виробництва самоклейної етикетки в рулонах: ламінування в лінію, цифрова контурна висічка зняттям облою та автоматична розпускна намотка на втулку. Ідеально підходить для швидкісних автоматичних аплікаторів на лініях розливу."
        />

        {/* Розділ: Серійні лінійки SKU */}
        <section id="sku" className="py-20 lg:py-28 border-b border-slate-200 bg-white">
          <div className="max-w-[1520px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-10">
            
            <ScrollFadeIn>
              <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 pb-6 border-b border-slate-200 gap-6">
                <div>
                  <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-normal text-slate-950 tracking-tight">
                    Серійні лінійки SKU
                  </h2>
                </div>
                <p className="text-base sm:text-lg text-slate-600 font-normal max-w-lg leading-relaxed">
                  Одна система - багато позицій
                </p>
              </div>
            </ScrollFadeIn>

            {/* Акцентний чорно-білий блок з м'якою тінню */}
            <ScrollFadeIn delay={80}>
              <div className="mb-14 p-8 sm:p-12 bg-slate-950 text-white rounded-xs flex flex-col sm:flex-row sm:items-center justify-between gap-6 shadow-xl">
                <div>
                  <span className="font-serif text-4xl sm:text-6xl font-normal text-white block">
                    100+ варіантів в одній лінійці
                  </span>
                  <span className="text-xs sm:text-sm text-slate-300 mt-2 block font-normal">
                    Масштабування торгових марок без переналадки тиражу та зайвих витрат
                  </span>
                </div>
                <a
                  href="#order-form"
                  className="px-8 py-4 bg-edelvin-blue text-white hover:bg-white hover:text-slate-950 font-sans text-xs uppercase font-bold tracking-widest transition-all duration-300 shrink-0 self-start sm:self-auto cursor-pointer shadow-sm hover:shadow-lg"
                >
                  Розрахувати лінійку SKU
                </a>
              </div>
            </ScrollFadeIn>

            {/* Production Advantages */}
            <ScrollFadeIn delay={120}>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 py-8 border-t border-b border-slate-200 mb-14">
                <div className="space-y-1">
                  <h4 className="font-serif text-2xl sm:text-3xl text-slate-950 font-normal">Швидко</h4>
                  <p className="text-sm sm:text-base text-slate-600 font-normal leading-relaxed">
                    оновлення назви, ваги, штрихкоду
                  </p>
                </div>
                <div className="space-y-1">
                  <h4 className="font-serif text-2xl sm:text-3xl text-slate-950 font-normal">Єдино</h4>
                  <p className="text-sm sm:text-base text-slate-600 font-normal leading-relaxed">
                    вся лінійка виглядає як система
                  </p>
                </div>
                <div className="space-y-1">
                  <h4 className="font-serif text-2xl sm:text-3xl text-slate-950 font-normal">Зручно</h4>
                  <p className="text-sm sm:text-base text-slate-600 font-normal leading-relaxed">
                    для масштабування та аналітики ринку
                  </p>
                </div>
              </div>
            </ScrollFadeIn>

            {/* Зразки продукції */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
              <ScrollParallaxCard
                src="/images/branding/sku-series-olive-oil.png"
                alt="Серійна лінійка для скляної тари"
                title="Серійна лінійка для скляної тари"
                sub="Єдина дизайн-система для пляшок різного об'єму"
                aspect="aspect-[4/3]"
              />
              <ScrollParallaxCard
                src="/images/branding/cosmetics-dispensers-line.png"
                alt="Комплексна лінійка для косметики"
                title="Комплексна лінійка для косметики"
                sub="Флакони, баночки, тубуси та дозатори"
                aspect="aspect-[4/3]"
              />
              <ScrollParallaxCard
                src="/images/branding/coffee-black-label.png"
                alt="Етикетки для фольгованих пакетів"
                title="Етикетки для фольгованих пакетів"
                sub="Диференціація сортів у серійній лінійці"
                aspect="aspect-[4/3]"
              />
              <ScrollParallaxCard
                src="/images/capabilities/mockup-bakery-patisserie.jpg"
                alt="Кондитерська фігурна висічка"
                title="Кондитерська фігурна висічка"
                sub="Складна геометрія для коробок та упаковок"
                aspect="aspect-[4/3]"
              />
            </div>

          </div>
        </section>

        {/* Розділ: Напої та алкогольна продукція */}
        <section id="drinks" className="py-20 lg:py-28 border-b border-slate-200 bg-white">
          <div className="max-w-[1520px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-10">
            
            <ScrollFadeIn>
              <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 pb-6 border-b border-slate-200 gap-6">
                <div>
                  <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-normal text-slate-950 tracking-tight">
                    Напої та алкогольна продукція
                  </h2>
                </div>
                <p className="text-base sm:text-lg text-slate-600 font-normal max-w-lg leading-relaxed">
                  Преміальні, крафтові та серійні етикетки
                </p>
              </div>
            </ScrollFadeIn>

            <div className="mb-6 font-serif text-3xl sm:text-4xl text-slate-950 font-normal">
              Підхід
            </div>

            {/* Production Advantages */}
            <ScrollFadeIn delay={100}>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 py-8 border-t border-b border-slate-200 mb-14">
                <div className="space-y-1">
                  <h4 className="font-serif text-2xl sm:text-3xl text-slate-950 font-normal">Преміальність</h4>
                  <p className="text-sm sm:text-base text-slate-600 font-normal leading-relaxed">
                    чисті поля, акцент на назві та фактурі
                  </p>
                </div>
                <div className="space-y-1">
                  <h4 className="font-serif text-2xl sm:text-3xl text-slate-950 font-normal">Серії</h4>
                  <p className="text-sm sm:text-base text-slate-600 font-normal leading-relaxed">
                    сорти, роки, кольори та єдиний стиль
                  </p>
                </div>
                <div className="space-y-1">
                  <h4 className="font-serif text-2xl sm:text-3xl text-slate-950 font-normal">Формати</h4>
                  <p className="text-sm sm:text-base text-slate-600 font-normal leading-relaxed">
                    квадратні, довгі, круглі, фігурні
                  </p>
                </div>
              </div>
            </ScrollFadeIn>

            {/* Зразки продукції */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
              <ScrollParallaxCard
                src="/images/branding/wine-label-textured.png"
                alt="Преміальна винна етикетка"
                title="Преміальна винна етикетка"
                sub="Винний фактурний папір • Тиснення"
              />
              <ScrollParallaxCard
                src="/images/branding/craft-beverage-bottles.png"
                alt="Фігурна етикетка для напоїв"
                title="Фігурна етикетка для напоїв"
                sub="Складний висічний контур • Живе бродіння"
              />
              <ScrollParallaxCard
                src="/images/branding/beverage-wine-collection.png"
                alt="Класична гравірована етикетка"
                title="Класична гравірована етикетка"
                sub="Прецизійна передача півтонів для вин"
              />
              <ScrollParallaxCard
                src="/images/branding/sku-series-beverages.png"
                alt="Етикетка для натуральних напоїв"
                title="Етикетка для натуральних напоїв"
                sub="Крафтова основа • Пастельна гама"
              />
            </div>

          </div>
        </section>

        {/* Розділ: HoReCa та локальні бренди */}
        <section id="horeca" className="py-20 lg:py-28 border-b border-slate-200 bg-white">
          <div className="max-w-[1520px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-10">
            
            <ScrollFadeIn>
              <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 pb-6 border-b border-slate-200 gap-6">
                <div>
                  <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-normal text-slate-950 tracking-tight">
                    HoReCa та локальні бренди
                  </h2>
                </div>
                <p className="text-base sm:text-lg text-slate-600 font-normal max-w-lg leading-relaxed">
                  Швидкий запуск етикеток, QR-стікерів і невеликих партій
                </p>
              </div>
            </ScrollFadeIn>

            {/* Production Advantages */}
            <ScrollFadeIn delay={100}>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 py-8 border-t border-b border-slate-200 mb-14">
                <div className="space-y-1">
                  <h4 className="font-serif text-2xl sm:text-3xl text-slate-950 font-normal">QR та контакти</h4>
                  <p className="text-sm sm:text-base text-slate-600 font-normal leading-relaxed">
                    сайт, Instagram, месенджери та промо-механіки прямо на наліпці
                  </p>
                </div>
                <div className="space-y-1">
                  <h4 className="font-serif text-2xl sm:text-3xl text-slate-950 font-normal">Малі партії</h4>
                  <p className="text-sm sm:text-base text-slate-600 font-normal leading-relaxed">
                    підходить для тесту нового продукту або сезонної пропозиції
                  </p>
                </div>
                <div className="space-y-1">
                  <h4 className="font-serif text-2xl sm:text-3xl text-slate-950 font-normal">Локальна айдентика</h4>
                  <p className="text-sm sm:text-base text-slate-600 font-normal leading-relaxed">
                    підкреслення характеру бренду без перевантаження дизайну
                  </p>
                </div>
              </div>
            </ScrollFadeIn>

            {/* Зразки продукції */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
              <ScrollParallaxCard
                src="/images/capabilities/mockup-delivery-box.jpg"
                alt="Стікери для доставки та пакування"
                title="Стікери для доставки та пакування"
                sub="QR-код для переходу в онлайн-замовлення"
              />
              <ScrollParallaxCard
                src="/images/capabilities/mockup-organic-produce.jpg"
                alt="Етикетка для свіжої агропродукції"
                title="Етикетка для свіжої агропродукції"
                sub="Стійкість до вологи в холодильних вітринах"
              />
              <ScrollParallaxCard
                src="/images/branding/spirits-gold-foil.png"
                alt="Металізована золота етикетка"
                title="Металізована золота етикетка"
                sub="Тиснення фольгою для снекової продукції"
              />
              <ScrollParallaxCard
                src="/images/branding/horeca-local-branding.png"
                alt="Багатоколірна контурна емблема"
                title="Багатоколірна контурна емблема"
                sub="Точна плотерна висічка складної форми"
              />
            </div>

          </div>
        </section>

        {/* ВІДЕО-ПРОЦЕС 1: НИТКОШВЕЙНА ТА ПАЛІТУРНА ЛІНІЯ 7БЦ */}
        <FullWidthVideoSection
          videoSrc="/videos/book-binding.mp4"
          posterSrc="/videos/book-binding-poster.jpg"
          eyebrow="КНИЖКОВО-ЖУРНАЛЬНА МАНУФАКТУРА 7БЦ"
          title="Автоматичне ниткошвейне скріплення блоків"
          description="Швидкісна промислова лінія Horizon та НШС забезпечує надійне зшивання книжкових блоків нитками з подальшим обтисканням на гідравлічних пресах. Жодних випадкових розпадів блоку навіть при щоденному навантаженні."
        />

        {/* Розділ: Косметика, масла та непродовольчі товари */}
        <section id="nonfood" className="py-20 lg:py-28 border-b border-slate-200 bg-white">
          <div className="max-w-[1520px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-10">
            
            <ScrollFadeIn>
              <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 pb-6 border-b border-slate-200 gap-6">
                <div>
                  <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-normal text-slate-950 tracking-tight">
                    Косметика, масла та непродовольчі товари
                  </h2>
                </div>
                <p className="text-base sm:text-lg text-slate-600 font-normal max-w-lg leading-relaxed">
                  Коли важливі чистота, службові блоки та акуратність деталей
                </p>
              </div>
            </ScrollFadeIn>

            {/* Production Advantages */}
            <ScrollFadeIn delay={100}>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 py-8 border-t border-b border-slate-200 mb-14">
                <div className="space-y-1">
                  <h4 className="font-serif text-2xl sm:text-3xl text-slate-950 font-normal">Косметика</h4>
                  <p className="text-sm sm:text-base text-slate-600 font-normal leading-relaxed">
                    тонкий стиль, дрібні склади, штрихкоди, піктограми
                  </p>
                </div>
                <div className="space-y-1">
                  <h4 className="font-serif text-2xl sm:text-3xl text-slate-950 font-normal">Технічні товари</h4>
                  <p className="text-sm sm:text-base text-slate-600 font-normal leading-relaxed">
                    яскраві етикетки та промо-матеріали для впізнаваності
                  </p>
                </div>
                <div className="space-y-1">
                  <h4 className="font-serif text-2xl sm:text-3xl text-slate-950 font-normal">Регламентні зони</h4>
                  <p className="text-sm sm:text-base text-slate-600 font-normal leading-relaxed">
                    контроль читабельності й точного розміщення інформації
                  </p>
                </div>
              </div>
            </ScrollFadeIn>

            {/* Зразки продукції */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
              <ScrollParallaxCard
                src="/images/capabilities/mockup-motor-oil.jpg"
                alt="Сервісна регламентна наліпка"
                title="Сервісна регламентна наліпка"
                sub="Маслостійка основа з полями під запис"
              />
              <ScrollParallaxCard
                src="/images/capabilities/mockup-automotive-fluid.jpg"
                alt="Технічна наліпка для автоіндустрії"
                title="Технічна наліпка для автоіндустрії"
                sub="Стійкість до агресивних рідин та тертя"
              />
              <ScrollParallaxCard
                src="/images/branding/glass-jars-cosmetic.png"
                alt="Широкоформатна етикетка для пластику"
                title="Широкоформатна етикетка для пластику"
                sub="Посилена адгезія до боксів та контейнерів"
              />
              <ScrollParallaxCard
                src="/images/branding/serum-dropper-bottles.png"
                alt="Спеціалізована тонка смуга"
                title="Спеціалізована тонка смуга"
                sub="Для вузьких флаконів, тубусів та помад"
              />
            </div>

          </div>
        </section>

        {/* Розділ: Пакування та розгортки */}
        <section id="packaging" className="py-20 lg:py-28 border-b border-slate-200 bg-white">
          <div className="max-w-[1520px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-10">
            
            <ScrollFadeIn>
              <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 pb-6 border-b border-slate-200 gap-6">
                <div>
                  <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-normal text-slate-950 tracking-tight">
                    Пакування та розгортки
                  </h2>
                </div>
                <p className="text-base sm:text-lg text-slate-600 font-normal max-w-lg leading-relaxed">
                  Технічна точність для коробок, обгорток та спеціальних макетів
                </p>
              </div>
            </ScrollFadeIn>

            {/* Production Advantages */}
            <ScrollFadeIn delay={100}>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 py-8 border-t border-b border-slate-200 mb-14">
                <div className="space-y-1">
                  <h4 className="font-serif text-2xl sm:text-3xl text-slate-950 font-normal">Лінії різу</h4>
                  <p className="text-sm sm:text-base text-slate-600 font-normal leading-relaxed">
                    підготовка макета до виробництва
                  </p>
                </div>
                <div className="space-y-1">
                  <h4 className="font-serif text-2xl sm:text-3xl text-slate-950 font-normal">Фальцювання</h4>
                  <p className="text-sm sm:text-base text-slate-600 font-normal leading-relaxed">
                    зони згину та технологічні поля
                  </p>
                </div>
                <div className="space-y-1">
                  <h4 className="font-serif text-2xl sm:text-3xl text-slate-950 font-normal">Контроль</h4>
                  <p className="text-sm sm:text-base text-slate-600 font-normal leading-relaxed">
                    службовий текст, коди, штрихкоди, дати
                  </p>
                </div>
              </div>
            </ScrollFadeIn>

            {/* Зразки продукції */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <ScrollParallaxCard
                src="/images/branding/alfa-omega-showcase.png"
                alt="Брендований крафтовий пакет"
                title="Брендований крафтовий пакет"
                sub="Цупкий крафт-папір • Кручені ручки"
                aspect="aspect-[3/4]"
              />
              <ScrollParallaxCard
                src="/images/capabilities/mockup-pharma-box.jpg"
                alt="Фармацевтична коробка та розгортка"
                title="Фармацевтична коробка та розгортка"
                sub="Точне фальцювання • Замкові клапани"
                aspect="aspect-[3/4]"
              />
              <ScrollParallaxCard
                src="/images/branding/carton-dieline-packaging.png"
                alt="Преміальне картонне пакування"
                title="Преміальне картонне пакування"
                sub="Матова тактильна поверхня для косметики"
                aspect="aspect-[3/4]"
              />
            </div>

          </div>
        </section>

      </div>

            {/* Formats & Media */}
            <section className="py-20 lg:py-28 border-b border-slate-200 bg-white">
        <div className="max-w-[1520px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-10">
          
          <ScrollFadeIn>
            <div className="max-w-4xl mx-auto text-center mb-16 space-y-4">
              <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-normal text-slate-950 tracking-tight">
                Формати та носії
              </h2>
              <p className="text-base sm:text-lg text-slate-600 font-normal leading-relaxed">
                Можемо закрити різні сценарії нанесення
              </p>
            </div>
          </ScrollFadeIn>

          {/* 6 Карток форматів: лаконічні, чисті */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {formats.map((fmt, idx) => (
              <ScrollFadeIn key={fmt.title} delay={idx * 60}>
                <div className="p-8 bg-white border border-slate-200 hover:border-slate-950 hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 rounded-xs flex flex-col justify-between group h-full">
                  <div>
                    <h3 className="font-serif text-3xl text-slate-950 font-normal group-hover:text-edelvin-blue transition-colors">
                      {fmt.title}
                    </h3>
                    
                    <p className="text-sm sm:text-base text-slate-600 font-normal mt-2 leading-relaxed">
                      {fmt.subtitle}
                    </p>
                  </div>

                  <div className="pt-6 mt-6 border-t border-slate-100 flex items-center justify-end text-xs font-sans text-slate-400 group-hover:text-slate-950 transition-colors">
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </ScrollFadeIn>
            ))}
          </div>

          <ScrollFadeIn delay={200}>
            <div className="mt-14 p-8 bg-white border border-slate-200 text-center rounded-xs max-w-4xl mx-auto">
              <p className="font-serif text-xl sm:text-2xl text-slate-900 italic leading-relaxed">
                «Підбираємо формат під задачу: упаковка, умови зберігання, спосіб нанесення, тираж і бюджет.»
              </p>
            </div>
          </ScrollFadeIn>

        </div>
      </section>

            {/* Production Process */}
            <section className="py-20 lg:py-28 border-b border-slate-200 bg-white">
        <div className="max-w-[1520px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-10">
          
          <ScrollFadeIn>
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 pb-6 border-b border-slate-200 gap-6">
              <div>
                <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-normal text-slate-950 tracking-tight">
                  Процес співпраці
                </h2>
              </div>
              <p className="text-base sm:text-lg text-slate-600 font-normal max-w-md leading-relaxed">
                Прозоро для відділу закупівель, маркетингу та виробництва клієнта
              </p>
            </div>
          </ScrollFadeIn>

          {/* 4 Етапи: біло-чорна взаємодія */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, idx) => (
              <ScrollFadeIn key={step.num} delay={idx * 80}>
                <div
                  onClick={() => setActiveStep(idx)}
                  className={`p-8 border transition-all duration-300 rounded-xs cursor-pointer flex flex-col justify-between h-full ${
                    activeStep === idx
                      ? "border-slate-950 bg-slate-950 text-white shadow-2xl -translate-y-1.5"
                      : "border-slate-200 bg-white text-slate-950 hover:border-slate-950 hover:shadow-lg hover:-translate-y-1"
                  }`}
                >
                  <div>
                    <span className={`font-sans text-2xl font-normal block mb-6 ${activeStep === idx ? "text-edelvin-blue" : "text-slate-400"}`}>
                      {step.num}
                    </span>

                    <h3 className="font-serif text-3xl font-normal mb-3">
                      {step.title}
                    </h3>

                    <p className={`text-sm sm:text-base leading-relaxed font-normal ${activeStep === idx ? "text-slate-200" : "text-slate-600"}`}>
                      {step.desc}
                    </p>
                  </div>

                  <div className="pt-6 mt-6 border-t border-current/15 flex items-center justify-between text-xs font-sans">
                    <span>{activeStep === idx ? "Поточний етап" : "Етап взаємодії"}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                </div>
              </ScrollFadeIn>
            ))}
          </div>

        </div>
      </section>

        {/* ВІДЕО-ПРОЦЕС 2: АВТОМАТИЗОВАНЕ СКЛАДСЬКЕ ПАКУВАННЯ ТА ЛОГІСТИКА */}
        <FullWidthVideoSection
          videoSrc="/videos/packaging-line.mp4"
          posterSrc="/videos/packaging-line-poster.jpg"
          eyebrow="СКЛАДСЬКА ЛОГІСТИКА ТА ПАЛЕТУВАННЯ"
          title="Захищене пакування та автоматизоване стрейчування"
          description="Кожна партія продукції пакується у вологозахисні короби та автоматично обмотується на палетувальній лінії. Гарантована цілісність тиражу при міжрегіональній доставці власним автопарком або кур'єрськими службами."
        />

            {/* 6. ISO ТА ЧОМУ ЦЕ ПРАЦЮЄ ДЛЯ B2B                             */}
            <section className="py-20 lg:py-28 border-b border-slate-200 bg-white">
        <div className="max-w-[1520px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-10">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
            
            {/* Якість і відповідальність */}
            <div className="lg:col-span-5 space-y-8">
              <ScrollFadeIn>
                <h3 className="font-serif text-4xl sm:text-5xl font-normal text-slate-950 leading-tight">
                  Якість і відповідальність
                </h3>
                <p className="text-sm sm:text-base text-slate-600 font-normal mt-2 leading-relaxed">
                  Стабільна система, матеріали та контроль на виробництві
                </p>
              </ScrollFadeIn>

              <div className="space-y-6 pt-2">
                <ScrollFadeIn delay={60}>
                  <div className="p-6 bg-white border border-slate-200 hover:border-slate-950 transition-colors">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-serif text-2xl text-slate-950">Якість</span>
                      <span className="font-sans text-xs font-bold px-2 py-0.5 bg-slate-950 text-white">ISO 9001</span>
                    </div>
                    <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-normal">
                      впроваджена система управління якістю ДСТУ ISO 9001
                    </p>
                  </div>
                </ScrollFadeIn>

                <ScrollFadeIn delay={120}>
                  <div className="p-6 bg-white border border-slate-200 hover:border-slate-950 transition-colors">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-serif text-2xl text-slate-950">Екологічне управління</span>
                      <span className="font-sans text-xs font-bold px-2 py-0.5 bg-slate-950 text-white">ISO 14001</span>
                    </div>
                    <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-normal">
                      впроваджена система ДСТУ ISO 14001
                    </p>
                  </div>
                </ScrollFadeIn>

                <ScrollFadeIn delay={180}>
                  <div className="p-6 bg-white border border-slate-200 hover:border-slate-950 transition-colors">
                    <span className="font-serif text-2xl text-slate-950 block mb-2">Передбачуваний результат</span>
                    <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-normal">
                      тестовий друк, затвердження зразка, контроль серії
                    </p>
                  </div>
                </ScrollFadeIn>
              </div>
            </div>

            {/* Чому це працює для B2B */}
            <div className="lg:col-span-7 space-y-8 lg:border-l lg:border-slate-200 lg:pl-16">
              <ScrollFadeIn delay={100}>
                <h3 className="font-serif text-4xl sm:text-5xl font-normal text-slate-950 leading-tight">
                  Чому це працює для B2B
                </h3>
                <p className="text-sm sm:text-base text-slate-600 font-normal mt-2 leading-relaxed">
                  Не просто друк, а виробниче рішення під категорію продукту
                </p>
              </ScrollFadeIn>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2">
                <ScrollFadeIn delay={140}>
                  <div className="p-6 bg-white border border-slate-200 rounded-xs space-y-2 hover:border-slate-950 transition-colors h-full">
                    <span className="font-serif text-xl text-slate-950 block">01 Нішева релевантність</span>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                      Харчові продукти • Винна продукція • HoReCa • Косметика • Фарма • Промисловість
                    </p>
                  </div>
                </ScrollFadeIn>

                <ScrollFadeIn delay={180}>
                  <div className="p-6 bg-white border border-slate-200 rounded-xs space-y-2 hover:border-slate-950 transition-colors h-full">
                    <span className="font-serif text-xl text-slate-950 block">02 Серійність</span>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                      бренд може масштабувати десятки SKU в одному стилі
                    </p>
                  </div>
                </ScrollFadeIn>

                <ScrollFadeIn delay={220}>
                  <div className="p-6 bg-white border border-slate-200 rounded-xs space-y-2 hover:border-slate-950 transition-colors h-full">
                    <span className="font-serif text-xl text-slate-950 block">03 Виробничий контроль</span>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                      матеріал, клей, зразок, тираж, порізка, пакування
                    </p>
                  </div>
                </ScrollFadeIn>

                <ScrollFadeIn delay={260}>
                  <div className="p-6 bg-white border border-slate-200 rounded-xs space-y-2 hover:border-slate-950 transition-colors h-full">
                    <span className="font-serif text-xl text-slate-950 block">04 Комерційна ясність</span>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                      партнер бачить приклади, формат і шлях замовлення
                    </p>
                  </div>
                </ScrollFadeIn>
              </div>
            </div>

          </div>

        </div>
      </section>

            {/* Request Solution & Contact Form */}
            <section id="order-form" className="py-24 lg:py-32 bg-slate-950 text-white scroll-mt-20">
        <div className="max-w-[1520px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-10">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-stretch">
            
            {/* Текст та контакти: строго Білий, Чорний, Синій */}
            <div className="lg:col-span-5 flex flex-col justify-between py-2 space-y-10">
              <ScrollFadeIn>
                <div>
                  <h2 className="font-serif text-5xl sm:text-6xl lg:text-7xl font-normal text-white tracking-tight leading-[1.02]">
                    Підготуємо рішення <br />
                    під ваш продукт
                  </h2>
                  <p className="text-base sm:text-lg text-slate-300 font-normal mt-6 leading-relaxed">
                    Надішліть макет або задачу — підберемо матеріал, формат, клей і запропонуємо оптимальний спосіб виробництва.
                  </p>
                </div>
              </ScrollFadeIn>

              {/* Телефони, пошта, сайт, адреса */}
              <ScrollFadeIn delay={100}>
                <div className="space-y-6 pt-6 border-t border-white/10 font-sans text-sm">
                  <div>
                    <span className="text-slate-400 block text-xs uppercase tracking-wider mb-2">Телефон:</span>
                    <div className="flex flex-col gap-3">
                      <a
                        href="tel:+380775153020"
                        className="flex items-center gap-3 text-lg sm:text-xl text-white hover:text-edelvin-blue font-bold transition-colors w-fit"
                      >
                        <Phone className="w-4 h-4 text-edelvin-blue shrink-0" />
                        <span>+380 (77) 515 30 20</span>
                      </a>
                      <a
                        href="tel:+380961793454"
                        className="flex items-center gap-3 text-lg sm:text-xl text-white hover:text-edelvin-blue font-bold transition-colors w-fit"
                      >
                        <Phone className="w-4 h-4 text-edelvin-blue shrink-0" />
                        <span>+380 (96) 179 34 54</span>
                      </a>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-white/10">
                    <span className="text-slate-400 block text-xs uppercase tracking-wider mb-2">Пошта:</span>
                    <div className="space-y-1.5 text-slate-200">
                      <a href="mailto:etiqueta.es@gmail.com" className="hover:text-edelvin-blue block transition-colors">
                        etiqueta.es@gmail.com
                      </a>
                      <a href="mailto:print.edelvin@gmail.com" className="hover:text-edelvin-blue block transition-colors">
                        print.edelvin@gmail.com
                      </a>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                      <span className="text-slate-400 block text-xs uppercase tracking-wider">Сайт:</span>
                      <span className="text-white block mt-1 font-bold">www.edelvin.com.ua</span>
                    </div>
                    <div>
                      <span className="text-slate-400 block text-xs uppercase tracking-wider">Адреса:</span>
                      <span className="text-slate-200 block mt-1">м. Вінниця, вул. 600-річчя, 17</span>
                    </div>
                  </div>
                </div>
              </ScrollFadeIn>
            </div>

            {/* Сучасна біла форма */}
            <div className="lg:col-span-7 bg-white text-slate-900 p-8 sm:p-14 rounded-xs shadow-2xl flex flex-col justify-between">
              {formSubmitted ? (
                <div className="py-16 text-center space-y-5">
                  <div className="w-16 h-16 bg-slate-950 text-white rounded-full flex items-center justify-center mx-auto">
                    <Check className="w-8 h-8 text-edelvin-blue" />
                  </div>
                  <h3 className="font-serif text-4xl text-slate-950 font-normal">
                    Запит надіслано
                  </h3>
                  <p className="text-sm sm:text-base text-slate-600 max-w-md mx-auto leading-relaxed font-normal">
                    Дякуємо! Наші спеціалісти вже вивчають параметри вашого продукту і підготують розрахунок та зразки матеріалів.
                  </p>
                  <button
                    type="button"
                    onClick={() => setFormSubmitted(false)}
                    className="text-xs font-sans font-bold uppercase tracking-wider text-slate-950 border-b border-slate-950 pb-1 mt-6 hover:text-edelvin-blue hover:border-edelvin-blue transition-colors cursor-pointer"
                  >
                    Надіслати ще один запит
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-7">
                  <div>
                    <h3 className="font-serif text-3xl sm:text-4xl font-normal text-slate-950">
                      Швидкий прорахунок тиражу
                    </h3>
                    <p className="text-sm text-slate-600 mt-1 font-normal">
                      Отримайте комерційну пропозицію та безкоштовні зразки матеріалів
                    </p>
                  </div>

                  {/* Вибір категорії */}
                  <div className="space-y-2">
                    <label className="block text-xs font-sans font-bold uppercase text-slate-700 tracking-wider">
                      Категорія продукту
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                      {[
                        "Харчові продукти",
                        "Напої",
                        "E-commerce",
                        "Косметика",
                        "Фарма",
                        "Пакування",
                      ].map((cat) => (
                        <button
                          key={cat}
                          type="button"
                          onClick={() => setFormData({ ...formData, category: cat })}
                          className={`text-xs font-sans py-2.5 px-3 rounded-xs border text-center transition-all cursor-pointer ${
                            formData.category === cat
                              ? "bg-slate-950 text-white border-slate-950 font-bold"
                              : "bg-white text-slate-700 border-slate-300 hover:border-slate-950"
                          }`}
                        >
                          {cat}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Вибір формату */}
                  <div className="space-y-2">
                    <label className="block text-xs font-sans font-bold uppercase text-slate-700 tracking-wider">
                      Формат носія
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                      {["Рулон", "Лист", "Коробки"].map((fmt) => (
                        <button
                          key={fmt}
                          type="button"
                          onClick={() => setFormData({ ...formData, formatType: fmt })}
                          className={`text-xs font-sans py-2.5 px-3 rounded-xs border text-center transition-all cursor-pointer ${
                            formData.formatType === fmt
                              ? "bg-slate-950 text-white border-slate-950 font-bold"
                              : "bg-white text-slate-700 border-slate-300 hover:border-slate-950"
                          }`}
                        >
                          {fmt}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div className="space-y-1.5">
                      <label className="block text-xs font-sans font-bold uppercase text-slate-700 tracking-wider">
                        Ваше ім'я / Підприємство *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="Олександр / ТОВ"
                        className="w-full px-4 py-3 bg-white border border-slate-300 text-slate-950 text-sm focus:outline-none focus:border-slate-950 transition-colors"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="block text-xs font-sans font-bold uppercase text-slate-700 tracking-wider">
                        Телефон для зв'язку *
                      </label>
                      <input
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="+380 ..."
                        className="w-full px-4 py-3 bg-white border border-slate-300 text-slate-950 text-sm focus:outline-none focus:border-slate-950 transition-colors"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div className="space-y-1.5">
                      <label className="block text-xs font-sans font-bold uppercase text-slate-700 tracking-wider">
                        Email
                      </label>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="office@brand.ua"
                        className="w-full px-4 py-3 bg-white border border-slate-300 text-slate-950 text-sm focus:outline-none focus:border-slate-950 transition-colors"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="block text-xs font-sans font-bold uppercase text-slate-700 tracking-wider">
                        Орієнтовний тираж
                      </label>
                      <input
                        type="text"
                        value={formData.runSize}
                        onChange={(e) => setFormData({ ...formData, runSize: e.target.value })}
                        placeholder="5 000 шт або тест"
                        className="w-full px-4 py-3 bg-white border border-slate-300 text-slate-950 text-sm focus:outline-none focus:border-slate-950 transition-colors"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="block text-xs font-sans font-bold uppercase text-slate-700 tracking-wider">
                      Задача, розмір або умови зберігання
                    </label>
                    <textarea
                      rows={3}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Опишіть температурний режим, чи є готовий макет, вимоги до клею або особливі побажання..."
                      className="w-full px-4 py-3 bg-white border border-slate-300 text-slate-950 text-sm focus:outline-none focus:border-slate-950 transition-colors resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-4.5 bg-slate-950 hover:bg-edelvin-blue text-white font-sans text-xs uppercase font-bold tracking-[0.2em] transition-all duration-300 cursor-pointer shadow-lg hover:shadow-xl flex items-center justify-center gap-3 group"
                  >
                    <span>Отримати розрахунок та зразки матеріалів</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </button>

                  <div className="text-[11px] font-sans text-slate-500 text-center">
                    Працюємо з юридичними особами, платниками ПДВ, казначейськими рахунками та ФОП.
                  </div>
                </form>
              )}
            </div>

          </div>

        </div>
      </section>

    </div>
  );
}
