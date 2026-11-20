import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Цифровий друк Konica Minolta та палітурне виробництво у Вінниці",
  description:
    "Промисловий цифровий друк ТОВ «Альфа і Омега» на флагманській системі Konica Minolta AccurioPress C7090 Enhanced: спектрофотометричний контроль IQ-501, оперативні тиражі за 24 години, палітурна мануфактура 7БЦ, Soft-Touch ламінація, тиснення фольгою. Власна виробнича база у Вінниці по вул. 600-річчя, 17.",
  keywords: [
    "цифровий друк Вінниця",
    "Konica Minolta AccurioPress",
    "терміновий друк Вінниця",
    "виробництво книг 7БЦ",
    "тверда палітурка Вінниця",
    "ниткошвейне скріплення блоку",
    "друк журналів каталогів",
    "поліграфія повного циклу Вінниця",
    "ТОВ Альфа і Омега друк",
  ],
  alternates: {
    canonical: "https://edelvin.com.ua/print",
  },
  openGraph: {
    title: "Цифровий друк Konica Minolta та виробництво | ТОВ «Альфа і Омега»",
    description:
      "Промислова цифра Konica Minolta AccurioPress C7090, автоконтроль IQ-501, книги 7БЦ, тиснення фольгою. Пряме виробництво 2 500 м² у Вінниці.",
    url: "https://edelvin.com.ua/print",
    images: ["/images/production/roll-label-machine.png"],
  },
};

export default function PrintLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
