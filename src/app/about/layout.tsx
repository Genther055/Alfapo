import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Про підприємство ТОВ «Альфа і Омега» | Історія з 1998 року та мануфактура",
  description:
    "Історія та виробничі потужності ТОВ «Альфа і Омега» у Вінниці: 25+ років на ринку поліграфії, 46 досвідчених фахівців, 2 500 м² виробничо-складських площ по вул. 600-річчя, 17. Офсет, книги 7БЦ, канцелярія.",
  keywords: [
    "ТОВ Альфа і Омега",
    "історія друкарні Альфа і Омега",
    "поліграфічне підприємство Вінниця",
    "видавництво Вінниця",
    "друкарня 600-річчя 17 Вінниця",
    "виробництво книг Вінниця",
  ],
  alternates: {
    canonical: "https://edelvin.com.ua/about",
  },
  openGraph: {
    title: "Про підприємство ТОВ «Альфа і Омега» | 25 років бездоганного друку",
    description:
      "Історія виробничого комплексу 2 500 м² та команди з 46 професіоналів друкарської справи у Вінниці.",
    url: "https://edelvin.com.ua/about",
    images: ["/images/production/plant-facade.png"],
  },
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
