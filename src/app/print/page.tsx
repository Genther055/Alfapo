"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Printer,
  Layers,
  Sparkles,
  BookOpen,
  CheckCircle2,
  FileCheck,
  ArrowRight,
  ShieldCheck,
  Cpu,
  Clock,
  Compass,
  Phone,
} from "lucide-react";
import ScrollRevealText from "@/components/ScrollRevealText";
import ProductCarousel, { CarouselItem } from "@/components/ProductCarousel";
import FullWidthVideoSection from "@/components/FullWidthVideoSection";

// Реальні технологічні зразки виробництва
const PRINT_SHOWCASE_ITEMS: CarouselItem[] = [
  {
    id: "roll-label-prod",
    title: "Промислова рулонна лінія",
    subtitle: "AccurioLabel 400 • Безперервна намотка на втулку",
    category: "Рулонний друк",
    image: "/images/production/roll-label-machine.png",
    description: "Серійний друк самоклейної етикетки з фігурною плотерною висічкою Scorpio Vorey. Готові рулони для автоматичних ліній розливу замовника.",
    badge: "AccurioLabel 400",
    link: "/catalog/roll-labels",
  },
  {
    id: "luxury-menu-prod",
    title: "Палітурні комплекти для готелів та ресторанів",
    subtitle: "Тверда палітурка з екошкіри • Гаряче тиснення золотом",
    category: "Палітурна мануфактура",
    image: "/images/cases/luxury-restaurant-menu.jpg",
    description: "Головні меню, карти вин, теки гостя, Reserved. Стійкість до вологи, каптал та стрічка-лясе для щоденного інтенсивного використання.",
    badge: "Horizon 7БЦ",
    link: "/catalog/restaurant-menus",
  },
  {
    id: "kids-games-prod",
    title: "Дитячі видання, настільні ігри та картки",
    subtitle: "Activity books, стікерпаки, ігрові поля та фігурки",
    category: "Kids Print & Games",
    image: "/images/cases/kids-books-games.png",
    description: "Комплексний випуск дитячої поліграфії з картонними ложементами, кругленими кутами та безпечними фарбами з харчовими сертифікатами.",
    badge: "Kids Line",
    link: "/catalog/kids-print",
  },
  {
    id: "srp-display-prod",
    title: "Шоубокси та полично-готова упаковка SRP",
    subtitle: "Шоубокси з висічними віконцями, воблери та шелфтокери",
    category: "Retail Packaging",
    image: "/images/cases/retail-srp-display.png",
    description: "Точна висічка картонної упаковки для супермаркетів та маркетплейсів. Швидка викладка на полицю з єдиним фірмовим стилем бренду.",
    badge: "Ритейл упаковка",
    link: "/catalog/boxes",
  },
  {
    id: "delicco-prod",
    title: "Серійні етикетки для банок та продуктів",
    subtitle: "Гірчиця, хрін, соуси, майонези та консервація",
    category: "Харчовий ритейл",
    image: "/images/labels/food-portfolio-delicco.png",
    description: "Стійкість до агресивних харчових середовищ, олій та низьких температур. Точне зчитування дрібного шрифту та обов'язкових ДСТУ-блоків.",
    badge: "Харчовий допуск",
    link: "/catalog/stickers",
  },
  {
    id: "boutique-boxes-prod",
    title: "Преміальні кашировані бокси та арт-альбоми",
    subtitle: "Картон 3 мм, шовкові стрічки, ложементи та фольга Kurz",
    category: "Подарункова упаковка",
    image: "/images/cases/luxury-boutique-souvenirs.jpg",
    description: "Ручна збірка подарункових коробок, тверда палітурка фотоальбомів, фірмові блокноти на спіралі з золотим тисненням.",
    badge: "Каширування",
    link: "/catalog/kashering",
  },
];

// Scroll fade-in animation container
function ScrollFadeIn({
  children,
  className = "",
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const rect = el.getBoundingClientRect();
    if (rect.top > window.innerHeight) {
      setIsVisible(false);

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.unobserve(el);
          }
        },
        { threshold: 0.05, rootMargin: "0px 0px 50px 0px" }
      );

      observer.observe(el);
      return () => observer.disconnect();
    }
  }, []);

  return (
    <div
      ref={ref}
      style={{
        transitionDelay: `${delay}ms`,
      }}
      className={`transition-all duration-700 ease-out will-change-transform ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
      } ${className}`}
    >
      {children}
    </div>
  );
}

