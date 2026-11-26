"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { CATALOG_CLUSTERS } from "@/data/catalog";
import { useLanguage, LanguageCode } from "@/context/LanguageContext";
import {
  ChevronDown,
  ShoppingBag,
  X,
  Globe,
  Search,
  User,
  Menu,
  ArrowRight,
} from "lucide-react";

interface CatalogDirection {
  id: string;
  code: string;
  title: string;
  shortDesc: string;
  badge: string;
  specs: string;
  image: string;
  items: {
    name: string;
    detail: string;
    minQty: string;
    turnaround: string;
    slug: string;
  }[];
}

const PRODUCTION_DIRECTIONS: CatalogDirection[] = [
  {
    id: "labels",
    code: "01",
    title: "Етикетка, упаковка та наліпки",
    shortDesc: "Рулонний та листовий друк для автоматичних і ручних ліній нанесення",
    badge: "Raflatac • Будь-яка форма висічки",
    specs: "Самоклейні папери, плівки, винний папір верже, захисні УФ-лаки",
    image: "/images/production/roll-label-machine.png",
    items: [
      { name: "Рулонна етикетка", detail: "Для автоматичних аплікаторів, винні та харчові серії", minQty: "500 шт", turnaround: "2–3 дні", slug: "stickers" },
      { name: "Листові наліпки та стікери", detail: "Папір Raflatac, плотерна контурна порізка під форму", minQty: "100 шт", turnaround: "24 год", slug: "stickers" },
      { name: "Картонні коробки та упаковка", detail: "Хром-ерзац, крафт-картон, висічка, склеювання на 1–3 точки", minQty: "200 шт", turnaround: "3–4 дні", slug: "boxes" },
      { name: "Етикетки на пляшки та банки", detail: "Вологостійкі клеї, стійкість до конденсату та тертя", minQty: "500 шт", turnaround: "2 дні", slug: "stickers" },
      { name: "Фігурні бирки та цінники", detail: "Цупкий картон 350 г/м², свердління отвору під шнурок", minQty: "100 шт", turnaround: "24 год", slug: "tags" },
      { name: "Каширована упаковка", detail: "Жорсткий мікрогофрокартон + лайнер з повнокольоровим друком", minQty: "100 шт", turnaround: "4–5 днів", slug: "boxes" },
    ],
  },
  {
    id: "books",
    code: "02",
    title: "Багатосторінкові видання та палітурка",
    shortDesc: "Класична тверда палітурка 7БЦ, м'яка обкладинка та ниткошвейка",
    badge: "7БЦ • PUR-клей • Ниткошвейка НШС",
    specs: "Палітурний картон 1.5–3.0 мм, лясе, каптал, золоте тиснення фольгою",
    image: "/images/branding/wine-label-textured.png",
    items: [
      { name: "Книги у твердій палітурці 7БЦ", detail: "Ниткошвейний блок, прямий або круглений корінець, лясе", minQty: "50 шт", turnaround: "5–7 днів", slug: "books-hardcover" },
      { name: "Книги у м'якій обкладинці PUR", detail: "Високоміцний поліуретановий клей, розгортання на 180°", minQty: "50 шт", turnaround: "3–4 дні", slug: "books-soft" },
      { name: "Презентаційні каталоги та звіти", detail: "Крейдовані папери 150–250 г/м², Soft-Touch ламінація", minQty: "50 шт", turnaround: "2–3 дні", slug: "catalogs" },
      { name: "Журнали та брошури на скобу", detail: "Скріплення на 2–4 скоби, чітке фальцювання зошитів", minQty: "100 шт", turnaround: "24–48 год", slug: "brochures" },
      { name: "Нотаріальні реєстри та книги обліку", detail: "Прошиті блоки з поаркушною нумерацією за держстандартом", minQty: "1 шт", turnaround: "1–2 дні", slug: "notary-books" },
      { name: "Блокноти на металеву пружину", detail: "Тверда або пластикова обкладинка, перфорація аркушів", minQty: "50 шт", turnaround: "2–3 дні", slug: "notebooks" },
    ],
  },
  {
    id: "promo",
    code: "03",
    title: "Маркетинг та промо-поліграфія",
    shortDesc: "Комерційна поліграфія для продажів, виставок та презентацій",
    badge: "Цифра Konica Minolta • Лазер SRA3",
    specs: "Формати від 90×50 мм до А1, точна передача фірмових Pantone кольорів",
    image: "/images/branding/craft-beverage-bottles.png",
    items: [
      { name: "Візитівки представницькі", detail: "Картон 350 г/м², Soft-Touch, вибірковий УФ-лак, тиснення Kurz", minQty: "100 шт", turnaround: "24 год", slug: "business-cards" },
      { name: "Листівки та рекламні флаєри", detail: "Формати А6, А5, А4, Євро (210×100 мм), офсетний тираж", minQty: "100 шт", turnaround: "24 год", slug: "flyers" },
      { name: "Буклети та ліфлети", detail: "Фальцювання на 1–2 згини (гармошка, намотка), бігування", minQty: "50 шт", turnaround: "1–2 дні", slug: "booklets" },
      { name: "Ділові папки з кишенею під А4", detail: "Цупкий картон 300 г/м², вклеєний або вирубний клапан під візитку", minQty: "50 шт", turnaround: "2–3 дні", slug: "folders" },
      { name: "Плакати, афіші та постери", detail: "Формати А3, А2, А1, повноколірний офсетний друк", minQty: "10 шт", turnaround: "24 год", slug: "posters" },
      { name: "Квитки з нумерацією та перфорацією", detail: "Відривний корінець, змінний штрихкод або QR-код", minQty: "100 шт", turnaround: "24 год", slug: "tickets" },
    ],
  },
  {
    id: "b2b",
    code: "04",
    title: "Галузеві B2B-рішення під ринки",
    shortDesc: "Спеціалізована номенклатура: від сигнального зразка до серій SKU",
    badge: "Серійність десятків SKU • ПДВ 20%",
    specs: "Харчопром, Напої, HoReCa, Фарма, Косметика, Агро — договори та казначейство",
    image: "/images/branding/carton-dieline-packaging.png",
    items: [
      { name: "Харчова та винна поліграфія", detail: "Серійні етикетки для лінійок продукції, термочеки", minQty: "500 шт", turnaround: "2–3 дні", slug: "stickers" },
      { name: "Ресторанні меню HoReCa", detail: "Вологостійка матова ламінація, пружинне кріплення, сети", minQty: "10 шт", turnaround: "24–48 год", slug: "menu" },
      { name: "Фармацевтичні інструкції та пачки", detail: "Друк на тонкому папері 45–60 г/м², точна дрібна висічка", minQty: "1000 шт", turnaround: "3–4 дні", slug: "boxes" },
      { name: "Брендовані елементи E-commerce", detail: "Стікери безпеки, пакувальний скотч, вкладки в замовлення", minQty: "200 шт", turnaround: "24 год", slug: "stickers" },
      { name: "Фірмові бланки та документообіг", detail: "Офсетний папір 80–100 г/м² під офісні лазерні принтери", minQty: "200 шт", turnaround: "24 год", slug: "letterheads" },
      { name: "Кубарики та блоки для запису", detail: "Розмір 90×90 мм, 900 аркушів у блоці, проклейка краю", minQty: "10 шт", turnaround: "24–48 год", slug: "cubes" },
    ],
  },
  {
    id: "large",
    code: "05",
    title: "Широкоформатний друк та вивіски",
    shortDesc: "Рулонний інтер'єрний та екстер'єрний друк стійкими фарбами",
    badge: "Ширина до 3.2 м • Плотерна висічка",
    specs: "Литий банер 440–510 г/м², художній холст, плівка Oracal, пластик ПВХ",
    image: "/images/branding/alfa-omega-showcase.png",
    items: [
      { name: "Банери литі та ламіновані", detail: "Встановлення люверсів по периметру, посилення краю", minQty: "1 шт", turnaround: "24 год", slug: "banners" },
      { name: "Картини та фото на холсті", detail: "Натуральне полотно, галерейна натяжка на дерев'яний підрамник", minQty: "1 шт", turnaround: "24–48 год", slug: "canvas" },
      { name: "Фасадні та офісні таблички", detail: "Основа ПВХ 3–5 мм або композит, накатка плівки", minQty: "1 шт", turnaround: "24–48 год", slug: "signs" },
      { name: "Мобільні стенди Roll-up та Павук", detail: "Алюмінієва касета, банерне полотно, чохол для транспортування", minQty: "1 шт", turnaround: "24 год", slug: "roll-up" },
      { name: "Перфорована плівка One Way Vision", detail: "Для скління вітрин та авто: прозорість зсередини", minQty: "1 шт", turnaround: "24–48 год", slug: "stickers" },
      { name: "Постери для сітілайтів та лайтбоксів", detail: "Друк на папері Backlit з рівномірним світлорозсіюванням", minQty: "1 шт", turnaround: "24 год", slug: "posters" },
    ],
  },
  {
    id: "warehouse",
    code: "06",
    title: "Складське забезпечення та папір",
    shortDesc: "Пряме відвантаження зі складу друкарні у Вінниці: папір, бланки, архів",
    badge: "Вінниця, 600-річчя, 17 • Самовивіз",
    specs: "Офісний папір А4/А3, бланки МОН, папки-реєстратори, госптовари",
    image: "/images/branding/packaging-mockup-line.png",
    items: [
      { name: "Папір офісний А4 та А3", detail: "Клас C+, 80 г/м², білизна CIE 146%, пачки по 500 аркушів. Опт", minQty: "1 пачка", turnaround: "В наявності", slug: "paper" },
      { name: "Шкільні журнали 1–4 та 5–11 класів", detail: "Тверда зносостійка палітурка, офіційний зразок МОН України", minQty: "1 шт", turnaround: "В наявності", slug: "journals" },
      { name: "Папки-реєстратори А4 75 мм", detail: "Важільний арочний механізм, металева окантовка", minQty: "1 шт", turnaround: "В наявності", slug: "folders" },
      { name: "Бухгалтерські книги та бланки", detail: "Товарно-транспортні накладні, авансові звіти, касові ордери", minQty: "10 шт", turnaround: "В наявності", slug: "blanks" },
      { name: "Паперові рушники та серветки", detail: "Рулонні 2-шарові для офісів та закладів HoReCa", minQty: "1 уп", turnaround: "В наявності", slug: "household" },
      { name: "Sample Box — зразки матеріалів", detail: "Зразки паперів, картонів, плівок та видів ламінації друкарні", minQty: "1 шт", turnaround: "В наявності", slug: "sample-box" },
    ],
  },
];

