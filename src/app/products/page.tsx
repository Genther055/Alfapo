"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Phone,
  Mail,
  ArrowRight,
  Sparkles,
  BookOpen,
  Printer,
  Calendar,
  HeartHandshake,
  Gift,
  Tag,
  ShieldCheck,
  Clock,
  CheckCircle2,
  Check,
  ChevronRight,
  Layers,
  FileText,
  Menu,
  X
} from "lucide-react";
import FullWidthVideoSection from "@/components/FullWidthVideoSection";

interface ProductCardData {
  id: string;
  name: string;
  desc: string;
  tags: string[];
  specs: { label: string; val: string }[];
  image?: string;
  badge?: string;
}

interface CategorySectionData {
  id: string;
  title: string;
  subtitle: string;
  leadText: string;
  bannerImage: string;
  badge: string;
  products: ProductCardData[];
}

const CATEGORIES_DATA: CategorySectionData[] = [
  {
    id: "sheet-digital",
    title: "Оперативний та листовий друк для бізнесу",
    subtitle: "Швидкий та бездоганний цифровий друк",
    leadText:
      "Високоточний повноколірний друк ділових матеріалів, презентацій та комерційної документації на промислових машинах Konica Minolta. Чіткість найдрібніших шрифтів, насичені відтінки та видача готових накладів від 24 годин.",
    bannerImage: "/images/products/stationery-mockup.jpg",
    badge: "Терміново від 24 год",
    products: [
      {
        id: "business-cards",
        name: "Преміальні ділові візитки з тисненням",
        desc: "Класичні візитки 90×50 мм та євроформат 85×55 мм на щільному картоні 350 г/м² або оксамитовому Plike. Оздоблення металізованою золотою або срібною фольгою Kurz, вибірковим лаком та Soft-Touch ламінацією.",
        tags: ["90×50 мм / 85×55 мм", "Картон 350 г/м²", "Тиснення фольгою Kurz", "Soft-Touch"],
        specs: [
          { label: "Матеріал", val: "Крейдований 350 г/м² / Plike / Крафт" },
          { label: "Оздоблення", val: "Золото, срібло, оксамитова ламінація" },
          { label: "Термін", val: "Від 1 робочого дня" },
        ],
        image: "/images/products/stationery-mockup.jpg",
        badge: "Хіт замовлень",
      },
      {
        id: "corporate-letterhead",
        name: "Фірмові бланки та сертифікати",
        desc: "Презентаційні бланки та сертифікати на чистоцелюлозному папері 80–120 г/м² або дизайнерських текстурах верже. Ідеальна сумісність з офісними лазерними принтерами та можливість нанесення захисних сіток.",
        tags: ["Формат А4", "Офсетний 90–120 г/м²", "Дизайнерський папір", "Захисні сітки"],
        specs: [
          { label: "Формати", val: "А4 (210×297 мм), А5" },
          { label: "Папір", val: "Офсетний 80–120 г/м², льон, верже" },
          { label: "Друк", val: "Повноколірний 4+0 або 4+4" },
        ],
        image: "/images/branding/alfa-omega-showcase.png",
      },
      {
        id: "flyers-leaflets",
        name: "Рекламні єврофлаєри та ліфлети",
        desc: "Кольорові рекламні буклети та єврофлаєри з одним або двома згинами (гармошка / вікно). Яскрава деталізація зображень, чіткі лінії згину без тріщин на згині завдяки автоматичному бігуванню.",
        tags: ["Євроформат 210×100 мм", "Крейдований 130–170 г/м²", "1–2 згини", "Бігування"],
        specs: [
          { label: "Формати", val: "Євро (210×100 мм), А5, А4" },
          { label: "Папір", val: "Крейдований глянець/мат 130–250 г/м²" },
          { label: "Обробка", val: "Прецизійне бігування та фальцювання" },
        ],
        image: "/images/cases/fest-takeaway-kit.jpg",
      },
      {
        id: "presentation-materials",
        name: "Презентаційні матеріали для переговорів",
        desc: "Звіти для ради директорів, інвестиційні меморандуми та комерційні пропозиції з ідеальною градацією дрібних схем і графіків. Зшивання в блок або підшивка у фірмові папки з кишенею під візитку.",
        tags: ["Формати А4 та А3", "Крейдований 150–200 г/м²", "Зшивання в блок", "Чіткі схеми"],
        specs: [
          { label: "Формати", val: "А4, А3 альбомний або книжковий" },
          { label: "Оздоблення", val: "Матова ламінація, скоба або пружина" },
          { label: "Наклад", val: "Від 10 примірників" },
        ],
        image: "/images/branding/alfa-omega-showcase.png",
      },
    ],
  },
  {
    id: "promo-print",
    title: "Рекламно-презентаційна поліграфія",
    subtitle: "Представницькі матеріали, що підкреслюють статус компанії",
    leadText:
      "Фірмові папки для документів, презентаційні каталоги продукції, корпоративні блокноти та настільні планінги. Створюємо комплексні набори для виставок, семінарів та ключових клієнтів.",
    bannerImage: "/images/branding/alfa-omega-showcase.png",
    badge: "Іміджевий стандарт",
    products: [
      {
        id: "corporate-folders",
        name: "Презентаційні папки з вирубною кишенею",
        desc: "Цупкі фірмові папки з картону 300–350 г/м² під документи А4. Оснащені прорізом для візитки, зручним клапаном і можливістю розширеного корінця для товстих пакетів документів.",
        tags: ["Під формат А4", "Картон 350 г/м²", "Кишеня для візитки", "Тиснення фольгою"],
        specs: [
          { label: "Конструкція", val: "Цільновирубна або клейова кишеня" },
          { label: "Оздоблення", val: "Soft-Touch ламінація, золота фольга Kurz" },
          { label: "Товщина корінця", val: "0 мм (тонкі) або 5–10 мм (ємні)" },
        ],
        image: "/images/branding/alfa-omega-showcase.png",
        badge: "Обов'язково для переговорів",
      },
      {
        id: "branded-notebooks",
        name: "Корпоративні блокноти з пружиною",
        desc: "Практичні блокноти форматів А5 та А4 на металевій пружині Wire-O. Обкладинка із щільного ламінованого картону, внутрішній блок у лінійку, крапку чи клітинку з нанесеним логотипом компанії.",
        tags: ["А5 / А4", "Металева пружина", "Обкладинка 300 г/м²", "Логотип на аркушах"],
        specs: [
          { label: "Обсяг блоку", val: "50 або 100 аркушів (офсет 80 г/м²)" },
          { label: "Скріплення", val: "Пружина біла, чорна, срібло або золото" },
          { label: "Додатково", val: "Перфорація сторінок для легкого відриву" },
        ],
        image: "/images/cases/gift-box-cards.png",
      },
      {
        id: "catalogs-brochures",
        name: "Каталоги продукції та іміджеві лукбуки",
        desc: "Багатосторінкові видання з деталізованою передачею кольору. Скріплення на скобу, металеву пружину або міцний еластичний клей PUR, що не розсипається навіть при тривалому гортанні.",
        tags: ["Скоба / PUR-клей", "Крейдований 130–250 г/м²", "Soft-Touch", "Вибірковий УФ-лак"],
        specs: [
          { label: "Обсяг", val: "Від 8 до 200+ сторінок" },
          { label: "Палітурка", val: "Скоба, термобіндер або тверда палітурка" },
          { label: "Оздоблення", val: "Вибірковий 3D-лак, фольгування" },
        ],
        image: "/images/products/hardcover-books-mockup.jpg",
      },
      {
        id: "cubes-blocks",
        name: "Кубарики та фірмові блоки для записів",
        desc: "Настільні кубики для щоденних нотаток розміром 90×90 мм. Проклеєні по одному краю для швидкого відриву або розсипом у фірмовій брендованій коробці-диспенсері.",
        tags: ["90×90 мм", "Проклейка корінця", "Офсетний 80 г/м²", "Коробка-диспенсер"],
        specs: [
          { label: "Висота блоку", val: "Від 30 до 90 мм (300–900 аркушів)" },
          { label: "Друк блоку", val: "1+0, 2+0 або повноколірний логотип" },
          { label: "Упаковка", val: "Термозбіжна плівка або брендований бокс" },
        ],
        image: "/images/products/stationery-mockup.jpg",
      },
    ],
  },
  {
    id: "business-stationery",
    title: "Ділова та офісна поліграфія",
    subtitle: "Серійні бланки, самокопіювальні комплекти та реєстри",
    leadText:
      "Офіційні бланки суворої звітності, багатошарові самокопіювальні комплекти для логістики й складів, квитанції з захисною нумерацією та книги реєстрації наказів у відповідності до державних стандартів діловодства.",
    bannerImage: "/images/cases/luxury-hospitality.jpg",
    badge: "Звітність за ДСТУ",
    products: [
      {
        id: "carbonless-forms",
        name: "Самокопіювальні бланки (2–4 шари)",
        desc: "Бланки на спеціальному папері (CB, CFB, CF) для миттєвого дублювання підпису та записів на копіях. Товарно-транспортні накладні, акти прийому-передачі, рахунки та договори для автопарків та дистриб'юторів.",
        tags: ["2, 3 або 4 шари", "Різнокольорові копії", "Проклейка в блоки", "Нумерація"],
        specs: [
          { label: "Кольори шарів", val: "Білий, жовтий, рожевий, блакитний, зелений" },
          { label: "Скріплення", val: "Спеціальний мікроклей у блоки по 50/100 комплектів" },
          { label: "Опції", val: "Наскрізна нумерація, відривна перфорація" },
        ],
        image: "/images/products/stationery-mockup.jpg",
      },
      {
        id: "receipt-books",
        name: "Квитанційні книжки та талони",
        desc: "Компактні книжки квитанцій, прибуткових ордерів та талонів. Зручна мікроперфорація для легкого рівного відриву корінця та чітка наскрізна шестизначна нумерація кожного аркуша.",
        tags: ["Мікроперфорація", "Шестизначна нумерація", "А5 / А6", "Скоба"],
        specs: [
          { label: "Формати", val: "А6 (105×148 мм), А5 (148×210 мм)" },
          { label: "Корінець", val: "Проклеєний або прошитий міцною скобою" },
          { label: "Захист", val: "Захисні фонові сітки проти підробок" },
        ],
        image: "/images/cases/fest-takeaway-kit.jpg",
      },
      {
        id: "registers-dstu",
        name: "Журнали реєстрації наказів та обліку",
        desc: "Офіційні журнали кадрового обліку, реєстрації вхідної/вихідної кореспонденції, журналів інструктажів з охорони праці та медичних реєстрів відповідно до діючих нормативних актів.",
        tags: ["Тверда / м'яка обкладинка", "Прошнурування", "Опечатування", "Формат А4"],
        specs: [
          { label: "Обкладинка", val: "Тверда 7БЦ або палітурний картон («то»), м'яка («мо»)" },
          { label: "Блок", val: "Офсетний 80 г/м², від 50 до 200 сторінок" },
          { label: "Готовність", val: "Отвори під прошнурування та контрольна наклейка" },
        ],
        image: "/images/products/hardcover-books-mockup.jpg",
      },
      {
        id: "custom-folders-archive",
        name: "Архівні папки та фірмові сегрегатори",
        desc: "Міцні архівні папки-реєстратори з кільцевим механізмом або зав'язками для довготривалого зберігання документації компанії. Індивідуальне брендування зовнішньої та внутрішньої сторони.",
        tags: ["Палітурний картон 2 мм", "Кільцевий механізм", "Ламінація", "Брендування"],
        specs: [
          { label: "Конструкція", val: "Механізми на 2 або 4 кільця, D-подібні кільця" },
          { label: "Товщина корінця", val: "40 мм, 60 мм або 80 мм" },
          { label: "Обтяжка", val: "Ламінований повноколірний лайнер або бумвініл" },
        ],
        image: "/images/branding/alfa-omega-showcase.png",
      },
    ],
  },
  {
    id: "books-binding",
    title: "Брошурування та книжкові видання",
    subtitle: "Тверда класична палітурка 7БЦ та міцне ниткошвейне скріплення",
    leadText:
      "Власна автоматична лінія виготовлення твердої палітурки 7БЦ. Випускаємо художні книги, ювілейні монографії, дипломні роботи, корпоративні хроніки та дорогі каталоги з золотим тисненням фольгою Kurz і шовковими стрічками-закладками (лясе).",
    bannerImage: "/images/products/hardcover-books-mockup.jpg",
    badge: "Гарантія 10+ років",
    products: [
      {
        id: "hardcover-7bc-luxury",
        name: "Тверда книжкова палітурка 7БЦ",
        desc: "Преміальне виготовлення книг з прошивкою ниткою внутрішнього блоку (зошити шиються ниткою, а не просто склеюються). Палітурний картон Kappa 1.5–3.0 мм, повноколірна ламінована обкладинка, каптал і лясе.",
        tags: ["Ниткошвейний блок", "Картон 2–3 мм", "Тиснення фольгою", "Шовкове лясе"],
        specs: [
          { label: "Формати", val: "А5, А4, 210×210 мм, нестандартні енциклопедії" },
          { label: "Матеріали", val: "Крейдований або пухкий книжковий папір Munken" },
          { label: "Оздоблення", val: "Гаряче тиснення золотом, вибірковий УФ-лак, каптал" },
        ],
        image: "/images/products/hardcover-books-mockup.jpg",
        badge: "Еталонна якість",
      },
      {
        id: "perfect-binding-soft",
        name: "М'яка палітурка КБС та PUR-клей",
        desc: "Сучасне безшвейне скріплення на високоміцний термоклей або поліуретановий PUR-клей. Ідеальний прямий прямокутний корінець, висока гнучкість розкриття та захист від випадання окремих сторінок.",
        tags: ["Термоклей PUR", "Рівний корінець", "Від 40 до 500+ стор.", "Бігування"],
        specs: [
          { label: "Обсяг блоку", val: "Від 40 до 600 сторінок" },
          { label: "Обкладинка", val: "Картон 250–350 г/м² з бігуванням під відкривання" },
          { label: "Ламінація", val: "Матова, глянцева або оксамитова Soft-Touch" },
        ],
        image: "/images/cases/kids-books-games.png",
      },
      {
        id: "wire-o-binding",
        name: "Брошурування на металеву пружину Wire-O",
        desc: "Ідеальне рішення для презентацій, робочих зошитів та методичок: видання розгортається на 360 градусів і рівно лежить на столі. Захисні прозорі або матові пластикові обкладинки.",
        tags: ["Розкриття 360°", "Металева пружина", "Пластикова захисна кришка", "А4 / А5"],
        specs: [
          { label: "Кольори пружини", val: "Білий, чорний, срібло, золото, синій" },
          { label: "Крок пружини", val: "3:1 (для тонких блоків) або 2:1 (для товстих до 28 мм)" },
          { label: "Захист", val: "Пластикова обкладинка 150–300 мкм + цупка підкладка" },
        ],
        image: "/images/products/calendars-planner-mockup.jpg",
      },
      {
        id: "thesis-hardcover",
        name: "Оправлення дипломних та архівних робіт",
        desc: "Термінове оформлення дипломних проєктів, магістерських робіт та дисертацій у класичну тверду палітурку з золотим тисненням напису. Можливість прошивки вже роздрукованих аркушів замовника або друк «під ключ».",
        tags: ["Терміново від 1 години", "Золотий напис", "Тверда обкладинка", "Вкладення дисків/креслень"],
        specs: [
          { label: "Кольори обкладинки", val: "Темно-синій, бордовий, чорний, зелений" },
          { label: "Місткість", val: "Від 30 до 300 аркушів А4" },
          { label: "Додатково", val: "Вклеювання файлів під відгук, кишеня для CD або креслень" },
        ],
        image: "/images/products/hardcover-books-mockup.jpg",
      },
    ],
  },
  {
    id: "wellness-prints",
    title: "Поліграфія з ментального здоров'я та психологічної підтримки",
    subtitle: "Воркбуки, колоди карт МАК та трекери станів",
    leadText:
      "Особливий напрямок мануфактури: випуск делікатних видань для психологів, коучів, центрів ментального здоров'я та корпоративного well-being. Приємні на дотик папери, надихаюча естетика, колоди карт у жорстких подарункових футлярах.",
    bannerImage: "/images/products/wellness-cards-mockup.jpg",
    badge: "Well-being напрямок",
    products: [
      {
        id: "mindful-workbooks",
        name: "Робочі зошити саморефлексії та воркбуки",
        desc: "Зошити практичних психологічних вправ, тренінгів резильєнтності та арттерапії. Цупкий матовий папір блоку (120–160 г/м²), на якому не просочуються чорнила, капілярні та гелеві ручки.",
        tags: ["Офсет 120–160 г/м²", "Приємно писати", "Тверда або напівм'яка палітурка", "Стрічка-закладка"],
        specs: [
          { label: "Формати", val: "В5 (170×240 мм), А5 (148×210 мм)" },
          { label: "Папір блоку", val: "Шляхетний кремовий Munken Print / Pure 130 г/м²" },
          { label: "Оздоблення", val: "Золоте тиснення, заокруглення кутів, гумка-фіксатор" },
        ],
        image: "/images/products/wellness-cards-mockup.jpg",
        badge: "Тренд року",
      },
      {
        id: "mac-affirmation-cards",
        name: "Колоди метафоричних асоціативних карт (МАК)",
        desc: "Колоди психологічних карт та карток щоденних афірмацій. Округле безпечне обрізання кутів, потовщений картон 350–400 г/м², захисна матова ламінація проти стирання при інтенсивному перемішуванні, позолочені торці.",
        tags: ["Картон 350–400 г/м²", "Заокруглені кути", "Позолочені торці", "Жорсткий футляр"],
        specs: [
          { label: "Формати карток", val: "70×100 мм, 80×120 мм, 90×130 мм" },
          { label: "Кількість у колоді", val: "Від 30 до 120 карт" },
          { label: "Упаковка", val: "Тверда подарункова коробка кришка-дно або пенал з магнітом" },
        ],
        image: "/images/products/wellness-cards-mockup.jpg",
      },
      {
        id: "gratitude-journals",
        name: "Щоденники вдячності та трекери звичок",
        desc: "Брендовані щоденники структурованого ведення записів. Зручні сітки трекерів сну, водного балансу, щоденних позитивних підсумків та щомісячного огляду особистих цілей.",
        tags: ["Формат А5", "Зручні сітки", "Шовкове лясе", "Еко-матеріали"],
        specs: [
          { label: "Палітурка", val: "Тверда палітурка 7БЦ з оксамитовим покриттям Soft-Touch" },
          { label: "Блок", val: "192 або 240 сторінок із нумерацією та змістом" },
          { label: "Опції", val: "Внутрішня кишенька на задньому форзаці під наліпки" },
        ],
        image: "/images/cases/gift-box-cards.png",
      },
      {
        id: "resilience-leaflets",
        name: "Пам'ятки психологічної самодопомоги",
        desc: "Компактні кишенькові та настільні картки з протоколами дихальних вправ, заземлення при тривозі та телефонами гарячих ліній психологічної підтримки для співробітників компаній.",
        tags: ["Ламіновані", "Кишеньковий розмір", "Стійкі до зносу", "Чітка інфографіка"],
        specs: [
          { label: "Формати", val: "А6, євробуклет 2 згини, пластикові картки 85×55 мм" },
          { label: "Покриття", val: "Щільна антибактеріальна або матова ламінація" },
          { label: "Наклади", val: "Від 100 шт. для корпоративних програм" },
        ],
        image: "/images/products/wellness-cards-mockup.jpg",
      },
    ],
  },
  {
    id: "calendars-planning",
    title: "Календарна продукція на замовлення",
    subtitle: "Щорічний рекламний контакт із клієнтом на 365 днів",
    leadText:
      "Квартальні календарі з курсором для бухгалтерів та офісів, елегантні настільні перекидні будиночки, настінні художні календарі великих форматів А3/А2 та кишенькові ламіновані візитки-календарі.",
    bannerImage: "/images/products/calendars-planner-mockup.jpg",
    badge: "365 днів реклами",
    products: [
      {
        id: "quarterly-calendars",
        name: "Квартальні настінні календарі (1 або 3 пружини)",
        desc: "Найпопулярніший корпоративний календар: одночасно видно попередній, поточний та наступний місяці. Повноколірна шапка з цупкого картону 350 г/м² з ламінацією, металевий люверс (пікколо) для кріплення та рухомий курсор з датою.",
        tags: ["3 календарні блоки", "Червоний курсор дати", "Картон 350 г/м²", "Люверс пікколо"],
        specs: [
          { label: "Конструкція", val: "Міні (297 мм), Міді (335 мм) або Максі (370 мм)" },
          { label: "Сітка", val: "Офсетний або крейдований папір, двоколірний друк" },
          { label: "Оздоблення шапки", val: "Глянцева ламінація, золоте тиснення або вибірковий УФ-лак" },
        ],
        image: "/images/products/calendars-planner-mockup.jpg",
        badge: "Топ продажів",
      },
      {
        id: "desk-tent-calendars",
        name: "Настільні календарі-будиночки (перекидні)",
        desc: "Компактний супутник будь-якого робочого столу. Жорстка стійка трикутна основа з картону 300 г/м² та перекидний блок на 6 або 12 аркушів на витонченій металевій пружині Wire-O.",
        tags: ["Стійка основа", "Пружина Wire-O", "12 перекидних аркушів", "Завжди перед очима"],
        specs: [
          { label: "Формати", val: "210×100 мм, 210×150 мм, 150×150 мм (квадрат)" },
          { label: "Перекидний блок", val: "Крейдований 150–200 г/м², двосторонній повноколір" },
          { label: "Основа", val: "Цупкий білий картон або каширована основа з тисненням" },
        ],
        image: "/images/products/calendars-planner-mockup.jpg",
      },
      {
        id: "wall-flip-calendars",
        name: "Настінні перекидні календарі А3 / А2",
        desc: "Презентаційні іміджеві календарі з великими фотографіями продукції, об'єктів архітектури або авторськими ілюстраціями. Металевий ригель по центру для зручного підвішування на стіну.",
        tags: ["Формати А3 та А2", "12 або 6 аркушів", "Металевий ригель", "Галерейна якість"],
        specs: [
          { label: "Формати", val: "А3 (300×420 мм), А2 (420×600 мм)" },
          { label: "Папір", val: "Крейдований шовковистий 200–250 г/м²" },
          { label: "Оздоблення", val: "Гібридний Twin-Spot лак, тиснення на обкладинці" },
        ],
        image: "/images/branding/alfa-omega-showcase.png",
      },
      {
        id: "pocket-calendars",
        name: "Ламіновані кишенькові календарі (100×70 мм)",
        desc: "Компактний роздатковий промо-матеріал: на лицьовій стороні реклама ваших послуг, на зворотній — річна календарна сітка. Обов'язкове заокруглення чотирьох кутів і щільна ламінація 100–250 мкм.",
        tags: ["100×70 мм", "Заокруглені кути", "Ламінація 250 мкм", "Масовий наклад"],
        specs: [
          { label: "Матеріал", val: "Цупкий картон 350 г/м²" },
          { label: "Покриття", val: "Глянцева гаряча ламінація (висока жорсткість)" },
          { label: "Тиражі", val: "Від 500 до 50 000+ штук" },
        ],
        image: "/images/products/stationery-mockup.jpg",
      },
    ],
  },
  {
    id: "labels-packaging",
    title: "Етикетка, наліпки та брендоване пакування",
    subtitle: "Рулонний друк Konica Minolta AccurioLabel 400 та фігурна висічка",
    leadText:
      "Повний цикл виготовлення самоклейної маркувальної продукції: рулонна етикетка для автоматичних ліній розливу, стікерпаки з надсічкою Kiss-Cut, коробки зі щільного мікрогофрокартону та брендовані крафтові пакети з золотим тисненням.",
    bannerImage: "/images/capabilities/mockup-spirits-gold.jpg",
    badge: "Власна лінія Konica Minolta",
    products: [
      {
        id: "roll-labels-auto",
        name: "Рулонна етикетка для автоматичних ліній",
        desc: "Промисловий цифровий рулонний друк на поліпропілені, напівглянцевому папері та металізованих плівках. Стійкість до вологи, олій, конденсату та глибокої заморозки (до -40°C).",
        tags: ["Поліпропілен / Напівглянець", "Втулка 76 мм / 40 мм", "Морозостійкий клей", "Контурна висічка"],
        specs: [
          { label: "Швидкість друку", val: "До 40 м/хв на AccurioLabel 400" },
          { label: "Клеї", val: "Стандартний акрил, посилений каучук, знімний" },
          { label: "Фініш", val: "Лакування, ламінація, фігурна плотерна висічка" },
        ],
        image: "/images/capabilities/mockup-spirits-gold.jpg",
        badge: "Промисловий сектор",
      },
      {
        id: "sheet-stickers",
        name: "Аркушеві стікери та брендовані стікерпаки",
        desc: "Наліпки на аркушах А4 або індивідуальних форматах з контурною надсічкою (Kiss-Cut). Зручно відокремлюються від основи; підходять для брендування пакування, стаканчиків кави, коробок або роздачі клієнтам.",
        tags: ["Надсічка Kiss-Cut", "Будь-яка форма контуру", "Папір або плівка", "Від 50 аркушів"],
        specs: [
          { label: "Матеріали", val: "Самоклейний папір Raflatac або плівка Oracal/Ritrama" },
          { label: "Форма наліпки", val: "Кругла, овальна, складна фігурна за вашим векторним контуром" },
          { label: "Особливості", val: "Можливість друку білим кольором на прозорій плівці" },
        ],
        image: "/images/cases/fest-limited-edition.jpg",
      },
      {
        id: "carton-boxes",
        name: "Коробки, шоубокси та упаковка з висічкою",
        desc: "Розробка конструкцій та виробництво самозбірних коробок для косметики, кондитерських виробів, фармації та сувенірів. Використовуємо целюлозний картон 250–350 г/м² та мікрогофрокартон з кашируванням.",
        tags: ["Целюлозний картон", "Мікрогофра", "Ложементи", "Індивідуальний штамп"],
        specs: [
          { label: "Конструкції", val: "Коробка «пачка», «кришка-дно», «пенал», шоубокси SRP" },
          { label: "Оздоблення", val: "Повноколір, Soft-Touch, вибірковий УФ-лак, віконця з вклейкою плівки" },
          { label: "Наклади", val: "Від пробних 100 шт. до серійних партій" },
        ],
        image: "/images/capabilities/mockup-pharma-box.jpg",
      },
      {
        id: "paper-bags",
        name: "Брендовані паперові пакети",
        desc: "Презентаційні пакети з крейдованого паперу 170–200 г/м² з захисною ламінацією або екологічного крафту. Укріплене дно і ручки картонними вставками, текстильні або мотузкові шнури з металевими люверсами.",
        tags: ["Крейдований або крафт", "Укріплене дно", "Текстильні шнури", "Тиснення логотипу"],
        specs: [
          { label: "Формати", val: "Під пляшку (120×380 мм), середній (250×350 мм), великий (400×300 мм)" },
          { label: "Ручки", val: "Шнур поліпропіленовий 5 мм, атласна стрічка, репсова тасьма" },
          { label: "Міцність", val: "Витримує вантаж до 5–7 кг" },
        ],
        image: "/images/branding/alfa-omega-showcase.png",
      },
    ],
  },
  {
    id: "finishing-postpress",
    title: "Післядрукарська обробка та спецефекти",
    subtitle: "Тактильний преміум: ламінація Soft-Touch, фольга Kurz та вибірковий лак",
    leadText:
      "Фінішне оздоблення, що перетворює звичайний відбиток на витвір поліграфічного мистецтва. Прецизійне гаряче тиснення золотою фольгою преміум-серій Kurz, об'ємні 3D-лаки, фігурна висічка штанцформами та бігування без заламування фарби.",
    bannerImage: "/images/branding/spirits-gold-foil.png",
    badge: "Німецька фольга Kurz",
    products: [
      {
        id: "foil-hot-stamping",
        name: "Гаряче тиснення фольгою Kurz (золото, срібло)",
        desc: "Нанесення металізованого шару за допомогою розігрітих латунних або магнієвих кліше. Глибокий дзеркальний блиск золота (глянцеве, матове, шампань), срібла, міді та голографічних спецефектів.",
        tags: ["Фольга Kurz (Німеччина)", "Золото / Срібло / Мідь", "Латунні кліше", "Преміум блиск"],
        specs: [
          { label: "Поверхні", val: "Дизайнерський картон, бумвініл, шкірозамінник, ламінований папір" },
          { label: "Типи тиснення", val: "Плоске гаряче, сліпе блінтове (вдавлене), конгревне (випуклий рельєф)" },
          { label: "Точність", val: "Позиціонування відтиску ±0.1 мм" },
        ],
        image: "/images/branding/spirits-gold-foil.png",
        badge: "Ексклюзивне оздоблення",
      },
      {
        id: "soft-touch-laminating",
        name: "Оксамитова ламінація Soft-Touch",
        desc: "Спеціальна тактильна плівка, що створює ефект дотику до ніжного оксамиту або пелюстки персика. Захищає виріб від відбитків пальців, подряпин та надає глибокого благородного матового відтінку.",
        tags: ["Ефект оксамиту", "Захист від подряпин", "Без відбитків пальців", "Глибокий тон"],
        specs: [
          { label: "Товщина плівки", val: "30 мкм, висока міцність на вигин" },
          { label: "Сумісність", val: "Ідеальна основа під нанесення глянцевого вибіркового лаку чи фольги" },
          { label: "Застосування", val: "Обкладинки каталогів, коробки парфумів, візитки, воркбуки" },
        ],
        image: "/images/products/hardcover-books-mockup.jpg",
      },
      {
        id: "spot-uv-3d",
        name: "Вибірковий УФ-лак та об'ємний 3D-лак",
        desc: "Локальне нанесення глянцевого лаку на окремі деталі макета: логотипи, фотографії, візерунки або краплі води. Створює разючий візуальний та відчутний тактильний контраст із матовою поверхнею.",
        tags: ["Тактильний 3D-об'єм", "Суперглянець", "Акцентування логотипу", "Контраст"],
        specs: [
          { label: "Висота рельєфу", val: "Від стандартного плоского до виразного тактильного 3D-шару" },
          { label: "Формат аркуша", val: "До формату B2 (500×700 мм)" },
          { label: "Точність збігу", val: "Прецизійне оптичне позиціонування" },
        ],
        image: "/images/capabilities/mockup-craft-distillery.jpg",
      },
      {
        id: "custom-die-cutting",
        name: "Плотерна та штанцева фігурна висічка",
        desc: "Надання виробу будь-якої складної геометрії: круглі віконця, хенгери на дверні ручки, замки для папок, фігурні ярлики для одягу та складні ложементи. Бездоганні рівні краї без задирок.",
        tags: ["Штанцформи", "Цифровий плотер", "Хенгери / Бірки", "Бездоганні краї"],
        specs: [
          { label: "Матеріали", val: "Папір від 130 г/м², палітурний картон до 2 мм, пластик" },
          { label: "Опції", val: "Одночасне бігування та перфорація ліній відриву" },
          { label: "Швидкість", val: "Цифрова порізка одиничних зразків без виготовлення штампу" },
        ],
        image: "/images/branding/carton-dieline-packaging.png",
      },
    ],
  },
  {
    id: "corporate-souvenirs",
    title: "Корпоративний мерч та іміджеві аксесуари",
    subtitle: "Фірмові ручки з нанесенням та металеві брелоки з лазерним гравіюванням",
    leadText:
      "Практичні та довговічні сувеніри з вашою фірмовою символікою. Комплектуємо подарункові набори разом із щоденниками та діловою поліграфією для партнерів, виставок та співробітників.",
    bannerImage: "/images/capabilities/mockup-delivery-box.jpg",
    badge: "Брендований мерч",
    products: [
      {
        id: "branded-pens-laser",
        name: "Ручки з логотипом та контактними даними",
        desc: "Якісні металеві та пластикові кулькові авторучки. Стійкий тамподрук або надточне кругове лазерне гравіювання, що не стирається від тривалого щоденного використання пальцями.",
        tags: ["Лазерне гравіювання", "Метал або пластик Soft-Touch", "Тамподрук", "Від 50 шт."],
        specs: [
          { label: "Матеріали", val: "Анодований алюміній, латунь, матовий софт-тач пластик" },
          { label: "Кольори корпусу", val: "Чорний, синій, срібний, білий, корпоративні кольори" },
          { label: "Стрижень", val: "Синій або чорний гелевий / масляний" },
        ],
        image: "/images/products/stationery-mockup.jpg",
      },
      {
        id: "metal-keychains-engraved",
        name: "Металеві брелоки з логотипом та нумерацією",
        desc: "Масивні металеві брелоки з полірованої латуні або нержавіючої сталі. Прекрасний сувенір для готелів (номерки на ключі), автопарків, фітнес-клубів та преміальних подарункових комплектів.",
        tags: ["Нержавіюча сталь", "Полірована латунь", "Глибоке гравіювання", "Індивідуальна форма"],
        specs: [
          { label: "Форма", val: "Кругла, прямокутна, жетони або вирубка за контуром логотипу" },
          { label: "Оздоблення", val: "Глибоке лазерне гравіювання або заливка міцною кольоровою емаллю" },
          { label: "Кріплення", val: "Посилене кільце з ланцюжком або карабін" },
        ],
        image: "/images/capabilities/mockup-delivery-box.jpg",
      },
    ],
  },
];

