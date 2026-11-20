"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Trash2, ArrowRight, CheckCircle2, ShieldCheck, Truck, Building2 } from "lucide-react";

export default function CartPage() {
  const [deliveryType, setDeliveryType] = useState<"pickup" | "novaposhta">("pickup");
  const [paymentType, setPaymentType] = useState<"mono" | "vat">("mono");
  const [orderSent, setOrderSent] = useState(false);

  // Спільний кошик клієнта
  const [items, setItems] = useState<Array<{
    id: string;
    title: string;
    specs: string;
    type: string;
    qty: number;
    price: number;
  }>>([]);

  const subtotal = items.reduce((acc, curr) => acc + curr.price, 0);

  const removeItem = (id: string) => {
    setItems(items.filter((i) => i.id !== id));
  };

  const handleCheckout = (e: React.FormEvent) => {
    e.preventDefault();
    setOrderSent(true);
  };

  return (
    <div className="bg-white min-h-screen py-16 sm:py-24 text-slate-900 selection:bg-edelvin-blue selection:text-white">
      <div className="max-w-[1520px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-10">
        
        {/* Заголовок */}
        <div className="pb-12 border-b border-slate-200 mb-12">
          <span className="font-sans text-xs font-bold tracking-[0.25em] text-edelvin-blue uppercase block mb-3">
            ОФОРМЛЕННЯ ЗАМОВЛЕННЯ
          </span>
          <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl font-normal tracking-tight text-slate-950">
            Єдиний кошик замовлення
          </h1>
          <p className="text-base sm:text-lg text-slate-700 font-normal mt-4 max-w-2xl leading-relaxed">
            Поліграфічна продукція на друк та готові складські канцтовари оформлюються разом в одну спільну накладну.
          </p>
        </div>

        {orderSent ? (
          <div className="max-w-2xl mx-auto bg-white border border-slate-300 p-12 sm:p-16 text-center space-y-6 shadow-sm rounded-sm">
            <CheckCircle2 className="w-16 h-16 text-edelvin-blue mx-auto" />
            <span className="font-sans text-xs font-bold uppercase tracking-widest text-slate-500 block">
              Замовлення №ED-2026-8491 успішно прийнято
            </span>
            <h2 className="font-serif text-4xl font-normal text-slate-950">
              Дякуємо за ваше замовлення
            </h2>
            <p className="text-sm sm:text-base text-slate-700 font-normal leading-relaxed max-w-lg mx-auto">
              Дані успішно передано у внутрішню чергу виробництва. Наш провідний менеджер перевірить параметри макета і зв'яжеться з вами протягом 15 хвилин.
            </p>
            <div className="pt-6">
              <Link
                href="/"
                className="inline-block bg-slate-950 text-white px-8 py-4 font-sans text-xs uppercase tracking-[0.2em] font-bold hover:bg-edelvin-blue transition-colors cursor-pointer"
              >
                Повернутися на головну →
              </Link>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            
            {/* ЛІВА ЧАСТИНА: СПИСОК ТОВАРІВ */}
            <div className="lg:col-span-7 space-y-6">
              <div className="bg-white border border-slate-200 divide-y divide-slate-200 shadow-xs">
                {items.length === 0 ? (
                  <div className="p-16 text-center font-sans text-xs text-slate-500 space-y-4">
                    <p>Ваш кошик зараз порожній.</p>
                    <Link
                      href="/catalog"
                      className="inline-block text-xs uppercase font-bold text-slate-950 underline hover:text-edelvin-blue"
                    >
                      Перейти до каталогу продукції →
                    </Link>
                  </div>
                ) : (
                  items.map((item) => (
                    <div key={item.id} className="p-6 sm:p-8 flex flex-col sm:flex-row justify-between items-start gap-6">
                      <div className="space-y-2">
                        <span className="font-sans text-[10px] font-bold uppercase tracking-widest text-edelvin-blue bg-blue-50 border border-blue-200 px-2.5 py-0.5 rounded-xs">
                          {item.type}
                        </span>
                        <h3 className="font-serif text-2xl font-normal text-slate-950 mt-1 leading-snug">
                          {item.title}
                        </h3>
                        <p className="font-sans text-xs text-slate-600">
                          {item.specs}
                        </p>
                        <span className="font-sans text-xs font-bold text-slate-800 block pt-1">
                          Кількість: {item.qty} шт
                        </span>
                      </div>

                      <div className="flex sm:flex-col items-end justify-between w-full sm:w-auto gap-4 shrink-0">
                        <span className="font-sans text-2xl font-bold text-slate-950">
                          {item.price.toFixed(2)} ₴
                        </span>
                        <button
                          type="button"
                          onClick={() => removeItem(item.id)}
                          className="font-sans text-xs text-slate-400 hover:text-red-600 uppercase flex items-center gap-1 cursor-pointer transition-colors"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                          <span>Видалити</span>
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>

              <div className="flex flex-wrap justify-between items-center text-xs font-sans font-bold gap-4 pt-2">
                <Link href="/catalog" className="hover:text-edelvin-blue transition-colors text-slate-700">
                  ← Продовжити вибір у каталозі
                </Link>
                <Link href="/shop" className="hover:text-edelvin-blue transition-colors text-slate-700">
                  + Додати канцтовари зі складу
                </Link>
              </div>
            </div>

            {/* ПРАВА ЧАСТИНА: ДЕТАЛІ ОФОРМЛЕННЯ ТА ЧЕКАУТ */}
            <div className="lg:col-span-5 bg-white border border-slate-300 p-8 sm:p-10 space-y-6 shadow-sm rounded-sm">
              
              <div className="border-b border-slate-200 pb-4">
                <span className="font-sans text-xs font-bold tracking-wider text-slate-500 uppercase block mb-1">
                  ПІДСУМОК ЗАМОВЛЕННЯ
                </span>
                <div className="flex justify-between items-baseline mt-2">
                  <span className="font-serif text-xl text-slate-700">Разом до сплати:</span>
                  <span className="font-sans text-3xl font-bold text-slate-950">
                    {subtotal.toFixed(2)} ₴
                  </span>
                </div>
              </div>

              <form onSubmit={handleCheckout} className="space-y-5 text-xs font-sans">
                <div>
                  <label className="block text-slate-700 text-[10px] uppercase font-bold tracking-wider mb-1.5">
                    Контактна особа або назва компанії *
                  </label>
                  <input
                    type="text"
                    required
                    className="w-full bg-white border border-slate-300 p-3.5 text-slate-950 text-sm focus:outline-none focus:border-slate-950 transition-colors"
                    placeholder="ТОВ / ПІБ замовника"
                  />
                </div>

                <div>
                  <label className="block text-slate-700 text-[10px] uppercase font-bold tracking-wider mb-1.5">
                    Контактний номер телефону *
                  </label>
                  <input
                    type="tel"
                    required
                    className="w-full bg-white border border-slate-300 p-3.5 text-slate-950 text-sm focus:outline-none focus:border-slate-950 transition-colors"
                    placeholder="+38 (0__) ___-__-__"
                  />
                </div>

                {/* Спосіб отримання */}
                <div className="space-y-2 pt-2">
                  <label className="block text-slate-700 text-[10px] uppercase font-bold tracking-wider mb-1">
                    Спосіб отримання
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      type="button"
                      onClick={() => setDeliveryType("pickup")}
                      className={`p-3 text-left border transition-all cursor-pointer ${
                        deliveryType === "pickup"
                          ? "border-slate-950 bg-slate-50 text-slate-950 font-bold"
                          : "border-slate-300 text-slate-600 hover:border-slate-400"
                      }`}
                    >
                      <Building2 className="w-4 h-4 mb-1 text-edelvin-blue" />
                      <span className="block text-xs">Самовивіз</span>
                      <span className="text-[10px] font-normal text-slate-500">вул. 600-річчя, 17</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setDeliveryType("novaposhta")}
                      className={`p-3 text-left border transition-all cursor-pointer ${
                        deliveryType === "novaposhta"
                          ? "border-slate-950 bg-slate-50 text-slate-950 font-bold"
                          : "border-slate-300 text-slate-600 hover:border-slate-400"
                      }`}
                    >
                      <Truck className="w-4 h-4 mb-1 text-edelvin-blue" />
                      <span className="block text-xs">Нова Пошта</span>
                      <span className="text-[10px] font-normal text-slate-500">По всій Україні</span>
                    </button>
                  </div>
                </div>

                {/* Форма оплати */}
                <div className="space-y-2 pt-2">
                  <label className="block text-slate-700 text-[10px] uppercase font-bold tracking-wider mb-1">
                    Форма розрахунку
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      type="button"
                      onClick={() => setPaymentType("mono")}
                      className={`p-3 text-left border transition-all cursor-pointer ${
                        paymentType === "mono"
                          ? "border-slate-950 bg-slate-50 text-slate-950 font-bold"
                          : "border-slate-300 text-slate-600 hover:border-slate-400"
                      }`}
                    >
                      <ShieldCheck className="w-4 h-4 mb-1 text-edelvin-blue" />
                      <span className="block text-xs">Карткою / LiqPay</span>
                      <span className="text-[10px] font-normal text-slate-500">Без комісії</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setPaymentType("vat")}
                      className={`p-3 text-left border transition-all cursor-pointer ${
                        paymentType === "vat"
                          ? "border-slate-950 bg-slate-50 text-slate-950 font-bold"
                          : "border-slate-300 text-slate-600 hover:border-slate-400"
                      }`}
                    >
                      <Building2 className="w-4 h-4 mb-1 text-edelvin-blue" />
                      <span className="block text-xs">Безготівка з ПДВ</span>
                      <span className="text-[10px] font-normal text-slate-500">Рахунок-фактура</span>
                    </button>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={items.length === 0}
                  className="w-full mt-4 bg-slate-950 text-white p-4 uppercase tracking-[0.2em] text-xs font-bold hover:bg-edelvin-blue transition-colors cursor-pointer text-center disabled:opacity-50"
                >
                  Підтвердити замовлення →
                </button>
              </form>

            </div>

          </div>
        )}

      </div>
    </div>
  );
}
