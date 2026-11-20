"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

export type LanguageCode = "UA" | "EN" | "PL" | "DE";

export interface Translations {
  header: {
    banner: string;
    catalog: string;
    print: string;
    capabilities: string;
    shop: string;
    about: string;
    calc: string;
    cart: string;
    close: string;
    allCatalog: string;
  };
  aboutPage: {
    heroTitle1: string;
    heroTitle2: string;
    manifesto: string;
    calcBtn: string;
    catalogBtn: string;
    missionTag: string;
    missionTitle: string;
    missionDesc: string;
    visionTag: string;
    visionTitle: string;
    visionDesc: string;
    goalTag: string;
    goalTitle: string;
    goalDesc: string;
    teamTitle: string;
    teamDesc: string;
    trustTag: string;
    trustTitle: string;
    trustItems: {
      num: string;
      title: string;
      desc: string;
    }[];
    prodTag: string;
    prodTitle: string;
    prodTabs: {
      id: string;
      category: string;
      title: string;
      description: string;
      features: string[];
    }[];
    productsTag: string;
    productsTitle: string;
    productsBtn: string;
    productsList: {
      category: string;
      title: string;
      desc: string;
      link: string;
    }[];
    historyTag: string;
    historyTitle: string;
    historyDesc: string;
    historySub: string;
    milestones: {
      year: string;
      month: string;
      title: string;
      text: string;
      prefix?: string;
      suffix?: string;
    }[];
  };
  contactSection: {
    title: string;
    subtitle: string;
    phoneDept: string;
    emailDept: string;
    addressDept: string;
    addressVal: string;
    form: {
      firstName: string;
      firstNamePlaceholder: string;
      lastName: string;
      lastNamePlaceholder: string;
      email: string;
      emailPlaceholder: string;
      phone: string;
      phonePlaceholder: string;
      company: string;
      companyPlaceholder: string;
      requestType: string;
      requestTypePlaceholder: string;
      requestOptions: string[];
      country: string;
      countryPlaceholder: string;
      countryOptions: string[];
      urgentTitle: string;
      urgentText: string;
      message: string;
      messagePlaceholder: string;
      consent: string;
      submitBtn: string;
      successTitle: string;
      successText: string;
      sendAnother: string;
    };
  };
}