export default function Header() {
  const {
    lang,
    setLang,
    country,
    setCountry,
    t,
    isRegionModalOpen,
    setIsRegionModalOpen,
    isCatalogOpen,
    setIsCatalogOpen,
  } = useLanguage();

  const [activeClusterId, setActiveClusterId] = useState<string>("promo");
  const [catalogViewMode, setCatalogViewMode] = useState<"lookbook" | "grid">("lookbook");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showTopBar, setShowTopBar] = useState(true);
  const [isVisible, setIsVisible] = useState(true);

  const pathname = usePathname();

  // Запобігаємо блокуванню скролу та стрибкам смуги прокручування для абсолютно плавного скролу
  useEffect(() => {
    document.body.style.overflow = "";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  // Бездоганна, чутлива анімація приховування та появи хедера при скролі
  useEffect(() => {
    let lastScrollY = typeof window !== "undefined" ? window.pageYOffset || document.documentElement.scrollTop || 0 : 0;
    let lastDirection: "up" | "down" | null = null;

    const onScroll = () => {
      // Якщо відкрита шторка або модалка — нічого не ховаємо і не перемикаємо
      if (isCatalogOpen || isRegionModalOpen || document.body.style.overflow === "hidden") return;

      const currentScrollY =
        window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop ||
        0;

      // У верхній зоні сторінки (перші 60px) хедер завжди повністю відкритий
      if (currentScrollY <= 60) {
        setIsVisible(true);
        lastScrollY = currentScrollY;
        lastDirection = null;
        return;
      }

      const diff = currentScrollY - lastScrollY;
      // Ігноруємо мікро-коливання < 2px для уникнення хибних перемикань напрямку
      if (Math.abs(diff) < 2) return;

      const currentDirection = diff > 0 ? "down" : "up";

      // При зміні напрямку скролу оновлюємо опорну точку
      if (currentDirection !== lastDirection) {
        lastScrollY = currentScrollY;
        lastDirection = currentDirection;
        return;
      }

      // Накопичений скрол униз понад 12px — плавно ховаємо хедер (лише коли шторка не відкрита)
      if (diff > 12) {
        setIsVisible(false);
        lastScrollY = currentScrollY;
      }
      // Накопичений скрол угору понад 8px — плавно показуємо хедер
      else if (diff < -8) {
        setIsVisible(true);
        lastScrollY = currentScrollY;
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [isRegionModalOpen, isCatalogOpen]);

  // Коли каталог відкрито — гарантуємо, що хедер завжди видимий на екрані
  useEffect(() => {
    if (isCatalogOpen) {
      setIsVisible(true);
    }
  }, [isCatalogOpen]);

  // Закриття каталогу та списків при зміні сторінки або натисканні Escape
  useEffect(() => {
    setIsCatalogOpen(false);
    setMobileMenuOpen(false);
    setIsRegionModalOpen(false);
    setIsVisible(true);
  }, [pathname, setIsCatalogOpen, setIsRegionModalOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsCatalogOpen(false);
        setIsRegionModalOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [setIsRegionModalOpen, setIsCatalogOpen]);

  const navLinks = [
    { label: t.header.products, href: "/products" },
    { label: t.header.capabilities, href: "/capabilities" },
    { label: t.header.about, href: "/about" },
  ];

  return (
    <>
            {/* Fixed Navigation Header */}
            <div
        style={{
          transform: (isVisible || isCatalogOpen) ? "translateY(0)" : "translateY(-100%)",
          transition: "transform 0.38s cubic-bezier(0.16, 1, 0.3, 1)",
        }}
        className="fixed top-0 left-0 right-0 z-50 w-full will-change-transform"
      >
        {/* Верхній чорний рядок оголошень (dismissible) з тонким золотим акцентом */}
        {showTopBar && (
          <div className="bg-[#111111] text-white text-[11px] sm:text-xs py-2 px-4 transition-all border-b border-gold-400/20">
            <div className="w-full max-w-[1680px] mx-auto px-2 sm:px-6 flex items-center justify-between">
              <div className="flex-1 text-center font-light tracking-wide text-slate-300 truncate">
                <span className="text-gold-300 font-medium">«Альфа і Омега»</span>
                <span className="mx-2 text-slate-500">•</span>
                <span>{t.header.banner}</span>
                <span className="hidden md:inline text-slate-600 mx-2">|</span>
                <a
                  href="tel:+380432550333"
                  className="hidden md:inline text-gold-200 hover:text-gold-300 font-medium transition-colors"
                >
                  +38 (0432) 550-333
                </a>
              </div>
              <button
                type="button"
                onClick={() => setShowTopBar(false)}
                className="text-slate-400 hover:text-white p-0.5 ml-2 transition-colors cursor-pointer"
                aria-label="Закрити рядок"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}

        {/* Головна висока панель хедера */}
        <header className="bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-[0_4px_30px_rgba(0,0,0,0.02)] transition-all">
          <div className="w-full max-w-[1680px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-10 h-20 sm:h-24 md:h-26 flex items-center justify-between gap-4">
            
            {/* ЛІВА ЧАСТИНА: ЛОГОТИП ПО ВСІЙ ВИСОТІ + МЕНЮ */}
            <div className="flex items-center gap-4 lg:gap-7 shrink-0">
              {/* Мобільна кнопка меню */}
              <button
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden p-2 text-slate-900 hover:text-edelvin-blue cursor-pointer"
                aria-label="Меню"
              >
                <Menu className="w-6 h-6" />
              </button>

              {/* Суто графічний логотип по всій висоті хедера */}
              <Link
                href="/"
                className="relative h-12 sm:h-14 md:h-16 aspect-square block shrink-0 transition-transform duration-200 hover:scale-105"
                title="ТОВ «Альфа і Омега»"
              >
                <Image
                  src="/images/ao-logo.png"
                  alt="ТОВ «Альфа і Омега»"
                  fill
                  className="object-contain"
                  priority
                />
              </Link>

              {/* Навігаційні посилання антиквою */}
              <nav className="hidden lg:flex items-center gap-4 xl:gap-6">
                {/* Кнопка "Каталог" з повною інтерактивністю та плавною анімацією розкриття */}
                <div className="relative">
                  <button
                    type="button"
                    onClick={() => {
                      setIsVisible(true);
                      setIsCatalogOpen(!isCatalogOpen);
                    }}
                    className={`font-serif text-lg lg:text-xl xl:text-2xl font-normal transition-all flex items-center gap-1 cursor-pointer py-1 group select-none ${
                      isCatalogOpen || pathname === "/catalog" || pathname.startsWith("/catalog")
                        ? "text-edelvin-blue font-medium"
                        : "text-slate-950 hover:text-edelvin-blue"
                    }`}
                    aria-expanded={isCatalogOpen}
                    aria-label="Відкрити меню каталогу"
                  >
                    <span>{t.header.catalog}</span>
                    <ChevronDown
                      className={`w-3.5 h-3.5 text-slate-500 group-hover:text-edelvin-blue transition-transform duration-300 ease-out ${
                        isCatalogOpen ? "rotate-180 text-edelvin-blue" : ""
                      }`}
                    />
                  </button>
                </div>

                {navLinks.map((link) => {
                  const isActive = !isCatalogOpen && pathname === link.href;
                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      className={`font-serif text-lg lg:text-xl xl:text-2xl font-normal transition-colors ${
                        isActive
                          ? "text-edelvin-blue font-medium"
                          : "text-slate-950 hover:text-edelvin-blue"
                      }`}
                    >
                      {link.label}
                    </Link>
                  );
                })}
              </nav>
            </div>

            {/* ЦЕНТРАЛЬНА ЧАСТИНА: АЛЬФА І ОМЕГА В ОДНОМУ ШРИФТІ ТА КОЛЬОРІ */}
            <div className="hidden md:flex items-center justify-center text-center px-2 lg:px-4 shrink min-w-0">
              <Link href="/" className="group inline-flex items-center gap-2">
                <span className="font-serif text-lg sm:text-xl xl:text-2xl font-semibold tracking-[0.16em] sm:tracking-[0.2em] text-slate-950 uppercase group-hover:text-gold-700 transition-colors whitespace-nowrap">
                  АЛЬФА І ОМЕГА
                </span>
                <span className="hidden xl:inline-block w-1.5 h-1.5 rounded-full bg-gold-400"></span>
              </Link>
            </div>

            {/* ПРАВА ЧАСТИНА: МОВА ТА РЕГІОН, ПОШУК, КЛІЄНТ, КОШИК */}
            <div className="flex items-center gap-1.5 sm:gap-2 shrink-0 ml-auto md:ml-0 pr-1 sm:pr-2">
              {/* Перемикач мови та регіону доставки: відкриває вікно Welcome to Edelvin */}
              <button
                type="button"
                onClick={() => setIsRegionModalOpen(true)}
                className="text-[11px] sm:text-xs font-sans font-semibold tracking-wider text-slate-800 hover:text-slate-950 flex items-center gap-1 transition-colors uppercase py-1 px-1.5 sm:px-2 rounded-xs hover:bg-slate-100 cursor-pointer"
                title="Оберіть мову та регіон доставки / Select Language & Region"
                aria-label="Вибір мови та регіону доставки"
              >
                <span>{lang} - {country.length > 8 ? country.slice(0, 7) + "…" : country}</span>
                <ChevronDown className="w-2.5 h-2.5 text-slate-500" />
              </button>

              {/* Пошук */}
              <Link
                href="/catalog"
                className="text-slate-800 hover:text-slate-950 transition-all p-1 hover:scale-105"
                title="Пошук у каталозі"
              >
                <Search className="w-3.5 h-3.5" />
              </Link>

              {/* Запит на прорахунок / Консультація */}
              <Link
                href="/#direct-contact"
                className="text-slate-800 hover:text-slate-950 transition-all p-1 hover:scale-105"
                title={t.header.calc}
              >
                <User className="w-3.5 h-3.5" />
              </Link>

              {/* Кошик */}
              <Link
                href="/cart"
                className="relative text-slate-800 hover:text-slate-950 transition-all p-1 hover:scale-105"
                title={t.header.cart}
              >
                <ShoppingBag className="w-3.5 h-3.5" />
                <span className="absolute -top-0.5 -right-0.5 w-3 h-3 rounded-full bg-slate-950 text-white flex items-center justify-center text-[7px] font-bold">
                  0
                </span>
              </Link>
            </div>

          </div>

          {/* Мобільне розкривне меню */}
          {mobileMenuOpen && (
            <div className="lg:hidden border-t border-slate-200 bg-white p-6 space-y-4">
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  setIsVisible(true);
                  setIsCatalogOpen(true);
                }}
                className="block text-left w-full font-serif text-2xl text-slate-950 hover:text-edelvin-blue transition-colors cursor-pointer"
              >
                {t.header.catalog} →
              </button>
              <Link
                href="/products"
                onClick={() => setMobileMenuOpen(false)}
                className="block font-serif text-2xl text-slate-950 hover:text-edelvin-blue transition-colors"
              >
                {t.header.products}
              </Link>
              <Link
                href="/capabilities"
                onClick={() => setMobileMenuOpen(false)}
                className="block font-serif text-2xl text-slate-950 hover:text-edelvin-blue transition-colors"
              >
                {t.header.capabilities}
              </Link>
              <Link
                href="/about"
                onClick={() => setMobileMenuOpen(false)}
                className="block font-serif text-2xl text-slate-950 hover:text-edelvin-blue transition-colors"
              >
                {t.header.about}
              </Link>
              <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    setIsRegionModalOpen(true);
                  }}
                  className="text-xs font-sans font-semibold uppercase text-edelvin-blue cursor-pointer"
                >
                  Мова: {lang} ({country})
                </button>
              </div>
            </div>
          )}

          {/* ШТОРКА КАТАЛОГУ, ЩО ПЛАВНО ВИЇЖДЖАЄ ВНИЗ З-ПІД ХЕДЕРА */}
          <div
            style={{
              maxHeight: isCatalogOpen ? "calc(100vh - 120px)" : "0px",
              opacity: isCatalogOpen ? 1 : 0,
              transform: isCatalogOpen ? "translateY(0)" : "translateY(-10px)",
              transition:
                "max-height 0.4s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.3s ease-out, transform 0.35s cubic-bezier(0.16, 1, 0.3, 1)",
            }}
            className={`overflow-y-auto no-scrollbar border-t border-slate-200 bg-white/99 backdrop-blur-2xl shadow-[0_25px_60px_-15px_rgba(0,0,0,0.2)] ${
              isCatalogOpen ? "pointer-events-auto" : "pointer-events-none"
            }`}
          >
            <div className="max-w-[1680px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-10 py-5">
              
              {/* ВЕРХНІЙ РЯДОК: ЗАГОЛОВОК КАТАЛОГУ ТА КНОПКА ЗАКРИТИ */}
              <div className="flex items-center justify-between pb-3.5 border-b border-slate-200">
                <div className="flex items-center gap-2.5 sm:gap-3">
                  <h3 className="font-serif text-lg sm:text-xl text-slate-950 font-normal tracking-tight">
                    Повний каталог продукції та послуг «Альфа і Омега»
                  </h3>
                </div>

                <button
                  type="button"
                  onClick={() => setIsCatalogOpen(false)}
                  className="group flex items-center gap-1.5 text-xs font-sans font-semibold text-slate-600 hover:text-slate-950 transition-colors cursor-pointer py-1 px-2 rounded-xs hover:bg-slate-100"
                  aria-label="Закрити меню каталогу"
                >
                  <X className="w-3.5 h-3.5 group-hover:rotate-90 transition-transform duration-300" />
                  <span>Закрити</span>
                </button>
              </div>

              {/* 6 КОЛОНОК ВИРОБНИЧИХ НАПРЯМІВ ПЛІЧ-О-ПЛІЧ (ШРИФТ SANS, ЧИСТИЙ ТА СУЧАСНИЙ) */}
              <div className="py-4 grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-5 xl:gap-6">
                
                {/* 1. МАРКЕТИНГ ТА ПРОМО-ПОЛІГРАФІЯ */}
                <div className="space-y-2.5">
                  <div className="pb-1.5 border-b border-slate-100">
                    <h4 className="font-sans text-xs sm:text-[12.5px] font-bold uppercase tracking-[0.14em] text-slate-900 leading-snug">
                      МАРКЕТИНГ ТА ПРОМО-ПОЛІГРАФІЯ
                    </h4>
                  </div>
                  <ul className="space-y-1 font-sans">
                    <li>
                      <Link href="/catalog/business-cards" onClick={() => setIsCatalogOpen(false)} className="text-[13px] sm:text-[13.5px] text-slate-700 hover:text-edelvin-blue hover:font-medium transition-colors block py-0.5 leading-snug">
                        Візитівки
                      </Link>
                    </li>
                    <li>
                      <Link href="/catalog/flyers" onClick={() => setIsCatalogOpen(false)} className="text-[13px] sm:text-[13.5px] text-slate-700 hover:text-edelvin-blue hover:font-medium transition-colors block py-0.5 leading-snug">
                        Листівки та флаєри
                      </Link>
                    </li>
                    <li>
                      <Link href="/catalog/booklets" onClick={() => setIsCatalogOpen(false)} className="text-[13px] sm:text-[13.5px] text-slate-700 hover:text-edelvin-blue hover:font-medium transition-colors block py-0.5 leading-snug">
                        Буклети та карти
                      </Link>
                    </li>
                    <li>
                      <Link href="/catalog/posters" onClick={() => setIsCatalogOpen(false)} className="text-[13px] sm:text-[13.5px] text-slate-700 hover:text-edelvin-blue hover:font-medium transition-colors block py-0.5 leading-snug">
                        Плакати, афіші, постери
                      </Link>
                    </li>
                    <li>
                      <Link href="/catalog/tickets" onClick={() => setIsCatalogOpen(false)} className="text-[13px] sm:text-[13.5px] text-slate-700 hover:text-edelvin-blue hover:font-medium transition-colors block py-0.5 leading-snug">
                        Квитки та купони
                      </Link>
                    </li>
                    <li>
                      <Link href="/catalog/scratch-cards" onClick={() => setIsCatalogOpen(false)} className="text-[13px] sm:text-[13.5px] text-slate-700 hover:text-edelvin-blue hover:font-medium transition-colors block py-0.5 leading-snug">
                        Скретч-карти та лотереї
                      </Link>
                    </li>
                  </ul>
                </div>

                {/* 2. КОРПОРАТИВНА ПОЛІГРАФІЯ ТА ДОКУМЕНТООБІГ */}
                <div className="space-y-2.5">
                  <div className="pb-1.5 border-b border-slate-100">
                    <h4 className="font-sans text-xs sm:text-[12.5px] font-bold uppercase tracking-[0.14em] text-slate-900 leading-snug">
                      КОРПОРАТИВНА ПОЛІГРАФІЯ ТА ДОКУМЕНТООБІГ
                    </h4>
                  </div>
                  <ul className="space-y-1 font-sans">
                    <li>
                      <Link href="/catalog/letterheads" onClick={() => setIsCatalogOpen(false)} className="text-[13px] sm:text-[13.5px] text-slate-700 hover:text-edelvin-blue hover:font-medium transition-colors block py-0.5 leading-snug">
                        Фірмові бланки та оголошення
                      </Link>
                    </li>
                    <li>
                      <Link href="/catalog/notebooks" onClick={() => setIsCatalogOpen(false)} className="text-[13px] sm:text-[13.5px] text-slate-700 hover:text-edelvin-blue hover:font-medium transition-colors block py-0.5 leading-snug">
                        Блокноти з фірмовою символікою
                      </Link>
                    </li>
                    <li>
                      <Link href="/catalog/cubes" onClick={() => setIsCatalogOpen(false)} className="text-[13px] sm:text-[13.5px] text-slate-700 hover:text-edelvin-blue hover:font-medium transition-colors block py-0.5 leading-snug">
                        Листи для запису
                      </Link>
                    </li>
                    <li>
                      <Link href="/catalog/folders" onClick={() => setIsCatalogOpen(false)} className="text-[13px] sm:text-[13.5px] text-slate-700 hover:text-edelvin-blue hover:font-medium transition-colors block py-0.5 leading-snug">
                        Папки з вклеєною кишенею
                      </Link>
                    </li>
                    <li>
                      <Link href="/catalog/envelopes" onClick={() => setIsCatalogOpen(false)} className="text-[13px] sm:text-[13.5px] text-slate-700 hover:text-edelvin-blue hover:font-medium transition-colors block py-0.5 leading-snug">
                        Конверти з логотипом
                      </Link>
                    </li>
                    <li>
                      <Link href="/catalog/plastic-cards" onClick={() => setIsCatalogOpen(false)} className="text-[13px] sm:text-[13.5px] text-slate-700 hover:text-edelvin-blue hover:font-medium transition-colors block py-0.5 leading-snug">
                        Пластикові карти та бейджі
                      </Link>
                    </li>
                  </ul>
                </div>

                {/* 3. ЕТИКЕТКИ, НАЛІПКИ ТА УПАКОВКА */}
                <div className="space-y-2.5">
                  <div className="pb-1.5 border-b border-slate-100">
                    <h4 className="font-sans text-xs sm:text-[12.5px] font-bold uppercase tracking-[0.14em] text-slate-900 leading-snug">
                      ЕТИКЕТКИ, НАЛІПКИ ТА УПАКОВКА
                    </h4>
                  </div>
                  <ul className="space-y-1 font-sans">
                    <li>
                      <Link href="/catalog/stickers" onClick={() => setIsCatalogOpen(false)} className="text-[13px] sm:text-[13.5px] text-slate-700 hover:text-edelvin-blue hover:font-medium transition-colors block py-0.5 leading-snug">
                        Наліпки, стікери, етикетки
                      </Link>
                    </li>
                    <li>
                      <Link href="/catalog/roll-labels" onClick={() => setIsCatalogOpen(false)} className="text-[13px] sm:text-[13.5px] text-slate-700 hover:text-edelvin-blue hover:font-medium transition-colors block py-0.5 leading-snug">
                        Рулонна етикетка
                      </Link>
                    </li>
                    <li>
                      <Link href="/catalog/tags" onClick={() => setIsCatalogOpen(false)} className="text-[13px] sm:text-[13.5px] text-slate-700 hover:text-edelvin-blue hover:font-medium transition-colors block py-0.5 leading-snug">
                        Бірки та цінники
                      </Link>
                    </li>
                    <li>
                      <Link href="/catalog/adhesive-films" onClick={() => setIsCatalogOpen(false)} className="text-[13px] sm:text-[13.5px] text-slate-700 hover:text-edelvin-blue hover:font-medium transition-colors block py-0.5 leading-snug">
                        Самоклейка та кольорові плівки
                      </Link>
                    </li>
                    <li>
                      <Link href="/catalog/kashering" onClick={() => setIsCatalogOpen(false)} className="text-[13px] sm:text-[13.5px] text-slate-700 hover:text-edelvin-blue hover:font-medium transition-colors block py-0.5 leading-snug">
                        Каширована продукція
                      </Link>
                    </li>
                    <li>
                      <Link href="/catalog/boxes" onClick={() => setIsCatalogOpen(false)} className="text-[13px] sm:text-[13.5px] text-slate-700 hover:text-edelvin-blue hover:font-medium transition-colors block py-0.5 leading-snug">
                        Коробки та картонна упаковка
                      </Link>
                    </li>
                  </ul>
                </div>

                {/* 4. БАГАТОСТОРІНКОВІ ВИДАННЯ ТА ПАЛІТУРКА */}
                <div className="space-y-2.5">
                  <div className="pb-1.5 border-b border-slate-100">
                    <h4 className="font-sans text-xs sm:text-[12.5px] font-bold uppercase tracking-[0.14em] text-slate-900 leading-snug">
                      БАГАТОСТОРІНКОВІ ВИДАННЯ ТА ПАЛІТУРКА
                    </h4>
                  </div>
                  <ul className="space-y-1 font-sans">
                    <li>
                      <Link href="/catalog/catalogs" onClick={() => setIsCatalogOpen(false)} className="text-[13px] sm:text-[13.5px] text-slate-700 hover:text-edelvin-blue hover:font-medium transition-colors block py-0.5 leading-snug">
                        Брошури та каталоги продукції
                      </Link>
                    </li>
                    <li>
                      <Link href="/catalog/offset-magazines" onClick={() => setIsCatalogOpen(false)} className="text-[13px] sm:text-[13.5px] text-slate-700 hover:text-edelvin-blue hover:font-medium transition-colors block py-0.5 leading-snug">
                        Журнали (офсетний тираж)
                      </Link>
                    </li>
                    <li>
                      <Link href="/catalog/hardcover-books" onClick={() => setIsCatalogOpen(false)} className="text-[13px] sm:text-[13.5px] text-slate-700 hover:text-edelvin-blue hover:font-medium transition-colors block py-0.5 leading-snug">
                        Книги у твердій палітурці
                      </Link>
                    </li>
                    <li>
                      <Link href="/catalog/notary-books" onClick={() => setIsCatalogOpen(false)} className="text-[13px] sm:text-[13.5px] text-slate-700 hover:text-edelvin-blue hover:font-medium transition-colors block py-0.5 leading-snug">
                        Нотаріальні книги та книги обліку
                      </Link>
                    </li>
                    <li>
                      <Link href="/catalog/hardcover-books" onClick={() => setIsCatalogOpen(false)} className="text-[13px] sm:text-[13.5px] text-slate-700 hover:text-edelvin-blue hover:font-medium transition-colors block py-0.5 leading-snug">
                        Підручники та методичні видання
                      </Link>
                    </li>
                    <li>
                      <Link href="/catalog/catalogs" onClick={() => setIsCatalogOpen(false)} className="text-[13px] sm:text-[13.5px] text-slate-700 hover:text-edelvin-blue hover:font-medium transition-colors block py-0.5 leading-snug">
                        Палітурні роботи та тиснення
                      </Link>
                    </li>
                  </ul>
                </div>

                {/* 5. ШИРОКОФОРМАТНИЙ ДРУК ТА ВИВІСКИ */}
                <div className="space-y-2.5">
                  <div className="pb-1.5 border-b border-slate-100">
                    <h4 className="font-sans text-xs sm:text-[12.5px] font-bold uppercase tracking-[0.14em] text-slate-900 leading-snug">
                      ШИРОКОФОРМАТНИЙ ДРУК ТА ВИВІСКИ
                    </h4>
                  </div>
                  <ul className="space-y-1 font-sans">
                    <li>
                      <Link href="/catalog/banners" onClick={() => setIsCatalogOpen(false)} className="text-[13px] sm:text-[13.5px] text-slate-700 hover:text-edelvin-blue hover:font-medium transition-colors block py-0.5 leading-snug">
                        Банери литі та ламіновані
                      </Link>
                    </li>
                    <li>
                      <Link href="/catalog/canvas" onClick={() => setIsCatalogOpen(false)} className="text-[13px] sm:text-[13.5px] text-slate-700 hover:text-edelvin-blue hover:font-medium transition-colors block py-0.5 leading-snug">
                        Картини на полотні (Canvas)
                      </Link>
                    </li>
                    <li>
                      <Link href="/catalog/signage" onClick={() => setIsCatalogOpen(false)} className="text-[13px] sm:text-[13.5px] text-slate-700 hover:text-edelvin-blue hover:font-medium transition-colors block py-0.5 leading-snug">
                        Таблички та фасадні вивіски
                      </Link>
                    </li>
                    <li>
                      <Link href="/catalog/rollups" onClick={() => setIsCatalogOpen(false)} className="text-[13px] sm:text-[13.5px] text-slate-700 hover:text-edelvin-blue hover:font-medium transition-colors block py-0.5 leading-snug">
                        Мобільні стенди
                      </Link>
                    </li>
                    <li>
                      <Link href="/catalog/stickers" onClick={() => setIsCatalogOpen(false)} className="text-[13px] sm:text-[13.5px] text-slate-700 hover:text-edelvin-blue hover:font-medium transition-colors block py-0.5 leading-snug">
                        Плівка One Way Vision та Oracal
                      </Link>
                    </li>
                    <li>
                      <Link href="/catalog/posters" onClick={() => setIsCatalogOpen(false)} className="text-[13px] sm:text-[13.5px] text-slate-700 hover:text-edelvin-blue hover:font-medium transition-colors block py-0.5 leading-snug">
                        Постери Backlit для сітілайтів
                      </Link>
                    </li>
                  </ul>
                </div>

                {/* 6. HORECA, КАЛЕНДАРІ ТА ЗРАЗКИ */}
                <div className="space-y-2.5">
                  <div className="pb-1.5 border-b border-slate-100">
                    <h4 className="font-sans text-xs sm:text-[12.5px] font-bold uppercase tracking-[0.14em] text-slate-900 leading-snug">
                      HORECA, КАЛЕНДАРІ ТА ЗРАЗКИ
                    </h4>
                  </div>
                  <ul className="space-y-1 font-sans">
                    <li>
                      <Link href="/catalog/restaurant-menus" onClick={() => setIsCatalogOpen(false)} className="text-[13px] sm:text-[13.5px] text-slate-700 hover:text-edelvin-blue hover:font-medium transition-colors block py-0.5 leading-snug">
                        Меню для ресторанів та барів
                      </Link>
                    </li>
                    <li>
                      <Link href="/catalog/calendars" onClick={() => setIsCatalogOpen(false)} className="text-[13px] sm:text-[13.5px] text-slate-700 hover:text-edelvin-blue hover:font-medium transition-colors block py-0.5 leading-snug">
                        Календарі та календарні сітки
                      </Link>
                    </li>
                    <li>
                      <Link href="/catalog/magnets" onClick={() => setIsCatalogOpen(false)} className="text-[13px] sm:text-[13.5px] text-slate-700 hover:text-edelvin-blue hover:font-medium transition-colors block py-0.5 leading-snug">
                        Магніти з поліграфічною вставкою
                      </Link>
                    </li>
                    <li>
                      <Link href="/catalog/paper" onClick={() => setIsCatalogOpen(false)} className="text-[13px] sm:text-[13.5px] text-slate-700 hover:text-edelvin-blue hover:font-medium transition-colors block py-0.5 leading-snug">
                        Офісний папір А4 та А3
                      </Link>
                    </li>
                    <li>
                      <Link href="/catalog/journals" onClick={() => setIsCatalogOpen(false)} className="text-[13px] sm:text-[13.5px] text-slate-700 hover:text-edelvin-blue hover:font-medium transition-colors block py-0.5 leading-snug">
                        Класні журнали
                      </Link>
                    </li>
                    <li>
                      <Link href="/catalog/sample-box" onClick={() => setIsCatalogOpen(false)} className="text-[13px] sm:text-[13.5px] text-slate-700 hover:text-edelvin-blue hover:font-medium transition-colors block py-0.5 leading-snug">
                        Зразки матеріалів
                      </Link>
                    </li>
                  </ul>
                </div>

              </div>

              {/* НИЖНІЙ РЯДОК: ВЛАСНЕ ВИРОБНИЦТВО + ПОСИЛАННЯ НА ВЕСЬ КАТАЛОГ */}
              <div className="pt-3.5 border-t border-slate-200 flex flex-col sm:flex-row justify-between items-start sm:items-center text-xs text-slate-600 gap-3 font-sans">
                <div className="flex flex-wrap items-center gap-2 text-slate-500">
                  <span className="text-slate-950 font-bold">Власне виробництво у Вінниці</span>
                  <span>•</span>
                  <span>Власна доставка</span>
                </div>

                <Link
                  href="/catalog"
                  onClick={() => setIsCatalogOpen(false)}
                  className="font-sans text-xs font-bold uppercase tracking-wider text-edelvin-blue hover:text-slate-950 transition-colors inline-flex items-center gap-1.5"
                >
                  <span>ВІДКРИТИ ВЕСЬ КАТАЛОГ</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>

            </div>
          </div>
        </header>
      </div>

      {/* Затемнення та клік поза межами для м'якого закриття шторки */}
      {isCatalogOpen && (
        <div
          className="fixed inset-0 z-40 bg-slate-950/30 backdrop-blur-sm transition-opacity duration-300 animate-fade-in cursor-pointer"
          onClick={() => setIsCatalogOpen(false)}
        />
      )}

      {/* Прозорий спейсер для компенсації фіксованого хедера в потоці документа */}
      <div className="h-22 sm:h-28 w-full shrink-0" aria-hidden="true" />

            {/* 2. БІЧНА ПАНЕЛЬ ВИБОРУ МОВИ ТА РЕГІОНУ (Лише коли відкрито)  */}
            {isRegionModalOpen && (
        <>
          <div
            className="fixed inset-0 z-[100] bg-slate-950/40 backdrop-blur-sm transition-opacity duration-300 animate-fade-in"
            onClick={() => setIsRegionModalOpen(false)}
          />

          <div className="fixed top-0 right-0 bottom-0 w-full sm:w-[440px] md:w-[480px] bg-white z-[101] shadow-2xl p-8 sm:p-12 flex flex-col justify-between transition-transform duration-300 ease-out animate-slide-left">
            <div>
              {/* Кнопка закриття */}
              <div className="flex justify-end mb-6">
                <button
                  type="button"
                  onClick={() => setIsRegionModalOpen(false)}
                  className="p-2 text-slate-900 hover:text-slate-600 transition-colors cursor-pointer"
                  aria-label="Закрити вікно"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Заголовок */}
              <h2 className="font-serif text-3xl sm:text-4xl text-slate-950 font-normal leading-tight">
                Welcome to Edelvin
              </h2>

              <p className="mt-4 text-sm sm:text-base text-slate-600 font-normal leading-relaxed">
                Please select your delivery country and language. We are proud to deliver premium European printing solutions.
              </p>

              {/* Поля форми: Мова сайту перша, Країна доставки друга (без дужок) */}
              <div className="mt-10 space-y-7">
                {/* 1. Мова сайту (ПЕРША) */}
                <div className="space-y-2">
                  <label className="block text-xs font-sans font-semibold uppercase tracking-wider text-slate-700">
                    Language / Мова сайту
                  </label>
                  <div className="relative">
                    <select
                      value={lang}
                      onChange={(e) => setLang(e.target.value as LanguageCode)}
                      className="w-full px-4 pr-10 py-3.5 bg-white border border-slate-950 text-slate-950 text-sm font-medium focus:outline-none focus:ring-1 focus:ring-slate-950 appearance-none cursor-pointer"
                    >
                      <option value="UA">Україна UA</option>
                      <option value="EN">English EN</option>
                      <option value="PL">Polska PL</option>
                      <option value="DE">Deutschland DE</option>
                    </select>
                    <div className="absolute inset-y-0 right-0 pr-3.5 flex items-center pointer-events-none text-slate-700">
                      <ChevronDown className="w-4 h-4" />
                    </div>
                  </div>
                </div>

                {/* 2. Країна доставки (ДРУГА, без дужок) */}
                <div className="space-y-2">
                  <label className="block text-xs font-sans font-semibold uppercase tracking-wider text-slate-700">
                    Shipping to / Країна доставки
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-700">
                      <Globe className="w-4 h-4" />
                    </div>
                    <select
                      value={country}
                      onChange={(e) => setCountry(e.target.value)}
                      className="w-full pl-10 pr-10 py-3.5 bg-white border border-slate-300 hover:border-slate-950 text-slate-950 text-sm font-medium focus:outline-none focus:ring-1 focus:ring-slate-950 appearance-none cursor-pointer"
                    >
                      <option value="Україна">Україна</option>
                      <option value="Польща">Польща</option>
                      <option value="Німеччина">Німеччина</option>
                      <option value="Міжнародна доставка">Міжнародна доставка</option>
                    </select>
                    <div className="absolute inset-y-0 right-0 pr-3.5 flex items-center pointer-events-none text-slate-700">
                      <ChevronDown className="w-4 h-4" />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Кнопка ПРОДОВЖИТИ */}
            <div className="pt-8">
              <button
                type="button"
                onClick={() => setIsRegionModalOpen(false)}
                className="w-full bg-slate-950 text-white font-sans text-xs uppercase tracking-[0.2em] font-bold py-4 hover:bg-slate-800 transition-colors text-center cursor-pointer shadow-md"
              >
                CONTINUE / ЗБЕРЕГТИ
              </button>
            </div>
          </div>
        </>
      )}
    </>
  );
}
