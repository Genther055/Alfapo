"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ShoppingBag,
  Check,
  ArrowRight,
  PackageCheck,
  Sparkles,
  Building2,
  Truck,
  ShieldCheck,
  FileText,
  Clock,
  CheckCircle2,
  MapPin,
  Landmark,
  BadgePercent
} from "lucide-react";

interface ShopItem {
  id: string;
  name: string;
  category: "paper" | "books" | "stationery" | "folders" | "household" | "school";
  price: number;
  unit: string;
  bulkPrice?: string;
  inStock: boolean;
  desc: string;
  image: string;
  badge?: string;
}

const SHOP_ITEMS: ShopItem[] = [
  {
    id: "paper-a4",
    name: "Папір офісний А4 80 г/м²",
    category: "paper",
    price: 185,
    unit: "пачка (500 арк.)",
    bulkPrice: "від 50 пачок — 178 ₴",
    inStock: true,
    desc: "Сертифікований європейський офісний папір класу А/В для щоденного швидкісного лазерного та струменевого друку. Висока білизна CIE 150%.",
    image: "/images/shop/paper-reams.jpg",
    badge: "Хіт складу",
  },
  {
    id: "paper-a3",
    name: "Папір офісний А3 80 г/м²",
    category: "paper",
    price: 375,
    unit: "пачка (500 арк.)",
    bulkPrice: "від 10 пачок — 360 ₴",
    inStock: true,
    desc: "Для друку креслень, схем, звітів, планів та проектної документації на офісних апаратах формату А3. Чіткі краї без пилу.",
    image: "/images/shop/paper-reams.jpg",
    badge: "Формат А3",
  },
  {
    id: "school-journal-1-4",
    name: "Класний журнал для 1–4 класів НУШ",
    category: "school",
    price: 145,
    unit: "шт",
    bulkPrice: "від 20 шт — 135 ₴",
    inStock: true,
    desc: "Офіційний державний зразок, затверджений Міністерством освіти і науки України для початкової школи. Зручна розмітка за програмою НУШ.",
    image: "/images/cases/kids-books-games.png",
    badge: "Держстандарт МОН",
  },
  {
    id: "school-journal-5-11",
    name: "Класний журнал для 5–11 класів",
    category: "school",
    price: 160,
    unit: "шт",
    bulkPrice: "від 20 шт — 150 ₴",
    inStock: true,
    desc: "Офіційний обліковий документ для закладів загальної середньої освіти. Міцний ниткошвейний блок, зносостійка палітурка 7БЦ.",
    image: "/images/products/hardcover-books-mockup.jpg",
    badge: "Тверда палітурка",
  },
  {
    id: "notary-registry-book",
    name: "Книга обліку нотаріальних дій",
    category: "books",
    price: 320,
    unit: "шт",
    bulkPrice: "від 5 шт — 295 ₴",
    inStock: true,
    desc: "Виготовлена за суворими вимогами юстиції: прошнурований блок, захисна фонова сітка, тверда палітурка з тисненням золотою фольгою.",
    image: "/images/shop/registry-book.jpg",
    badge: "Для нотаріусів",
  },
  {
    id: "cubes-white-90",
    name: "Блоки листів для запису 90 × 90 мм (кубарики)",
    category: "stationery",
    price: 95,
    unit: "блок",
    bulkPrice: "від 10 шт — 85 ₴",
    inStock: true,
    desc: "Білосніжний офсетний папір у формі куба для коротких щоденних нотаток, проклеєний по одному краю для зручного рівного відриву.",
    image: "/images/products/stationery-mockup.jpg",
    badge: "Офісний запас",
  },
  {
    id: "folder-pocket-a4",
    name: "Папка ділова з кишенею під документи А4",
    category: "folders",
    price: 24,
    unit: "шт",
    bulkPrice: "від 50 шт — 20 ₴",
    inStock: true,
    desc: "Цупка презентаційна папка з картону 300 г/м² для договорів, комерційних пропозицій та виставок. Оснащена прорізом для візитки.",
    image: "/images/branding/alfa-omega-showcase.png",
    badge: "Картон 300 г/м²",
  },
  {
    id: "folder-binder-75",
    name: "Папка-реєстратор із важільним механізмом 75 мм",
    category: "folders",
    price: 88,
    unit: "шт",
    bulkPrice: "від 10 шт — 80 ₴",
    inStock: true,
    desc: "Надійний арочний важільний механізм, металевий протектор нижнього краю та кільце для зручного зняття з полиці. Формат А4.",
    image: "/images/cases/luxury-hospitality.jpg",
    badge: "Архів 75 мм",
  },
  {
    id: "household-towels",
    name: "Паперові рушники рулонні двошарові",
    category: "household",
    price: 68,
    unit: "уп",
    bulkPrice: "від 10 уп — 60 ₴",
    inStock: true,
    desc: "100% первинна целюлоза з м'якою перфорацією та тисненням для санітарних кімнат, офісних кухонь та виробничих зон.",
    image: "/images/capabilities/mockup-delivery-box.jpg",
    badge: "100% целюлоза",
  },
  {
    id: "sample-box",
    name: "Sample Box — зразки матеріалів та оздоблення",
    category: "stationery",
    price: 150,
    unit: "набір",
    bulkPrice: "безкоштовно при замовленні тиражу",
    inStock: true,
    desc: "Тактильний каталог матеріалів: зразки щільності від 80 до 350 г/м², Soft-Touch ламінація, фольга Kurz та вибірковий УФ-лак.",
    image: "/images/cases/gift-box-cards.png",
    badge: "Для дизайнерів та B2B",
  },
];

