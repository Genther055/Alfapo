# Alfa & Omega — Production & Enterprise Printing Portal

Official digital presence and B2B ordering portal for **Alfa & Omega LLC** (ТОВ «Торговий Дім «Альфа і Омега»), an industrial printing complex operating in Vinnytsia, Ukraine since 1998.

---

## 1. Technology Stack

- **Framework**: [Next.js 15 (App Router)](https://nextjs.org/)
- **UI Library**: [React 19](https://react.dev/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Typography**: Playfair Display (Serif), Inter / Montserrat (Sans-Serif)
- **Language**: TypeScript (Strict mode enabled)
- **Deployment Target**: Vercel / Node.js Production Server

---

## 2. Project Architecture & Routing

```
src/
├── app/
│   ├── layout.tsx            # Global root layout, font configurations, metadata
│   ├── page.tsx              # Main homepage (Hero, Equipment, Showcase, Shop teasers)
│   ├── catalog/
│   │   ├── page.tsx          # Full product cluster overview & dynamic filter
│   │   └── [slug]/page.tsx   # Dynamic detail view for each product item
│   ├── print/
│   │   └── page.tsx          # Industrial capabilities (Konica Minolta, Horizon, Mimaki, Dominant)
│   ├── capabilities/
│   │   └── page.tsx          # B2B technical capabilities & industry sector showcase
│   ├── shop/
│   │   ├── layout.tsx        # SEO metadata for direct warehouse supply
│   │   └── page.tsx          # Quick-order warehouse supplies (office paper, books, folders)
│   ├── about/
│   │   ├── page.tsx          # Company history since 1998, production base, values
│   │   └── team/page.tsx     # Engineering, prepress & administrative team
│   ├── cart/
│   │   └── page.tsx          # Shopping cart & B2B order checkout workflow
│   └── b2b/
│       └── page.tsx          # Corporate client onboarding & specifications
├── components/
│   ├── Header.tsx            # Fixed navigation header with dynamic mega-menu
│   ├── Footer.tsx            # Corporate footer, contact numbers, address & map
│   ├── ProductCarousel.tsx   # Smooth horizontal snap carousel for showcase items
│   ├── JsonLd.tsx            # Structured JSON-LD schema (Organization, LocalBusiness)
│   └── ScrollRevealText.tsx  # Dynamic typography reveal component
├── context/
│   ├── CartContext.tsx       # Global cart state management (localStorage persistence)
│   └── LanguageContext.tsx   # Multilingual content store (UA, EN, PL, DE)
└── data/
    └── catalog.ts            # Centralized typed product clusters & specification dataset
```

---

## 3. Getting Started

### Prerequisites

- **Node.js**: v18.18.0 or higher
- **Package Manager**: npm, pnpm, or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/Genther055/Alfapo.git
cd Alfapo

# Install dependencies
npm install
```

### Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Production Build

```bash
# Verify static build generation and TypeScript compilation
npm run build

# Start production server locally
npm run start
```

---

## 4. Key Engineering Guidelines

1. **Editorial Styling**: Clean layout with high-contrast typography, border separations, and subtle hover transforms.
2. **Media Optimization**: All product and facility photography is placed in `/public/images/` and served via `next/image` with responsive `sizes` attributes and aspect-ratio containers to prevent layout shift.
3. **Data Integrity**: Product lines and categories are strictly managed via `src/data/catalog.ts`. Any new product category should follow the typed schema (`CatalogCluster`, `CatalogItem`).
4. **Copywriting Standards**: Avoid external company names, unnecessary marketing jargon, or bracketed qualifiers. Use clear, descriptive Ukrainian typography.

---

## 5. License

Proprietary and Confidential.  
Copyright © 2026 ТОВ «Торговий Дім «Альфа і Омега» / Alfa & Omega Trade House LLC. All Rights Reserved.  
See [LICENSE](./LICENSE) for terms.