// Parallax scroll image component
function ScrollParallaxImage({
  src,
  alt,
}: {
  src: string;
  alt: string;
}) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let ticking = false;

    const updateParallax = () => {
      const el = containerRef.current;
      if (!el) return;

      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;

      if (rect.bottom < -100 || rect.top > vh + 100) {
        ticking = false;
        return;
      }

      const total = vh + rect.height;
      const current = vh - rect.top;
      const progress = Math.max(0, Math.min(1, current / total));

      const translateY = (0.5 - progress) * 36;
      const opacity = progress < 0.12 ? Math.max(0.7, 0.7 + (progress / 0.12) * 0.3) : 1;

      el.style.transform = `translate3d(0, ${translateY.toFixed(1)}px, 0)`;
      el.style.opacity = opacity.toFixed(2);

      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(updateParallax);
        ticking = true;
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    updateParallax();

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative aspect-[16/10] w-full overflow-hidden shadow-sm bg-white will-change-transform rounded-xs border border-slate-200"
      style={{
        transform: "translate3d(0, 0px, 0)",
        transition: "opacity 0.2s ease-out",
      }}
    >
      <Image
        src={src}
        alt={alt}
        fill
        sizes="(max-width: 768px) 100vw, 50vw"
        className="object-cover transition-transform duration-700 hover:scale-105"
      />
    </div>
  );
}