export default function ProductsPage() {
  const [inquiryProduct, setInquiryProduct] = useState<string>("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    comment: "",
  });

  const handleOpenInquiry = (productName: string) => {
    setInquiryProduct(productName);
    setIsModalOpen(true);
    setFormSubmitted(false);
  };

  const handleSubmitInquiry = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
  };

  const scrollToCategory = (categoryId: string) => {
    setIsDrawerOpen(false);
    const element = document.getElementById(categoryId);
    if (element) {
      const yOffset = -90;
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  return (
    <div className="bg-white min-h-screen text-slate-900 selection:bg-edelvin-blue selection:text-white relative">
      {/* 1. HERO СЕКЦІЯ: ЕЛЕГАНТНИЙ ФОРМАТ БЕЗ КАЛЬКУЛЯТОРНИХ ПАНЕЛЕЙ */}
      <section className="relative pt-24 pb-16 md:pt-32 md:pb-24 bg-slate-950 text-white border-b border-slate-200 overflow-hidden">
        {/* Subtle Ambient Video Background */}
        <div className="absolute inset-0 pointer-events-none opacity-20 mix-blend-screen filter contrast-125 brightness-95">
          <video
            src="/videos/plant-hero.mp4"
            poster="/videos/plant-hero-poster.jpg"
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950/80 via-slate-950/90 to-slate-950 pointer-events-none" />

        <div className="relative z-10 max-w-[1520px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-10">
          <div className="max-w-4xl space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 border border-white/15 rounded-full text-[11px] font-sans font-bold uppercase tracking-widest text-gold-300">
              <span className="w-1.5 h-1.5 rounded-full bg-gold-400"></span>
              Виробничий комплекс ТОВ «Альфа і Омега»
            </div>

            <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl font-normal text-white tracking-tight leading-[1.08]">
              Поліграфічна продукція <br />
              <span className="italic font-light text-blue-400">
                та виробничі колекції
              </span>
            </h1>

            <p className="text-base sm:text-lg md:text-xl text-slate-300 font-light leading-relaxed max-w-3xl">
              Повний виробничий цикл у Вінниці: оперативний листовий друк для бізнесу, рекламна поліграфія, діловий документообіг, класична тверда палітурка 7БЦ, психологічні воркбуки та серійна рулонна етикетка. Без посередників — прямі ціни та гарантія технолога.
            </p>

            {/* Швидкі виробничі метрики */}
            <div className="pt-6 grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 border-t border-white/10 text-xs font-sans">
              <div>
                <span className="text-slate-400 block mb-1">Терміни випуску:</span>
                <span className="text-white font-bold text-sm sm:text-base">від 24–48 годин</span>
              </div>
              <div>
                <span className="text-slate-400 block mb-1">Форма оплати:</span>
                <span className="text-white font-bold text-sm sm:text-base">Безготівка з ПДВ 20%</span>
              </div>
              <div>
                <span className="text-slate-400 block mb-1">Тиражі:</span>
                <span className="text-white font-bold text-sm sm:text-base">від 1 шт. до серій</span>
              </div>
              <div>
                <span className="text-slate-400 block mb-1">Доставка:</span>
                <span className="text-white font-bold text-sm sm:text-base">Вінниця та вся Україна</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. ЛАКОНІЧНА СТАТИЧНА СТРІЧКА УПРАВЛІННЯ (НЕ ЛИПНЕ І НЕ ПЕРЕКРИВАЄ ТЕКСТ) */}
      <div className="border-b border-slate-200 bg-slate-50 py-4">
        <div className="max-w-[1520px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-10 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setIsDrawerOpen(true)}
              className="inline-flex items-center gap-2.5 px-4 py-2.5 bg-slate-950 text-white hover:bg-edelvin-blue rounded-full text-xs font-sans font-bold uppercase tracking-wider transition-all cursor-pointer shadow-xs group"
            >
              <Menu className="w-4 h-4 text-gold-300 group-hover:rotate-90 transition-transform duration-300" />
              <span>Каталог колекцій (9 напрямів)</span>
            </button>
            <span className="text-xs font-sans text-slate-500 hidden md:inline">
              Швидкий перехід до будь-якого виду поліграфії та пакування
            </span>
          </div>

          <div className="flex items-center gap-3 text-xs font-sans">
            <span className="text-slate-500">Консультація чергового інженера:</span>
            <a
              href="tel:+380432550333"
              className="font-bold text-slate-950 hover:text-edelvin-blue transition-colors flex items-center gap-1.5"
            >
              <Phone className="w-3.5 h-3.5 text-edelvin-blue" />
              <span>+38 (0432) 550-333</span>
            </a>
          </div>
        </div>
      </div>

      {/* ПЛАВАЮЧА КНОПКА БУРГЕР-МЕНЮ ЗБОКУ (ЗАВЖДИ ЗРУЧНО ВІДКРИТИ ПРИ СКРОЛІ) */}
      <div className="fixed right-5 sm:right-8 bottom-8 z-40">
        <button
          type="button"
          onClick={() => setIsDrawerOpen(true)}
          className="flex items-center gap-3 px-5 py-3.5 bg-slate-950/95 hover:bg-edelvin-blue text-white rounded-full shadow-2xl border border-white/20 transition-all duration-300 hover:scale-105 cursor-pointer backdrop-blur-md group"
          title="Відкрити меню напрямів продукції"
        >
          <Menu className="w-4 h-4 text-gold-300 group-hover:rotate-90 transition-transform duration-300" />
          <span className="text-xs font-sans font-bold uppercase tracking-wider hidden sm:inline">
            Колекції виробництва
          </span>
          <span className="text-xs font-sans font-bold uppercase tracking-wider sm:hidden">
            Меню
          </span>
          <span className="w-5 h-5 rounded-full bg-white/20 text-[10px] font-bold flex items-center justify-center text-white">
            9
          </span>
        </button>
      </div>

      {/* БІЧНИЙ БУРГЕР-DRAWER (САЙДБАР ЗБОКУ) */}
      {isDrawerOpen && (
        <div className="fixed inset-0 z-50 flex justify-end">
          {/* Фон затемнення */}
          <div
            className="fixed inset-0 bg-slate-950/60 backdrop-blur-xs transition-opacity duration-300 animate-in fade-in"
            onClick={() => setIsDrawerOpen(false)}
          />

          {/* Панель, що висувається справа */}
          <aside className="relative w-full max-w-md sm:max-w-lg bg-white h-full shadow-2xl z-10 flex flex-col justify-between overflow-y-auto animate-in slide-in-from-right duration-300 border-l border-slate-200">
            <div className="p-6 sm:p-8">
              {/* Заголовок меню */}
              <div className="flex items-center justify-between pb-6 border-b border-slate-200">
                <div>
                  <span className="text-[10px] font-sans font-bold uppercase tracking-widest text-edelvin-blue block">
                    ВИРОБНИЧИЙ КАТАЛОГ
                  </span>
                  <h3 className="font-serif text-2xl text-slate-950 font-normal mt-0.5">
                    Колекції продукції
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={() => setIsDrawerOpen(false)}
                  className="w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 flex items-center justify-center transition-colors cursor-pointer"
                  title="Закрити меню"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Список 9 колекцій */}
              <nav className="py-6 space-y-2">
                {CATEGORIES_DATA.map((cat, idx) => (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => scrollToCategory(cat.id)}
                    className="w-full text-left p-3.5 rounded-sm hover:bg-slate-50 border border-transparent hover:border-slate-200 transition-all flex items-center justify-between group cursor-pointer"
                  >
                    <div className="flex items-center gap-3.5">
                      <span className="w-7 h-7 rounded-full bg-slate-100 group-hover:bg-slate-950 group-hover:text-white text-slate-700 text-xs font-bold font-sans flex items-center justify-center transition-colors shrink-0">
                        0{idx + 1}
                      </span>
                      <div>
                        <span className="font-serif text-base text-slate-950 group-hover:text-edelvin-blue transition-colors block leading-snug">
                          {cat.title}
                        </span>
                        <span className="text-[11px] font-sans text-slate-500 block">
                          {cat.subtitle} • {cat.products.length} видів
                        </span>
                      </div>
                    </div>
                    <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-edelvin-blue group-hover:translate-x-1 transition-all shrink-0 ml-2" />
                  </button>
                ))}
              </nav>
            </div>

            {/* Низ бічного меню: контакти та швидкий прорахунок */}
            <div className="p-6 sm:p-8 bg-slate-50 border-t border-slate-200 space-y-4">
              <div className="flex items-center justify-between text-xs font-sans">
                <span className="text-slate-500">Прямий номер інженера:</span>
                <a
                  href="tel:+380432550333"
                  className="font-bold text-slate-950 hover:text-edelvin-blue transition-colors"
                >
                  +38 (0432) 550-333
                </a>
              </div>
              <button
                type="button"
                onClick={() => {
                  setIsDrawerOpen(false);
                  handleOpenInquiry("Загальний розрахунок накладу");
                }}
                className="w-full py-3.5 bg-slate-950 hover:bg-edelvin-blue text-white rounded-xs text-xs font-sans font-bold uppercase tracking-wider transition-colors shadow-sm cursor-pointer"
              >
                Розрахувати тираж
              </button>
            </div>
          </aside>
        </div>
      )}

      {/* 3. ОСНОВНІ БЛОКИ КОЛЕКЦІЙ З ФОТО БРЕНДУВАННЯ ТА КАРТКАМИ ДЛЯ ПОКУПЦЯ */}
      <div className="max-w-[1520px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-10 py-16 sm:py-24 space-y-32">
        {CATEGORIES_DATA.map((cat, catIdx) => (
          <section
            key={cat.id}
            id={cat.id}
            className="scroll-mt-32 border-b border-slate-200 pb-28 last:border-b-0"
          >
            {/* ВЕРХНЯ ЕЛЕГАНТНА ПРЕЗЕНТАЦІЯ КОЛЕКЦІЇ (ВЕЛИКИЙ БРЕНДОВАНИЙ БАНЕР + ОПИС) */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center mb-16">
              
              {/* Фото з власним брендуванням «Альфа і Омега» */}
              <div className="lg:col-span-6 relative aspect-16/10 rounded-sm overflow-hidden bg-slate-100 border border-slate-200 group shadow-md">
                <Image
                  src={cat.bannerImage}
                  alt={cat.title}
                  fill
                  className="object-cover group-hover:scale-103 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent pointer-events-none" />
                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-white text-xs font-sans">
                  <span className="px-3 py-1 bg-slate-950/70 backdrop-blur-md rounded-xs border border-white/20 font-bold uppercase tracking-widest text-[10px]">
                    {cat.badge}
                  </span>
                  <span className="text-white/80 font-serif italic text-sm">
                    Виробництво «Альфа і Омега»
                  </span>
                </div>
              </div>

              {/* Текстовий опис колекції */}
              <div className="lg:col-span-6 space-y-5">
                <div className="inline-flex items-center gap-2">
                  <span className="text-xs font-sans font-bold tracking-[0.25em] text-edelvin-blue uppercase">
                    Колекція 0{catIdx + 1}
                  </span>
                  <span className="w-8 h-px bg-slate-300"></span>
                  <span className="text-xs font-sans text-slate-500 uppercase tracking-wider">
                    {cat.subtitle}
                  </span>
                </div>

                <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-slate-950 tracking-tight leading-[1.15]">
                  {cat.title}
                </h2>

                <p className="font-sans text-sm sm:text-base text-slate-600 font-normal leading-relaxed">
                  {cat.leadText}
                </p>

                <div className="pt-3">
                  <button
                    type="button"
                    onClick={() => handleOpenInquiry(`Колекція: ${cat.title}`)}
                    className="inline-flex items-center gap-2.5 px-6 py-3.5 bg-slate-950 text-white hover:bg-edelvin-blue transition-colors rounded-xs text-xs font-sans font-bold uppercase tracking-widest cursor-pointer shadow-sm"
                  >
                    <span>Замовити прорахунок накладу</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

            </div>

            {/* СІТКА КАРТОК ВИРОБІВ: КРАСИВА, ЧИТАБЕЛЬНА, ПРИВАБЛИВА ДЛЯ ПОКУПЦЯ */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
              {cat.products.map((item) => (
                <div
                  key={item.id}
                  className="bg-white border border-slate-200 rounded-sm p-6 sm:p-8 flex flex-col justify-between hover:border-slate-950 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group"
                >
                  <div className="space-y-4">
                    {/* Заголовок та бейдж */}
                    <div className="flex items-start justify-between gap-4">
                      <h3 className="font-serif text-2xl sm:text-[26px] text-slate-950 font-normal group-hover:text-edelvin-blue transition-colors leading-snug">
                        {item.name}
                      </h3>
                      {item.badge && (
                        <span className="px-2.5 py-1 bg-blue-50 text-edelvin-blue border border-blue-200/60 rounded-xs text-[10px] font-sans font-bold uppercase tracking-wider shrink-0">
                          {item.badge}
                        </span>
                      )}
                    </div>

                    {/* Живий читабельний опис */}
                    <p className="font-sans text-sm text-slate-600 font-normal leading-relaxed">
                      {item.desc}
                    </p>

                    {/* Ключові теги переваг */}
                    <div className="flex flex-wrap gap-1.5 pt-2">
                      {item.tags.map((tag, tIdx) => (
                        <span
                          key={tIdx}
                          className="px-2.5 py-1 bg-slate-100 text-slate-700 text-xs font-sans rounded-xs"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Лаконічні специфікації */}
                    <div className="pt-4 border-t border-slate-100 space-y-2 text-xs font-sans">
                      {item.specs.map((sp, sIdx) => (
                        <div key={sIdx} className="flex justify-between items-baseline py-0.5">
                          <span className="text-slate-400 font-medium">{sp.label}:</span>
                          <span className="text-slate-900 font-semibold text-right max-w-[65%]">
                            {sp.val}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Кнопка дії */}
                  <div className="mt-8 pt-4 border-t border-slate-100 flex items-center justify-between">
                    <button
                      type="button"
                      onClick={() => handleOpenInquiry(item.name)}
                      className="inline-flex items-center gap-2 text-xs font-sans font-bold uppercase tracking-wider text-slate-950 group-hover:text-edelvin-blue transition-colors cursor-pointer"
                    >
                      <span>Швидкий прорахунок</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                    <span className="text-[11px] font-sans text-slate-400">
                      Вінниця • Гарантія якості
                    </span>
                  </div>
                </div>
              ))}
            </div>

          </section>
        ))}
      </div>

      {/* 4. ВІДЕО-БЛОК ВИРОБНИЦТВА НА ВСЮ ШИРИНУ */}
      <FullWidthVideoSection
        videoSrc="/videos/roll-label-vorey.mp4"
        posterSrc="/videos/roll-label-vorey-poster.jpg"
        title="Промислове виробництво та обробка у Вінниці"
        description="Комплекс промислових машин Konica Minolta AccurioPress, AccurioLabel 400, фінішні плотери Scorpio Vorey, ниткошвейні комплекси Horizon та потужна гільйотинна порізка."
      />

      {/* 5. ФОРМА ПРЯМОГО ЗАПИТУ НА ПРОРАХУНОК ТИРАЖУ */}
      <section id="quote-request" className="py-20 lg:py-28 bg-white border-t border-slate-200">
        <div className="max-w-[1520px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-stretch">
            
            {/* Ліва колонка: контакти з фіксацією висоти */}
            <div className="lg:col-span-4 flex flex-col justify-between py-2">
              <div>
                <span className="text-xs font-sans font-bold uppercase tracking-[0.2em] text-edelvin-blue block mb-3">
                  ПРЯМИЙ ЗВ'ЯЗОК З ТЕХНОЛОГОМ
                </span>
                
                <h2 className="font-serif text-3xl sm:text-4xl text-slate-950 font-normal leading-tight mb-4">
                  Швидкий розрахунок тиражу від інженера
                </h2>
                
                <p className="text-slate-600 text-sm leading-relaxed mb-8 font-light">
                  Надішліть параметри проєкту або файл макета. Черговий інженер-технолог підбере оптимальне обладнання, розрахує розкладку та надішле точну специфікацію з калькуляцією вартості.
                </p>

                <div className="space-y-4 pt-4 border-t border-slate-200">
                  <span className="text-xs font-sans font-bold uppercase tracking-wider text-slate-400 block">
                    ВІДДІЛ ПРОРАХУНКІВ ПОЛІГРАФІЇ
                  </span>
                  
                  <div className="space-y-2">
                    <a
                      href="tel:+380432550333"
                      className="flex items-center gap-3 text-base sm:text-lg font-bold text-slate-900 hover:text-edelvin-blue transition-colors"
                    >
                      <Phone className="w-4 h-4 text-edelvin-blue shrink-0" />
                      <span>+38 (0432) 550-333</span>
                    </a>
                    
                    <a
                      href="tel:+380775153020"
                      className="flex items-center gap-3 text-base sm:text-lg font-bold text-slate-900 hover:text-edelvin-blue transition-colors"
                    >
                      <Phone className="w-4 h-4 text-edelvin-blue shrink-0" />
                      <span>+380 (77) 515 30 20</span>
                    </a>

                    <a
                      href="tel:+380961793454"
                      className="flex items-center gap-3 text-base sm:text-lg font-bold text-slate-900 hover:text-edelvin-blue transition-colors"
                    >
                      <Phone className="w-4 h-4 text-edelvin-blue shrink-0" />
                      <span>+380 (96) 179 34 54</span>
                    </a>
                  </div>
                </div>

                <div className="pt-6 border-t border-slate-200 mt-6 space-y-1 text-xs text-slate-500">
                  <span className="font-bold text-slate-900 block mb-1">Прийом макетів та технічних завдань:</span>
                  <p>print@edelvin.com.ua</p>
                  <p>etiqueta.es@gmail.com</p>
                </div>
              </div>

              <div className="pt-8 border-t border-slate-200 mt-8 text-xs text-slate-400">
                Виробничий комплекс: м. Вінниця, вул. 600-річчя, 17
              </div>
            </div>

            {/* Права колонка: форма */}
            <div className="lg:col-span-8 bg-slate-50 border border-slate-200 p-8 sm:p-12 rounded-sm flex flex-col justify-between">
              {formSubmitted ? (
                <div className="py-16 text-center space-y-4 my-auto">
                  <div className="w-16 h-16 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="font-serif text-3xl text-slate-950 font-normal">
                    Запит на прорахунок надіслано!
                  </h3>
                  <p className="text-slate-600 text-sm max-w-md mx-auto">
                    Інженер-технолог вже отримав ваше технічне завдання і зв&apos;яжеться з вами протягом 30 хвилин для уточнення деталей тиражу.
                  </p>
                  <button
                    type="button"
                    onClick={() => setFormSubmitted(false)}
                    className="mt-4 px-6 py-2.5 bg-slate-950 text-white rounded-xs text-xs font-bold uppercase tracking-wider hover:bg-edelvin-blue transition-colors"
                  >
                    Надіслати ще один запит
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmitInquiry} className="space-y-6">
                  <div>
                    <h3 className="font-serif text-2xl text-slate-950 font-normal mb-1">
                      Форма індивідуального прорахунку
                    </h3>
                    <p className="text-xs text-slate-500">
                      Вкажіть бажаний вид продукції, орієнтовний тираж та контактний номер телефону
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                        Ваше ім&apos;я *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="Олександр Коваль"
                        className="w-full px-4 py-3 bg-white border border-slate-300 rounded-xs text-sm text-slate-900 focus:outline-none focus:border-slate-950"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                        Контактний телефон *
                      </label>
                      <input
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="+38 (0__) ___-__-__"
                        className="w-full px-4 py-3 bg-white border border-slate-300 rounded-xs text-sm text-slate-900 focus:outline-none focus:border-slate-950"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                      Електронна пошта
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="office@company.com"
                      className="w-full px-4 py-3 bg-white border border-slate-300 rounded-xs text-sm text-slate-900 focus:outline-none focus:border-slate-950"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                      Опис проєкту або параметри замовлення
                    </label>
                    <textarea
                      rows={4}
                      value={formData.comment}
                      onChange={(e) => setFormData({ ...formData, comment: e.target.value })}
                      placeholder="Наприклад: воркбуки А5 на пружині 100 шт., або рулонна етикетка 50×80 мм на поліпропілені 5 000 шт."
                      className="w-full px-4 py-3 bg-white border border-slate-300 rounded-xs text-sm text-slate-900 focus:outline-none focus:border-slate-950"
                    />
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      className="w-full sm:w-auto px-8 py-4 bg-slate-950 hover:bg-edelvin-blue text-white font-sans text-xs font-bold uppercase tracking-widest rounded-xs transition-colors shadow-md cursor-pointer flex items-center justify-center gap-2"
                    >
                      <span>Надіслати запит на прорахунок</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                    <span className="block text-[11px] text-slate-400 mt-2">
                      Відповідаємо протягом 30 хвилин у робочий час (Пн–Пт: 09:00–18:00)
                    </span>
                  </div>
                </form>
              )}
            </div>

          </div>
        </div>
      </section>

      {/* МОДАЛЬНЕ ВІКНО ШВИДКОГО ПРОРАХУНКУ ДЛЯ КОНКРЕТНОГО ВИРОБУ */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 backdrop-blur-xs p-4">
          <div className="bg-white rounded-sm border border-slate-200 max-w-lg w-full p-6 sm:p-8 shadow-2xl relative">
            <button
              type="button"
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-950 text-sm font-bold p-2"
            >
              ✕
            </button>

            {formSubmitted ? (
              <div className="py-8 text-center space-y-3">
                <div className="w-12 h-12 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center mx-auto mb-2">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h3 className="font-serif text-2xl text-slate-950">
                  Запит прийнято!
                </h3>
                <p className="text-xs text-slate-600">
                  Ми отримали ваш запит щодо «{inquiryProduct}». Інженер зателефонує вам найближчим часом.
                </p>
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="mt-4 px-6 py-2 bg-slate-950 text-white rounded-xs text-xs font-bold uppercase tracking-wider"
                >
                  Закрити
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmitInquiry} className="space-y-4">
                <div>
                  <span className="text-[11px] font-sans font-bold uppercase tracking-wider text-edelvin-blue block">
                    Швидкий прорахунок вартості
                  </span>
                  <h3 className="font-serif text-2xl text-slate-950 font-normal mt-1">
                    {inquiryProduct}
                  </h3>
                </div>

                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-700 mb-1">
                    Ваше ім&apos;я *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Ваше ім'я"
                    className="w-full px-3 py-2 border border-slate-300 rounded-xs text-xs text-slate-900 focus:outline-none focus:border-slate-950"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-700 mb-1">
                    Телефон *
                  </label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+38 (0__) ___-__-__"
                    className="w-full px-3 py-2 border border-slate-300 rounded-xs text-xs text-slate-900 focus:outline-none focus:border-slate-950"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-700 mb-1">
                    Бажаний тираж або примітки
                  </label>
                  <input
                    type="text"
                    value={formData.comment}
                    onChange={(e) => setFormData({ ...formData, comment: e.target.value })}
                    placeholder="Напр.: 500 шт., потрібна матова ламінація"
                    className="w-full px-3 py-2 border border-slate-300 rounded-xs text-xs text-slate-900 focus:outline-none focus:border-slate-950"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full py-3 bg-slate-950 hover:bg-edelvin-blue text-white font-sans text-xs font-bold uppercase tracking-widest rounded-xs transition-colors cursor-pointer"
                  >
                    Відправити технологу
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
