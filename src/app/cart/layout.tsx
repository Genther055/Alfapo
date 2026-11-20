import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Кошик замовлень",
  description: "Оформлення замовлення у ТОВ «Альфа і Омега».",
  robots: {
    index: false,
    follow: false,
  },
};

export default function CartLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