const PRODUCTION_LINES = [
  {
    id: "digital-accurio",
    code: "01 / 05",
    title: "Цифровий комплекс Konica Minolta",
    subtitle: "AccurioPress C7090 Enhanced • Інтелектуальний автоконтроль кольору IQ-501",
    description:
      "Флагман нашого цифрового виробництва — дві індустріальні машини Konica Minolta AccurioPress C7090, включаючи новітню C7090 Enhanced з трьома лотками вакуумної пневматичної подачі, інтелектуальним модулем IQ-501 та додатковими фінішерами. Завдяки полімеризованому тонеру Simitri V друк має природну шовковисту фактуру без штучного глянцю, ідеальну градацію півтонів та 100% повторюваність кольору від 1-го до 100 000-го аркуша. Вбудований спектрофотометр IQ-501 у реальному часі сканує аркуші, калібрує плашки та гарантує прецизійне двостороннє суміщення «в точку». Також працюють три швидкісні цифрові машини bizhub PRO 958 для тиражування блоків.",
    specs: [
      "Швидкість друку: до 90 сторінок на хвилину А4 та до 48 сторінок SRA3 у повному кольорі",
      "Інтелектуальний блок IQ-501: автоматичний контроль кольору та суміщення лиця і звороту",
      "Формати: від 100 × 148 мм до банерного друку 330 × 1300 мм, дуплекс до 900 мм",
      "Щільність матеріалів: від 52 до 400 г/м², офсетний, крейдований, дизайнерський картон",
      "Мінімальний наклад: від 1 примірника без витрат на виведення друкарських форм",
      "Персоналізація: друк змінних даних, QR-кодів, нумерації та серійних штрихкодів",
    ],
    image: "/images/production/office-team.jpg",
  },
  {
    id: "roll-label",
    code: "02 / 05",
    title: "Цифрова рулонна етикетка",
    subtitle: "Konica Minolta AccurioLabel 400 • Фінішний плотер Scorpio Vorey VD 3350",
    description:
      "Промисловий комплекс для серійного виробництва рулонної самоклейної етикетки. Поєднання індустріальної ЦДМ Konica Minolta AccurioLabel 400 та цифрового фінішного плотера Scorpio Vorey VD 3350 дозволяє випускати наклейки будь-якої складності геометрії без виготовлення дорогих магнітних штампів та флексоформ. Продукція регулярно постачається для вітчизняних брендів та експортується до Іспанії та європейських замовників.",
    specs: [
      "Рулонне нанесення: автоматичне маркування на лініях розливу та фасування замовника",
      "Цифрова контурна висічка Scorpio Vorey: довільні контури, заокруглення, складні форми",
      "Основи: білий та прозорий поліпропілен, напівглянець, винний фактурний папір, металізована плівка",
      "Стійкість до вологи, конденсату, жирів, мастил та низьких температур морозильних камер",
      "Швидкісний запуск серійних SKU: зручно для тестування нових лінійок або ребрендингу",
    ],
    image: "/images/production/roll-label-machine.png",
  },
  {
    id: "bindery-horizon",
    code: "03 / 05",
    title: "Книжковий комплекс Horizon",
    subtitle: "Автоматична лінія підбирання та контролю якості • Тверда палітурка 7БЦ",
    description:
      "Автоматизована палітурна мануфактура повного циклу. Автоматична підбирально-зшивальна лінія Horizon здійснює комп'ютерну оптичну перевірку якості підбирання зошитів, ниткозшивні верстати забезпечують міцне зшивання блоків, а блоковставне обладнання монтує блоки у довговічну палітурку 7БЦ. Використовуються матеріали преміум-класу: оксамит, рогожка, екошкіра, тканина, а також автоматичний ламінатор та гаряче тиснення золотом і сріблом.",
    specs: [
      "Тверда палітурка 7БЦ на європейському палітурному картоні товщиною до 2.5 – 3.0 мм",
      "Ниткошвейне скріплення для комфортного розкриття книг на 180° без випадання сторінок",
      "Оздоблення: тиснення фольгою Kurz золото, срібло, голографія, вклеювання стрічки-лясе, каптал",
      "М'яка обкладинка: термоклей EVA та міцне поліуретанове PUR-скріплення блоків",
      "Досвід міжнародних відвантажень: експорт видань до США, Німеччини, Польщі та Ізраїлю",
    ],
    image: "/images/cases/luxury-boutique-souvenirs.jpg",
  },
  {
    id: "wide-format",
    code: "04 / 05",
    title: "Широкоформатний та інтер'єрний друк",
    subtitle: "Екосольвентні плотерні лінії Mimaki • Банери, полотна, самоклейка",
    description:
      "Високоточний інтер'єрний та екстер'єрний друк рекламних і художніх матеріалів. Виготовлення картин на художньому полотні на підрамниках для галерей, презентаційних постерів, фотозон, брендування торгових вітрин і корпоративного автотранспорту, а також широкоформатної самоклейної плівки Oracal та One Way Vision.",
    specs: [
      "Ширина друку: до 1600 мм без стиків з роздільною здатністю до 1440 DPI",
      "Матеріали: литий банер, художнє полотно, плівки Oracal, One Way Vision, Backlit",
      "Стійкість фарб до вологи, вигорання на сонці та сезонних коливань температур",
      "Високоточна плотерна порізка рекламних наліпок складної геометрії",
    ],
    image: "/images/cases/luxury-resort-navigation.jpg",
  },
  {
    id: "offset-fleet",
    code: "05 / 05",
    title: "Офсетне виробництво для великих тиражів",
    subtitle: "Комплекси Dominant 744 та Roland • Синергія з цифровими потужностями",
    description:
      "Для масштабних накладів від 5 000 – 10 000 примірників і вище застосовуються чотирифарбова офсетна машина Dominant 744 та монохромна машина Roland. Це забезпечує мінімальну собівартість книги, підручника чи журналу при незмінній європейській якості друку. У поєднанні з Konica Minolta клієнт може отримати перші 100 примірників на цифрі вже завтра, а основний 10-тисячний тираж — офсетом за графіком.",
    specs: [
      "Мінімальна собівартість примірника при накладах від 5 000 – 10 000 штук",
      "Висока лініатура растру, точна передача градієнтів та дрібних ілюстрацій",
      "Друк на сертифікованому офсетному та крейдованому папері від 60 до 350 г/м²",
      "Повне післядрукарське оснащення: швидкісне фальцювання, порізка та упаковка на палети",
    ],
    image: "/images/production/plant-facade.png",
  },
];

const PREPRESS_RULES = [
  {
    title: "Формат файлів",
    detail: "PDF версії 1.4 - 1.6 (стандарт PDF/X-1a:2001 або PDF/X-4). Всі сторінки однакового розміру та орієнтації.",
  },
  {
    title: "Колірний простір",
    detail: "CMYK (рекомендований профіль Coated FOGRA39). Вбудований спектрофотометр Konica Minolta виконує автоматичне апаратне профілювання та точну передачу кольору.",
  },
  {
    title: "Роздільна здатність",
    detail: "Усі растрові зображення повинні мати роздільну здатність 300 DPI у масштабі 1:1. Для штрихових чорно-білих елементів (Bitmap) — 1200 DPI.",
  },
  {
    title: "Вильоти під обріз (Bleeds)",
    detail: "Обов'язкові вильоти 2 - 3 мм з кожного боку виробу (для багатосторінкових видань у твердій палітурці — 5 мм). Важливі елементи — не ближче 4 мм до лінії різу.",
  },
  {
    title: "Шрифти та векторні контури",
    detail: "Усі шрифти обов'язково переведені у криві (Outlines / Curves) або повністю впроваджені (Embedded). Прозорості зведені.",
  },
  {
    title: "Сумарне покриття фарби (TIC / TAC)",
    detail: "Для цифрового тонера Simitri V не потрібен час на висихання — продукція готова до порізки, ламінації та палітурки одразу після виходу з машини.",
  },
];

