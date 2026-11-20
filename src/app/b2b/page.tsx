"use client";

import React, { useState } from "react";
import Link from "next/link";
import { CheckCircle2, ShieldCheck, TrendingDown, RefreshCw, FileText } from "lucide-react";

export default function B2BPage() {
  const [submitted, setSubmitted] = useState(false);

  return (
    <div className="bg-white min-h-screen py-16 sm:py-24 text-slate-900 selection:bg-edelvin-blue selection:text-white">
      <div className="max-w-[1520px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-10">
        
        {/* Заголовок B2B */}
        <div className="pb-12 border-b border-slate-200 mb-14">
          <span className="font-sans text-xs font-bold tracking-[0.25em] text-edelvin-blue uppercase block mb-3">
            КОРПОРАТИВНИЙ СЕРВІС • ДОГОВІР З ПДВ
          </span>
          <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl font-normal tracking-tight text-slate-950">
            Співпраця з юридичними особами та бізнесом
          </h1>
          <p className="text-base sm:text-lg text-slate-700 font-normal mt-4 max-w-3xl leading-relaxed">
            Комплексне забезпечення компаній поліграфією, офісним папером, канцтоварами та сервісним обслуговуванням оргтехніки за єдиним договором з ПДВ. Працюємо з бюджетними установами та казначейством.
          </p>
        </div>

        {/* 3 ключові переваги B2B */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          <div className="border border-slate-200 bg-white p-8 sm:p-10 space-y-4 shadow-xs hover:border-slate-950 hover:shadow-xl transition-all duration-300">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <span className="font-sans text-xs font-bold text-slate-400 tracking-widest uppercase">
                01 / Бухгалтерія
              </span>
              <ShieldCheck className="w-5 h-5 text-edelvin-blue" />
            </div>
            <h3 className="font-serif text-2xl font-normal text-slate-950">
              Безготівковий розрахунок з ПДВ
            </h3>
            <p className="text-sm sm:text-base text-slate-700 font-normal leading-relaxed">
              Своєчасна реєстрація податкових накладних у ЄРПН, автоматичне формування рахунків-фактур та актів виконаних робіт через Вчасно або M.E.Doc.
            </p>
          </div>

          <div className="border border-slate-200 bg-white p-8 sm:p-10 space-y-4 shadow-xs hover:border-slate-950 hover:shadow-xl transition-all duration-300">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <span className="font-sans text-xs font-bold text-slate-400 tracking-widest uppercase">
                02 / Економіка
              </span>
              <TrendingDown className="w-5 h-5 text-edelvin-blue" />
            </div>
            <h3 className="font-serif text-2xl font-normal text-slate-950">
              Оптові прайси та відтермінування
            </h3>
            <p className="text-sm sm:text-base text-slate-700 font-normal leading-relaxed">
              Фіксація індивідуальних цін на офісний папір А4 і витратні матеріали. Можливість оплати з відстрочкою платежу для постійних контрагентів.
            </p>
          </div>

          <div className="border border-slate-200 bg-white p-8 sm:p-10 space-y-4 shadow-xs hover:border-slate-950 hover:shadow-xl transition-all duration-300">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <span className="font-sans text-xs font-bold text-slate-400 tracking-widest uppercase">
                03 / Швидкість
              </span>
              <RefreshCw className="w-5 h-5 text-edelvin-blue" />
            </div>
            <h3 className="font-serif text-2xl font-normal text-slate-950">
              Повторення тиражів в 1 клік
            </h3>
            <p className="text-sm sm:text-base text-slate-700 font-normal leading-relaxed">
              Зберігання затверджених оригінал-макетів у хмарному архіві друкарні. Швидкий запуск регулярних партій візиток, бланків чи сервісу без повторних узгоджень.
            </p>
          </div>
        </div>

        {/* Форма укладання договору */}
        <div className="bg-white border border-slate-300 p-8 sm:p-14 max-w-3xl shadow-sm rounded-sm">
          {submitted ? (
            <div className="py-12 text-center space-y-4">
              <CheckCircle2 className="w-14 h-14 text-edelvin-blue mx-auto" />
              <h3 className="font-serif text-3xl font-normal text-slate-950">
                Заявку на договір надіслано
              </h3>
              <p className="text-slate-600 text-sm max-w-md mx-auto">
                Наш провідний корпоративний менеджер підготує проєкт договору та зателефонує вам протягом 15 хвилин.
              </p>
              <button
                type="button"
                onClick={() => setSubmitted(false)}
                className="mt-4 text-xs font-sans uppercase font-bold text-edelvin-blue hover:underline cursor-pointer"
              >
                ← Надіслати ще одну заявку
              </button>
            </div>
          ) : (
            <>
              <span className="font-sans text-xs font-bold text-edelvin-blue uppercase tracking-widest block mb-2">
                ЗАЯВКА НА СПІВПРАЦЮ
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-normal text-slate-950">
                Отримати проєкт договору та B2B-прайс
              </h2>
              <p className="text-sm text-slate-600 font-normal mt-2 leading-relaxed">
                Залиште реквізити вашого підприємства, і наш корпоративний менеджер надішле комерційну пропозицію та пакет установчих документів.
              </p>

              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  setSubmitted(true);
                }}
                className="mt-8 space-y-5 text-xs font-sans"
              >
                <div>
                  <label className="block text-slate-700 uppercase font-bold tracking-wider text-[10px] mb-1.5">
                    Назва компанії (ТОВ / ПП / ФОП) *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="ТОВ «Назва підприємства»"
                    className="w-full bg-white border border-slate-300 p-3.5 text-slate-950 text-sm focus:outline-none focus:border-slate-950 transition-colors"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-slate-700 uppercase font-bold tracking-wider text-[10px] mb-1.5">
                      Код ЄДРПОУ / ІПН *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="8 цифр коду"
                      className="w-full bg-white border border-slate-300 p-3.5 text-slate-950 text-sm focus:outline-none focus:border-slate-950 transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-700 uppercase font-bold tracking-wider text-[10px] mb-1.5">
                      Контактний телефон *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="+38 (0__) ___-__-__"
                      className="w-full bg-white border border-slate-300 p-3.5 text-slate-950 text-sm focus:outline-none focus:border-slate-950 transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-slate-700 uppercase font-bold tracking-wider text-[10px] mb-1.5">
                    Орієнтовні потреби
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Щомісячне постачання паперу А4, друк рекламної поліграфії, обслуговування принтерів..."
                    className="w-full bg-white border border-slate-300 p-3.5 text-slate-950 text-sm focus:outline-none focus:border-slate-950 transition-colors"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-slate-950 text-white p-4 uppercase tracking-[0.2em] text-xs font-bold hover:bg-edelvin-blue transition-colors cursor-pointer text-center"
                >
                  Отримати пакет документів B2B →
                </button>
              </form>
            </>
          )}
        </div>

      </div>
    </div>
  );
}
