import React from "react";
import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { CATALOG_CLUSTERS, ProductItem, CatalogCluster } from "@/data/catalog";
import ProductInquiryForm from "@/components/ProductInquiryForm";
import { ChevronRight, ArrowRight, ShieldCheck, Check, Layers, Sliders, Truck } from "lucide-react";

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

  let product: ProductItem | undefined;
  let currentCluster: CatalogCluster | undefined;

  for (const cluster of CATALOG_CLUSTERS) {
    const found = cluster.items.find((i) => i.slug === slug);
    if (found) {
      product = found;
      currentCluster = cluster;
      break;
    }
  }

  if (!product) {
    product = {
      id: slug,
      name: slug.replace(/-/g, " ").toUpperCase(),
      slug: slug,
      category: "custom",
      shortDesc: "Професійне виготовлення поліграфічної продукції у друкарні «Альфа і Омега».",
      turnaround: "1–2 робочих дні",
      minQty: 100,
      image: "/images/cases/luxury-hospitality.jpg",
    };
    currentCluster = CATALOG_CLUSTERS[0];
  }

  const relatedProducts = currentCluster?.items
    .filter((item) => item.slug !== product?.slug)
    .slice(0, 3) || [];

  const productImage = product.image || "/images/cases/luxury-hospitality.jpg";

  return (
    <div className="bg-white min-h-screen py-16 sm:py-24 text-slate-900 selection:bg-edelvin-blue selection:text-white">
      <div className="max-w-[1520px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-10">
        
        {/* Хлібні крихти */}
        <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs font-sans text-slate-500 mb-10">
          <Link href="/" className="hover:text-slate-950 transition-colors">Головна</Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <Link href="/catalog" className="hover:text-slate-950 transition-colors">Каталог</Link>
          {currentCluster && (
            <>
              <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
              <Link
                href={`/catalog?category=${currentCluster.id}`}
                className="hover:text-slate-950 transition-colors hidden sm:inline"
              >
                {currentCluster.title}
              </Link>
            </>
          )}
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <span className="text-slate-950 font-bold truncate max-w-xs">{product.name}</span>
        </nav>

        {/* 1. ГОЛОВНИЙ ПРЕЗЕНТАЦІЙНИЙ БЛОК ПРОДУКТУ */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start pb-16 border-b border-slate-200">
          
          {/* Фотографія виробу */}
          <div className="lg:col-span-7 space-y-4">
            <div className="relative aspect-[16/11] w-full bg-slate-50 overflow-hidden rounded-xs border border-slate-200 shadow-sm group">
              <Image
                src={productImage}
                alt={product.name}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 58vw"
                className="object-cover group-hover:scale-103 transition-transform duration-700 ease-out"
              />
            </div>
            <div className="flex items-center justify-between text-xs font-sans text-slate-500 pt-1">
              <span>ТОВ «Альфа і Омега» • Виробничий комплекс у Вінниці</span>
              <span>Сертифікований друк ISO / FOGRA39</span>
            </div>
          </div>

          {/* Опис та технічні параметри виробу */}
          <div className="lg:col-span-5 space-y-6">
            <div>
              <span className="font-sans text-xs font-bold text-edelvin-blue uppercase tracking-[0.25em] block mb-2">
                {currentCluster?.title || "ПОЛІГРАФІЯ ВІД ВИРОБНИКА"}
              </span>
              <h1 className="font-serif text-3xl sm:text-5xl font-normal tracking-tight text-slate-950 leading-tight">
                {product.name}
              </h1>
            </div>

            <p className="text-base sm:text-lg text-slate-700 font-normal leading-relaxed">
              {product.shortDesc}
            </p>

            {/* Основні технічні параметри у вигляді лаконічної таблиці */}
            <div className="pt-4 border-t border-slate-200 space-y-3 font-sans text-xs">
              <div className="flex items-center justify-between py-2 border-b border-slate-100">
                <span className="text-slate-500">Мінімальний тираж:</span>
                <span className="text-slate-950 font-bold">від {product.minQty} шт</span>
              </div>
              <div className="flex items-center justify-between py-2 border-b border-slate-100">
                <span className="text-slate-500">Термін виготовлення:</span>
                <span className="text-edelvin-blue font-bold">{product.turnaround}</span>
              </div>
              <div className="flex items-center justify-between py-2 border-b border-slate-100">
                <span className="text-slate-500">Колірний стандарт:</span>
                <span className="text-slate-950 font-bold">CMYK / FOGRA39 / ISO 12647</span>
              </div>
              <div className="flex items-center justify-between py-2">
                <span className="text-slate-500">Форма оплати:</span>
                <span className="text-slate-950 font-bold">Безготівковий з ПДВ / Казначейство</span>
              </div>
            </div>

            {/* Виробничі переваги списком */}
            <div className="pt-2 space-y-2.5 font-sans text-xs text-slate-700">
              <div className="flex items-start gap-2.5">
                <Check className="w-4 h-4 text-edelvin-blue shrink-0 mt-0.5" />
                <span>Сертифіковані європейські папери, картони та самоклейні матеріали</span>
              </div>
              <div className="flex items-start gap-2.5">
                <Check className="w-4 h-4 text-edelvin-blue shrink-0 mt-0.5" />
                <span>Можливість виготовлення тестового сигнального зразка перед основним тиражем</span>
              </div>
              <div className="flex items-start gap-2.5">
                <Check className="w-4 h-4 text-edelvin-blue shrink-0 mt-0.5" />
                <span>Пряме виробництво без посередників: власні машини у Вінниці на вул. 600-річчя, 17</span>
              </div>
            </div>

            {/* Якірне посилання до форми */}
            <div className="pt-4">
              <a
                href="#inquiry"
                className="inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-slate-950 text-white font-sans text-xs font-bold uppercase tracking-widest hover:bg-edelvin-blue transition-colors rounded-xs shadow-xs"
              >
                <span>Замовити консультацію технолога</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>

          </div>
        </section>

        {/* 2. ТЕХНОЛОГІЧНІ ТА МАТЕРІАЛЬНІ МОЖЛИВОСТІ ДЛЯ ВИРОБУ */}
        <section className="py-16 border-b border-slate-200">
          <div className="mb-10">
            <span className="font-sans text-xs font-bold uppercase tracking-[0.25em] text-edelvin-blue block mb-2">
              Виробничий цикл
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-normal text-slate-950">
              Технологічні можливості та опції оздоблення
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="border border-slate-200 bg-white p-7 rounded-xs space-y-3">
              <div className="w-9 h-9 rounded-full bg-slate-100 flex items-center justify-center text-edelvin-blue mb-2">
                <Layers className="w-4 h-4" />
              </div>
              <h3 className="font-serif text-xl text-slate-950 font-normal">
                Матеріали та субстрати
              </h3>
              <p className="font-sans text-xs sm:text-sm text-slate-600 font-normal leading-relaxed">
                Крейдовані та офсетні папери європейського виробництва від 80 до 350 г/м², дизайнерські фактурні картони, крафт, а також вологостійкі поліпропіленові плівки.
              </p>
            </div>

            <div className="border border-slate-200 bg-white p-7 rounded-xs space-y-3">
              <div className="w-9 h-9 rounded-full bg-slate-100 flex items-center justify-center text-edelvin-blue mb-2">
                <Sliders className="w-4 h-4" />
              </div>
              <h3 className="font-serif text-xl text-slate-950 font-normal">
                Постобробка та оздоблення
              </h3>
              <p className="font-sans text-xs sm:text-sm text-slate-600 font-normal leading-relaxed">
                Гаряче тиснення золотою або срібною фольгою Kurz, оксамитова ламінація Soft-Touch, вибірковий УФ-лак, бігування, перфорація та фігурна контурна висічка.
              </p>
            </div>

            <div className="border border-slate-200 bg-white p-7 rounded-xs space-y-3">
              <div className="w-9 h-9 rounded-full bg-slate-100 flex items-center justify-center text-edelvin-blue mb-2">
                <Truck className="w-4 h-4" />
              </div>
              <h3 className="font-serif text-xl text-slate-950 font-normal">
                Упаковка та логістика
              </h3>
              <p className="font-sans text-xs sm:text-sm text-slate-600 font-normal leading-relaxed">
                Акуратне пакування в термозбіжну плівку або марковані гофрокороби. Безкоштовна доставка автопарком підприємства по Вінниці та відправка по всій Україні.
              </p>
            </div>
          </div>
        </section>

        {/* 3. ФОРМА ЗВ'ЯЗКУ ТА ЗАМОВЛЕННЯ */}
        <section id="inquiry" className="py-16 border-b border-slate-200 scroll-mt-20">
          <ProductInquiryForm
            productName={product.name}
            turnaround={product.turnaround}
            minQty={product.minQty}
          />
        </section>

        {/* 4. СХОЖІ ВИРОБИ З ЦІЄЇ Ж КАТЕГОРІЇ */}
        {relatedProducts.length > 0 && (
          <section className="pt-16">
            <div className="flex items-baseline justify-between mb-8">
              <div>
                <span className="font-sans text-xs font-bold uppercase tracking-[0.25em] text-edelvin-blue block mb-2">
                  Також у категорії
                </span>
                <h3 className="font-serif text-2xl sm:text-3xl font-normal text-slate-950">
                  Інші вироби напряму {currentCluster?.title}
                </h3>
              </div>
              <Link
                href="/catalog"
                className="font-sans text-xs font-bold uppercase tracking-wider text-slate-950 hover:text-edelvin-blue transition-colors flex items-center gap-1"
              >
                <span>Увесь каталог</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedProducts.map((relItem) => (
                <div
                  key={relItem.id}
                  className="p-6 bg-white border border-slate-200 rounded-xs hover:border-slate-950 hover:shadow-lg transition-all duration-300 flex flex-col justify-between group"
                >
                  <div>
                    {relItem.image && (
                      <div className="relative aspect-[16/10] w-full bg-slate-50 overflow-hidden mb-4 rounded-xs border border-slate-100">
                        <Image
                          src={relItem.image}
                          alt={relItem.name}
                          fill
                          sizes="(max-width: 768px) 100vw, 33vw"
                          className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                        />
                      </div>
                    )}
                    <h4 className="font-serif text-xl text-slate-950 font-normal group-hover:text-edelvin-blue transition-colors leading-snug">
                      {relItem.name}
                    </h4>
                    <p className="text-xs text-slate-600 font-normal mt-2 leading-relaxed line-clamp-2">
                      {relItem.shortDesc}
                    </p>
                  </div>

                  <div className="mt-6 pt-4 border-t border-slate-100">
                    <Link
                      href={`/catalog/${relItem.slug}`}
                      className="text-xs font-sans font-bold uppercase tracking-wider text-slate-950 group-hover:text-edelvin-blue flex items-center gap-1.5 transition-colors"
                    >
                      <span>Детальніше про виріб</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

      </div>
    </div>
  );
}