export default function PrintPage() {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (totalScroll > 0) {
        setScrollProgress((window.scrollY / totalScroll) * 100);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="bg-white min-h-screen text-slate-900 selection:bg-edelvin-blue selection:text-white relative">
      
      {/* Top scroll progress bar */}
      <div
        style={{ width: `${scrollProgress}%` }}
        className="fixed top-0 left-0 h-[3px] bg-edelvin-blue z-50 pointer-events-none transition-all duration-150"
      />

            {/* 1. HERO SECTION                                              */}
            <section className="relative pt-20 pb-20 md:pt-28 md:pb-28 border-b border-slate-200 bg-white">
        <div className="max-w-[1520px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-10">
          
          <div className="max-w-5xl mx-auto text-center space-y-6">
            <h1 className="font-serif text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-normal tracking-tight text-slate-950 leading-[1.02]">
              Поліграфічний комплекс <br />
              <span className="italic font-light text-edelvin-blue">
                повного виробничого циклу.
              </span>
            </h1>

            <div className="max-w-3xl mx-auto pt-2">
              <ScrollRevealText
                text="Флагманський цифровий комплекс Konica Minolta AccurioPress C7090 Enhanced із інтелектуальним контролем кольору IQ-501: фотографічна якість від 1 примірника, оперативні тиражі в день замовлення та власна палітурна база."
                className="text-lg sm:text-xl md:text-2xl text-slate-600 leading-relaxed font-normal"
              />
            </div>

            <div className="pt-6 flex flex-wrap items-center justify-center gap-6 sm:gap-10">
              <Link
                href="/capabilities#order-form"
                className="inline-flex items-center gap-3 text-xs sm:text-sm font-bold tracking-[0.2em] uppercase text-white bg-slate-950 hover:bg-edelvin-blue px-8 py-4 transition-all duration-300 cursor-pointer shadow-sm hover:shadow-xl hover:-translate-y-0.5 group"
              >
                <span>Замовити консультацію накладу</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>

              <Link
                href="/catalog"
                className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold tracking-[0.2em] uppercase text-slate-950 hover:text-edelvin-blue border-b-2 border-slate-950 hover:border-edelvin-blue pb-1 transition-all cursor-pointer"
              >
                <span>Переглянути зразки у каталозі</span>
                <ArrowRight className="w-4 h-4 text-edelvin-blue" />
              </Link>
            </div>
          </div>

        </div>
      </section>

            {/* 2. МАНІФЕСТ ТЕХНОЛОГІЧНОЇ ТОЧНОСТІ                           */}
            <section className="py-20 lg:py-28 border-b border-slate-200 bg-white">
        <div className="max-w-[1520px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-10">
          
          <ScrollFadeIn>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-baseline">
              <div className="lg:col-span-5">
                
                <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-slate-950 font-normal leading-tight">
                  Стабільність кольору, інтелектуальний автоконтроль IQ-501 та запуск у день замовлення
                </h2>
              </div>
              <div className="lg:col-span-7">
                <div className="text-base sm:text-lg text-slate-600 leading-relaxed font-normal">
                  <ScrollRevealText text="Ми не є посередниками. Усе обладнання — від флагманської цифрової системи Konica Minolta AccurioPress C7090 Enhanced до фальцювальних ліній, ниткошвейного комплексу та автоматичного тиснення — зосереджено на власному майданчику у Вінниці по вул. 600-річчя, 17. Це гарантує миттєвий запуск без затримок на виведення форм і повний контроль якості кожного відбитка." />
                </div>
                <div className="mt-10 grid grid-cols-2 sm:grid-cols-4 gap-6 pt-8 border-t border-slate-200 font-sans text-xs">
                  <div>
                    <span className="block text-3xl sm:text-4xl font-serif text-slate-950 font-normal">1 год</span>
                    <span className="text-slate-500 uppercase tracking-wider text-[11px] mt-1 block">Швидкий запуск</span>
                  </div>
                  <div>
                    <span className="block text-3xl sm:text-4xl font-serif text-slate-950 font-normal">3600 DPI</span>
                    <span className="text-slate-500 uppercase tracking-wider text-[11px] mt-1 block">Тонер Simitri V</span>
                  </div>
                  <div>
                    <span className="block text-3xl sm:text-4xl font-serif text-slate-950 font-normal">IQ-501</span>
                    <span className="text-slate-500 uppercase tracking-wider text-[11px] mt-1 block">Автоконтроль кольору</span>
                  </div>
                  <div>
                    <span className="block text-3xl sm:text-4xl font-serif text-slate-950 font-normal">100%</span>
                    <span className="text-slate-500 uppercase tracking-wider text-[11px] mt-1 block">Власна база</span>
                  </div>
                </div>
              </div>
            </div>
          </ScrollFadeIn>

        </div>
      </section>

            {/* 2.5 КАРУСЕЛЬ: РЕАЛЬНІ ВИРОБНИЧІ РЕЗУЛЬТАТИ В ДІЇ            */}
            <section className="py-20 lg:py-28 border-b border-slate-200 bg-white">
        <div className="max-w-[1520px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-10">
          <ProductCarousel
            eyebrow="Зразки виробництва"
            title="Готова продукція"
            subtitle="Рулонна етикетка, ресторанні меню, картонні шоубокси та серійні пакувальні рішення."
            items={PRINT_SHOWCASE_ITEMS}
            aspectRatio="video"
            viewAllLink="/catalog"
            viewAllText="Відкрити весь каталог"
          />
        </div>
      </section>

      {/* ВІДЕО НА ВСЮ ШИРИНУ: АВТОМАТИЗОВАНЕ СКРІПЛЕННЯ КАЛЕНДАРІВ ТА ПРУЖИННИЙ БЛОК */}
      <FullWidthVideoSection
        videoSrc="/videos/calendar-renz.mp4"
        posterSrc="/videos/calendar-renz-poster.jpg"
        eyebrow="КОРПОРАТИВНІ ТА КВАРТАЛЬНІ КАЛЕНДАРІ"
        title="Швидкісна перфораційно-пружинна лінія RENZ"
        description="Промисловий монтаж металевої пружини Wire-O з ригелем для настінних перекидних та триблочних квартальних календарів. Висока продуктивність збирання тиражів від 50 до 10 000 примірників у стислі сезонні терміни."
        stats={[
          { label: "Швидкість збирання", value: "до 1 200/год" },
          { label: "Крок перфорації", value: "3:1 та 2:1" },
          { label: "Кольори пружини", value: "Біла, чорна, золото" },
          { label: "Формати", value: "від А5 до А2" },
        ]}
      />

            {/* ДОДРУКАРСЬКИЙ ВІДДІЛ ТА ІНЖЕНЕРНИЙ СУПРОВІД                  */}
            <section className="py-20 lg:py-28 border-b border-slate-200 bg-white">
        <div className="max-w-[1520px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-10">
          <ScrollFadeIn>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
              <div className="lg:col-span-6 space-y-6">
                <span className="font-sans text-xs font-bold tracking-[0.25em] text-edelvin-blue uppercase block">
                  КОМАНДА &amp; ТЕХНІЧНИЙ КОНТРОЛЬ
                </span>
                <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-slate-950 font-normal leading-tight">
                  Власний інженерний та додрукарський відділ
                </h2>
                <p className="text-base sm:text-lg text-slate-600 font-normal leading-relaxed">
                  45 кваліфікованих фахівців у Вінниці: препрес-інженери, технологи матеріалів, дизайнери пакування та майстри палітурної справи. Кожен файл проходить автоматичну й ручну перевірку на RIP-станціях перед запуском.
                </p>
                <div className="space-y-3 pt-4 border-t border-slate-200 text-sm text-slate-800">
                  <div className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-edelvin-blue shrink-0 mt-0.5" />
                    <span>Безкоштовна технічна перевірка макетів B2B-замовників: виліти, оверпринт, колірні профілі FOGRA39</span>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-edelvin-blue shrink-0 mt-0.5" />
                    <span>Розробка індивідуальних вирубних штампів для коробок, ложементів та фігурних етикеток</span>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-edelvin-blue shrink-0 mt-0.5" />
                    <span>Виготовлення фізичної цифрової кольоропроби або сигнального примірника перед тиражем</span>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-6">
                <div className="relative aspect-[16/10] w-full rounded-xs overflow-hidden border border-slate-200 shadow-lg">
                  <Image
                    src="/images/production/office-team.jpg"
                    alt="Інженерний та препрес-відділ підприємства «Альфа і Омега»"
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover hover:scale-103 transition-transform duration-700"
                  />
                  <div className="absolute bottom-3 left-3 right-3 bg-slate-950/85 backdrop-blur-xs text-white p-3 rounded-xs text-xs font-sans">
                    <span className="font-bold block">Робочий простір конструкторсько-технологічного відділу</span>
                    <span className="text-slate-300 text-[11px]">м. Вінниця, вул. 600-річчя, 17</span>
                  </div>
                </div>
              </div>
            </div>
          </ScrollFadeIn>
        </div>
      </section>

            {/* Production Lines */}
            <section className="py-20 lg:py-28 border-b border-slate-200 bg-white">
        <div className="max-w-[1520px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-10">
          
          <ScrollFadeIn>
            <div className="mb-14 pb-6 border-b border-slate-200">
              
              <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-slate-950 font-normal tracking-tight">
                Ключові виробничі комплекси підприємства
              </h2>
            </div>
          </ScrollFadeIn>

          <div className="space-y-24 lg:space-y-32">
            {PRODUCTION_LINES.map((line, idx) => (
              <ScrollFadeIn key={line.id} delay={idx * 60}>
                <div
                  id={line.id}
                  className={`grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center ${
                    idx % 2 === 1 ? "lg:flex-row-reverse" : ""
                  }`}
                >
                  <div className={`lg:col-span-6 ${idx % 2 === 1 ? "lg:order-2" : "lg:order-1"}`}>
                    
                    <h3 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-slate-950 font-normal leading-tight">
                      {line.title}
                    </h3>
                    <p className="text-sm sm:text-base text-slate-600 font-normal mt-2 leading-relaxed">
                      {line.subtitle}
                    </p>
                    <p className="text-base text-slate-700 font-normal mt-5 leading-relaxed">
                      {line.description}
                    </p>

                    <div className="mt-8 space-y-2.5 pt-6 border-t border-slate-200">
                      {line.specs.map((spec, sIdx) => (
                        <div key={sIdx} className="flex items-start gap-2.5 text-sm text-slate-800">
                          <CheckCircle2 className="w-4 h-4 text-edelvin-blue shrink-0 mt-0.5" />
                          <span>{spec}</span>
                        </div>
                      ))}
                    </div>

                    <div className="mt-8">
                      <Link
                        href="/capabilities#order-form"
                        className="inline-flex items-center gap-2 text-xs font-sans font-bold uppercase tracking-wider text-slate-950 hover:text-edelvin-blue transition-colors group cursor-pointer"
                      >
                        <span>Обговорити специфікацію з технологом</span>
                        <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                      </Link>
                    </div>
                  </div>

                  <div className={`lg:col-span-6 ${idx % 2 === 1 ? "lg:order-1" : "lg:order-2"}`}>
                    <ScrollParallaxImage src={line.image} alt={line.title} />
                  </div>
                </div>
              </ScrollFadeIn>
            ))}
          </div>

        </div>
      </section>

            {/* 4. ЧОМУ ЦЕ ПРАЦЮЄ ДЛЯ B2B ТА ГАЛУЗЕВІ РІШЕННЯ                */}
            <section className="py-20 lg:py-28 border-b border-slate-200 bg-white">
        <div className="max-w-[1520px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-10">
          
          <ScrollFadeIn>
            <div className="max-w-3xl mb-14 pb-6 border-b border-slate-200">
              
              <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-slate-950 font-normal tracking-tight">
                Чому це працює для B2B
              </h2>
              <p className="text-base sm:text-lg text-slate-600 font-normal mt-3 leading-relaxed">
                Не просто поліграфічний друк, а комплексні виробничі рішення під конкретну категорію вашого комерційного продукту.
              </p>
            </div>
          </ScrollFadeIn>

          {/* 4 стовпи B2B — чисті білі картки */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 mb-20">
            {[
              {
                num: "01",
                title: "Нішева релевантність",
                desc: "Спеціалізовані рішення для харчових продуктів, HoReCa, фармації, агросектору, напоїв та промислових товарів.",
              },
              {
                num: "02",
                title: "Серійність",
                desc: "Бренд може впевнено масштабувати десятки SKU в єдиному стандарті кольору, матеріалу та тактильності.",
              },
              {
                num: "03",
                title: "Виробничий контроль",
                desc: "Вхідний контроль європейських матеріалів, клеїв, лаків, фольги та автоматизована перевірка накладу.",
              },
              {
                num: "04",
                title: "Комерційна ясність",
                desc: "Прозора матриця базових конфігурацій, робота з казначейством, безготівка з ПДВ та формат під кожен чек.",
              },
            ].map((col, idx) => (
              <ScrollFadeIn key={col.num} delay={idx * 70}>
                <div className="p-8 bg-white border border-slate-200 rounded-xs hover:border-slate-950 hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 h-full flex flex-col justify-between">
                  <div>
                    
                    <h3 className="font-serif text-2xl text-slate-950 font-normal mb-2">{col.title}</h3>
                    <p className="text-sm text-slate-700 leading-relaxed font-normal">{col.desc}</p>
                  </div>
                </div>
              </ScrollFadeIn>
            ))}
          </div>

          {/* Галузеві сегменти */}
          <div className="pt-12 border-t border-slate-200">
            <ScrollFadeIn>
              <div className="mb-8">
                
                <h3 className="font-serif text-3xl sm:text-4xl text-slate-950 font-normal">
                  Одна виробнича база. Рішення для різних ринків
                </h3>
              </div>
            </ScrollFadeIn>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-5">
              {[
                { title: "Харчові продукти", desc: "Етикетка, пакування, картон", anchor: "/capabilities#food" },
                { title: "Напої та алкоголь", desc: "Винна етикетка, тиснення", anchor: "/capabilities#drinks" },
                { title: "E-commerce", desc: "Брендовані коробки, стікери", anchor: "/capabilities#horeca" },
                { title: "Косметика", desc: "Soft-Touch, вибірковий УФ", anchor: "/capabilities#nonfood" },
                { title: "Фармація", desc: "Інструкції, блістери, пачки", anchor: "/capabilities#packaging" },
                { title: "Преміальні лінійки", desc: "Індивідуальні штампи, 7БЦ", anchor: "/capabilities#sku" },
              ].map((m, idx) => (
                <ScrollFadeIn key={m.title} delay={idx * 60}>
                  <Link
                    href={m.anchor}
                    className="p-6 border border-slate-200 bg-white rounded-xs hover:border-slate-950 hover:shadow-xl hover:-translate-y-1 transition-all block h-full cursor-pointer group"
                  >
                    <span className="w-2 h-2 rounded-full bg-edelvin-blue block mb-3 group-hover:scale-125 transition-transform" />
                    <h4 className="font-serif text-xl text-slate-950 font-normal group-hover:text-edelvin-blue transition-colors">
                      {m.title}
                    </h4>
                    <p className="text-xs text-slate-500 mt-2 font-sans leading-relaxed">{m.desc}</p>
                  </Link>
                </ScrollFadeIn>
              ))}
            </div>
          </div>

          {/* 4 кроки співпраці — чисті білі картки */}
          <div className="mt-20 pt-14 border-t border-slate-200">
            <ScrollFadeIn>
              <div className="mb-8">
                
                <h3 className="font-serif text-3xl sm:text-4xl text-slate-950 font-normal">
                  Чотири прозорі кроки до готового накладу
                </h3>
              </div>
            </ScrollFadeIn>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { step: "01", title: "Бриф та макет", desc: "Узгодження технічного завдання, перевірка вильотів та колірних профілів." },
                { step: "02", title: "Підбір матеріалу", desc: "Вибір типу паперу, картону чи плівки за фізичними зразками." },
                { step: "03", title: "Тестовий зразок", desc: "Друк сигнального примірника або цифрової кольоропроби перед запуском." },
                { step: "04", title: "Наклад та логістика", desc: "Промисловий друк, палітурка, пакування та адресна доставка по Україні." },
              ].map((s, idx) => (
                <ScrollFadeIn key={s.step} delay={idx * 80}>
                  <div className="p-7 bg-white border border-slate-200 rounded-xs hover:border-slate-950 hover:shadow-xl hover:-translate-y-1 transition-all h-full">
                    
                    <h4 className="font-serif text-2xl text-slate-950 font-normal mb-2">{s.title}</h4>
                    <p className="text-sm text-slate-600 leading-relaxed">{s.desc}</p>
                  </div>
                </ScrollFadeIn>
              ))}
            </div>
          </div>

        </div>
      </section>

            {/* 5. ТЕХНІЧНІ ВИМОГИ ДО МАКЕТІВ                                */}
            <section className="py-20 lg:py-28 border-b border-slate-200 bg-white">
        <div className="max-w-[1520px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-10">
          
          <ScrollFadeIn>
            <div className="max-w-3xl mb-12 pb-6 border-b border-slate-200">
              
              <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-slate-950 font-normal tracking-tight">
                Технічні вимоги до макетів
              </h2>
              <p className="text-base sm:text-lg text-slate-600 font-normal mt-3 leading-relaxed">
                Дотримання цих поліграфічних стандартів гарантує точність кольору, різкість друку та швидкий запуск вашого накладу у друк без затримок.
              </p>
            </div>
          </ScrollFadeIn>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {PREPRESS_RULES.map((rule, idx) => (
              <ScrollFadeIn key={idx} delay={idx * 60}>
                <div className="p-8 bg-white border border-slate-200 flex flex-col justify-between hover:border-slate-950 hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 group rounded-xs h-full">
                  <div>
                    
                    <h3 className="font-serif text-2xl font-normal text-slate-950 group-hover:text-edelvin-blue transition-colors">
                      {rule.title}
                    </h3>
                    <p className="text-sm text-slate-700 font-normal mt-3 leading-relaxed">
                      {rule.detail}
                    </p>
                  </div>
                  <div className="mt-6 pt-4 border-t border-slate-100 flex items-center gap-1.5 text-xs font-sans text-slate-500">
                    <FileCheck className="w-3.5 h-3.5 text-edelvin-blue" />
                    <span>Перевіряється автоматично на RIP</span>
                  </div>
                </div>
              </ScrollFadeIn>
            ))}
          </div>

        </div>
      </section>

            {/* Consultation and Order Section */}
            <section className="py-20 sm:py-28 bg-white">
        <div className="max-w-[1520px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-10">
          
          <ScrollFadeIn>
            <div className="bg-slate-950 text-white p-8 sm:p-14 lg:p-16 rounded-xs relative overflow-hidden shadow-2xl">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center relative z-10">
                
                <div className="lg:col-span-8 space-y-6">
                  
                  <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-normal tracking-tight text-white leading-tight">
                    Потрібен точний технологічний прорахунок для вашого накладу?
                  </h2>
                  <p className="text-base sm:text-lg text-slate-300 font-normal leading-relaxed">
                    Наші провідні технологи підберуть оптимальну щільність паперу, запропонують найбільш економічний спосіб спуску смуг та надішлють офіційну комерційну пропозицію або рахунок з ПДВ.
                  </p>

                  <div className="pt-4 flex flex-wrap gap-4 font-sans text-xs font-bold">
                    <Link
                      href="/capabilities#order-form"
                      className="px-8 py-4 bg-white text-slate-950 uppercase tracking-wider rounded-xs hover:bg-edelvin-blue hover:text-white transition-colors flex items-center gap-2 cursor-pointer shadow-sm hover:shadow-xl hover:-translate-y-0.5"
                    >
                      <span>Залишити заявку технологу</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>

                {/* Номери телефонів у колонку */}
                <div className="lg:col-span-4 p-8 border-t lg:border-t-0 lg:border-l border-white/10 space-y-4">
                  <span className="text-slate-400 block text-xs uppercase tracking-wider font-sans">
                    Прямий зв&apos;язок з виробництвом:
                  </span>
                  
                  <div className="flex flex-col gap-3 font-sans">
                    <a
                      href="tel:+380432550333"
                      className="flex items-center gap-3 text-lg sm:text-xl text-white hover:text-edelvin-blue font-bold transition-colors w-fit"
                    >
                      <Phone className="w-4 h-4 text-edelvin-blue shrink-0" />
                      <span>+38 (0432) 550-333</span>
                    </a>
                    <a
                      href="tel:+380775153020"
                      className="flex items-center gap-3 text-lg sm:text-xl text-white hover:text-edelvin-blue font-bold transition-colors w-fit"
                    >
                      <Phone className="w-4 h-4 text-edelvin-blue shrink-0" />
                      <span>+380 (77) 515 30 20</span>
                    </a>
                    <a
                      href="tel:+380961793454"
                      className="flex items-center gap-3 text-lg sm:text-xl text-white hover:text-edelvin-blue font-bold transition-colors w-fit"
                    >
                      <Phone className="w-4 h-4 text-edelvin-blue shrink-0" />
                      <span>+380 (96) 179 34 54</span>
                    </a>
                  </div>
                </div>

              </div>
            </div>
          </ScrollFadeIn>

        </div>
      </section>

    </div>
  );
}
