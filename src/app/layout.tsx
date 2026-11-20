import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import JsonLd from "@/components/JsonLd";
import { LanguageProvider } from "@/context/LanguageContext";

export const metadata: Metadata = {
  metadataBase: new URL("https://edelvin.com.ua"),
  title: {
    default: "Друкарня Вінниця — ТОВ «Альфа і Омега» | Цифровий друк Konica Minolta 2500 м²",
    template: "%s | ТОВ «Альфа і Омега» (Вінниця)",
  },
  description:
    "Виробничий комплекс замкнутого циклу площею 2 500 м² у Вінниці: промисловий цифровий друк Konica Minolta AccurioPress C7090 Enhanced, власна палітурна мануфактура 7БЦ, книги, самоклейна етикетка, склад паперу Maestro. Робота з ПДВ, казначейські рахунки, договори.",
  keywords: [
    "друкарня Вінниця",
    "поліграфія Вінниця",
    "друк книг Вінниця",
    "тверда палітурка 7БЦ Вінниця",
    "офсетний друк Вінниця",
    "цифровий друк Вінниця",
    "друк етикеток Вінниця",
    "виготовлення каталогів",
    "папір Maestro Вінниця",
    "папір А4 гуртом Вінниця",
    "канцтовари гуртом Вінниця",
    "нотаріальні книги реєстри",
    "ТОВ Альфа і Омега",
    "Альфа і Омега Вінниця",
    "Edelvin",
  ],
  authors: [{ name: "ТОВ «Альфа і Омега»", url: "https://edelvin.com.ua" }],
  creator: "ТОВ «Альфа і Омега»",
  publisher: "ТОВ «Альфа і Омега»",
  formatDetection: {
    email: true,
    address: true,
    telephone: true,
  },
  alternates: {
    canonical: "https://edelvin.com.ua",
    languages: {
      "uk-UA": "https://edelvin.com.ua",
      "en-US": "https://edelvin.com.ua",
      "pl-PL": "https://edelvin.com.ua",
      "de-DE": "https://edelvin.com.ua",
    },
  },
  openGraph: {
    type: "website",
    locale: "uk_UA",
    url: "https://edelvin.com.ua",
    siteName: "ТОВ «Альфа і Омега» — Поліграфія та видавництво",
    title: "Друкарня Вінниця — ТОВ «Альфа і Омега» | Цифровий друк Konica Minolta 2500 м²",
    description:
      "Виробничий комплекс цифрової поліграфії площею 2 500 м² у Вінниці. Промислова Konica Minolta AccurioPress C7090, ниткошвейний комплекс 7БЦ, рулонна етикетка, склад паперу. Безготівка з ПДВ.",
    images: [
      {
        url: "/images/production/plant-facade.png",
        width: 1200,
        height: 630,
        alt: "Виробничий комплекс ТОВ «Альфа і Омега» у Вінниці",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Друкарня Вінниця — ТОВ «Альфа і Омега»",
    description:
      "Виробнича друкарня 2 500 м² у Вінниці. Офсетний та цифровий друк, книги 7БЦ, етикетка.",
    images: ["/images/production/plant-facade.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="uk" className="scroll-smooth">
      <head>
        <JsonLd />
      </head>
      <body className="min-h-screen flex flex-col font-sans selection:bg-neutral-900 selection:text-white">
        <LanguageProvider>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </LanguageProvider>
      </body>
    </html>
  );
}