export const translations: Record<LanguageCode, Translations> = {
  UA: {
    header: {
      banner: "Виробничий комплекс ТОВ «Альфа і Омега» • Вінниця, вул. 600-річчя, 17 | Безготівка з ПДВ • Казначейство",
      catalog: "Каталог",
      print: "Поліграфія",
      capabilities: "Можливості",
      shop: "Магазин",
      about: "Про нас",
      calc: "Запит на друк",
      cart: "Кошик",
      close: "Закрити",
      allCatalog: "Відкрити весь каталог з фільтрами та цінами →",
    },
    aboutPage: {
      heroTitle1: "Якість. Довіра.",
      heroTitle2: "Стабільність.",
      manifesto:
        "ТОВ «Торговий Дім «Альфа і Омега» працює на поліграфічному ринку з 2018 року. Сьогодні це підприємство площею 2,5 тис. м² із 46 працівниками, яке поєднує офсетний і цифровий друк, виробництво книжкової продукції, виготовлення дидактичних матеріалів, етикеток та інших поліграфічних виробів, продаж канцелярських товарів.",
      calcBtn: "Оформити запит",
      catalogBtn: "Каталог продукції",
      missionTag: "НАША МІСІЯ",
      missionTitle: "Втілювати ідеї клієнтів у бездоганний паперовий продукт найвищої якості",
      missionDesc:
        "Забезпечувати українські підприємства, державні установи, освітні заклади та авторів повним спектром надійних поліграфічних рішень — від одного авторського примірника до промислових накладів, зберігаючи чесну собівартість та максимальну відповідальність за результат.",
      visionTag: "ВІЗІЯ",
      visionTitle: "Поєднувати класичні традиції друкарства з провідними інноваціями",
      visionDesc:
        "Бути регіональним еталоном технологічності, автономії та надійності. Ми бачимо сучасну поліграфію в безперервному оновленні верстатів, автоматизації процесів, екологічності матеріалів та здатності швидко закривати будь-яку потребу замовника «під ключ».",
      goalTag: "НАША МЕТА",
      goalTitle: "100% впевненість клієнта у бездоганних дедлайнах та якості",
      goalDesc:
        "Наша мета — щоб кожен замовник був абсолютно спокійний за свій наклад. Ми беремо на себе всі виробничі та логістичні клопоти: від первинного аудиту макета до адресної доставки на склад клієнта власним транспортом.",
      teamTitle: "46 майстрів друкарської справи",
      teamDesc: "Оператори промислових комплексів, інженери, палітурники, технологи та менеджери ТОВ «Альфа і Омега».",
      trustTag: "СТАНДАРТИ ТА ГАРАНТІЇ",
      trustTitle: "Чому нам довіряють",
      trustItems: [
        {
          num: "01",
          title: "Казначейство та тендери",
          desc: "Офіційна співпраця з бюджетними установами, казначейські рахунки, повний пакет документів для ProZorro та довгострокових контрактів.",
        },
        {
          num: "02",
          title: "Енергонезалежність та безпека",
          desc: "Власний дизель-генератор потужністю 95 кВт живить до 70% виробництва. Автономне опалення твердопаливними котлами та власне сертифіковане бомбосховище із запасами води та харчування.",
        },
        {
          num: "03",
          title: "Соціальна відповідальність",
          desc: "Виготовлення продукції для Збройних Сил України, допомога харківській друкарні «Фактор Друк», безкоштовне відновлення шкільних підручників та підтримка ГО людей з інвалідністю «Едельвейс».",
        },
        {
          num: "04",
          title: "Живе спілкування та сервіс",
          desc: "Поєднання прямого контакту з технологами 24/7 і сучасних онлайн-форматів прийому замовлень без бюрократії.",
        },
        {
          num: "05",
          title: "Партнерство з Konica Minolta",
          desc: "Понад 20 років співпраці. Флагманський цифровий комплекс Konica Minolta AccurioPress C7090 Enhanced та 3 швидкісні монохромні машини bizhub PRO 958 на офіційному сервісному контракті S+M.",
        },
        {
          num: "06",
          title: "Контроль кольору IQ-501",
          desc: "Інтелектуальний модуль IQ-501 зі спектрофотометром у реальному часі контролює стабільність кольору та гарантує точне суміщення лиця і звороту на кожному аркуші.",
        },
        {
          num: "07",
          title: "Цифрова рулонна етикетка",
          desc: "Промислова ЦДМ Konica Minolta AccurioLabel 400 у парі з цифровим плотером контурної висічки Scorpio Vorey VD 3350 для серійного виробництва в Україні та на експорт.",
        },
        {
          num: "08",
          title: "Книжковий комплекс Horizon",
          desc: "Автоматична підбирально-зшивальна лінія Horizon з автоконтролем якості, ниткозшивання, тверда палітурка 7БЦ. Експорт книг до Німеччини, Польщі, Ізраїлю та відвантаження 20 тонн книг до США.",
        },
      ],
      prodTag: "ПОТУЖНОСТІ",
      prodTitle: "Наше виробництво",
      prodTabs: [
        {
          id: "digital",
          category: "Цифровий флагман",
          title: "Konica Minolta AccurioPress C7090 Enhanced",
          description:
            "Новітній індустріальний цифровий комплекс з інтелектуальним модулем IQ-501, 3 лотками пневматичної вакуумної подачі та тонером Simitri V. Автоматичне калібрування кольору та суміщення лиця/звороту в реальному часі.",
          features: [
            "Швидкість друку до 90 стор./хв (А4) та 48 стор./хв (SRA3) з роздільною здатністю 3600×2400 dpi",
            "Друк на матеріалах від 52 до 400 г/м² та банерах довжиною до 1300 мм",
            "Інтелектуальний контроль якості IQ-501: точність кожного відбитка без ручного калібрування",
          ],
        },
        {
          id: "labels",
          category: "Рулонна етикетка",
          title: "Konica Minolta AccurioLabel 400 + Scorpio Vorey",
          description:
            "Промислова цифрова рулонна лінія з цифровим плотером контурної висічки Scorpio Vorey VD 3350. Серійний друк самоклейних етикеток для харчових продуктів, вин, крафту, побутової хімії та експорту.",
          features: [
            "Високошвидкісний друк на самоклейних матеріалах без витрат на фотополімерні форми",
            "Прецизійна цифрова висічка Scorpio Vorey VD 3350 для складної геометрії наклейок",
            "Стійкість до вологи, низьких температур холодильників та агресивних середовищ",
          ],
        },
        {
          id: "bindery",
          category: "Книжкова мануфактура",
          title: "Автоматизована палітурна лінія Horizon",
          description:
            "Автоматична підбирально-зшивальна машина Horizon із вбудованою оптичною перевіркою якості, ниткозшивні верстати, блоковставка у тверду палітурку 7БЦ, автоматичний ламінатор та гаряче тиснення золотом і сріблом.",
          features: [
            "Виготовлення довговічної твердої палітурки 7БЦ, обкладинок з рогожки, тканини та оксамиту",
            "Міцне ниткошвейне скріплення блоків для комфортного розкриття книги на 180°",
            "Гаряче тиснення фольгою Kurz (золото, срібло, сліпе) та вклеювання стрічки-лясе",
          ],
        },
        {
          id: "offset",
          category: "Офсетне виробництво",
          title: "Комплекси Dominant 744 та Roland",
          description:
            "Чотирифарбова офсетна машина Dominant 744 та монохромний Roland для масштабних тиражів книг, підручників, класних журналів, бланків та дидактичних матеріалів у синергії з цифровими лініями.",
          features: [
            "Мінімальна собівартість при великих тиражах від 5 000 – 10 000 примірників",
            "Висока чіткість растру та стабільна передача найдрібніших деталей",
            "Друк на сертифікованому європейському офсетному та крейдованому папері",
          ],
        },
        {
          id: "wide",
          category: "Широкий формат",
          title: "Інтер'єрні та екстер'єрні плотери Mimaki",
          description:
            "Друк рулонної рекламної продукції: банери, постери, картини на полотні (холсті), плівки Oracal, One Way Vision, вивіски та плотерна контурна порізка стікерів.",
          features: [
            "Ширина друку до 1600 мм стійкими екосольвентними фарбами",
            "Висока роздільна здатність до 1440 DPI для галерейного та інтер'єрного друку",
            "Брендування комерційного транспорту, вітрин та виставкових стендів",
          ],
        },
      ],
      productsTag: "КАТАЛОГ ВИРОБІВ",
      productsTitle: "Наша продукція",
      productsBtn: "Повний онлайн-каталог",
      productsList: [
        {
          category: "Книжкове виробництво",
          title: "Книжкова продукція 7БЦ",
          desc: "Видання у твердій палітурці 7БЦ та м'якій обкладинці, художня та наукова література, презентаційні каталоги.",
          link: "/catalog?category=books",
        },
        {
          category: "Освітня поліграфія",
          title: "Дидактичні матеріали та журнали",
          desc: "Офіційні класні журнали, затверджені МОН України, робочі зошити НУШ, методичні посібники та плакати.",
          link: "/catalog?category=education",
        },
        {
          category: "Самоклейна продукція",
          title: "Етикетки, стікери та наліпки",
          desc: "Самоклейні рулонні та листові етикетки на європейських основах з високоточною контурною плотерною висічкою.",
          link: "/catalog?category=labels",
        },
        {
          category: "Корпоративний стиль",
          title: "Комерційна поліграфія",
          desc: "Фірмові каталоги, буклети, брошури, листівки, презентаційні папки, бланки та корпоративні блокноти.",
          link: "/catalog?category=marketing",
        },
        {
          category: "Офісне забезпечення",
          title: "Канцелярські та паперові товари",
          desc: "Оригінальний сертифікований офісний папір А4 та А3, бухгалтерські бланки, касова стрічка та канцтовари.",
          link: "/catalog?category=stationery",
        },
        {
          category: "Широкий формат",
          title: "Широкоформатний друк та вивіски",
          desc: "Рекламні банери, інформаційні стенди, фасадні таблички, картини на художньому полотні та брендування вітрин.",
          link: "/catalog?category=large-format",
        },
      ],
      historyTag: "ХРОНІКА РОЗВИТКУ",
      historyTitle: "Наша історія",
      historyDesc: "27+ років безперервного розвитку, партнерства та інновацій у Вінниці",
      historySub: "Вінниця • з 1998 року",
      milestones: [
        {
          year: "1998",
          month: "Вересень",
          title: "Заснування підприємства",
          text: "Створення Торгового Дому «Альфа і Омега» у Вінниці. Стартовий напрямок — прямі оптові та роздрібні поставки паперу і канцелярських товарів для організацій та державних установ.",
        },
        {
          year: "2000-ті",
          month: "Розвиток",
          title: "Власне приміщення та перші друкарські потужності",
          text: "Придбання власного приміщення. Встановлення перших різографів та БФП Hewlett Packard і Xerox. Згодом запуск чотирифарбової офсетної машини Dominant 744 та монохромного Roland.",
        },
        {
          year: "2011",
          month: "Масштабування",
          title: "Виробничий комплекс по вул. 600-річчя, 17",
          text: "Розбудова власного повноцінного виробничого комплексу площею 2,5 тис. м² (5500 м² інфраструктури). Запуск замкнутого циклу — від дизайну та додруку до готових книг у твердій палітурці 7БЦ.",
        },
        {
          year: "2015-2020",
          month: "Цифровізація",
          title: "Курс на промисловий цифровий друк Konica Minolta",
          text: "Стратегічне партнерство з Konica Minolta: інсталяція цифрових комплексів AccurioPress C3070 та C4070. Вихід на ринок малотиражної оперативної поліграфії високої якості.",
        },
        {
          year: "2022",
          month: "Стійкість",
          title: "Автономність під час війни та допомога армії",
          text: "Друкарня не закривалася ані на день. Встановлення дизель-генератора 95 кВт, твердопаливних котлів, облаштування бомбосховища. Допомога друкарні «Фактор Друк», виготовлення продукції для ЗСУ та відновлення пошкоджених шкільних підручників.",
        },
        {
          prefix: "з",
          year: "2024",
          suffix: "року до сьогодення",
          month: "Інновації",
          title: "AccurioPress C7090 Enhanced, рулонна лінія та експорт",
          text: "Встановлення флагманської ЦДМ Konica Minolta AccurioPress C7090 Enhanced з модулем IQ-501, запуск цифрової рулонної етикетки AccurioLabel 400 + плотер Scorpio Vorey. Автоматизація палітурної лінії Horizon. Відвантаження 20 тонн книг до США та регулярні поставки етикетки до Іспанії.",
        },
      ],
    },
    contactSection: {
      title: "Швидкий розрахунок тиражу від технолога",
      subtitle: "Надішліть параметри проєкту або файл макета. Черговий інженер-технолог підбере оптимальне обладнання та надішле точну специфікацію з калькуляцією вартості.",
      phoneDept: "Відділ прорахунків поліграфії",
      emailDept: "Прийом макетів та технічних завдань",
      addressDept: "Виробничий комплекс",
      addressVal: "м. Вінниця, вул. 600-річчя, 17",
      form: {
        firstName: "Ім'я *",
        firstNamePlaceholder: "Введіть ваше ім'я",
        lastName: "Прізвище *",
        lastNamePlaceholder: "Введіть ваше прізвище",
        email: "Електронна пошта *",
        emailPlaceholder: "name@company.com",
        phone: "Контактний телефон *",
        phonePlaceholder: "+38 (0__) ___-__-__",
        company: "Компанія / Організація *",
        companyPlaceholder: "Назва вашого підприємства",
        requestType: "Тип продукції / Напрям *",
        requestTypePlaceholder: "Оберіть категорію замовлення",
        requestOptions: [
          "Книги у твердій палітурці 7БЦ",
          "Журнали, каталоги та брошури",
          "Самоклейна етикетка та стікери",
          "Комерційна та рекламна поліграфія",
          "Широкоформатний друк та вивіски",
          "Офісний папір Maestro та канцтовари",
          "Індивідуальний тираж / Інше",
        ],
        country: "Країна доставки *",
        countryPlaceholder: "Оберіть країну",
        countryOptions: [
          "Україна (Вінниця та вся Україна)",
          "Польща (Polska)",
          "Німеччина (Deutschland)",
          "Інша країна Європи",
        ],
        urgentTitle: "Терміновий розрахунок?",
        urgentText: "Для термінових замовлень та оперативних консультацій телефонуйте напряму на виробництво або пишіть на нашу чергову пошту.",
        message: "Опис замовлення (тираж, формат, щільність паперу)",
        messagePlaceholder: "Вкажіть бажаний наклад, кількість сторінок, тип паперу, наявність макета або технічні вимоги...",
        consent: "Я підтверджую згоду з Умовами обслуговування та Політикою конфіденційності.",
        submitBtn: "НАДІСЛАТИ ЗАПИТ →",
        successTitle: "Запит успішно надіслано",
        successText: "Дякуємо! Наш інженер-технолог уже вивчає параметри вашого замовлення і зв'яжеться з вами найближчим часом.",
        sendAnother: "← Надіслати ще один розрахунок",
      },
    },
  },
  EN: {
    header: {
      banner: "Production Facility LLC 'Alfa & Omega' • Vinnytsia, 17 600-richchya St. | VAT Invoicing • State Treasury",
      catalog: "Catalog",
      print: "Printing",
      capabilities: "Capabilities",
      shop: "Shop",
      about: "About Us",
      calc: "Production Inquiry",
      cart: "Cart",
      close: "Close",
      allCatalog: "Open full catalog with filters and pricing →",
    },
    aboutPage: {
      heroTitle1: "Quality. Trust.",
      heroTitle2: "Stability.",
      manifesto:
        "LLC 'Trading House Alfa & Omega' has been operating in the printing market since 2018. Today, it is an enterprise covering 2,500 m² with 46 employees, combining offset and digital printing, book manufacturing, educational materials, labels and other printing products, as well as office stationery supplies.",
      calcBtn: "Submit Inquiry",
      catalogBtn: "Product Catalog",
      missionTag: "OUR MISSION",
      missionTitle: "Transforming customer ideas into flawless paper products of highest quality",
      missionDesc:
        "Providing businesses, government institutions, publishers, and authors with comprehensive, reliable print solutions — from single bespoke copies to high-volume industrial editions with fair pricing and total quality accountability.",
      visionTag: "VISION",
      visionTitle: "Combining classical printing craftsmanship with cutting-edge digital innovation",
      visionDesc:
        "To stand as a European benchmark for technological autonomy, consistency, and reliability. We continuously invest in advanced machinery, workflow automation, eco-certified papers, and end-to-end turnkey manufacturing.",
      goalTag: "OUR GOAL",
      goalTitle: "100% client peace of mind regarding strict deadlines and precision quality",
      goalDesc:
        "Our priority is ensuring every client feels completely assured. We handle all manufacturing, pre-press audits, and logistics — delivering directly to client warehouses via our dedicated fleet.",
      teamTitle: "46 Master Printers & Specialists",
      teamDesc: "Press operators, pre-press engineers, bookbinders, technicians, and account managers at LLC 'Alfa & Omega'.",
      trustTag: "STANDARDS & GUARANTEES",
      trustTitle: "Why Clients Trust Us",
      trustItems: [
        {
          num: "01",
          title: "Treasury & Procurement",
          desc: "Full support for state treasury accounts, official contracts, and public tender documentation with comprehensive compliance packages.",
        },
        {
          num: "02",
          title: "Energy Autonomy",
          desc: "Complete industrial self-sufficiency: our plant continues full production without municipal electricity or water supply.",
        },
        {
          num: "03",
          title: "Social Responsibility",
          desc: "Substantial production for the Armed Forces of Ukraine, restoration of damaged school textbooks and archival literature.",
        },
        {
          num: "04",
          title: "Responsive Communication",
          desc: "The perfect synergy of direct human consultation and seamless 24/7 digital order processing.",
        },
        {
          num: "05",
          title: "Strategic Partnership",
          desc: "Over 20 years of continuous partnership with Konica Minolta. Enhanced with the heavy-duty AccurioPress C7090 for demanding European print jobs.",
        },
        {
          num: "06",
          title: "Quality Assurance",
          desc: "Built-in IQ-501 Intelligent Quality Care spectrophotometer guarantees real-time closed-loop color consistency and front-to-back registration.",
        },
        {
          num: "07",
          title: "Manufacturing Synergy",
          desc: "Intelligent workflow allocation: high-volume long runs on B2 offset presses, rapid-turnaround on high-speed digital equipment.",
        },
        {
          num: "08",
          title: "Dedicated Logistics",
          desc: "In-house fleet of commercial freight vehicles ensuring prompt, insured, door-to-door delivery across Ukraine and European borders.",
        },
      ],
      prodTag: "CAPABILITIES",
      prodTitle: "Our Production Facility",
      prodTabs: [
        {
          id: "digital",
          category: "Digital Printing",
          title: "High-Volume Digital Print Complex",
          description:
            "Fast, color-calibrated printing for short-to-medium runs: softcover and hardcover books, presentation catalogs, brochures, marketing flyers, stickers, and corporate collateral with test proof sampling.",
          features: [
            "Rapid turnaround for small and medium print runs",
            "Advance signal test copy approval before full run",
            "Extensive selection of coated, uncoated, and luxury design papers",
          ],
        },
        {
          id: "offset",
          category: "Offset Printing",
          title: "Industrial Sheetfed Offset Press Complex",
          description:
            "Heavy-duty sheetfed offset printing for large commercial volumes: multi-page books, educational textbooks, journals, corporate catalogs, and manuals at optimized economies of scale.",
          features: [
            "Lowest unit cost for high-volume press runs",
            "Ultra-sharp raster screen definition and consistent color stability",
            "Printed exclusively on FSC-certified European papers",
          ],
        },
        {
          id: "bindery",
          category: "Bindery & Finishing",
          title: "Hardcover 7BC & Thread-Sewn Binding",
          description:
            "In-house post-press and bindery: casing-in 7BC hardcovers on dense board, automatic thread-sewing for flat 180° lay-flat opening, hot foil stamping, UV spot varnish, and ribbon bookmarks.",
          features: [
            "Heavy-duty, archival-grade 7BC case binding",
            "Thread-sewn signatures for lifetime durability and lay-flat reading",
            "Embossing with gold/silver foil and precision spot varnishing",
          ],
        },
        {
          id: "wide",
          category: "Large Format",
          title: "Wide-Format Printing & Contour Plotter Die-Cutting",
          description:
            "Roll-to-roll outdoor and indoor graphics: vinyl banners, exhibition posters, fine art canvas, signs, as well as precision digital contour cutting for product labels and decals.",
          features: [
            "UV-resistant, eco-solvent inks for exterior and interior durability",
            "Exact optical contour die-cutting for stickers of any geometry",
            "Retail window branding, exhibition stands, and rigid signage",
          ],
        },
      ],
      productsTag: "PRODUCT RANGE",
      productsTitle: "Our Products",
      productsBtn: "Full Online Catalog",
      productsList: [
        {
          category: "Book Manufacturing",
          title: "Hardcover & Softcover Books",
          desc: "Archival 7BC hardcover publications, fiction and academic literature, corporate presentation editions.",
          link: "/catalog?category=books",
        },
        {
          category: "Educational Print",
          title: "Textbooks & Didactic Materials",
          desc: "Official school journals approved by the Ministry of Education, student workbooks, and instructional charts.",
          link: "/catalog?category=education",
        },
        {
          category: "Self-Adhesive Labels",
          title: "Custom Labels & Die-Cut Stickers",
          desc: "Roll and sheet labels on premium European adhesives with digital optical contour cutting.",
          link: "/catalog?category=labels",
        },
        {
          category: "Corporate Collateral",
          title: "Commercial & Marketing Print",
          desc: "Brand catalogs, presentation folders, brochures, corporate notebooks, and annual reports.",
          link: "/catalog?category=marketing",
        },
        {
          category: "Paper & Stationery",
          title: "Office Paper & Business Supplies",
          desc: "Original certified A4/A3 office paper, accounting forms, and enterprise stationery.",
          link: "/catalog?category=stationery",
        },
        {
          category: "Large Format",
          title: "Banners, Signs & Canvas Art",
          desc: "Durable advertising banners, point-of-sale displays, canvas wall prints, and storefront branding.",
          link: "/catalog?category=large-format",
        },
      ],
      historyTag: "TIMELINE OF EXCELLENCE",
      historyTitle: "Our History",
      historyDesc: "25+ years of continuous development, partnerships, and manufacturing innovation in Vinnytsia",
      historySub: "Vinnytsia • 25 Years Together",
      milestones: [
        {
          year: "1998",
          month: "September",
          title: "Founding of the Company",
          text: "Establishment of Private Enterprise 'Edelweiss'. Initial focus: wholesale and retail supply of premium office paper.",
        },
        {
          year: "2000",
          month: "Growth",
          title: "First Free Door-to-Door Delivery",
          text: "Expansion into office supplies and paper rolls. Regional milestone: introducing free scheduled delivery to client offices.",
        },
        {
          year: "2002",
          month: "Recognition",
          title: "Enterprise Solutions & Regional Awards",
          text: "Full-service office provisioning (equipment, paper, business gifts). Expansion across Ukraine and winning 'Business Elite of Podillia'.",
        },
        {
          year: "2011",
          month: "February",
          title: "Industrial Manufacturing Facility",
          text: "Launch of our integrated manufacturing complex: complete in-house cycle from graphic design to finished 7BC hardcover books.",
        },
        {
          year: "2020",
          month: "Technology",
          title: "Dedicated Label Production Line",
          text: "Investment in specialized high-precision roll label machinery for regional food, agricultural, and industrial producers.",
        },
        {
          year: "2022",
          month: "Innovation",
          title: "Augmented Reality (AR) Educational Books",
          text: "Printing next-generation textbooks with embedded interactive 3D digital content viewed through mobile devices.",
        },
        {
          prefix: "from",
          year: "2024",
          suffix: "to Present",
          month: "",
          title: "Fleet Modernization & Defense Support",
          text: "Equipping our press room with state-of-the-art digital complexes. Publishing the 'Price of Freedom' photobook and continuous aid to the Armed Forces of Ukraine.",
        },
      ],
    },
    contactSection: {
      title: "Fast Production & Print Estimation",
      subtitle: "Submit your project specifications or artwork files. Our pre-press engineer will evaluate optimal production equipment and send an accurate quote.",
      phoneDept: "Print Estimations & Sales",
      emailDept: "Artwork & File Submission",
      addressDept: "Manufacturing Facility",
      addressVal: "17 600-richchya St., Vinnytsia, Ukraine",
      form: {
        firstName: "First Name *",
        firstNamePlaceholder: "Enter your first name",
        lastName: "Last Name *",
        lastNamePlaceholder: "Enter your last name",
        email: "Email Address *",
        emailPlaceholder: "name@company.com",
        phone: "Phone Number *",
        phonePlaceholder: "+38 (0__) ___-__-__",
        company: "Company / Organization *",
        companyPlaceholder: "Enter your company name",
        requestType: "Request Type *",
        requestTypePlaceholder: "Select product category",
        requestOptions: [
          "Hardcover Books (Casebound 7BC)",
          "Magazines, Catalogs & Booklets",
          "Self-adhesive Labels & Stickers",
          "Commercial & Marketing Print",
          "Large Format & Outdoor Print",
          "Maestro Office Paper & Stationery",
          "Custom Manufacturing / Other",
        ],
        country: "Delivery Country *",
        countryPlaceholder: "Select delivery country",
        countryOptions: [
          "Ukraine (All Regions)",
          "Poland (Polska)",
          "Germany (Deutschland)",
          "Other European Country",
        ],
        urgentTitle: "Urgent Service Request?",
        urgentText: "For urgent support or tight turnaround inquiries, please call our facility directly or message our pre-press desk.",
        message: "Order Details (quantity, size, paper stock)",
        messagePlaceholder: "Specify desired run size, page count, paper stock, finishing options, or deadlines...",
        consent: "I confirm that I agree with the Terms & Conditions and Privacy Policy.",
        submitBtn: "SUBMIT INQUIRY →",
        successTitle: "Inquiry Sent Successfully",
        successText: "Thank you! Our technical specialist is reviewing your project parameters and will respond shortly with an accurate specification.",
        sendAnother: "← Send another inquiry",
      },
    },
  },
  PL: {
    header: {
      banner: "Zakład Produkcyjny Sp. z o.o. «Alfa i Omega» • Winnica, ul. 600-lecia 17 | Faktury VAT • Płatności skarbowe",
      catalog: "Katalog",
      print: "Poligrafia",
      capabilities: "Możliwości",
      shop: "Sklep",
      about: "O nas",
      calc: "Zapytanie o druk",
      cart: "Koszyk",
      close: "Zamknij",
      allCatalog: "Otwórz pełny katalog z filtrami i cenami →",
    },
    aboutPage: {
      heroTitle1: "Jakość. Zaufanie.",
      heroTitle2: "Stabilność.",
      manifesto:
        "Sp. z o.o. «Dom Handlowy Alfa i Omega» działa na rynku poligraficznym od 2018 roku. Dziś to przedsiębiorstwo o powierzchni 2500 m² z 46 pracownikami, łączące druk offsetowy i cyfrowy, produkcję książek, materiałów edukacyjnych, etykiet i innych wyrobów poligraficznych oraz sprzedaż artykułów biurowych.",
      calcBtn: "Złóż zapytanie",
      catalogBtn: "Katalog produktów",
      missionTag: "NASZA MISJA",
      missionTitle: "Przekształcać idee klientów w nienaganny produkt papierowy najwyższej jakości",
      missionDesc:
        "Zapewnianie przedsiębiorstwom, instytucjom publicznym, wydawnictwom i autorom kompleksowych usług poligraficznych — od pojedynczych egzemplarzy po nakłady przemysłowe.",
      visionTag: "WIZJA",
      visionTitle: "Łączenie klasycznych tradycji drukarskich z nowoczesnymi innowacjami",
      visionDesc:
        "Być wzorem technologicznej niezależności i precyzji. Stawiamy na stałą modernizację parku maszynowego, automatyzację procesów i europejskie standardy ekologiczne.",
      goalTag: "NASZ CEL",
      goalTitle: "100% pewności klienta co do nienagannych terminów i jakości",
      goalDesc:
        "Nasz cel to całkowity spokój klienta o nakład. Zapewniamy pełną kontrolę jakości i bezpieczną dostawę własnym transportem ciężarowym.",
      teamTitle: "46 Specjalistów Sztuki Drukarskiej",
      teamDesc: "Operatorzy maszyn, technolodzy, introligatorzy i doradcy techniczni Sp. z o.o. «Alfa i Omega».",
      trustTag: "STANDARDY I GWARANCJE",
      trustTitle: "Dlaczego nam ufają",
      trustItems: [
        {
          num: "01",
          title: "Przetargi i zamówienia",
          desc: "Obsługa rachunków skarbowych, dokumentacja do przetargów publicznych oraz wieloletnie doświadczenie w realizacji umów ramowych.",
        },
        {
          num: "02",
          title: "Niezależność energetyczna",
          desc: "Pełna autonomia przemysłowa: ciągłość produkcji nawet przy całkowitym braku miejskiego zasilania i wody.",
        },
        {
          num: "03",
          title: "Odpowiedzialność społeczna",
          desc: "Produkcja na rzecz Sił Zbrojnych Ukrainy oraz bezpłatna renowacja zniszczonych podręczników szkolnych.",
        },
        {
          num: "04",
          title: "Sprawna komunikacja",
          desc: "Połączenie bezpośredniego doradztwa technologicznego z nowoczesnymi platformami zamówień online.",
        },
        {
          num: "05",
          title: "Partnerstwo technologiczne",
          desc: "Ponad 20 lat współpracy z Konica Minolta. Nowy kompleks AccurioPress C7090 Enhanced gwarantuje stabilny druk na trudnych mediach.",
        },
        {
          num: "06",
          title: "Automatyczna kontrola barwy",
          desc: "Spektrofotometr IQ-501 Intelligent Quality Care gwarantuje precyzyjną kalibrację kolorów i pasowanie stron arkusza.",
        },
        {
          num: "07",
          title: "Synergia technologii",
          desc: "Optymalny podział zamówień: duże nakłady na maszynach offsetowych, a zlecenia ekspresowe i personalizowane — na druku cyfrowym.",
        },
        {
          num: "08",
          title: "Własna logistyka",
          desc: "Własna flota transportowa pozwala na szybką, bezpieczną i terminową dostawę wyrobów na terenie Ukrainy i Europy.",
        },
      ],
      prodTag: "PARK MASZYNOWY",
      prodTitle: "Nasza produkcja",
      prodTabs: [
        {
          id: "digital",
          category: "Druk cyfrowy",
          title: "Cyfrowy kompleks drukarski",
          description:
            "Szybki i precyzyjny druk nakładów operacyjnych: książki w oprawie twardej i miękkiej, katalogi, foldery, naklejki z możliwością wykonania egzemplarza próbnego.",
          features: [
            "Błyskawiczna realizacja małych i średnich nakładów",
            "Możliwość wydruku próbnego egzemplarza autorskiego",
            "Szeroki wybór certyfikowanych papierów kredowanych i ozdobnych",
          ],
        },
        {
          id: "offset",
          category: "Druk offsetowy",
          title: "Arkuszowy kompleks offsetowy B2",
          description:
            "Przemysłowy druk wysokonakładowy: podręczniki, albumy, czasopisma i katalogi przy optymalnym koszcie jednostkowym.",
          features: [
            "Najniższy koszt jednostkowy przy dużych nakładach",
            "Maksymalna ostrość rastra i stabilność odwzorowania kolorów",
            "Druk na certyfikowanych papierach europejskich producentów",
          ],
        },
        {
          id: "bindery",
          category: "Introligatornia 7BC",
          title: "Oprawa twarda 7BC i szycie nićmi",
          description:
            "Własna introligatornia: montaż oprawy twardej 7BC, automatyczne szycie bloków nićmi dla pełnego otwarcia książki, tłoczenie folią na gorąco i lakier UV.",
          features: [
            "Produkcja trwałej oprawy twardej 7BC na grubej tekturze",
            "Szycie nićmi zapewniające swobodne otwieranie publikacji",
            "Złocenie, srebrzenie folią oraz lakierowanie wybiórcze",
          ],
        },
        {
          id: "wide",
          category: "Wielki format",
          title: "Druk wielkoformatowy i wycinanie ploterowe",
          description:
            "Druk reklamowy na banerach, folii, płótnie (canvas), a także precyzyjne cięcie ploterowe etykiet samoprzylepnych o dowolnym kształcie.",
          features: [
            "Druk farbami odpornymi na warunki atmosferyczne i UV",
            "Precyzyjne wycinanie konturowe etykiet i naklejek",
            "Branding witryn, stoisk targowych i tablic informacyjnych",
          ],
        },
      ],
      productsTag: "OFERTA PRODUKTOWA",
      productsTitle: "Nasze produkty",
      productsBtn: "Pełny katalog online",
      productsList: [
        {
          category: "Produkcja książkowa",
          title: "Książki w oprawie 7BC",
          desc: "Wydania w oprawie twardej i miękkiej, literatura piękna, naukowa oraz prestiżowe albumy.",
          link: "/catalog?category=books",
        },
        {
          category: "Poligrafia edukacyjna",
          title: "Podręczniki i dzienniki",
          desc: "Dzienniki lekcyjne, zeszyty ćwiczeń i plansze dydaktyczne dla szkół i uczelni.",
          link: "/catalog?category=education",
        },
        {
          category: "Etykiety samoprzylepne",
          title: "Naklejki i etykiety ploterowe",
          desc: "Etykiety na europejskich podłożach samoprzylepnych z cięciem po dowolnym obrysie.",
          link: "/catalog?category=labels",
        },
        {
          category: "Identyfikacja wizualna",
          title: "Poligrafia komercyjna",
          desc: "Katalogi firmowe, teczki ofertowe, notesy firmowe, ulotki i foldery reklamowe.",
          link: "/catalog?category=marketing",
        },
        {
          category: "Artykuły biurowe",
          title: "Papier biurowy i formularze",
          desc: "Oryginalny certyfikowany papier biurowy A4/A3, druki akcydensowe i materiały biurowe.",
          link: "/catalog?category=stationery",
        },
        {
          category: "Wielki format",
          title: "Banery, obrazy na płótnie i szyldy",
          desc: "Banery zewnętrzne, wydruki na płótnie, tablice fasadowe i oklejanie witryn.",
          link: "/catalog?category=large-format",
        },
      ],
      historyTag: "KRONIKA ROZWOJU",
      historyTitle: "Nasza historia",
      historyDesc: "25+ lat ciągłego rozwoju, partnerstwa i innowacji technologicznych w Winnicy",
      historySub: "Winnica • 25 lat razem",
      milestones: [
        {
          year: "1998",
          month: "Wrzesień",
          title: "Założenie przedsiębiorstwa",
          text: "Powstanie prywatnego przedsiębiorstwa «Edelweiss». Dystrybucja papieru biurowego.",
        },
        {
          year: "2000",
          month: "Rozwój",
          title: "Bezpłatna dostawa do klienta",
          text: "Wprowadzenie innowacyjnej bezpłatnej dostawy zamówień bezpośrednio do biur klientów.",
        },
        {
          year: "2002",
          month: "Uznanie",
          title: "Kompleksowa obsługa firm",
          text: "Zaopatrzenie biur w sprzęt i materiały eksploatacyjne. Nagroda 'Elita Biznesu Podola'.",
        },
        {
          year: "2011",
          month: "Luty",
          title: "Kompleks produkcyjny",
          text: "Uruchomienie pełnego cyklu produkcyjnego od projektu graficznego po gotowe książki 7BC.",
        },
        {
          year: "2020",
          month: "Technologie",
          title: "Wysokospecjalistyczna linia etykiet",
          text: "Instalacja nowoczesnych maszyn do produkcji etykiet samoprzylepnych dla przemysłu.",
        },
        {
          year: "2022",
          month: "Innowacje",
          title: "Podręczniki z rozszerzoną rzeczywistością (AR)",
          text: "Druk podręczników zintegrowanych z modelami 3D i aplikacjami mobilnymi.",
        },
        {
          prefix: "od",
          year: "2024",
          suffix: "roku do dziś",
          month: "",
          title: "Modernizacja cyfrowa i wsparcie obronności",
          text: "Wdrożenie zaawansowanych systemów cyfrowych oraz systemowa pomoc dla Sił Zbrojnych Ukrainy.",
        },
      ],
    },
    contactSection: {
      title: "Szybka kalkulacja nakładu od technologa",
      subtitle: "Prześlij parametry projektu lub pliki graficzne. Nasz inżynier produkcji dobierze optymalną technologię druku i prześle dokładną specyfikację kosztorysową.",
      phoneDept: "Dział Kalkulacji i Sprzedaży",
      emailDept: "Przyjmowanie Plików i Projektów",
      addressDept: "Zakład Produkcyjny",
      addressVal: "Winnica, ul. 600-lecia 17, Ukraina",
      form: {
        firstName: "Imię *",
        firstNamePlaceholder: "Wpisz swoje imię",
        lastName: "Nazwisko *",
        lastNamePlaceholder: "Wpisz swoje nazwisko",
        email: "Adres e-mail *",
        emailPlaceholder: "nazwisko@firma.pl",
        phone: "Numer telefonu *",
        phonePlaceholder: "+48 ___ ___ ___",
        company: "Firma / Instytucja *",
        companyPlaceholder: "Wpisz nazwę firmy",
        requestType: "Rodzaj zlecenia *",
        requestTypePlaceholder: "Wybierz kategorię druku",
        requestOptions: [
          "Książki w twardej oprawie 7BC",
          "Katalogi, czasopisma i broszury",
          "Etykiety samoprzylepne i naklejki",
          "Poligrafia reklamowa i akcydensowa",
          "Druk wielkoformatowy i banery",
          "Papier biurowy Maestro i materiały biurowe",
          "Projekt indywidualny / Inne",
        ],
        country: "Kraj dostawy *",
        countryPlaceholder: "Wybierz kraj dostawy",
        countryOptions: [
          "Polska",
          "Ukraina",
          "Niemcy (Deutschland)",
          "Inny kraj UE",
        ],
        urgentTitle: "Pilne zapytanie ofertowe?",
        urgentText: "W przypadku pilnych zleceń produkcyjnych prosimy o bezpośredni kontakt telefoniczny lub mailowy z naszym działem technologicznym.",
        message: "Opis zamówienia (nakład, format, surowiec)",
        messagePlaceholder: "Podaj planowany nakład, liczbę stron, rodzaj papieru, uszlachetnienia lub termin realizacji...",
        consent: "Potwierdzam zgodę z Regulaminem oraz Polityką Prywatności.",
        submitBtn: "WYŚLIJ ZAPYTANIE →",
        successTitle: "Zapytanie wysłane pomyślnie",
        successText: "Dziękujemy! Nasz technolog analizuje przesłane parametry i skontaktuje się wkrótce z dokładną kalkulacją.",
        sendAnother: "← Wyślij kolejne zapytanie",
      },
    },
  },
  DE: {
    header: {
      banner: "Produktionskomplex GmbH 'Alfa & Omega' • Winnyzja, 600-Jahre-Str. 17 | MwSt.-Abrechnung • Staatskasse",
      catalog: "Katalog",
      print: "Druckerei",
      capabilities: "Möglichkeiten",
      shop: "Shop",
      about: "Über uns",
      calc: "Druckanfrage",
      cart: "Warenkorb",
      close: "Schließen",
      allCatalog: "Gesamten Katalog mit Filtern und Preisen öffnen →",
    },
    aboutPage: {
      heroTitle1: "Qualität. Vertrauen.",
      heroTitle2: "Stabilität.",
      manifesto:
        "Das Handelshaus 'Alfa & Omega' GmbH ist seit 2018 auf dem Druckmarkt tätig. Heute ist es ein 2.500 m² großes Unternehmen mit 46 Mitarbeitern, das Offset- und Digitaldruck, Buchherstellung, Lehrmaterialien, Etiketten und andere Druckerzeugnisse sowie den Vertrieb von Schreibwaren vereint.",
      calcBtn: "Anfrage senden",
      catalogBtn: "Produktkatalog",
      missionTag: "UNSERE MISSION",
      missionTitle: "Kundenideen in makellose Papierprodukte von höchster Qualität verwandeln",
      missionDesc:
        "Unternehmen, Verlage, Bildungseinrichtungen und Autoren mit erstklassigen, verlässlichen Drucklösungen zu versorgen — vom signifikanten Einzelexemplar bis hin zu industriellen Großauflagen.",
      visionTag: "VISION",
      visionTitle: "Klassische Buchdrucktradition mit führenden digitalen Innovationen vereinen",
      visionDesc:
        "Ein europäischer Maßstab für technologische Autonomie und Verlässlichkeit zu sein. Kontinuierliche Modernisierung des Maschinenparks, nachhaltige FSC-zertifizierte Papiere und schlüsselfertige Fertigung.",
      goalTag: "UNSER ZIEL",
      goalTitle: "100% Kundensicherheit bei Termintreue und Präzisionsqualität",
      goalDesc:
        "Unser Ziel ist die absolute Gelassenheit unserer Kunden. Wir steuern den gesamten Produktionsprozess und liefern direkt an Ihr Lager mit unserer eigenen LKW-Flotte.",
      teamTitle: "46 Spezialisten des Druckhandwerks",
      teamDesc: "Drucker, Buchbinder, Druckingenieure und Produktionsleiter des Unternehmens 'Alfa & Omega'.",
      trustTag: "STANDARDS & GARANTIEN",
      trustTitle: "Warum Kunden uns vertrauen",
      trustItems: [
        {
          num: "01",
          title: "Ausschreibungen & Verträge",
          desc: "Erfahrung mit Staatskassenkonten, vollständige Ausschreibungsunterlagen und rechtssichere Lieferverträge.",
        },
        {
          num: "02",
          title: "Vollständige Energieautarkie",
          desc: "Industrielle Unabhängigkeit: Produktionsfortführung auch bei vollständigem Strom- und Wasserausfall.",
        },
        {
          num: "03",
          title: "Soziale Verantwortung",
          desc: "Fertigung für die Streitkräfte der Ukraine sowie Restaurierung beschädigter Schulbücher und Lehrmittel.",
        },
        {
          num: "04",
          title: "Direkte Kommunikation",
          desc: "Harmonische Verbindung aus persönlicher Fachberatung und modernster digitaler Online-Bestellabwicklung.",
        },
        {
          num: "05",
          title: "Strategische Partnerschaft",
          desc: "Über 20 Jahre enge Partnerschaft mit Konica Minolta. Einsatz der Hochleistungsmaschine AccurioPress C7090 Enhanced.",
        },
        {
          num: "06",
          title: "Farbsicherheit & Kontrolle",
          desc: "Integriertes Spektralphotometer IQ-501 Intelligent Quality Care für automatisierte Farbkalibrierung und Passergenauigkeit.",
        },
        {
          num: "07",
          title: "Produktionssynergie",
          desc: "Intelligente Auftragsverteilung: Großauflagen im industriellen Offsetdruck, Eil- und Kleinserien im Digitaldruck.",
        },
        {
          num: "08",
          title: "Eigener Fuhrpark & Logistik",
          desc: "Eigene LKW-Flotte für pünktliche und sichere Direktlieferungen in der Ukraine und im europäischen Raum.",
        },
      ],
      prodTag: "KAPAZITÄTEN",
      prodTitle: "Unsere Produktion",
      prodTabs: [
        {
          id: "digital",
          category: "Digitaldruck",
          title: "Hochleistungs-Digitaldruckkomplex",
          description:
            "Schneller und farbpräziser Druck für operative Auflagen: Hard- und Softcover-Bücher, Kataloge, Broschüren, Flyer und Etiketten mit Andruckmuster vor der Hauptauflage.",
          features: [
            "Express-Druck für kleine und mittlere Auflagen",
            "Möglichkeit zur Erstellung eines verbindlichen Vorabmusters",
            "Breites Sortiment an gestrichenen, Natur- und Designpapieren",
          ],
        },
        {
          id: "offset",
          category: "Offsetdruck",
          title: "Bogenoffset-Druckkomplex B2",
          description:
            "Industrieller Offsetdruck für anspruchsvolle Großauflagen: Lehrbücher, Kunstkataloge, Zeitschriften und Handbücher mit optimaler Stückkosten-Effizienz.",
          features: [
            "Niedrigste Stückkosten bei hohen Auflagen",
            "Maximale Detailschärfe und dauerhafte Farbkonstanz",
            "Ausschließliche Verwendung zertifizierter europäischer Papiere",
          ],
        },
        {
          id: "bindery",
          category: "Buchbinderei 7BC",
          title: "Hardcover 7BC & Fadenheftung",
          description:
            "Eigene Weiterverarbeitung: robuste 7BC-Buchdecken auf Graupappe, automatische Fadenheftung für perfektes 180°-Aufschlagverhalten, Heißfolienprägung und partieller UV-Lack.",
          features: [
            "Fertigung langlebiger Hardcover-Einbände 7BC",
            "Fadenheftung für höchste Reißfestigkeit und flaches Liegen",
            "Veredelung mit Gold-/Silberfolie und partiellem Glanzlack",
          ],
        },
        {
          id: "wide",
          category: "Großformatdruck",
          title: "Großformatdruck & Plotter-Formschnitt",
          description:
            "Werbedruck auf Rollenmedien: Banner, Poster, Leinwandbilder (Canvas), Schilder sowie optischer Konturschnitt für individuelle Aufkleber und Etiketten.",
          features: [
            "Witterungs- und UV-beständige Farben für Außen- und Innenbereich",
            "Exakter optischer Konturschnitt für Aufkleber beliebiger Form",
            "Schaufensterwerbung, Messestände und Werbetafeln",
          ],
        },
      ],
      productsTag: "PRODUKTSORTIMENT",
      productsTitle: "Unsere Produkte",
      productsBtn: "Vollständiger Online-Katalog",
      productsList: [
        {
          category: "Buchherstellung",
          title: "Hardcover- & Softcover-Bücher",
          desc: "Edle Buchpublikationen im 7BC-Einband, wissenschaftliche Werke und repräsentative Bildbände.",
          link: "/catalog?category=books",
        },
        {
          category: "Bildungsdruck",
          title: "Schulbücher & Lehrmaterialien",
          desc: "Offizielle Klassenbücher, Arbeitshefte und didaktische Wandtafeln für Schulen und Universitäten.",
          link: "/catalog?category=education",
        },
        {
          category: "Haftetiketten",
          title: "Etiketten & Formgeschnittene Sticker",
          desc: "Haftetiketten auf Markenfolien mit hochpräziser digitaler Konturstanzung.",
          link: "/catalog?category=labels",
        },
        {
          category: "Geschäftsausstattung",
          title: "Geschäftsdrucksachen",
          desc: "Produktkataloge, Präsentationsmappen, Notizbücher und Firmenbroschüren.",
          link: "/catalog?category=marketing",
        },
        {
          category: "Bürobedarf",
          title: "Kopierpapier & Schreibwaren",
          desc: "Original zertifiziertes A4/A3 Büropapier, Geschäftsvordrucke und Kassenrollen.",
          link: "/catalog?category=stationery",
        },
        {
          category: "Großformat",
          title: "Banner, Leinwände & Schilder",
          desc: "Werbebanner, Kunstdrucke auf Leinwand, Firmenschilder und Verkaufsraumwerbung.",
          link: "/catalog?category=large-format",
        },
      ],
      historyTag: "MEILENSTEINE",
      historyTitle: "Unsere Geschichte",
      historyDesc: "Über 25 Jahre kontinuierliche Entwicklung, Partnerschaft und Innovation in Winnyzja",
      historySub: "Winnyzja • 25 Jahre gemeinsam",
      milestones: [
        {
          year: "1998",
          month: "September",
          title: "Gründung des Unternehmens",
          text: "Gründung des Unternehmens 'Edelweiss'. Spezialisierung auf den Groß- und Einzelhandel mit Premiumpapieren.",
        },
        {
          year: "2000",
          month: "Wachstum",
          title: "Erste kostenlose Direktlieferung",
          text: "Erweiterung um Bürobedarf. Pionierleistung: Kostenlose Direktbelieferung von Firmenkunden.",
        },
        {
          year: "2002",
          month: "Anerkennung",
          title: "Komplettversorgung für Unternehmen",
          text: "Umfassende Geschäftsausstattung. Auszeichnung 'Wirtschaftselite von Podillja'.",
        },
        {
          year: "2011",
          month: "Februar",
          title: "Industrieller Druckkomplex",
          text: "Inbetriebnahme des geschlossenen Produktionszyklus vom Grafikentwurf bis zum fertigen 7BC-Buch.",
        },
        {
          year: "2020",
          month: "Technologie",
          title: "Spezialisierte Etikettendrucklinie",
          text: "Einführung hochpräziser Rollenetikettenfertigung für regionale Industrie und Lebensmittelhersteller.",
        },
        {
          year: "2022",
          month: "Innovation",
          title: "Schulbücher mit Augmented Reality (AR)",
          text: "Druck neuartiger interaktiver Lehrbücher mit integrierten 3D-Modellen via Smartphone.",
        },
        {
          prefix: "von",
          year: "2024",
          suffix: "bis heute",
          month: "",
          title: "Flottenmodernisierung & Landesunterstützung",
          text: "Installation modernster Digitaldrucksysteme, Publikation des Chronikbandes 'Preis der Freiheit' und Hilfe für die Streitkräfte.",
        },
      ],
    },
    contactSection: {
      title: "Schnelle Produktionskalkulation",
      subtitle: "Senden Sie uns Ihre Projektparameter oder Druckdaten. Unsere Druckingenieure wählen das optimale Druckverfahren und erstellen ein präzises Angebot.",
      phoneDept: "Kalkulation & Auftragsannahme",
      emailDept: "Druckdateneingang & Pre-Press",
      addressDept: "Produktionsstandort",
      addressVal: "Winnyzja, 600-richchya Str. 17, Ukraine",
      form: {
        firstName: "Vorname *",
        firstNamePlaceholder: "Geben Sie Ihren Vornamen ein",
        lastName: "Nachname *",
        lastNamePlaceholder: "Geben Sie Ihren Nachnamen ein",
        email: "E-Mail-Adresse *",
        emailPlaceholder: "name@unternehmen.de",
        phone: "Telefonnummer *",
        phonePlaceholder: "+49 ___ ________",
        company: "Unternehmen / Institution *",
        companyPlaceholder: "Name Ihres Unternehmens",
        requestType: "Anfragetyp *",
        requestTypePlaceholder: "Produktkategorie wählen",
        requestOptions: [
          "Hardcover-Bücher (Feste Decke 7BC)",
          "Kataloge, Magazine und Broschüren",
          "Haftetiketten und Aufkleber",
          "Akzidenzen & Werbedrucksachen",
          "Großformatdruck & Werbebanner",
          "Maestro Kopierpapier & Bürobedarf",
          "Sonderanfertigung / Sonstiges",
        ],
        country: "Lieferland *",
        countryPlaceholder: "Lieferland wählen",
        countryOptions: [
          "Deutschland",
          "Polen (Polska)",
          "Österreich",
          "Ukraine",
          "Anderes EU-Land",
        ],
        urgentTitle: "Dringende Produktionsanfrage?",
        urgentText: "Für dringende Termine und Express-Aufträge kontaktieren Sie unser Produktionsteam bitte direkt per Telefon oder E-Mail.",
        message: "Auftragsbeschreibung (Auflage, Format, Papier)",
        messagePlaceholder: "Geben Sie Auflage, Seitenzahl, Papiersorte, Veredelungen oder Wunschtermine an...",
        consent: "Ich bestätige mein Einverständnis mit den AGB und den Datenschutzbestimmungen.",
        submitBtn: "ANFRAGE SENDEN →",
        successTitle: "Anfrage erfolgreich übermittelt",
        successText: "Vielen Dank! Unser technischer Leiter prüft Ihre Angaben und meldet sich zeitnah mit einem detaillierten Angebot.",
        sendAnother: "← Weitere Anfrage senden",
      },
    },
  },
};

