"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { CATALOG_CLUSTERS } from "@/data/catalog";
import { useLanguage } from "@/context/LanguageContext";
import ScrollRevealText from "@/components/ScrollRevealText";
import ProductCarousel, { CarouselItem } from "@/components/ProductCarousel";
import FullWidthVideoSection from "@/components/FullWidthVideoSection";

// Вибрані кейси для головної каруселі
const HOME_CAROUSEL_ITEMS: CarouselItem[] = [
  {
    id: "home-ao-showcase",
    title: "Комплексні брендовані рішення «Альфа і Омега»",
    subtitle: "Крафтові пакети, шоубокси, фігурна етикетка та розгортки",
    category: "Фірмова продукція",
    image: "/images/branding/alfa-omega-showcase.png",
    description: "Повний асортимент представницької поліграфії з фірмовою символікою: пакети з гарячим тисненням, жорсткі коробки, самоклейні етикетки та контурна висічка.",
    badge: "Alfa & Omega Brand",
    link: "/catalog",
  },
  {
    id: "home-packaging-mockup",
    title: "Пакування та коробки з індивідуальною висічкою",
    subtitle: "Крафтові пакети, фармацевтичні пачки та преміум-косметика",
    category: "Упаковка та розгортки",
    image: "/images/branding/packaging-mockup-line.png",
    description: "Індивідуальна конструкторська розробка розгорток коробок, вирубних штампів та паперових пакетів для ритейлу й фармації.",
    badge: "Конструкторське бюро",
    link: "/catalog/boxes",
  },
  {
    id: "home-cosmetics-line",
    title: "Етикетки для лінійки органічної косметики",
    subtitle: "Флакони, баночки, туби та сироватки",
    category: "Косметичний сектор",
    image: "/images/branding/cosmetics-natural-line.png",
    description: "Вологостійкі та олієстійкі плівкові етикетки з шовковистим лаком для косметичних засобів та доглядових лінійок.",
    badge: "Стійка плівка",
    link: "/catalog/stickers",
  },
  {
    id: "home-olive-line",
    title: "Серійні етикетки для скляної тари різного об'єму",
    subtitle: "Масштабування дизайну від мініатюр до пляшок 1 л",
    category: "Олії та делікатеси",
    image: "/images/branding/olive-oil-line.png",
    description: "Пропорційне масштабування етикеток під будь-який діаметр скляної пляшки з жиростійким покриттям.",
    badge: "Серійний друк",
    link: "/catalog/roll-labels",
  },
  {
    id: "home-coffee-sku",
    title: "Серійні етикетки для лінійки крафтової кави",
    subtitle: "Єдина колірна дизайн-система для кавових дой-паків",
    category: "Крафтові бренди",
    image: "/images/branding/coffee-black-label.png",
    description: "Зручне масштабування для брендів з широким асортиментом: зміна назв, ваги, дат обсмаження та QR-кодів в одному замовленні.",
    badge: "Серійний друк",
    link: "/catalog/roll-labels",
  },
  {
    id: "home-craft-bottles",
    title: "Преміальні серійні етикетки для напоїв та олій",
    subtitle: "Флакони, скло, крафтові серії та фігурна висічка",
    category: "Напої та преміум-сегмент",
    image: "/images/branding/craft-beverage-bottles.png",
    description: "Промисловий друк на текстурованих паперах верже, металізованих плівках та нанесення вибіркового лаку Kurz для винної та крафтової продукції.",
    badge: "AccurioLabel 400",
    link: "/catalog/roll-labels",
  },
];
import {
  ArrowRight,
  ShieldCheck,
  Zap,
  Printer,
  BookOpen,
  Layers,
  Sparkles,
  Truck,
  Phone,
  Mail,
  MapPin,
  CheckCircle2,
  ChevronDown,
} from "lucide-react";

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

