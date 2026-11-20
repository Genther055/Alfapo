"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, ArrowLeft } from "lucide-react";

interface TeamMember {
  id: string;
  name: string;
  role: string;
  department: "leadership" | "press" | "bindery" | "service";
  experience: string;
  bio: string;
  image: string;
}

const TEAM_MEMBERS: TeamMember[] = [
  // 1. Керівництво та технології (Leadership)
  {
    id: "director",
    name: "Людмила Трофимчук",
    role: "Директорка підприємства",
    department: "leadership",
    experience: "25+ років у поліграфії",
    bio: "Очільниця ТОВ «Торговий Дім \"Альфа і Омега\"». Понад 25 років веде підприємство від перших кроків до статусу лідера поліграфічного ринку з інноваційними цифровими комплексами Konica Minolta, масштабним книжковим виробництвом та експортом до США і країн Європи.",
    image: "/images/production/plant-facade.png",
  },
  {
    id: "chief-technologist",
    name: "Оксана Бондаренко",
    role: "Головний інженер-технолог",
    department: "leadership",
    experience: "19 років досвіду",
    bio: "Експерт з технологій додрукарської підготовки (Pre-press), профілювання кольору за стандартом ISO 12647 та підбору матеріалів під складні B2B-тиражі.",
    image: "/images/team/team-office.jpg",
  },

  // 2. Офсетний та цифровий друк (Manufacturing)
  {
    id: "lead-digital-operator",
    name: "Сергій Мельник",
    role: "Провідний оператор Konica Minolta",
    department: "press",
    experience: "16 років у цифровому друці",
    bio: "Майстер промислового цифрового комплексу Konica Minolta AccurioPress C7090. Спеціалізується на прецизійному друці на щільних крейдованих та дизайнерських картонах із калібруванням системи IQ-501.",
    image: "/images/cases/fest-limited-edition.jpg",
  },
  {
    id: "digital-lead",
    name: "Андрій Савчук",
    role: "Керівник дільниці цифрового друку",
    department: "press",
    experience: "11 років досвіду",
    bio: "Забезпечує терміновий випуск накладів за 24 години: друк сигнальних зразків, персоналізація продукції зі змінними даними та прецизійний випуск книг малими серіями.",
    image: "/images/production/office-team.jpg",
  },
  {
    id: "wide-format-operator",
    name: "Микола Данилюк",
    role: "Майстер широкоформатного друку",
    department: "press",
    experience: "9 років досвіду",
    bio: "Керує плотерними лініями інтер'єрного друку Mimaki: друк на полотні (холсті), литому банері 510 г/м², самоклейних плівках та плотерній контурній порізці стікерів.",
    image: "/images/cases/luxury-resort-navigation.jpg",
  },

  // 3. Палітурна мануфактура (Operations)
  {
    id: "bindery-master",
    name: "Тетяна Кравченко",
    role: "Майстер палітурки №7БЦ",
    department: "bindery",
    experience: "21 рік досвіду",
    bio: "Експерт у виготовленні елітних книг у твердій палітурці: ручне та автоматичне ниткошвейне скріплення блоків, кругляння корінця, вклеювання лясе та тиснення фольгою Kurz.",
    image: "/images/cases/luxury-restaurant-menu.jpg",
  },
  {
    id: "postpress-finisher",
    name: "Віктор Шевчук",
    role: "Спеціаліст тиснення та висічки",
    department: "bindery",
    experience: "14 років досвіду",
    bio: "Здійснює рельєфне конгревне тиснення, гаряче нанесення золота та срібла, а також точну фігурну висічку коробок, упаковки та презентаційних папок з кишенею.",
    image: "/images/cases/luxury-boutique-souvenirs.jpg",
  },
  {
    id: "pur-binding-operator",
    name: "Людмила Мороз",
    role: "Оператор ліній PUR-клейового скріплення",
    department: "bindery",
    experience: "12 років досвіду",
    bio: "Відповідає за виготовлення каталогів, звітів та книг у м'якій обкладинці з поліуретановим клеєм, який гарантує вільне розгортання видання на 180° без випадання сторінок.",
    image: "/images/cases/kids-books-games.png",
  },

  // 4. Клієнтський менеджмент та логістика (Sales)
  {
    id: "account-manager-b2b",
    name: "Олена Сидоренко",
    role: "Керівник відділу B2B-клієнтів",
    department: "service",
    experience: "10 років у компанії",
    bio: "Супровід корпоративних клієнтів: укладання річних договорів, взаємодія з казначейськими рахунками, тендерна документація та контроль термінів здачі тиражів.",
    image: "/images/team/team-office.jpg",
  },
  {
    id: "logistics-head",
    name: "Валерій Поліщук",
    role: "Керівник служби логістики",
    department: "service",
    experience: "15 років у компанії",
    bio: "Координує прямі відвантаження офісного паперу зі складу та адресну доставку готової поліграфічної продукції власним автопарком підприємства по Вінниці та Україні.",
    image: "/images/production/plant-facade.png",
  },
];

