import React from "react";
import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="bg-[#0c0e10] text-slate-400 text-xs py-20 border-t border-white/10">
      <div className="max-w-[1520px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-16 pb-16 border-b border-white/10">
          
          {/* Колонка 1: Бренд та реквізити */}
          <div className="md:col-span-4 space-y-5">
            <Link href="/" className="inline-flex items-center gap-3.5 group">
              <div className="relative w-12 h-12 shrink-0">
                <Image
                  src="/images/ao-logo.png"
                  alt="ТОВ «Альфа і Омега»"
                  fill
                  className="object-contain transition-transform duration-200 group-hover:scale-105"
                />
              </div>
              <div>
                <span className="font-serif text-2xl sm:text-3xl font-normal tracking-[0.16em] text-white uppercase group-hover:text-edelvin-blue transition-colors block">
                  АЛЬФА І ОМЕГА
                </span>
                <span className="font-sans text-xs text-slate-400 uppercase tracking-[0.14em] block mt-0.5 font-medium">
                  Поліграфічний комплекс • Вінниця • З 1998 року
                </span>
              </div>
            </Link>

            <p className="text-slate-400 font-normal text-xs sm:text-sm leading-relaxed max-w-sm">
              Виробничий комплекс повного циклу. Понад 1 000 000 одиниць поліграфічної продукції щомісяця: книги у твердій палітурці 7БЦ, серійні етикетки для бізнесу, упаковка та складське постачання паперу.
            </p>

            <div className="font-sans text-xs text-slate-400 pt-2 space-y-1">
              <div>21027, м. Вінниця, вул. 600-річчя, 17</div>
              <div>Безготівковий розрахунок з ПДВ • Казначейство</div>
            </div>
          </div>

          {/* Колонка 2: Виробничі напрями */}
          <div className="md:col-span-3 space-y-3">
            <span className="font-sans text-xs uppercase font-bold tracking-[0.16em] text-white block mb-4">
              ВИРОБНИЦТВО
            </span>
            <ul className="space-y-2 text-slate-400 font-normal text-xs sm:text-sm">
              <li><Link href="/capabilities" className="text-white hover:text-edelvin-blue font-medium transition-colors">Виробничі можливості B2B</Link></li>
              <li><Link href="/catalog" className="hover:text-white transition-colors">Книги у твердій палітурці 7БЦ</Link></li>
              <li><Link href="/catalog" className="hover:text-white transition-colors">Презентаційні каталоги та журнали</Link></li>
              <li><Link href="/catalog" className="hover:text-white transition-colors">Самоклейні етикетки та стікери</Link></li>
              <li><Link href="/catalog" className="hover:text-white transition-colors">Цифровий друк Konica Minolta</Link></li>
              <li><Link href="/catalog" className="hover:text-white transition-colors">Широкоформатний друк та контурна висічка</Link></li>
            </ul>
          </div>

          {/* Колонка 3: Склад і сервіс */}
          <div className="md:col-span-2 space-y-3">
            <span className="font-sans text-xs uppercase font-bold tracking-[0.16em] text-white block mb-4">
              МАГАЗИН ТА B2B
            </span>
            <ul className="space-y-2 text-slate-400 font-normal text-xs sm:text-sm">
              <li><Link href="/shop" className="hover:text-white transition-colors">Офісний папір А4 та А3</Link></li>
              <li><Link href="/shop" className="hover:text-white transition-colors">Шкільні журнали та бланки</Link></li>
              <li><Link href="/shop" className="hover:text-white transition-colors">Папки та архівні системи</Link></li>
              <li><Link href="/b2b" className="hover:text-white transition-colors">Договір B2B для компаній</Link></li>
              <li><Link href="/about" className="hover:text-white transition-colors">Про мануфактуру</Link></li>
            </ul>
          </div>

          {/* Колонка 4: Прямі контакти */}
          <div className="md:col-span-3 space-y-4 font-sans text-xs">
            <span className="font-sans text-xs uppercase font-bold tracking-[0.16em] text-white block mb-4">
              ПРЯМІ КОНТАКТИ
            </span>
            
            <div className="space-y-1">
              <span className="text-slate-500 block text-[10px] uppercase font-bold">Відділ поліграфії:</span>
              <a href="tel:+380689860016" className="text-slate-200 hover:text-edelvin-blue block font-semibold transition-colors">
                +38 (068) 986-00-16
              </a>
              <span className="text-slate-500 text-[11px]">print@edelvin.com.ua</span>
            </div>

            <div className="space-y-1 pt-2 border-t border-white/10">
              <span className="text-slate-500 block text-[10px] uppercase font-bold">Канцтовари та папір:</span>
              <a href="tel:+380671841731" className="text-slate-200 hover:text-edelvin-blue block font-semibold transition-colors">
                +38 (067) 184-17-31
              </a>
            </div>

            <div className="space-y-1 pt-2 border-t border-white/10">
              <span className="text-slate-500 block text-[10px] uppercase font-bold">Сервісний центр:</span>
              <a href="tel:+380432550333" className="text-slate-200 hover:text-edelvin-blue block font-semibold transition-colors">
                +38 (0432) 550-333
              </a>
            </div>
          </div>

        </div>

        {/* Нижня лінія */}
        <div className="pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs font-sans text-slate-500">
          <div>© {new Date().getFullYear()} ТОВ «Альфа і Омега». Всі права захищено.</div>
          <div className="flex gap-6">
            <span>м. Вінниця, вул. 600-річчя, 17</span>
            <span>Поліграфія замкнутого циклу</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
