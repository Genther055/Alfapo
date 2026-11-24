"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { CATALOG_CLUSTERS } from "@/data/catalog";
import { Search, ArrowRight, Sparkles, Filter, CheckCircle2, ArrowUpRight } from "lucide-react";
import ProductCarousel, { CarouselItem } from "@/components/ProductCarousel";

// Вибрані серійні етикетки для інтерактивної каруселі
const LABEL_SHOWCASE_ITEMS: CarouselItem[] = [
  {
    id: "label-kvass",
    title: "Етикетка для традиційних напоїв та бродіння",
    subtitle: "Фігурна висічна етикетка для скляної тари",
    category: "Напої та бродіння",
    image: "/images/labels/label-kvass.png",
    description: "Преміальна фігурна самоклейна етикетка для скляних пляшок. Стійка до вологи, конденсату та охолодження в холодильних камерах.",
    badge: "Рулонна лінія",
    link: "/catalog/roll-labels",
  },
  {
    id: "label-mors",
    title: "Серійні етикетки для лінійки напоїв та соків",
    subtitle: "Серійний випуск для скляних пляшок 0,75 л та 0,33 л",
    category: "Безалкогольні напої",
    image: "/images/labels/label-mors-lemonade.png",
    description: "Друк серії смаків в одному тиражі на Konica Minolta AccurioLabel 400. Точна передача пастельних відтінків та гравюрних ілюстрацій.",
    badge: "AccurioLabel 400",
    link: "/catalog/roll-labels",
  },
  {
    id: "coffee-sku",
    title: "Серійні етикетки для крафтової кави та чаю",
    subtitle: "Єдина колірна дизайн-система для кавових дой-паків",
    category: "Крафтова кава",
    image: "/images/labels/coffee-sku-lineup.png",
    description: "Єдина колірна дизайн-система для кавових дой-паків. Легка заміна сортів, ваги, дат обсмаження та QR-кодів без зупинки виробництва.",
    badge: "Серійний друк",
    link: "/catalog/roll-labels",
  },
  {
    id: "food-delicco",
    title: "Етикетки для скляної тари, соусів та консервації",
    subtitle: "Промислове маркування харчової продукції",
    category: "Харчовий сектор",
    image: "/images/labels/food-portfolio-delicco.png",
    description: "Промислове тиражування самоклейної етикетки для скляних банок та пластикових відер. Стійкість до жирів, олій та перепадів температур.",
    badge: "Харчова тара",
    link: "/catalog/stickers",
  },
  {
    id: "wine-chizay",
    title: "Преміальна винна та крафтова етикетка",
    subtitle: "Фактурний винний папір верже та тиснення фольгою",
    category: "Виноробство та HoReCa",
    image: "/images/labels/wine-chizay.png",
    description: "Фактурний винний папір верже, тиснення благородною золотою фольгою Kurz, прецизійний контурний різ.",
    badge: "Винний папір",
    link: "/catalog/stickers",
  },
  {
    id: "olive-oil",
    title: "Серійні етикетки для лінійки олій",
    subtitle: "Масштабування від мініатюр до пляшок 1 л",
    category: "Олії та делікатеси",
    image: "/images/labels/olive-oil-lineup.png",
    description: "Бездоганне пропорційне масштабування етикетки під будь-який діаметр пляшки з олієстійким ламінуванням.",
    badge: "Масштабування лінійки",
    link: "/catalog/roll-labels",
  },
  {
    id: "cosmetics-natural",
    title: "Етикетки для косметики та фармакології",
    subtitle: "Вологостійкі плівки для флаконів, баночок та туб",
    category: "Косметика та фарма",
    image: "/images/labels/cosmetics-lineup.png",
    description: "Білі та прозорі вологостійкі поліпропіленові плівки із захисним лаком від стирання та хімічного впливу.",
    badge: "Стійка плівка",
    link: "/catalog/stickers",
  },
  {
    id: "organic-milk",
    title: "Етикетки для молочної та фермерської продукції",
    subtitle: "Стійкість до вологи, конденсату та низьких температур",
    category: "Молочна продукція",
    image: "/images/labels/organic-milk.png",
    description: "Друк на водостійкому поліпропілені з сертифікованими фарбами для прямого контакту з харчовою тарою.",
    badge: "Харчовий допуск",
    link: "/catalog/roll-labels",
  },
];

