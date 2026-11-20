import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Виробничі можливості B2B | Поліграфічне підприємство «Альфа і Омега»",
  description:
    "Виробнича база повного циклу у Вінниці: ≈ 1 000 000 од. продукції щомісяця. Етикетки для харчопрому, напоїв, фарми, серійні лінійки 100+ SKU, тверда палітурка 7БЦ, сертифікація ISO 9001 / 14001.",
  alternates: {
    canonical: "https://edelvin.com.ua/capabilities",
  },
  openGraph: {
    title: "Виробничі можливості B2B | ТОВ «Альфа і Омега»",
    description:
      "Рішення для ринків: харчова продукція, алкоголь, фарма, косметика, retail. Від макета до серійної лінійки.",
    url: "https://edelvin.com.ua/capabilities",
    images: [
      {
        url: "/images/book/image2.png",
        width: 1200,
        height: 630,
        alt: "Виробничий комплекс ТОВ «Альфа і Омега»",
      },
    ],
  },
};

export default function CapabilitiesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
