"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ProductItem } from "@/data/catalog";
import { UploadCloud, CheckCircle2, Phone, Mail, ArrowRight, Clock, ShieldCheck } from "lucide-react";

interface ProductConfiguratorProps {
  product: ProductItem;
}

export default function ProductConfigurator({ product }: ProductConfiguratorProps) {
  // Параметри специфікації виробу для технолога
  const [format, setFormat] = useState("standard");
  const [paper, setPaper] = useState("coated350");
  const [sides, setSides] = useState("4+4");
  const [finish, setFinish] = useState("soft-touch");
  const [qty, setQty] = useState(500);
  const [customQty, setCustomQty] = useState("");
  const [uploadedFile, setUploadedFile] = useState<string | null>(null);

  // Контактні дані для зв'язку з технологом
  const [clientName, setClientName] = useState("");
  const [clientPhone, setClientPhone] = useState("");
  const [clientNotes, setClientNotes] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
    }, 600);
  };

  const finalQty = customQty.trim() ? customQty : `${qty} шт`;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
      
      {/* ЛІВА КОЛОНКА: СХЕМА ВИРОБУ, ПРЕПРЕС ТА ПІДСУМОК СПЕЦИФІКАЦІЇ */}
      <div className="lg:col-span-5 space-y-6">
        <div className="border border-slate-200 bg-white p-8 sm:p-10 shadow-xs rounded-sm">
          <span className="font-sans text-xs font-bold text-slate-500 tracking-widest uppercase block mb-4">
            СХЕМА ДООБРІЗНОГО ФОРМАТУ
          </span>

          <div className="h-56 border border-slate-200 bg-slate-50 flex flex-col items-center justify-center p-6 text-center rounded-xs">
            <div className="w-52 h-32 border-2 border-slate-950 bg-white shadow-sm flex flex-col items-center justify-center font-sans text-sm text-slate-900 font-bold">
              <span>{format === "standard" ? "90 × 50 мм" : format === "euro" ? "85 × 55 мм" : "Індивідуальний"}</span>
              <span className="text-[10px] text-slate-400 font-normal mt-0.5">Обрізний контур</span>
            </div>
            <span className="font-sans text-[11px] text-slate-600 mt-4">
              {format === "standard"
                ? "Дообрізний розмір макету: 94 × 54 мм (+2 мм вильоти)"
                : format === "euro"
                ? "Дообрізний розмір макету: 89 × 59 мм (+2 мм вильоти)"
                : "Розмір узгоджується індивідуально з технологом"}
            </span>
          </div>

          {/* Технічний підсумок обраних параметрів */}
          <div className="mt-8 space-y-3 font-sans text-xs border-t border-slate-100 pt-6">
            <div className="flex justify-between py-1 border-b border-slate-100">
              <span className="text-slate-500">Виріб:</span>
              <span className="text-slate-950 font-bold truncate max-w-[200px]">{product.name}</span>
            </div>
            <div className="flex justify-between py-1 border-b border-slate-100">
              <span className="text-slate-500">Папір / Матеріал:</span>
              <span className="text-slate-950 font-bold">
                {paper === "coated350"
                  ? "Крейдований 350 г/м²"
                  : paper === "kraft"
                  ? "Крафт 300 г/м²"
                  : "Plike преміум"}
              </span>
            </div>
            <div className="flex justify-between py-1 border-b border-slate-100">
              <span className="text-slate-500">Сторони друку:</span>
              <span className="text-slate-950 font-bold">{sides === "4+0" ? "4+0 (односторонній)" : "4+4 (двосторонній)"}</span>
            </div>
            <div className="flex justify-between py-1 border-b border-slate-100">
              <span className="text-slate-500">Оздоблення:</span>
              <span className="text-slate-950 font-bold uppercase">{finish}</span>
            </div>
            <div className="flex justify-between py-1 border-b border-slate-100">
              <span className="text-slate-500">Бажаний тираж:</span>
              <span className="text-slate-950 font-bold">{finalQty}</span>
            </div>
            <div className="flex justify-between py-1">
              <span className="text-slate-500">Термін друку:</span>
              <span className="text-edelvin-blue font-bold">{product.turnaround}</span>
            </div>
          </div>
        </div>

        {/* Блок перевірки макетів (Prepress Specs) */}
        <div className="border border-slate-200 bg-slate-50/70 p-6 sm:p-8 font-sans text-xs space-y-3 text-slate-700 rounded-sm">
          <span className="font-bold text-slate-950 block uppercase text-[10px] tracking-widest text-edelvin-blue">
            ТЕХНІЧНІ ВИМОГИ ДО ДРУКУ:
          </span>
          <ul className="space-y-1.5 text-xs list-disc list-inside">
            <li>Формати файлів: PDF/X-1a, TIFF (без шарів), AI або EPS</li>
            <li>Колірна модель: CMYK (без колірних профілів RGB)</li>
            <li>Роздільна здатність: 300 DPI у масштабі 1:1</li>
            <li>Шрифти переведені в криві (Outlines)</li>
          </ul>
        </div>

        {/* Швидкі прямі контакти */}
        <div className="border border-slate-200 bg-white p-6 font-sans text-xs space-y-2 text-slate-600 rounded-sm">
          <span className="font-bold text-slate-950 block uppercase tracking-wider text-[11px]">
            Пряма консультація технолога:
          </span>
          <div className="flex items-center gap-2 pt-1 text-slate-900 font-bold">
            <Phone className="w-4 h-4 text-edelvin-blue" />
            <a href="tel:+380689860016" className="hover:text-edelvin-blue transition-colors">
              +38 (068) 986-00-16
            </a>
          </div>
          <div className="flex items-center gap-2 text-slate-900">
            <Mail className="w-4 h-4 text-edelvin-blue" />
            <a href="mailto:print@edelvin.com.ua" className="hover:text-edelvin-blue transition-colors">
              print@edelvin.com.ua
            </a>
          </div>
        </div>
      </div>

      {/* ПРАВА КОЛОНКА: ВИБІР ПАРАМЕТРІВ ТА ПРЯМИЙ ЗАПИТ НА ВИРОБНИЦТВО */}
      <div className="lg:col-span-7 bg-white border border-slate-300 p-8 sm:p-12 space-y-8 shadow-sm rounded-sm">
        
        {/* 1. Розмір */}
        <div>
          <label className="font-sans text-xs font-bold uppercase tracking-wider text-slate-600 block mb-3">
            01 / Формат виробу
          </label>
          <div className="grid grid-cols-3 gap-3 text-xs font-sans">
            <button
              type="button"
              onClick={() => setFormat("standard")}
              className={`p-4 text-left transition-all cursor-pointer rounded-xs ${
                format === "standard"
                  ? "border-2 border-slate-950 bg-slate-50 font-bold text-slate-950 shadow-xs"
                  : "border border-slate-300 bg-white text-slate-700 hover:border-slate-950"
              }`}
            >
              90 × 50 мм
              <span className="block text-[10px] text-slate-500 font-normal mt-1">
                Класичний стандарт UA
              </span>
            </button>
            <button
              type="button"
              onClick={() => setFormat("euro")}
              className={`p-4 text-left transition-all cursor-pointer rounded-xs ${
                format === "euro"
                  ? "border-2 border-slate-950 bg-slate-50 font-bold text-slate-950 shadow-xs"
                  : "border border-slate-300 bg-white text-slate-700 hover:border-slate-950"
              }`}
            >
              85 × 55 мм
              <span className="block text-[10px] text-slate-500 font-normal mt-1">
                Євро-стандарт
              </span>
            </button>
            <button
              type="button"
              onClick={() => setFormat("custom")}
              className={`p-4 text-left transition-all cursor-pointer rounded-xs ${
                format === "custom"
                  ? "border-2 border-slate-950 bg-slate-50 font-bold text-slate-950 shadow-xs"
                  : "border border-slate-300 bg-white text-slate-700 hover:border-slate-950"
              }`}
            >
              Індивідуальний
              <span className="block text-[10px] text-slate-500 font-normal mt-1">
                Під розмір клієнта
              </span>
            </button>
          </div>
        </div>

        {/* 2. Папір */}
        <div>
          <label className="font-sans text-xs font-bold uppercase tracking-wider text-slate-600 block mb-3">
            02 / Тип паперу та субстрат
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
            <button
              type="button"
              onClick={() => setPaper("coated350")}
              className={`p-4 text-left transition-all cursor-pointer rounded-xs ${
                paper === "coated350"
                  ? "border-2 border-slate-950 bg-slate-50 font-bold text-slate-950 shadow-xs"
                  : "border border-slate-300 bg-white text-slate-700 hover:border-slate-950"
              }`}
            >
              <span className="block font-bold">Крейдований 350 г/м²</span>
              <span className="text-[10px] text-slate-500 font-sans block mt-1">
                Цупкий білий картон
              </span>
            </button>
            <button
              type="button"
              onClick={() => setPaper("kraft")}
              className={`p-4 text-left transition-all cursor-pointer rounded-xs ${
                paper === "kraft"
                  ? "border-2 border-slate-950 bg-slate-50 font-bold text-slate-950 shadow-xs"
                  : "border border-slate-300 bg-white text-slate-700 hover:border-slate-950"
              }`}
            >
              <span className="block font-bold">Крафт 300 г/м²</span>
              <span className="text-[10px] text-slate-500 font-sans block mt-1">
                Екологічна текстура
              </span>
            </button>
            <button
              type="button"
              onClick={() => setPaper("plike")}
              className={`p-4 text-left transition-all cursor-pointer rounded-xs ${
                paper === "plike"
                  ? "border-2 border-slate-950 bg-slate-50 font-bold text-slate-950 shadow-xs"
                  : "border border-slate-300 bg-white text-slate-700 hover:border-slate-950"
              }`}
            >
              <span className="block font-bold">Plike / Преміум</span>
              <span className="text-[10px] text-slate-500 font-sans block mt-1">
                Оксамитовий картон
              </span>
            </button>
          </div>
        </div>

        {/* 3. Сторони друку та оздоблення */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <label className="font-sans text-xs font-bold uppercase tracking-wider text-slate-600 block mb-3">
              03 / Сторони друку
            </label>
            <div className="grid grid-cols-2 gap-2 text-xs font-sans font-bold">
              <button
                type="button"
                onClick={() => setSides("4+0")}
                className={`p-3 text-center transition-all cursor-pointer rounded-xs ${
                  sides === "4+0"
                    ? "border-2 border-slate-950 bg-slate-50 text-slate-950 shadow-xs"
                    : "border border-slate-300 text-slate-700 hover:border-slate-950"
                }`}
              >
                4+0 (1 сторона)
              </button>
              <button
                type="button"
                onClick={() => setSides("4+4")}
                className={`p-3 text-center transition-all cursor-pointer rounded-xs ${
                  sides === "4+4"
                    ? "border-2 border-slate-950 bg-slate-50 text-slate-950 shadow-xs"
                    : "border border-slate-300 text-slate-700 hover:border-slate-950"
                }`}
              >
                4+4 (2 сторони)
              </button>
            </div>
          </div>

          <div>
            <label className="font-sans text-xs font-bold uppercase tracking-wider text-slate-600 block mb-3">
              04 / Фінішне оздоблення
            </label>
            <select
              value={finish}
              onChange={(e) => setFinish(e.target.value)}
              className="w-full text-xs font-sans border border-slate-300 p-3 bg-white text-slate-950 focus:outline-none focus:border-slate-950 transition-colors cursor-pointer rounded-xs"
            >
              <option value="soft-touch">Soft-Touch (оксамитове тактильне)</option>
              <option value="matte">Матова ламінація (без відблисків)</option>
              <option value="gloss">Глянцева ламінація (яскравість)</option>
              <option value="uv-varnish">Вибірковий УФ-лак</option>
              <option value="foil">Гаряче тиснення фольгою</option>
              <option value="none">Без ламінації</option>
            </select>
          </div>
        </div>

        {/* 4. Тиражна сітка */}
        <div>
          <label className="font-sans text-xs font-bold uppercase tracking-wider text-slate-600 block mb-3">
            05 / Обсяг тиражу
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs font-sans">
            {[100, 500, 1000, 5000].map((count) => (
              <button
                key={count}
                type="button"
                onClick={() => {
                  setQty(count);
                  setCustomQty("");
                }}
                className={`p-3.5 text-center transition-all cursor-pointer rounded-xs ${
                  qty === count && !customQty
                    ? "border-2 border-slate-950 bg-slate-50 font-bold text-slate-950 shadow-xs"
                    : "border border-slate-300 bg-white text-slate-700 hover:border-slate-950"
                }`}
              >
                <span className="block text-base font-bold text-slate-950">{count} шт</span>
                <span className="text-[10px] text-slate-500 block mt-1">Оптимально</span>
              </button>
            ))}
          </div>

          <div className="mt-3">
            <input
              type="text"
              value={customQty}
              onChange={(e) => setCustomQty(e.target.value)}
              placeholder="Або вкажіть інший точний тираж (наприклад: 2 500 шт)"
              className="w-full text-xs font-sans border border-slate-300 p-3 bg-white text-slate-950 placeholder:text-slate-400 focus:outline-none focus:border-slate-950 rounded-xs"
            />
          </div>
        </div>

        {/* 5. Завантаження макету */}
        <div>
          <label className="font-sans text-xs font-bold uppercase tracking-wider text-slate-600 block mb-2">
            06 / Файл макета для друку
          </label>
          <div className="border border-dashed border-slate-300 p-6 text-center bg-slate-50/70 hover:border-slate-950 hover:bg-white transition-all rounded-xs">
            <input
              type="file"
              id="artworkUpload"
              onChange={(e) => {
                if (e.target.files && e.target.files[0]) {
                  setUploadedFile(e.target.files[0].name);
                }
              }}
              className="hidden"
            />
            <label htmlFor="artworkUpload" className="cursor-pointer flex items-center justify-center gap-3">
              <UploadCloud className="w-5 h-5 text-slate-500" />
              {uploadedFile ? (
                <span className="font-sans text-xs text-edelvin-blue font-bold">
                  Прикріплено: {uploadedFile}
                </span>
              ) : (
                <div className="text-left font-sans text-xs">
                  <span className="text-slate-950 font-bold block">
                    Виберіть або перетягніть готовий макет (PDF, TIFF, AI)
                  </span>
                  <span className="text-[10px] text-slate-500 block mt-0.5">
                    Немає готового макета? Дизайнери підприємства розроблять його для вас
                  </span>
                </div>
              )}
            </label>
          </div>
        </div>

        {/* 6. ФОРМА ЗАПИТУ НА РОЗРАХУНОК ТЕХНОЛОГОМ */}
        <form onSubmit={handleSubmit} className="pt-6 border-t border-slate-200 space-y-5">
          <div className="bg-slate-50 border border-slate-200 p-4 rounded-xs text-xs font-sans text-slate-700 flex items-start gap-3">
            <Clock className="w-4 h-4 text-edelvin-blue shrink-0 mt-0.5" />
            <span>
              Точний прорахунок вартості замовлення виконується технологом виробництва індивідуально протягом 15 хвилин з урахуванням знижок на обсяг та актуальних цін на сировину.
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="font-sans text-[11px] font-bold uppercase tracking-wider text-slate-600 block mb-1.5">
                Ваше ім'я або назва компанії *
              </label>
              <input
                type="text"
                required
                value={clientName}
                onChange={(e) => setClientName(e.target.value)}
                placeholder="Іван Петренко / ТОВ «Компанія»"
                className="w-full text-xs font-sans border border-slate-300 p-3 bg-white text-slate-950 focus:outline-none focus:border-slate-950 rounded-xs"
              />
            </div>
            <div>
              <label className="font-sans text-[11px] font-bold uppercase tracking-wider text-slate-600 block mb-1.5">
                Контактний телефон / Месенджер *
              </label>
              <input
                type="tel"
                required
                value={clientPhone}
                onChange={(e) => setClientPhone(e.target.value)}
                placeholder="+38 (067) 000-00-00"
                className="w-full text-xs font-sans border border-slate-300 p-3 bg-white text-slate-950 focus:outline-none focus:border-slate-950 rounded-xs"
              />
            </div>
          </div>

          <div>
            <label className="font-sans text-[11px] font-bold uppercase tracking-wider text-slate-600 block mb-1.5">
              Коментар до замовлення (особливі побажання, терміновість, доставка)
            </label>
            <textarea
              rows={2}
              value={clientNotes}
              onChange={(e) => setClientNotes(e.target.value)}
              placeholder="Додаткова інформація щодо тиражу, пакування чи адреси доставки..."
              className="w-full text-xs font-sans border border-slate-300 p-3 bg-white text-slate-950 focus:outline-none focus:border-slate-950 rounded-xs resize-none"
            />
          </div>

          <div className="pt-2 flex flex-wrap items-center justify-between gap-4">
            <button
              type="submit"
              disabled={isSubmitting}
              className="bg-slate-950 text-white px-8 py-4 font-sans text-xs uppercase tracking-[0.2em] font-bold hover:bg-edelvin-blue transition-colors shadow-sm cursor-pointer disabled:opacity-50"
            >
              {isSubmitting ? "Надсилаємо..." : "Оформити запит технологу →"}
            </button>

            <span className="font-sans text-[11px] text-slate-500">
              Виробництво у Вінниці • Безготівка з ПДВ
            </span>
          </div>

          {submitted && (
            <div className="p-4 bg-emerald-50 border border-emerald-200 text-emerald-950 font-sans text-xs flex items-center gap-3 rounded-xs shadow-xs animate-fade-in">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
              <div>
                <strong className="block text-emerald-900 font-bold">
                  Запит на прорахунок успішно зареєстровано!
                </strong>
                <span>
                  Технолог ТОВ «Альфа і Омега» отримав специфікацію та зателефонує вам найближчим часом.
                </span>
              </div>
            </div>
          )}
        </form>

      </div>

    </div>
  );
}