// Вибрані пакувальні та преміум-рішення
const PACKAGING_SHOWCASE_ITEMS: CarouselItem[] = [
  {
    id: "case-hospitality",
    title: "Преміальний готельний поліграфічний ансамбль",
    subtitle: "Шкіряні теки, велком-листи, дорхенгери та сертифікати",
    category: "Готельний преміум",
    image: "/images/cases/luxury-hospitality.jpg",
    description: "Повний поліграфічний супровід готельного комплексу. Гаряче тиснення золотом, дизайнерський папір верже, сургучні печатки.",
    badge: "Готельний сервіс",
    link: "/catalog/restaurant-menus",
  },
  {
    id: "case-restaurant",
    title: "Ресторанний ансамбль меню та винних карт",
    subtitle: "Головне меню, Bar & Wine List, Reserved та десерти",
    category: "Ресторанний сервіс",
    image: "/images/cases/luxury-restaurant-menu.jpg",
    description: "Тверда зносостійка палітурка з фактурної екошкіри, вкладиші на дизайнерському папері з водовідштовхувальним покриттям.",
    badge: "Шкіра та тиснення",
    link: "/catalog/restaurant-menus",
  },
  {
    id: "case-srp-retail",
    title: "Шоубокси та упаковка для ритейлу",
    subtitle: "Шоубокси для снеків, воблери, шелфтокери та дисплеї",
    category: "Ритейл упаковка",
    image: "/images/cases/retail-srp-display.png",
    description: "Конструкторська розробка та висічка картонних шоубоксів з віконцями для супермаркетів. Зручно для швидкої викладки товару на полицю.",
    badge: "Ритейл упаковка",
    link: "/catalog/boxes",
  },
  {
    id: "case-kids",
    title: "Дитячі книги, настільні ігри та картки",
    subtitle: "Тверда палітурка 7БЦ, ігрові поля, стікерпаки та фігурки",
    category: "Книги та ігри",
    image: "/images/cases/kids-books-games.png",
    description: "Комплексний випуск дитячих розвиваючих наборів: настільні ігри з кубиками, картки з кругленими кутами, альбоми наліпок.",
    badge: "7БЦ Horizon",
    link: "/catalog/kids-print",
  },
  {
    id: "case-boutique",
    title: "Арт-альбоми, фірмові бокси та блокноти",
    subtitle: "Тверді подарункові коробки з ложементом та сатиновими стрічками",
    category: "Подарункова поліграфія",
    image: "/images/cases/luxury-boutique-souvenirs.jpg",
    description: "Каширований палітурний картон 2.5–3.0 мм, тиснення золотою фольгою Kurz, преміальні блокноти на спіралі.",
    badge: "Каширування",
    link: "/catalog/kashering",
  },
  {
    id: "case-bags",
    title: "Фірмові крафтові пакети з золотим тисненням",
    subtitle: "Серійне преміальне пакування для бутиків та кав'ярень",
    category: "Брендована упаковка",
    image: "/images/packaging/bag-green-leaf.png",
    description: "Цупкий європейський крафт, посилені ручки, гаряче тиснення золотою фольгою та глибокий матовий шовкодрук.",
    badge: "Крафт + Фольга",
    link: "/catalog/craft-bags",
  },
];

