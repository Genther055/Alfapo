import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Офісний папір, бланки та канцелярія зі складу у Вінниці",
  description:
    "Складська програма ТОВ «Альфа і Омега» у Вінниці: офісний папір А4 та А3 80 г/м², класні журнали НУШ, книги нотаріальних дій, папки ділові. Постійна наявність на складі, відвантаження в день замовлення, ПДВ.",
  keywords: [
    "купити папір Maestro Вінниця",
    "папір А4 80г ціна Вінниця",
    "папір для принтера гуртом",
    "класний журнал НУШ купити",
    "книга нотаріальних дій 7БЦ",
    "ділові папки картонні",
    "склад канцтоварів Вінниця",
    "папір офісний безготівка з ПДВ",
  ],
  alternates: {
    canonical: "https://edelvin.com.ua/shop",
  },
  openGraph: {
    title: "Офісний папір та канцелярія зі складу | ТОВ «Альфа і Омега»",
    description:
      "Сертифікований офісний папір А4 та А3, нотаріальні книги, бланки та шкільна документація у Вінниці.",
    url: "https://edelvin.com.ua/shop",
    images: ["/images/cases/retail-srp-display.png"],
  },
};

export default function ShopLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