export default function HomePage() {
  const { t, setIsCatalogOpen } = useLanguage();
  const [scrollProgress, setScrollProgress] = useState(0);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [addedItem, setAddedItem] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    company: "",
    requestType: "",
    country: "",
    message: "",
    consent: false,
  });

  // Відстеження скролу для прогрес-лінії
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

  const handleQuickAdd = (itemName: string) => {
    setAddedItem(itemName);
    setTimeout(() => setAddedItem(null), 2200);
  };

  return (
    <div className="bg-white text-slate-900 selection:bg-edelvin-blue selection:text-white relative">
      
      {/* Top scroll progress bar */}
      <div
        style={{ width: `${scrollProgress}%` }}
        className="fixed top-0 left-0 h-[3px] bg-edelvin-blue z-50 pointer-events-none transition-all duration-150"
      />

            {/* Hero Section with Ambient Factory Video */}
            <section className="relative pt-20 pb-20 md:pt-28 md:pb-28 border-b border-slate-200 overflow-hidden bg-slate-950 text-white">
        {/* Subtle Ambient Video Background */}
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

        <div className="relative z-10 max-w-[1520px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-10">
          
          <div className="max-w-5xl mx-auto text-center space-y-6">
              <span className="font-sans text-xs font-bold tracking-[0.28em] text-blue-400 uppercase inline-block">
                ТОРГОВИЙ ДІМ «АЛЬФА І ОМЕГА»
              </span>

              <h1 className="font-serif text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-normal tracking-tight text-white leading-[1.05]">
                Якість друку. <br />
                <span className="italic font-light text-blue-400">
                  Традиції та інновації.
                </span>
              </h1>

              <p className="font-sans text-sm sm:text-base md:text-lg text-slate-300 max-w-2xl mx-auto font-light leading-relaxed">
                Одна виробнича база. Рішення для різних ринків: від макета до серійної лінійки.
              </p>

              {/* Action Links */}
              <div className="pt-8 flex flex-wrap items-center justify-center gap-6 sm:gap-10">
                <button
                  type="button"
                  onClick={() => {
                    window.scrollTo({ top: 0, behavior: "smooth" });
                    setIsCatalogOpen(true);
                  }}
                  className="inline-flex items-center gap-3 text-xs sm:text-sm font-bold tracking-[0.2em] uppercase text-slate-950 bg-white hover:bg-blue-400 hover:text-slate-950 px-8 py-4 transition-all duration-300 cursor-pointer shadow-lg hover:shadow-2xl hover:-translate-y-0.5"
                >
                  <span>Каталог продукції</span>
                  <ArrowRight className="w-4 h-4 text-slate-950" />
                </button>

                <Link
                  href="/capabilities"
                  className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold tracking-[0.2em] uppercase text-white hover:text-blue-400 border-b-2 border-white/40 hover:border-blue-400 pb-1.5 transition-all cursor-pointer"
                >
                  <span>Виробничі можливості</span>
                  <ArrowRight className="w-3.5 h-3.5 text-blue-400" />
                </Link>

                <a
                  href="#direct-contact"
                  className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold tracking-[0.2em] uppercase text-slate-300 hover:text-white pb-1.5 transition-all cursor-pointer"
                >
                  <span>Консультація технолога</span>
                  <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
                </a>
              </div>
            </div>

        </div>
      </section>

      {/* ФЛАГМАНСЬКЕ ВІДЕО ВИРОБНИЦТВА НА ВСЮ ШИРИНУ */}
      <FullWidthVideoSection
        videoSrc="/videos/plant-hero.mp4"
        posterSrc="/videos/plant-hero-poster.jpg"
        title="Автоматизовані лінії та індустріальні комплекси"
        description="Повний цикл поліграфії без посередників: автоматична лінія виготовлення твердої палітурки 7БЦ, прецизійні ниткошвейні комплекси, цифровий рулонний друк та контурна висічка."
      />

            {/* 2. СІТКА НАПРЯМІВ ВИРОБНИЦТВА (CAPABILITIES ARCHITECTURE) */}
            <section className="py-20 lg:py-28 border-b border-slate-200 bg-white">
        <div className="max-w-[1520px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-10">
          
          <ScrollFadeIn>
            <div className="flex flex-col md:flex-row justify-between items-baseline mb-12 pb-6 border-b border-slate-200 gap-4">
              <div>
                <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-normal text-slate-950 tracking-tight">
                  Виробничі та торговельні можливості
                </h2>
              </div>
              <Link
                href="/catalog"
                className="text-xs sm:text-sm font-bold tracking-[0.2em] uppercase text-slate-950 hover:text-edelvin-blue border-b-2 border-slate-950 hover:border-edelvin-blue pb-1 transition-all inline-flex items-center gap-1.5 cursor-pointer"
              >
                <span>Всі категорії</span>
                <ArrowRight className="w-3.5 h-3.5 text-edelvin-blue" />
              </Link>
            </div>
          </ScrollFadeIn>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {CATALOG_CLUSTERS.map((cluster, idx) => (
              <ScrollFadeIn key={cluster.id} delay={idx * 60}>
                <div
                  className="p-8 bg-white border border-slate-200 hover:border-slate-950 hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between rounded-xs group h-full"
                >
                  <div>
                    <h3 className="font-serif text-2xl sm:text-3xl font-normal text-slate-950 group-hover:text-edelvin-blue transition-colors">
                      {cluster.title}
                    </h3>

                    <p className="text-sm sm:text-base text-slate-700 mt-3 font-normal leading-relaxed line-clamp-3">
                      {cluster.description}
                    </p>
                  </div>

                  <div className="mt-8 pt-4 border-t border-slate-100 flex items-center justify-end text-xs font-sans">
                    <Link
                      href={`/catalog#${cluster.id}`}
                      className="text-slate-950 uppercase font-bold tracking-wider hover:text-edelvin-blue transition flex items-center gap-1.5 cursor-pointer"
                    >
                      <span>Переглянути</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </div>
              </ScrollFadeIn>
            ))}
          </div>

        </div>
      </section>

            {/* 2.5 ІНТЕРАКТИВНА КАРУСЕЛЬ ГОТОВИХ B2B-РІШЕНЬ             */}
            <section className="py-20 lg:py-28 border-b border-slate-200 bg-white">
        <div className="max-w-[1520px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-10">
          <ProductCarousel
            eyebrow="Серійна продукція"
            title="Рішення для брендів, готелів та ритейлу"
            subtitle="Рулонні етикетки для автоматичних ліній, готельна поліграфія, дитячі видання та упаковка Showbox."
            items={HOME_CAROUSEL_ITEMS}
            aspectRatio="video"
            viewAllLink="/catalog"
            viewAllText="Відкрити повний каталог"
          />
        </div>
      </section>

            {/* 3. ПОРТФОЛІО ТА ВИБРАНІ ВИРОБИ (FEATURED CRAFTSMANSHIP)   */}
            <section className="py-20 lg:py-28 border-b border-slate-200 bg-white">
        <div className="max-w-[1520px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-10">
          
          <ScrollFadeIn>
            <div className="flex flex-col md:flex-row justify-between items-baseline mb-12 pb-6 border-b border-slate-200 gap-4">
              <div>
                <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-normal text-slate-950 tracking-tight">
                  Вибрані вироби та матеріали
                </h2>
              </div>
              <span className="text-base sm:text-lg text-slate-600 font-normal">
                Прецизійна точність кольороподілу та ручна палітурка
              </span>
            </div>
          </ScrollFadeIn>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10">
            
            {/* Кейс 1: Представницька поліграфія та упаковка */}
            <ScrollFadeIn delay={0}>
              <div className="space-y-4 group">
                <div className="relative aspect-[4/3] bg-white overflow-hidden border border-slate-200 group-hover:border-slate-950 transition-colors rounded-xs shadow-xs">
                  <Image
                    src="/images/branding/alfa-omega-showcase.png"
                    alt="Фірмова продукція та пакування Альфа і Омега"
                    fill
                    className="object-cover group-hover:scale-108 transition-transform duration-700 ease-out"
                  />
                </div>
                <div className="space-y-1.5">
                  <span className="text-xs font-sans font-bold tracking-wider text-slate-400 uppercase block">
                    Представницька поліграфія
                  </span>
                  <h4 className="font-serif text-2xl sm:text-3xl font-normal text-slate-950 group-hover:text-edelvin-blue transition-colors">
                    Фірмові пакети, коробки та розгортки
                  </h4>
                  <p className="text-sm sm:text-base text-slate-700 font-normal leading-relaxed">
                    Преміальні крафтові пакети, жорсткі коробки з ложементом, гаряче тиснення золотою фольгою та персоналізовані welcome-набори.
                  </p>
                </div>
              </div>
            </ScrollFadeIn>

            {/* Кейс 2: Промислова рулонна етикетка */}
            <ScrollFadeIn delay={80}>
              <div className="space-y-4 group">
                <div className="relative aspect-[4/3] bg-white overflow-hidden border border-slate-200 group-hover:border-slate-950 transition-colors rounded-xs shadow-xs">
                  <Image
                    src="/images/branding/beverage-wine-collection.png"
                    alt="Серійні рулонні етикетки для скляної тари"
                    fill
                    className="object-cover group-hover:scale-108 transition-transform duration-700 ease-out"
                  />
                </div>
                <div className="space-y-1.5">
                  <span className="text-xs font-sans font-bold tracking-wider text-slate-400 uppercase block">
                    Серійне маркування SKU
                  </span>
                  <h4 className="font-serif text-2xl sm:text-3xl font-normal text-slate-950 group-hover:text-edelvin-blue transition-colors">
                    Рулонні етикетки для ліній розливу
                  </h4>
                  <p className="text-sm sm:text-base text-slate-700 font-normal leading-relaxed">
                    AccurioLabel 400 + плотер Scorpio Vorey: нанесення на пляшки, флакони та банки. Стійкість до вологи, олій та глибокого холоду.
                  </p>
                </div>
              </div>
            </ScrollFadeIn>

            {/* Кейс 3: Конструкторські коробки та розгортки */}
            <ScrollFadeIn delay={160}>
              <div className="space-y-4 group">
                <div className="relative aspect-[4/3] bg-white overflow-hidden border border-slate-200 group-hover:border-slate-950 transition-colors rounded-xs shadow-xs">
                  <Image
                    src="/images/branding/carton-dieline-packaging.png"
                    alt="Пакування та індивідуальні розгортки коробок"
                    fill
                    className="object-cover group-hover:scale-108 transition-transform duration-700 ease-out"
                  />
                </div>
                <div className="space-y-1.5">
                  <span className="text-xs font-sans font-bold tracking-wider text-slate-400 uppercase block">
                    Конструкторське пакування
                  </span>
                  <h4 className="font-serif text-2xl sm:text-3xl font-normal text-slate-950 group-hover:text-edelvin-blue transition-colors">
                    Коробки з висічкою та розгортки
                  </h4>
                  <p className="text-sm sm:text-base text-slate-700 font-normal leading-relaxed">
                    Конструкторська розробка геометрії коробок, вирубних штампів, ложементів та обгорток для надійного представлення продукту в ритейлі.
                  </p>
                </div>
              </div>
            </ScrollFadeIn>

          </div>

        </div>
      </section>

            {/* 3.5 ВИРОБНИЧИЙ КОМПЛЕКС ТА ПЛОЩА 2 500 М²                */}
            <section className="py-20 lg:py-28 border-b border-slate-200 bg-white">
        <div className="max-w-[1520px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-10">
          <ScrollFadeIn>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
              <div className="lg:col-span-5 space-y-6">
                <span className="font-sans text-xs font-bold tracking-[0.25em] text-edelvin-blue uppercase block">
                  ВЛАСНА ІНФРАСТРУКТУРА У ВІННИЦІ
                </span>
                <h2 className="font-serif text-4xl sm:text-5xl font-normal text-slate-950 leading-tight">
                  2 500 м² виробничих площ без посередників
                </h2>
                <p className="text-base sm:text-lg text-slate-600 font-normal leading-relaxed">
                  ТОВ «Торговий Дім «Альфа і Омега» поєднує флагманські цифрові комплекси Konica Minolta, промислову рулонну лінію етикеток, палітурну мануфактуру 7БЦ Horizon, офсетне обладнання та великий склад сертифікованого офісного паперу й канцелярських товарів.
                </p>
                <div className="pt-2 flex flex-col sm:flex-row gap-4 font-sans text-xs font-bold">
                  <Link
                    href="/capabilities"
                    className="px-7 py-3.5 bg-slate-950 text-white uppercase tracking-wider rounded-xs hover:bg-edelvin-blue transition-colors flex items-center justify-center gap-2"
                  >
                    <span>Технічні потужності B2B</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                  <Link
                    href="/about"
                    className="px-7 py-3.5 bg-white border border-slate-300 text-slate-900 uppercase tracking-wider rounded-xs hover:border-slate-950 hover:text-slate-950 transition-colors flex items-center justify-center"
                  >
                    <span>Історія та команда</span>
                  </Link>
                </div>
              </div>

              <div className="lg:col-span-7">
                <div className="relative aspect-[16/10] w-full rounded-xs overflow-hidden border border-slate-200 shadow-xl group">
                  <Image
                    src="/images/production/plant-facade.png"
                    alt="Виробничий комплекс ТОВ «Альфа і Омега» у Вінниці"
                    fill
                    sizes="(max-width: 1024px) 100vw, 60vw"
                    className="object-cover group-hover:scale-103 transition-transform duration-700 ease-out"
                  />
                  <div className="absolute bottom-4 left-4 right-4 bg-slate-950/85 backdrop-blur-xs text-white p-4 rounded-xs text-xs font-sans flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                    <div>
                      <span className="font-bold block text-sm">Виробничий комплекс ТОВ «Альфа і Омега»</span>
                      <span className="text-slate-300 text-[11px]">м. Вінниця, вул. 600-річчя, 17 • Власний автопарк доставки</span>
                    </div>
                    <span className="text-edelvin-blue font-bold uppercase tracking-wider text-[11px]">
                      5 500 м² інфраструктури
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </ScrollFadeIn>
        </div>
      </section>

            {/* 4. СКЛАДСЬКА ПРОГРАМА ТА МАГАЗИН (СУЧАСНИЙ ЕДИТОРІАЛ)    */}
            <section className="py-20 lg:py-28 border-b border-slate-200 bg-white">
        <div className="max-w-[1520px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-10">
          
          <ScrollFadeIn>
            <div className="flex flex-col md:flex-row justify-between items-baseline mb-12 pb-6 border-b border-slate-200 gap-4">
              <div>
                <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-normal text-slate-950 tracking-tight">
                  Офісний папір, бланки та канцелярія
                </h2>
              </div>
              <Link
                href="/shop"
                className="text-xs sm:text-sm font-bold tracking-[0.2em] uppercase text-slate-950 hover:text-edelvin-blue border-b-2 border-slate-950 hover:border-edelvin-blue pb-1 transition-all inline-flex items-center gap-1.5 cursor-pointer"
              >
                <span>Перейти до онлайн-магазину</span>
                <ArrowRight className="w-3.5 h-3.5 text-edelvin-blue" />
              </Link>
            </div>
          </ScrollFadeIn>

          {/* 4 товари в чистому європейському оформленні */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            
            {/* Товар 1 */}
            <ScrollFadeIn delay={0}>
              <div className="border border-slate-200 bg-white p-7 sm:p-8 flex flex-col justify-between hover:border-slate-950 hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 rounded-xs group h-full">
                <div>
                  <h3 className="font-serif text-2xl sm:text-[26px] text-slate-950 font-normal leading-snug group-hover:text-edelvin-blue transition-colors">
                    Папір офісний сертифікований А4 80 г/м²
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 font-normal mt-3 leading-relaxed">
                    Оригінальна пачка 500 аркушів. Ідеальна сумісність з лазерними принтерами та копіювальними апаратами.
                  </p>
                </div>

                <div className="pt-6 mt-6 border-t border-slate-100 flex items-center justify-between">
                  <div>
                    <span className="font-sans text-xl sm:text-2xl font-bold text-slate-950">185 ₴</span>
                    <span className="text-[10px] font-sans text-slate-500 block mt-0.5">за пачку 500 аркушів</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleQuickAdd("Папір офісний А4")}
                    className={`font-sans text-[11px] font-bold uppercase tracking-wider px-4 py-2.5 rounded-xs transition-all duration-300 cursor-pointer inline-flex items-center gap-1.5 border ${
                      addedItem === "Папір офісний А4"
                        ? "bg-slate-950 text-white border-slate-950"
                        : "bg-white text-slate-950 border-slate-950 hover:bg-slate-950 hover:text-white"
                    }`}
                  >
                    <span>{addedItem === "Папір офісний А4" ? "✓ Додано" : "+ До кошика"}</span>
                  </button>
                </div>
              </div>
            </ScrollFadeIn>

            {/* Товар 2 */}
            <ScrollFadeIn delay={80}>
              <div className="border border-slate-200 bg-white p-7 sm:p-8 flex flex-col justify-between hover:border-slate-950 hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 rounded-xs group h-full">
                <div>
                  <h3 className="font-serif text-2xl sm:text-[26px] text-slate-950 font-normal leading-snug group-hover:text-edelvin-blue transition-colors">
                    Книга обліку нотаріальних дій та журналів
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 font-normal mt-3 leading-relaxed">
                    200 аркушів за державним стандартом діловодства. Прошнурований блок, поаркушна нумерація, зносостійкий корінець.
                  </p>
                </div>

                <div className="pt-6 mt-6 border-t border-slate-100 flex items-center justify-between">
                  <div>
                    <span className="font-sans text-xl sm:text-2xl font-bold text-slate-950">320 ₴</span>
                    <span className="text-[10px] font-sans text-slate-500 block mt-0.5">за 1 журнал 7БЦ</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleQuickAdd("Книга обліку нотаріальних дій")}
                    className={`font-sans text-[11px] font-bold uppercase tracking-wider px-4 py-2.5 rounded-xs transition-all duration-300 cursor-pointer inline-flex items-center gap-1.5 border ${
                      addedItem === "Книга обліку нотаріальних дій"
                        ? "bg-slate-950 text-white border-slate-950"
                        : "bg-white text-slate-950 border-slate-950 hover:bg-slate-950 hover:text-white"
                    }`}
                  >
                    <span>{addedItem === "Книга обліку нотаріальних дій" ? "✓ Додано" : "+ До кошика"}</span>
                  </button>
                </div>
              </div>
            </ScrollFadeIn>

            {/* Товар 3 */}
            <ScrollFadeIn delay={160}>
              <div className="border border-slate-200 bg-white p-7 sm:p-8 flex flex-col justify-between hover:border-slate-950 hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 rounded-xs group h-full">
                <div>
                  <h3 className="font-serif text-2xl sm:text-[26px] text-slate-950 font-normal leading-snug group-hover:text-edelvin-blue transition-colors">
                    Листи для нотаток кубарики білі
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 font-normal mt-3 leading-relaxed">
                    Білий офсетний папір 80 г/м². Акуратний куб 900 аркушів для щоденних офісних записів і нарад.
                  </p>
                </div>

                <div className="pt-6 mt-6 border-t border-slate-100 flex items-center justify-between">
                  <div>
                    <span className="font-sans text-xl sm:text-2xl font-bold text-slate-950">95 ₴</span>
                    <span className="text-[10px] font-sans text-slate-500 block mt-0.5">за блок 900 аркушів</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleQuickAdd("Кубарики 90×90 мм")}
                    className={`font-sans text-[11px] font-bold uppercase tracking-wider px-4 py-2.5 rounded-xs transition-all duration-300 cursor-pointer inline-flex items-center gap-1.5 border ${
                      addedItem === "Кубарики 90×90 мм"
                        ? "bg-slate-950 text-white border-slate-950"
                        : "bg-white text-slate-950 border-slate-950 hover:bg-slate-950 hover:text-white"
                    }`}
                  >
                    <span>{addedItem === "Кубарики 90×90 мм" ? "✓ Додано" : "+ До кошика"}</span>
                  </button>
                </div>
              </div>
            </ScrollFadeIn>

            {/* Товар 4 */}
            <ScrollFadeIn delay={240}>
              <div className="border border-slate-200 bg-white p-7 sm:p-8 flex flex-col justify-between hover:border-slate-950 hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 rounded-xs group h-full">
                <div>
                  <h3 className="font-serif text-2xl sm:text-[26px] text-slate-950 font-normal leading-snug group-hover:text-edelvin-blue transition-colors">
                    Папка ділова з вклеєною кишенею під А4
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 font-normal mt-3 leading-relaxed">
                    Місткий вклеєний клапан із прорізами під візитку. Цупкий картон для презентацій та документообігу.
                  </p>
                </div>

                <div className="pt-6 mt-6 border-t border-slate-100 flex items-center justify-between">
                  <div>
                    <span className="font-sans text-xl sm:text-2xl font-bold text-slate-950">24 ₴</span>
                    <span className="text-[10px] font-sans text-slate-500 block mt-0.5">за 1 одиницю</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleQuickAdd("Папка ділова А4")}
                    className={`font-sans text-[11px] font-bold uppercase tracking-wider px-4 py-2.5 rounded-xs transition-all duration-300 cursor-pointer inline-flex items-center gap-1.5 border ${
                      addedItem === "Папка ділова А4"
                        ? "bg-slate-950 text-white border-slate-950"
                        : "bg-white text-slate-950 border-slate-950 hover:bg-slate-950 hover:text-white"
                    }`}
                  >
                    <span>{addedItem === "Папка ділова А4" ? "✓ Додано" : "+ До кошика"}</span>
                  </button>
                </div>
              </div>
            </ScrollFadeIn>

          </div>

        </div>
      </section>

            {/* 5. ПРЯМИЙ ЗВ'ЯЗОК З ВИРОБНИЦТВОМ (ТЕЛЕФОНИ В КОЛОНКУ)      */}
            <section id="direct-contact" className="py-20 lg:py-28 bg-white scroll-mt-24 relative">
        <div id="quote-request" className="absolute -top-24 left-0 pointer-events-none" />
        <div className="max-w-[1520px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-10">
          
          <ScrollFadeIn>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-stretch">
              
              {/* Ліва колонка: Інформація та прямі контакти на всю висоту форми */}
              <div className="lg:col-span-4 flex flex-col justify-between py-2">
                <div>
                  <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-normal text-slate-950 tracking-tight leading-[1.08]">
                    {t.contactSection.title}
                  </h2>
                  <p className="text-base sm:text-lg text-slate-600 font-normal mt-4 leading-relaxed">
                    {t.contactSection.subtitle}
                  </p>
                </div>

                {/* Прямі контакти: Номери в колонку */}
                <div className="pt-8 border-t border-slate-200 space-y-6 mt-8 lg:mt-auto">
                  <div>
                    <span className="text-[11px] font-sans text-slate-400 uppercase tracking-widest block mb-3 font-bold">
                      {t.contactSection.phoneDept}
                    </span>
                    <div className="flex flex-col gap-3 font-sans">
                      <a
                        href="tel:+380432550333"
                        className="text-xl sm:text-2xl font-bold text-slate-950 hover:text-edelvin-blue transition-colors flex items-center gap-2.5 w-fit"
                      >
                        <Phone className="w-4 h-4 text-edelvin-blue shrink-0" />
                        <span>+38 (0432) 550-333</span>
                      </a>
                      <a
                        href="tel:+380775153020"
                        className="text-xl sm:text-2xl font-bold text-slate-950 hover:text-edelvin-blue transition-colors flex items-center gap-2.5 w-fit"
                      >
                        <Phone className="w-4 h-4 text-edelvin-blue shrink-0" />
                        <span>+380 (77) 515 30 20</span>
                      </a>
                      <a
                        href="tel:+380961793454"
                        className="text-xl sm:text-2xl font-bold text-slate-950 hover:text-edelvin-blue transition-colors flex items-center gap-2.5 w-fit"
                      >
                        <Phone className="w-4 h-4 text-edelvin-blue shrink-0" />
                        <span>+380 (96) 179 34 54</span>
                      </a>
                    </div>
                  </div>

                  <div className="pt-6 border-t border-slate-200">
                    <span className="text-[11px] font-sans text-slate-400 uppercase tracking-widest block mb-2 font-bold">
                      {t.contactSection.emailDept}
                    </span>
                    <div className="space-y-1.5 font-sans text-base text-slate-900">
                      <a href="mailto:print@edelvin.com.ua" className="hover:text-edelvin-blue block transition-colors">
                        print@edelvin.com.ua
                      </a>
                      <a href="mailto:etiqueta.es@gmail.com" className="hover:text-edelvin-blue block transition-colors">
                        etiqueta.es@gmail.com
                      </a>
                    </div>
                  </div>

                  <div className="pt-6 border-t border-slate-200">
                    <span className="text-[11px] font-sans text-slate-400 uppercase tracking-widest block mb-2 font-bold">
                      {t.contactSection.addressDept}
                    </span>
                    <span className="font-sans text-sm text-slate-700 block">
                      {t.contactSection.addressVal}
                    </span>
                  </div>
                </div>
              </div>

              {/* Права колонка: Форма */}
              <div className="lg:col-span-8 bg-white border border-slate-200 shadow-xl p-8 sm:p-12 rounded-xs flex flex-col justify-between">
                {formSubmitted ? (
                  <div className="py-16 text-center space-y-4">
                    <div className="w-14 h-14 rounded-full bg-slate-950 text-white flex items-center justify-center mx-auto">
                      <CheckCircle2 className="w-8 h-8 text-edelvin-blue" />
                    </div>
                    <h3 className="font-serif text-3xl sm:text-4xl font-normal text-slate-950">
                      {t.contactSection.form.successTitle}
                    </h3>
                    <p className="text-sm sm:text-base text-slate-600 max-w-md mx-auto leading-relaxed font-normal">
                      {t.contactSection.form.successText}
                    </p>
                    <button
                      type="button"
                      onClick={() => {
                        setFormSubmitted(false);
                        setFormData({
                          firstName: "",
                          lastName: "",
                          email: "",
                          phone: "",
                          company: "",
                          requestType: "",
                          country: "",
                          message: "",
                          consent: false,
                        });
                      }}
                      className="mt-6 text-xs font-sans uppercase font-bold text-slate-950 hover:text-edelvin-blue border-b-2 border-slate-950 hover:border-edelvin-blue pb-1 cursor-pointer inline-block"
                    >
                      {t.contactSection.form.sendAnother}
                    </button>
                  </div>
                ) : (
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      setFormSubmitted(true);
                    }}
                    className="space-y-6"
                  >
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6">
                      <div>
                        <label className="block text-xs font-semibold text-slate-800 mb-1.5 font-sans">
                          {t.contactSection.form.firstName} *
                        </label>
                        <input
                          type="text"
                          required
                          value={formData.firstName}
                          onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                          placeholder={t.contactSection.form.firstNamePlaceholder}
                          className="w-full border border-slate-200 focus:border-slate-950 focus:ring-1 focus:ring-slate-950 bg-white rounded-xs px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 transition-all font-sans"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-slate-800 mb-1.5 font-sans">
                          {t.contactSection.form.lastName}
                        </label>
                        <input
                          type="text"
                          value={formData.lastName}
                          onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                          placeholder={t.contactSection.form.lastNamePlaceholder}
                          className="w-full border border-slate-200 focus:border-slate-950 focus:ring-1 focus:ring-slate-950 bg-white rounded-xs px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 transition-all font-sans"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6">
                      <div>
                        <label className="block text-xs font-semibold text-slate-800 mb-1.5 font-sans">
                          {t.contactSection.form.email}
                        </label>
                        <input
                          type="email"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          placeholder={t.contactSection.form.emailPlaceholder}
                          className="w-full border border-slate-200 focus:border-slate-950 focus:ring-1 focus:ring-slate-950 bg-white rounded-xs px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 transition-all font-sans"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-slate-800 mb-1.5 font-sans">
                          {t.contactSection.form.phone} *
                        </label>
                        <input
                          type="tel"
                          required
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          placeholder={t.contactSection.form.phonePlaceholder}
                          className="w-full border border-slate-200 focus:border-slate-950 focus:ring-1 focus:ring-slate-950 bg-white rounded-xs px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 transition-all font-sans"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-800 mb-1.5 font-sans">
                        {t.contactSection.form.company}
                      </label>
                      <input
                        type="text"
                        value={formData.company}
                        onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                        placeholder={t.contactSection.form.companyPlaceholder}
                        className="w-full border border-slate-200 focus:border-slate-950 focus:ring-1 focus:ring-slate-950 bg-white rounded-xs px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 transition-all font-sans"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-800 mb-1.5 font-sans">
                        Повідомлення / параметри тиражу
                      </label>
                      <textarea
                        rows={3}
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        placeholder="Опишіть ваш продукт: формат, тираж, матеріал, терміни..."
                        className="w-full border border-slate-200 focus:border-slate-950 focus:ring-1 focus:ring-slate-950 bg-white rounded-xs px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 transition-all font-sans resize-none"
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full bg-slate-950 hover:bg-edelvin-blue text-white font-sans text-xs font-bold uppercase tracking-[0.2em] py-4 rounded-xs transition-all duration-300 shadow-sm hover:shadow-xl hover:-translate-y-0.5 cursor-pointer flex items-center justify-center gap-2"
                    >
                      <span>Надіслати запит на прорахунок</span>
                      <ArrowRight className="w-4 h-4 text-edelvin-blue" />
                    </button>
                  </form>
                )}
              </div>

            </div>
          </ScrollFadeIn>

        </div>
      </section>

    </div>
  );
}
