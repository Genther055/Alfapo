"use client";

import React, { useState } from "react";
import { CheckCircle2, Phone, Mail, Clock, Send, ShieldCheck } from "lucide-react";

interface ProductInquiryFormProps {
  productName: string;
  turnaround: string;
  minQty: number;
}

export default function ProductInquiryForm({
  productName,
  turnaround,
  minQty,
}: ProductInquiryFormProps) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [qty, setQty] = useState("");
  const [notes, setNotes] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
    }, 500);
  };

  return (
    <div className="border border-slate-200 bg-white p-8 sm:p-10 rounded-xs shadow-xs">
      <div className="max-w-xl">
        <span className="font-sans text-xs font-bold uppercase tracking-[0.22em] text-edelvin-blue block mb-2">
          Прямий зв'язок з виробництвом
        </span>
        <h3 className="font-serif text-2xl sm:text-3xl text-slate-950 font-normal leading-snug">
          Отримати консультацію або замовити тираж
        </h3>
        <p className="font-sans text-xs sm:text-sm text-slate-600 font-normal mt-2 leading-relaxed">
          Наш технолог проконсультує щодо оптимального паперу, способу друку та оздоблення під ваші задачі.
        </p>
      </div>

      {submitted ? (
        <div className="mt-8 p-6 bg-slate-50 border border-slate-200 rounded-xs text-center space-y-3">
          <div className="w-10 h-10 rounded-full bg-slate-950 text-white flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-5 h-5 text-white" />
          </div>
          <h4 className="font-serif text-xl text-slate-950 font-normal">
            Запит успішно надіслано
          </h4>
          <p className="font-sans text-xs sm:text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
            Дякуємо! Спеціаліст зв'яжеться з вами найближчим часом для узгодження деталей та розрахунку накладу для виробу «{productName}».
          </p>
          <button
            type="button"
            onClick={() => setSubmitted(false)}
            className="text-xs font-sans font-bold text-slate-950 underline hover:text-edelvin-blue pt-2 inline-block"
          >
            Надіслати ще один запит
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="mt-8 space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-sans font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Ваше ім'я *
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Олександр"
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 text-slate-900 text-sm focus:border-slate-950 focus:bg-white focus:outline-none transition-colors rounded-xs"
              />
            </div>
            <div>
              <label className="block text-xs font-sans font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Номер телефону *
              </label>
              <input
                type="tel"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+380"
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 text-slate-900 text-sm focus:border-slate-950 focus:bg-white focus:outline-none transition-colors rounded-xs"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-sans text-slate-600 font-bold uppercase tracking-wider mb-1.5">
                Орієнтовний тираж (від {minQty} шт)
              </label>
              <input
                type="text"
                value={qty}
                onChange={(e) => setQty(e.target.value)}
                placeholder={`наприклад: ${minQty * 5} шт`}
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 text-slate-900 text-sm focus:border-slate-950 focus:bg-white focus:outline-none transition-colors rounded-xs"
              />
            </div>
            <div>
              <label className="block text-xs font-sans text-slate-600 font-bold uppercase tracking-wider mb-1.5">
                Термін виконання
              </label>
              <div className="w-full px-4 py-3 bg-slate-100 border border-slate-200 text-slate-700 text-sm rounded-xs flex items-center gap-2">
                <Clock className="w-4 h-4 text-slate-400 shrink-0" />
                <span>Стандартно {turnaround}</span>
              </div>
            </div>
          </div>

          <div>
            <label className="block text-xs font-sans text-slate-600 font-bold uppercase tracking-wider mb-1.5">
              Побажання щодо матеріалів або технічного завдання
            </label>
            <textarea
              rows={3}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Формат, побажання щодо паперу, наявність готового макету або необхідність підготовки..."
              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 text-slate-900 text-sm focus:border-slate-950 focus:bg-white focus:outline-none transition-colors rounded-xs resize-none"
            />
          </div>

          <div className="pt-2 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full sm:w-auto px-8 py-3.5 bg-slate-950 text-white font-sans text-xs font-bold uppercase tracking-widest hover:bg-edelvin-blue transition-colors rounded-xs flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
            >
              <span>{isSubmitting ? "Надсилаємо..." : "Надіслати запит технологу"}</span>
              <Send className="w-3.5 h-3.5" />
            </button>

            <span className="text-[11px] font-sans text-slate-500 flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-slate-400" />
              <span>Безкоштовна технічна перевірка макету</span>
            </span>
          </div>
        </form>
      )}

      {/* Швидкі контакти для оперативного зв'язку */}
      <div className="mt-8 pt-6 border-t border-slate-100 flex flex-wrap items-center justify-between gap-4 font-sans text-xs text-slate-600">
        <span className="font-bold text-slate-900">Або зв'яжіться з нами напряму:</span>
        <div className="flex flex-wrap items-center gap-6">
          <a
            href="tel:+380432550333"
            className="flex items-center gap-1.5 text-slate-950 font-bold hover:text-edelvin-blue transition-colors"
          >
            <Phone className="w-3.5 h-3.5 text-edelvin-blue" />
            <span>+38 (0432) 550-333</span>
          </a>
          <a
            href="tel:+380689860016"
            className="flex items-center gap-1.5 text-slate-950 font-bold hover:text-edelvin-blue transition-colors"
          >
            <Phone className="w-3.5 h-3.5 text-edelvin-blue" />
            <span>+38 (068) 986-00-16</span>
          </a>
          <a
            href="mailto:print@edelvin.com.ua"
            className="flex items-center gap-1.5 text-slate-700 hover:text-edelvin-blue transition-colors"
          >
            <Mail className="w-3.5 h-3.5 text-slate-400" />
            <span>print@edelvin.com.ua</span>
          </a>
        </div>
      </div>
    </div>
  );
}
