import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Каталог продукції та послуг друкарні | 30+ категорій поліграфії",
  description:
    "Повний онлайн-каталог виробничого комплексу «Альфа і Омега»: книги 7БЦ, журнали, буклети, коробки, самоклейні етикетки, ділові папки, сувеніри. Прямі виробничі ціни, мінімальний тираж від 1 шт, розрахунок вартості.",
  keywords: [
    "каталог поліграфії Вінниця",
    "друк книг каталог",
    "замовити етикетки",
    "виготовлення коробок з картону",
    "друк візиток буклетів",
    "виробництво блокнотів",
    "поліграфічна продукція від виробника",
  ],
  alternates: {
    canonical: "https://edelvin.com.ua/catalog",
  },
  openGraph: {
    title: "Каталог продукції та послуг | Друкарня ТОВ «Альфа і Омега»",
    description:
      "Понад 30 виробничих категорій поліграфії замкнутого циклу у Вінниці. Розрахунок тиражу від інженера-технолога.",
    url: "https://edelvin.com.ua/catalog",
    images: ["/images/cases/luxury-restaurant-menu.jpg"],
  },
};

export default function CatalogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
