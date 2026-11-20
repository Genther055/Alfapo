import React from "react";
import Link from "next/link";
import type { Metadata } from "next";
import { CATALOG_CLUSTERS, ProductItem } from "@/data/catalog";
import ProductConfigurator from "@/components/ProductConfigurator";
import { ChevronRight } from "lucide-react";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  let product: ProductItem | undefined;
  for (const cluster of CATALOG_CLUSTERS) {
    const found = cluster.items.find((i) => i.slug === slug);
    if (found) {
      product = found;
      break;
    }
  }

  const title = product ? `${product.name} — Друк та виготовлення у Вінниці` : "Поліграфічна продукція";
  const description = product
    ? `${product.shortDesc} Мінімальний тираж від ${product.minQty} шт. Термін виконання: ${product.turnaround}. Виробничий комплекс ТОВ «Альфа і Омега» у Вінниці.`
    : "Поліграфічна продукція від виробника ТОВ «Альфа і Омега».";

  return {
    title,
    description,
    alternates: {
      canonical: `https://edelvin.com.ua/catalog/${slug}`,
    },
    openGraph: {
      title,
      description,
      url: `https://edelvin.com.ua/catalog/${slug}`,
    },
  };
}

export async function generateStaticParams() {
  const slugs: { slug: string }[] = [];
  CATALOG_CLUSTERS.forEach((cluster) => {
    cluster.items.forEach((item) => {
      slugs.push({ slug: item.slug });
    });
  });
  return slugs;
}

export default async function ProductDetailPage({ params }: PageProps) {
  const { slug } = await params;

  // Знаходимо продукт у каталозі
  let product: ProductItem | undefined;
  for (const cluster of CATALOG_CLUSTERS) {
    const found = cluster.items.find((i) => i.slug === slug);
    if (found) {
      product = found;
      break;
    }
  }

  // Fallback якщо продукт не знайдено
  if (!product) {
    product = {
      id: slug,
      name: slug.replace(/-/g, " ").toUpperCase(),
      slug: slug,
      category: "custom",
      shortDesc: "Професійне виготовлення на замовлення у друкарні «Альфа і Омега».",
      turnaround: "1–2 робочих дні",
      minQty: 100,
    };
  }

  return (
    <div className="bg-white min-h-screen py-16 sm:py-24 text-slate-900 selection:bg-edelvin-blue selection:text-white">
      <div className="max-w-[1520px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-10">
        
        {/* Хлібні крихти */}
        <div className="flex items-center gap-2 text-xs font-sans text-slate-500 mb-8">
          <Link href="/" className="hover:text-slate-950 transition-colors">Головна</Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <Link href="/catalog" className="hover:text-slate-950 transition-colors">Каталог</Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <span className="text-slate-950 font-bold truncate max-w-xs">{product.name}</span>
        </div>

        {/* Заголовок продукту */}
        <div className="pb-10 border-b border-slate-200 mb-12">
          <div className="flex flex-wrap items-baseline justify-between gap-4">
            <div>
              <span className="font-sans text-xs font-bold text-edelvin-blue uppercase tracking-[0.25em] block mb-2">
                СПЕЦИФІКАЦІЯ ВИРОБУ • ПАРАМЕТРИ ДРУКУ
              </span>
              <h1 className="font-serif text-4xl sm:text-6xl font-normal tracking-tight text-slate-950">
                {product.name}
              </h1>
            </div>
            <div className="font-sans text-xs text-slate-600 bg-slate-100 border border-slate-200 px-3.5 py-1.5 rounded-xs">
              Термін виготовлення: <strong className="text-slate-950">{product.turnaround}</strong>
            </div>
          </div>
          <p className="text-base sm:text-lg text-slate-700 font-normal mt-4 max-w-3xl leading-relaxed">
            {product.shortDesc}
          </p>
        </div>

        {/* Конфігуратор параметрів */}
        <ProductConfigurator product={product} />

      </div>
    </div>
  );
}