export default function ShopPage() {
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [addedItem, setAddedItem] = useState<string | null>(null);

  const filteredItems = SHOP_ITEMS.filter((item) =>
    activeCategory === "all" ? true : item.category === activeCategory
  );

  const handleAddToCart = (name: string) => {
    setAddedItem(name);
    setTimeout(() => setAddedItem(null), 2000);
  };

  const categoriesList = [
    { id: "all", label: "Всі позиції складу" },
    { id: "paper", label: "Офісний папір А4 / А3" },
    { id: "school", label: "Шкільні журнали МОН" },
    { id: "books", label: "Книги обліку 7БЦ" },
    { id: "folders", label: "Папки та архівація" },
    { id: "stationery", label: "Канцелярія та зразки" },
    { id: "household", label: "Господарські товари" },
  ];

  return (
    <div className="bg-white min-h-screen py-16 sm:py-24 text-slate-900 selection:bg-edelvin-blue selection:text-white">
      <div className="max-w-[1520px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-10">
        
        {/* Shop Header */}
        <div className="pb-8 border-b border-slate-200">
          <span className="font-sans text-xs font-bold tracking-[0.25em] text-edelvin-blue uppercase block mb-3">
            ВЛАСНИЙ СКЛАД • ВІННИЦЯ
          </span>
          <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl font-normal tracking-tight text-slate-950">
            Складське забезпечення та папір
          </h1>
          <p className="text-base sm:text-lg text-slate-600 font-normal mt-3 max-w-3xl leading-relaxed">
            Прямі поставки оригінального сертифікованого офісного паперу, бланкової та журнальної продукції за держстандартом МОН, папок та канцтоварів. Працюємо з бюджетними організаціями, підприємствами та приватними замовниками.
          </p>

          {/* Компактна лаконічна плашка параметрів (менша і без ПДВ 20%) */}
          <div className="mt-6 pt-5 border-t border-slate-200 flex flex-wrap items-center gap-x-8 gap-y-3 font-sans text-xs">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-600"></span>
              <span className="font-bold text-slate-950">Самовивіз:</span>
              <span className="text-slate-500">вул. 600-річчя, 17</span>
            </div>

            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-blue-600"></span>
              <span className="font-bold text-slate-950">Казначейство:</span>
              <span className="text-slate-500">супровід державних установ</span>
            </div>

            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-amber-600"></span>
              <span className="font-bold text-slate-950">Оптові ціни:</span>
              <span className="text-slate-500">знижки та спецтарифи від обсягу</span>
            </div>
          </div>
        </div>

        {/* ЄДИНА ЗРУЧНА СТИЛІСТИКА КАТЕГОРІЙНИХ ТАБІВ ПО ВСЬОМУ САЙТУ */}
        <div className="py-6 flex items-center gap-2 overflow-x-auto no-scrollbar text-xs font-sans font-semibold border-b border-slate-200">
          {categoriesList.map((c) => {
            const count = c.id === "all" ? SHOP_ITEMS.length : SHOP_ITEMS.filter((i) => i.category === c.id).length;
            const isActive = activeCategory === c.id;
            return (
              <button
                key={c.id}
                type="button"
                onClick={() => setActiveCategory(c.id)}
                className={`px-4 py-2.5 rounded-full transition-all cursor-pointer whitespace-nowrap shrink-0 flex items-center gap-2 ${
                  isActive
                    ? "bg-slate-950 text-white shadow-xs"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-950"
                }`}
              >
                <span>{c.label}</span>
                <span
                  className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
                    isActive ? "bg-white/20 text-white" : "bg-slate-200 text-slate-600"
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* СІТКА ТОВАРІВ З ФОТОГРАФІЯМИ: БАГАТО ВІЗУАЛУ, ЧИТАБЕЛЬНО І СУЧАСНО */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-10">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              className="border border-slate-200 bg-white rounded-sm p-6 sm:p-7 flex flex-col justify-between shadow-xs hover:border-slate-950 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group"
            >
              <div>
                {/* Фото товару */}
                <div className="relative aspect-4/3 w-full bg-slate-100 rounded-xs overflow-hidden mb-5 border border-slate-100 shadow-xs">
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                  />
                  {item.badge && (
                    <span className="absolute top-3 left-3 px-2.5 py-1 bg-slate-950/80 backdrop-blur-md text-white text-[10px] font-sans font-bold uppercase tracking-wider rounded-xs border border-white/20">
                      {item.badge}
                    </span>
                  )}
                  {item.inStock && (
                    <span className="absolute top-3 right-3 px-2 py-0.5 bg-emerald-600 text-white text-[10px] font-sans font-semibold rounded-xs">
                      В наявності
                    </span>
                  )}
                </div>

                {/* Назва та опис виробу */}
                <div className="space-y-2">
                  <h3 className="font-serif text-2xl text-slate-950 font-normal leading-snug group-hover:text-edelvin-blue transition-colors">
                    {item.name}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 font-normal leading-relaxed line-clamp-3">
                    {item.desc}
                  </p>
                </div>
              </div>

              {/* Нижня панель: Ціна та дія */}
              <div className="pt-5 mt-6 border-t border-slate-100 flex items-center justify-between gap-4">
                <div>
                  <div className="flex items-baseline gap-1.5">
                    <span className="font-sans text-2xl font-bold text-slate-950">{item.price} ₴</span>
                    <span className="text-xs font-sans text-slate-500">/ {item.unit}</span>
                  </div>
                  {item.bulkPrice && (
                    <span className="text-[11px] font-sans text-emerald-700 font-semibold block mt-0.5">
                      {item.bulkPrice}
                    </span>
                  )}
                </div>

                <button
                  type="button"
                  onClick={() => handleAddToCart(item.name)}
                  className={`font-sans text-xs font-bold uppercase tracking-wider px-5 py-3 rounded-xs transition-all cursor-pointer shrink-0 shadow-xs ${
                    addedItem === item.name
                      ? "bg-emerald-700 text-white"
                      : "bg-slate-950 text-white hover:bg-edelvin-blue"
                  }`}
                >
                  {addedItem === item.name ? "✓ Додано" : "До кошика"}
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* B2B Спеціальне забезпечення для організацій */}
        <div className="mt-16 p-8 sm:p-12 border border-slate-950 bg-slate-950 text-white flex flex-col md:flex-row justify-between items-start md:items-center gap-8 rounded-sm shadow-xl">
          <div className="space-y-2 max-w-2xl">
            <span className="font-sans text-xs font-bold text-blue-400 uppercase tracking-widest block">
              КОРПОРАТИВНІ ДОГОВОРИ ТА БЮДЖЕТНІ ОРГАНІЗАЦІЇ
            </span>
            <h3 className="font-serif text-3xl sm:text-4xl font-normal leading-tight">
              Регулярне постачання паперу та канцелярії за фіксованими цінами
            </h3>
            <p className="text-slate-300 text-sm leading-relaxed pt-1">
              Укладаємо офіційні річні договори з установами Вінниці та області. Безготівковий розрахунок, казначейський супровід та швидка доставка транспортом підприємства прямо до вашого закладу.
            </p>
          </div>

          <Link
            href="/b2b"
            className="font-sans text-xs font-bold uppercase tracking-[0.2em] bg-white text-slate-950 hover:bg-edelvin-blue hover:text-white px-6 py-4 rounded-xs transition-colors shrink-0 inline-flex items-center gap-2"
          >
            <span>Отримати рахунок / КП</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

      </div>
    </div>
  );
}