export default function CatalogPage() {
  const [selectedCluster, setSelectedCluster] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredClusters = CATALOG_CLUSTERS.map((cluster) => {
    if (selectedCluster !== "all" && cluster.id !== selectedCluster) {
      return null;
    }
    const filteredItems = cluster.items.filter(
      (item) =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.shortDesc.toLowerCase().includes(searchQuery.toLowerCase())
    );
    if (filteredItems.length === 0) return null;
    return { ...cluster, items: filteredItems };
  }).filter(Boolean);

  return (
    <div className="bg-white min-h-screen py-16 sm:py-24 text-slate-900 selection:bg-edelvin-blue selection:text-white">
      <div className="max-w-[1520px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-10">
        
        {/* Заголовок сторінки каталогу */}
        <div className="pb-12 border-b border-slate-200">
          <span className="font-sans text-xs font-bold tracking-[0.25em] text-edelvin-blue uppercase block mb-3">
            ВИРОБНИЧА НОМЕНКЛАТУРА • ПОВНИЙ ЦИКЛ ПОЛІГРАФІЇ «АЛЬФА І ОМЕГА»
          </span>
          <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl font-normal tracking-tight text-slate-950">
            Каталог продукції та пакувальних рішень
          </h1>
          <p className="text-base sm:text-lg text-slate-700 font-normal mt-4 max-w-3xl leading-relaxed">
            Серійні етикетки для брендів, книги у твердій палітурці 7БЦ, роздрібне пакування та представницька поліграфія. Власна фабрика у Вінниці площею 2 500 м² з індустріальними комплексами Konica Minolta та Horizon.
          </p>

          <div className="mt-8 flex flex-wrap gap-6 pt-6 border-t border-slate-100 font-sans text-xs">
            <div>
              <span className="block text-2xl font-serif text-slate-950 font-normal">6 кластерів</span>
              <span className="text-slate-500 uppercase tracking-wider text-[10px] mt-0.5 block">Основні напрямки</span>
            </div>
            <div>
              <span className="block text-2xl font-serif text-slate-950 font-normal">від 1 шт</span>
              <span className="text-slate-500 uppercase tracking-wider text-[10px] mt-0.5 block">Мінімальний тираж</span>
            </div>
            <div>
              <span className="block text-2xl font-serif text-slate-950 font-normal">24 - 48 год</span>
              <span className="text-slate-500 uppercase tracking-wider text-[10px] mt-0.5 block">Швидкий запуск тиражу</span>
            </div>
            <div>
              <span className="block text-2xl font-serif text-slate-950 font-normal">100% ПДВ</span>
              <span className="text-slate-500 uppercase tracking-wider text-[10px] mt-0.5 block">Казначейство та безготівка</span>
            </div>
          </div>
        </div>

                {/* КАРУСЕЛЬ 1: СЕРІЙНІ ЛІНІЙКИ ЕТИКЕТОК SKU                  */}
                <section className="py-14 sm:py-18 border-b border-slate-200">
          <ProductCarousel
            eyebrow="Серійний рулонний друк"
            title="Серійні лінійки етикеток"
            subtitle="Єдина система маркування для десятків SKU. Стійкість до вологи, жирів та низьких температур."
            items={LABEL_SHOWCASE_ITEMS}
            aspectRatio="square"
            viewAllLink="/catalog/roll-labels"
            viewAllText="Замовити рулонну етикетку"
          />
        </section>

                {/* КАРУСЕЛЬ 2: ПАКУВАННЯ, HORECA ТА КНИГИ                   */}
                <section className="py-14 sm:py-18 border-b border-slate-200">
          <ProductCarousel
            eyebrow="Пакування та поліграфія"
            title="Шоубокси, пакування та ресторанна поліграфія"
            subtitle="Ресторанні комплекти з золотим тисненням, ритейл-шоубокси, розвиваючі дитячі видання та крафтові пакети."
            items={PACKAGING_SHOWCASE_ITEMS}
            aspectRatio="video"
            viewAllLink="/catalog/restaurant-menus"
            viewAllText="Дивитися преміум-вироби"
          />
        </section>

        {/* Панель фільтрів та живого пошуку */}
        <div className="py-8 flex flex-col lg:flex-row justify-between items-stretch lg:items-center gap-6 border-b border-slate-200">
          
          {/* Сегментований перемикач категорій */}
          <div className="flex flex-wrap gap-2 text-xs font-sans font-bold">
            <button
              type="button"
              onClick={() => setSelectedCluster("all")}
              className={`px-4 py-2.5 transition-all cursor-pointer rounded-xs uppercase tracking-wider ${
                selectedCluster === "all"
                  ? "bg-slate-950 text-white shadow-xs"
                  : "bg-white border border-slate-300 text-slate-700 hover:border-slate-950 hover:text-slate-950"
              }`}
            >
              Всі напрями
            </button>
            {CATALOG_CLUSTERS.map((c) => (
              <button
                key={c.id}
                type="button"
                onClick={() => setSelectedCluster(c.id)}
                className={`px-4 py-2.5 transition-all cursor-pointer rounded-xs uppercase tracking-wider ${
                  selectedCluster === c.id
                    ? "bg-slate-950 text-white shadow-xs"
                    : "bg-white border border-slate-300 text-slate-700 hover:border-slate-950 hover:text-slate-950"
                }`}
              >
                {c.title.split(" ")[0]}
              </button>
            ))}
          </div>

          {/* Поле живого пошуку з іконкою */}
          <div className="w-full lg:w-96 relative">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
              <Search className="w-4 h-4" />
            </div>
            <input
              type="text"
              placeholder="Пошук виробів, книг 7БЦ, рулонної етикетки, коробок, меню..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white border border-slate-300 pl-10 pr-4 py-2.5 text-xs font-sans text-slate-950 placeholder:text-slate-400 focus:outline-none focus:border-slate-950 transition-colors"
            />
          </div>

        </div>

        {/* Product Cluster Sections */}
        <div className="space-y-20 mt-14">
          {filteredClusters.map((cluster) => cluster && (
            <div key={cluster.id} id={cluster.id} className="scroll-mt-32">
              <div className="flex items-baseline justify-between mb-8 pb-3 border-b border-slate-200">
                <div className="flex items-baseline gap-3">
                  <span className="font-sans text-xs font-bold text-edelvin-blue">
                    {cluster.code}
                  </span>
                  <h2 className="font-serif text-3xl sm:text-4xl font-normal text-slate-950 tracking-tight">
                    {cluster.title}
                  </h2>
                </div>
                <span className="font-sans text-xs font-medium text-slate-500">
                  {cluster.items.length} позицій
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                {cluster.items.map((item) => (
                  <div
                    key={item.id}
                    className="border border-slate-200/90 bg-white p-5 sm:p-6 flex flex-col justify-between shadow-xs hover:border-slate-950 hover:shadow-xl transition-all duration-300 group rounded-xs"
                  >
                    <div>
                      {/* Зображення виробу */}
                      {item.image && (
                        <div className="relative aspect-[16/10] w-full bg-slate-50 overflow-hidden mb-4.5 rounded-xs border border-slate-100">
                          <Image
                            src={item.image}
                            alt={item.name}
                            fill
                            sizes="(max-width: 768px) 100vw, 33vw"
                            className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                          />
                        </div>
                      )}

                      <h3 className="font-serif text-xl sm:text-2xl font-normal text-slate-950 mt-1.5 group-hover:text-edelvin-blue transition-colors leading-snug">
                        {item.name}
                      </h3>

                      <p className="text-xs sm:text-sm text-slate-700 font-normal mt-2 leading-relaxed">
                        {item.shortDesc}
                      </p>
                    </div>

                    <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-sans">
                      <Link
                        href={`/catalog/${item.slug}`}
                        className="text-slate-950 font-bold uppercase tracking-wider flex items-center gap-1.5 group-hover:text-edelvin-blue transition-colors"
                      >
                        <span>Детальніше про виріб</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* НИЖНІЙ БЛОК: ІНДИВІДУАЛЬНЕ ВИРОБНИЦТВО ТА ЗВ'ЯЗОК */}
        <div className="mt-24 p-8 sm:p-12 border border-slate-200 bg-white rounded-xs flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
          <div className="max-w-2xl">
            <span className="font-sans text-xs font-bold uppercase tracking-widest text-edelvin-blue block mb-2">
              НЕ ЗНАЙШЛИ ПОТРІБНОГО ВИРОБУ ЧИ СКЛАДНОГО ТЗ?
            </span>
            <h3 className="font-serif text-2xl sm:text-3xl text-slate-950 font-normal">
              Виготовляємо індивідуальну та нестандартну поліграфію за вашими параметрами
            </h3>
            <p className="text-sm text-slate-700 mt-2 font-normal leading-relaxed">
              Індивідуальні вирубні контури Scorpio Vorey, білий тонер на прозорих плівках, тиснення фольгою Kurz, тверда палітурка великих форматів, рулонна етикетка для автоматичних аплікаторів.
            </p>
          </div>
          <Link
            href="/#direct-contact"
            className="px-7 py-4 bg-slate-950 text-white font-sans text-xs font-bold uppercase tracking-wider rounded-xs hover:bg-edelvin-blue transition-colors shrink-0 flex items-center gap-2 shadow-sm hover:shadow-lg"
          >
            <span>Зв'язатися з технологом</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

      </div>
    </div>
  );
}
