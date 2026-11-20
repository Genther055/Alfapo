"use client";

import React, { useState } from "react";
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
}

const SHOP_ITEMS: ShopItem[] = [
  {
    id: "paper-a4",
    name: "Папір офісний А4 80 г/м²",
    category: "paper",
    price: 185,
    unit: "пачка",
    bulkPrice: "від 50 пачок — 178 ₴",
    inStock: true,
    desc: "Сертифікований європейський офісний папір для щоденного лазерного та струменевого друку.",
  },
  {
    id: "paper-a3",
    name: "Папір офісний А3 80 г/м²",
    category: "paper",
    price: 375,
    unit: "пачка",
    bulkPrice: "від 10 пачок — 360 ₴",
    inStock: true,
    desc: "Для друку креслень, схем, звітів, планів та проектної документації на офісних апаратах формату А3.",
  },
  {
    id: "school-journal-1-4",
    name: "Класний журнал для 1–4 класів НУШ",
    category: "school",
    price: 145,
    unit: "шт",
    bulkPrice: "від 20 шт — 135 ₴",
    inStock: true,
    desc: "Офіційний державний зразок, затверджений Міністерством освіти і науки України для початкової школи.",
  },
  {
    id: "school-journal-5-11",
    name: "Класний журнал для 5–11 класів",
    category: "school",
    price: 160,
    unit: "шт",
    bulkPrice: "від 20 шт — 150 ₴",
    inStock: true,
    desc: "Офіційний обліковий документ для закладів загальної середньої освіти. Міцний ниткошвейний блок.",
  },
  {
    id: "notary-registry-book",
    name: "Книга обліку нотаріальних дій",
    category: "books",
    price: 320,
    unit: "шт",
    bulkPrice: "від 5 шт — 295 ₴",
    inStock: true,
    desc: "Виготовлена за вимогами юстиції: прошнурований блок, завірена печатною сіткою, тверда палітурка.",
  },
  {
    id: "cubes-white-90",
    name: "Блоки листів для запису 90 × 90 мм",
    category: "stationery",
    price: 95,
    unit: "блок",
    bulkPrice: "від 10 шт — 85 ₴",
    inStock: true,
    desc: "Білосніжний офсетний папір у формі куба для коротких щоденних нотаток і повідомлень.",
  },
  {
    id: "folder-pocket-a4",
    name: "Папка ділова з кишенею під документи А4",
    category: "folders",
    price: 24,
    unit: "шт",
    bulkPrice: "від 50 шт — 20 ₴",
    inStock: true,
    desc: "Цупка папка з картону 300 г/м² для презентацій, комерційних пропозицій та зберігання договорів.",
  },
  {
    id: "folder-binder-75",
    name: "Папка-реєстратор із важільним механізмом А4 75 мм",
    category: "folders",
    price: 88,
    unit: "шт",
    bulkPrice: "від 10 шт — 80 ₴",
    inStock: true,
    desc: "Надійний важільний арочний механізм для довговічного зберігання бухгалтерських та фінансових архівів.",
  },
  {
    id: "household-towels",
    name: "Паперові рушники рулонні двошарові",
    category: "household",
    price: 68,
    unit: "уп",
    bulkPrice: "від 10 уп — 60 ₴",
    inStock: true,
    desc: "Первинна целюлоза з м'якою перфорацією для санітарних кімнат та кухонь організацій.",
  },
  {
    id: "sample-box",
    name: "Sample Box — зразки матеріалів та оздоблення",
    category: "stationery",
    price: 150,
    unit: "набір",
    bulkPrice: "безкоштовно при замовленні тиражу",
    inStock: true,
    desc: "Тактильний каталог матеріалів: зразки щільності від 80 до 350 г/м², Soft-Touch ламінація, фольга Kurz та вибірковий лак.",
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
        <div className="pb-12 border-b border-slate-200">
          <span className="font-sans text-xs font-bold tracking-[0.25em] text-edelvin-blue uppercase block mb-3">
            ВЛАСНИЙ СКЛАД • ВІННИЦЯ • ВІДВАНТАЖЕННЯ ДЕНЬ-У-ДЕНЬ
          </span>
          <h1 className="font-serif text-5xl sm:text-7xl lg:text-8xl font-normal tracking-tight text-slate-950">
            Складське забезпечення та папір
          </h1>
          <p className="text-base sm:text-lg text-slate-700 font-normal mt-4 max-w-3xl leading-relaxed">
            Прямі поставки оригінального сертифікованого офісного паперу, бланкової та журнальної продукції за держстандартом МОН, папок та канцтоварів. Працюємо з бюджетними організаціями, підприємствами та приватними замовниками.
          </p>

          {/* Виробничі стандарти складу */}
          <div className="mt-10 grid grid-cols-2 sm:grid-cols-4 gap-6 pt-8 border-t border-slate-100 font-sans text-xs">
            <div>
              <span className="block text-2xl font-serif text-slate-950 font-normal">Самовивіз</span>
              <span className="text-slate-500 uppercase tracking-wider text-[10px] mt-0.5 block">вул. 600-річчя, 17</span>
            </div>
            <div>
              <span className="block text-2xl font-serif text-slate-950 font-normal">ПДВ 20%</span>
              <span className="text-slate-500 uppercase tracking-wider text-[10px] mt-0.5 block">Повний пакет накладних</span>
            </div>
            <div>
              <span className="block text-2xl font-serif text-slate-950 font-normal">Казначейство</span>
              <span className="text-slate-500 uppercase tracking-wider text-[10px] mt-0.5 block">Для державних установ</span>
            </div>
            <div>
              <span className="block text-2xl font-serif text-slate-950 font-normal">Оптові ціни</span>
              <span className="text-slate-500 uppercase tracking-wider text-[10px] mt-0.5 block">Знижки від обсягу</span>
            </div>
          </div>
        </div>

        {/* Фільтри категорій у стилі мінімалістичних чіпсів */}
        <div className="py-8 flex flex-wrap gap-2 text-xs font-sans font-bold border-b border-slate-200">
          {categoriesList.map((c) => (
            <button
              key={c.id}
              type="button"
              onClick={() => setActiveCategory(c.id)}
              className={`px-4 py-2.5 transition-all cursor-pointer rounded-xs uppercase tracking-wider ${
                activeCategory === c.id
                  ? "bg-slate-950 text-white shadow-xs"
                  : "bg-white border border-slate-200 text-slate-700 hover:border-slate-950 hover:text-slate-950"
              }`}
            >
              {c.label}
            </button>
          ))}
        </div>

        {/* Сітка товарів у високому журнальному стилі */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              className="border border-slate-200/90 bg-white p-7 sm:p-8 flex flex-col justify-between shadow-xs hover:border-slate-950 hover:shadow-xl transition-all duration-300 group"
            >
              <div>
                {/* Назва та опис виробу */}
                <div className="pb-5">
                  <h3 className="font-serif text-2xl text-slate-950 font-normal leading-snug group-hover:text-edelvin-blue transition-colors">
                    {item.name}
                  </h3>
                  <p className="text-sm text-slate-600 font-normal mt-3 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </div>

              {/* Нижня панель: Ціна та дія */}
              <div className="pt-5 border-t border-slate-100 flex items-center justify-between gap-4">
                <div>
                  <div className="flex items-baseline gap-1.5">
                    <span className="font-sans text-2xl font-bold text-slate-950">{item.price} ₴</span>
                    <span className="text-xs font-sans text-slate-500">/ {item.unit}</span>
                  </div>
                  {item.bulkPrice && (
                    <span className="text-[10px] font-sans text-slate-500 block mt-0.5">
                      {item.bulkPrice}
                    </span>
                  )}
                </div>

                <button
                  type="button"
                  onClick={() => handleAddToCart(item.name)}
                  className={`font-sans text-xs font-bold uppercase tracking-wider px-4 py-3 rounded-xs transition-all cursor-pointer shrink-0 ${
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
        <div className="mt-16 p-8 sm:p-12 border border-slate-950 bg-slate-950 text-white flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
          <div className="space-y-2 max-w-2xl">
            <span className="font-sans text-xs font-bold text-edelvin-blue uppercase tracking-widest block">
              КОРПОРАТИВНІ ДОГОВОРИ ТА БЮДЖЕТНІ ОРГАНІЗАЦІЇ
            </span>
            <h3 className="font-serif text-3xl sm:text-4xl font-normal leading-tight">
              Регулярне постачання паперу та канцелярії за фіксованими цінами
            </h3>
            <p className="text-slate-300 text-sm leading-relaxed pt-1">
              Укладаємо офіційні річні договори з установами Вінниці та області. Безготівковий розрахунок, казначейський супровід та безкоштовна доставка автопарком підприємства прямо до вашого складу.
            </p>
          </div>

          <Link
            href="/#direct-contact"
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