interface LanguageContextType {
  lang: LanguageCode;
  setLang: (lang: LanguageCode) => void;
  country: string;
  setCountry: (country: string) => void;
  t: Translations;
  isRegionModalOpen: boolean;
  setIsRegionModalOpen: (open: boolean) => void;
  isCatalogOpen: boolean;
  setIsCatalogOpen: (open: boolean) => void;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<LanguageCode>("UA");
  const [country, setCountry] = useState<string>("Україна");
  const [isRegionModalOpen, setIsRegionModalOpen] = useState(false);
  const [isCatalogOpen, setIsCatalogOpen] = useState(false);

  useEffect(() => {
    try {
      const savedLang = localStorage.getItem("edelvin_lang") as LanguageCode;
      if (savedLang && ["UA", "EN", "PL", "DE"].includes(savedLang)) {
        setLangState(savedLang);
      }
      const savedCountry = localStorage.getItem("edelvin_country");
      if (savedCountry) {
        setCountry(savedCountry);
      }
    } catch {
      // ignore
    }
  }, []);

  const setLang = (newLang: LanguageCode) => {
    setLangState(newLang);
    try {
      localStorage.setItem("edelvin_lang", newLang);
      if (newLang === "EN") setCountry("Міжнародна доставка");
      else if (newLang === "PL") setCountry("Польща");
      else if (newLang === "DE") setCountry("Німеччина");
      else setCountry("Україна");
    } catch {
      // ignore
    }
  };

  const handleSetCountry = (newCountry: string) => {
    setCountry(newCountry);
    try {
      localStorage.setItem("edelvin_country", newCountry);
    } catch {
      // ignore
    }
  };

  const t = translations[lang] || translations.UA;

  return (
    <LanguageContext.Provider
      value={{
        lang,
        setLang,
        country,
        setCountry: handleSetCountry,
        t,
        isRegionModalOpen,
        setIsRegionModalOpen,
        isCatalogOpen,
        setIsCatalogOpen,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    return {
      lang: "UA" as LanguageCode,
      setLang: () => {},
      country: "Україна",
      setCountry: () => {},
      t: translations.UA,
      isRegionModalOpen: false,
      setIsRegionModalOpen: () => {},
      isCatalogOpen: false,
      setIsCatalogOpen: () => {},
    };
  }
  return context;
}