export default function TeamPage() {
  const [activeDept, setActiveDept] = useState<string>("all");

  const filteredMembers = TEAM_MEMBERS.filter(
    (m) => activeDept === "all" || m.department === activeDept
  );

  const departments = [
    { id: "all", code: "00", name: "Всі фахівці" },
    { id: "leadership", code: "01", name: "Керівництво та технології" },
    { id: "press", code: "02", name: "Цифровий та широкоформатний друк" },
    { id: "bindery", code: "03", name: "Палітурна мануфактура" },
    { id: "service", code: "04", name: "Клієнтський менеджмент та логістика" },
  ];

  return (
    <div className="bg-white min-h-screen py-16 sm:py-24 text-slate-900 selection:bg-slate-900 selection:text-white">
      <div className="max-w-[1520px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-10">
        
        {/* Навігаційний лінк повернення */}
        <div className="mb-10">
          <Link
            href="/about"
            className="inline-flex items-center gap-2 text-xs font-sans uppercase tracking-widest text-slate-500 hover:text-slate-950 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Назад до «Про нас»</span>
          </Link>
        </div>

        {/* Головний заголовок сторінки у стилі референсу Hemlock: чиста антиква, нуль AI-блоків */}
        <div className="pb-16 border-b border-slate-200">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-start">
            
            {/* Ліва колонка: Заголовок та маніфест */}
            <div className="lg:col-span-7 space-y-6">
              <h1 className="font-serif text-6xl sm:text-7xl lg:text-8xl font-normal tracking-tight text-slate-950 leading-[1.05]">
                Наша команда
              </h1>
              <p className="text-lg sm:text-xl text-slate-700 font-normal leading-relaxed max-w-2xl">
                Команда «Альфа і Омега» поєднує культуру точності, пристрасть до друкарського ремесла та понад 25 років безперервного виробничого досвіду, що дозволяє реалізовувати найскладніші поліграфічні завдання для наших партнерів.
              </p>
              <p className="text-sm sm:text-base text-slate-600 font-light leading-relaxed max-w-2xl">
                Ми пишаємося нашою командою та завжди відкриті для майстрів із досвідом і щирою любов'ю до якісного друку.
              </p>
            </div>

            {/* Права колонка: Інтерактивний рубрикатор напрямів (як на референсі Hemlock: 01 — Sales, 02 — Operations...) */}
            <div className="lg:col-span-5 space-y-1.5 lg:pl-8 lg:border-l lg:border-slate-200 pt-2 lg:pt-6">
              <span className="font-sans text-[10px] font-bold uppercase tracking-widest text-slate-400 block mb-3">
                ВІДДІЛИ ТА НАПРЯМКИ
              </span>
              {departments.map((dept) => {
                const isActive = activeDept === dept.id;
                return (
                  <button
                    key={dept.id}
                    type="button"
                    onClick={() => setActiveDept(dept.id)}
                    className={`w-full text-left py-2 px-2.5 rounded-xs flex items-center justify-between text-base sm:text-lg font-serif transition-all cursor-pointer ${
                      isActive
                        ? "text-slate-950 font-semibold bg-slate-50 border-l-2 border-slate-950"
                        : "text-slate-600 hover:text-slate-950 hover:bg-slate-50/50"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="font-sans text-xs text-slate-400">
                        {dept.code} —
                      </span>
                      <span>{dept.name}</span>
                    </div>
                    {isActive && <span className="font-sans text-xs text-slate-950">●</span>}
                  </button>
                );
              })}
            </div>

          </div>
        </div>

        {/* Сітка карток співробітників (точно як на референсі Our Team) */}
        <div className="py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 lg:gap-14">
            {filteredMembers.map((member) => (
              <div
                key={member.id}
                className="group flex flex-col justify-between border-b border-slate-200 pb-10"
              >
                <div>
                  {/* Портретна світлина з плавним делікатним зумом на ховері */}
                  <div className="relative aspect-[4/3] w-full overflow-hidden bg-slate-100 rounded-xs border border-slate-200 mb-6 group-hover:border-slate-950 transition-colors">
                    <Image
                      src={member.image}
                      alt={member.name}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                    />
                  </div>

                  {/* Текстова частина: Роль + Досвід + Ім'я */}
                  <div className="space-y-1.5">
                    <div className="flex justify-between items-baseline gap-2">
                      <p className="text-xs font-sans font-bold uppercase tracking-wider text-slate-600">
                        {member.role}
                      </p>
                      <span className="text-[11px] font-sans text-slate-400 font-normal shrink-0">
                        {member.experience}
                      </span>
                    </div>
                    <h3 className="font-serif text-2xl sm:text-3xl font-normal text-slate-950 leading-snug group-hover:underline underline-offset-4 transition-all">
                      {member.name}
                    </h3>
                    <p className="text-sm sm:text-base text-slate-700 font-normal leading-relaxed pt-2">
                      {member.bio}
                    </p>
                  </div>
                </div>

                {/* Нижня панель звернення без голубого кольору */}
                <div className="pt-6 mt-6 border-t border-slate-100 flex items-center justify-between text-xs font-sans">
                  <span className="text-slate-400">ТОВ «Альфа і Омега»</span>
                  <a
                    href="/#direct-contact"
                    className="text-slate-950 font-bold uppercase tracking-wider hover:underline underline-offset-2 transition-all inline-flex items-center gap-1"
                  >
                    <span>Зв'язатися</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Careers Section */}
        <div className="mt-8 p-8 sm:p-14 border border-slate-950 bg-slate-950 text-white flex flex-col md:flex-row justify-between items-start md:items-center gap-8 rounded-xs">
          <div className="space-y-3 max-w-2xl">
            <span className="font-sans text-xs font-bold uppercase tracking-widest text-slate-400 block">
              КАР'ЄРА В ДРУКАРНІ «АЛЬФА І ОМЕГА»
            </span>
            <h3 className="font-serif text-3xl sm:text-4xl font-normal text-white leading-tight">
              Бажаєте стати частиною нашої поліграфічної команди?
            </h3>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              Ми завжди раді кваліфікованим друкарям, операторам фальцювальних і палітурних комплексів, дизайнерам-верстальникам та менеджерам із продажу.
            </p>
          </div>

          <a
            href="mailto:print@edelvin.com.ua"
            className="font-sans text-xs font-bold uppercase tracking-[0.2em] bg-white text-slate-950 hover:bg-slate-200 px-7 py-4 rounded-xs transition-colors shrink-0 inline-flex items-center gap-2"
          >
            <span>Надіслати резюме</span>
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>

      </div>
    </div>
  );
}
