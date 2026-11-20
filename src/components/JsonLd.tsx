import React from "react";

export default function JsonLd() {
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": ["LocalBusiness", "PrintShop"],
        "@id": "https://edelvin.com.ua/#organization",
        "name": "ТОВ «Альфа і Омега»",
        "legalName": "Товариство з обмеженою відповідальністю «Альфа і Омега»",
        "alternateName": [
          "Edelvin",
          "Друкарня Альфа і Омега",
          "Альфа і Омега Вінниця",
          "Поліграфічне підприємство Альфа і Омега"
        ],
        "url": "https://edelvin.com.ua",
        "logo": "https://edelvin.com.ua/images/ao-logo.png",
        "image": [
          "https://edelvin.com.ua/images/production/plant-facade.png",
          "https://edelvin.com.ua/images/production/roll-label-machine.png",
          "https://edelvin.com.ua/images/team/team-office.jpg"
        ],
        "telephone": "+380432550333",
        "email": "print@edelvin.com.ua",
        "foundingDate": "1998-09-01",
        "description": "Виробничий комплекс замкнутого циклу площею 2 500 м² у Вінниці. Промисловий цифровий друк Konica Minolta AccurioPress C7090 Enhanced, палітурна мануфактура 7БЦ, виготовлення книг, рулонних етикеток, склад офісного паперу та канцелярії.",
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "вул. 600-річчя, 17",
          "addressLocality": "Вінниця",
          "addressRegion": "Вінницька область",
          "postalCode": "21027",
          "addressCountry": "UA"
        },
        "geo": {
          "@type": "GeoCoordinates",
          "latitude": 49.233083,
          "longitude": 28.435017
        },
        "hasMap": "https://maps.google.com/?q=Вінниця,+вул.+600-річчя,+17",
        "openingHoursSpecification": [
          {
            "@type": "OpeningHoursSpecification",
            "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
            "opens": "09:00",
            "closes": "18:00"
          }
        ],
        "priceRange": "₴₴",
        "currenciesAccepted": "UAH",
        "paymentAccepted": "Безготівковий розрахунок з ПДВ, казначейські рахунки, банківська карта, безготівка",
        "areaServed": [
          { "@type": "City", "name": "Вінниця" },
          { "@type": "AdministrativeArea", "name": "Вінницька область" },
          { "@type": "Country", "name": "Україна" },
          { "@type": "AdministrativeArea", "name": "Польща" },
          { "@type": "AdministrativeArea", "name": "Німеччина" }
        ],
        "knowsAbout": [
          "Офсетний друк великих тиражів",
          "Книги у твердій палітурці 7БЦ",
          "Книги у м'якій обкладинці PUR",
          "Рулонні самоклейні етикетки",
          "Листові стікери та наліпки",
          "Виробництво картонної упаковки",
          "Презентаційні каталоги та журнали",
          "Офісний папір А4 гуртом",
          "Нотаріальні книги та реєстри"
        ]
      },
      {
        "@type": "WebSite",
        "@id": "https://edelvin.com.ua/#website",
        "url": "https://edelvin.com.ua",
        "name": "ТОВ «Альфа і Омега» — Виробнича друкарня Вінниця",
        "publisher": {
          "@id": "https://edelvin.com.ua/#organization"
        },
        "inLanguage": ["uk-UA", "en-US", "pl-PL", "de-DE"]
      }
    ]
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
