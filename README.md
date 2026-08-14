# Obada Hussein — Portfolio

Modern, premium, dark-themed one-page portfolio for a Full Stack Developer.
Built with **Next.js 14 (App Router) + TypeScript + Tailwind CSS + Framer Motion**.

موقع بورتفوليو احترافي بصفحة واحدة، تصميم داكن حديث، مبني بـ Next.js + TypeScript + Tailwind + Framer Motion.

## Getting started / التشغيل

```bash
npm install
npm run dev      # http://localhost:3000
```

Build for production / نسخة الإنتاج:

```bash
npm run build
npm run start
```

## Project structure / هيكل المشروع

```
src/
├─ app/
│  ├─ layout.tsx        # <head>, SEO + Open Graph metadata, fonts
│  ├─ page.tsx          # assembles all sections in order
│  └─ globals.css       # theme tokens + reusable utility classes
├─ components/
│  ├─ Navbar.tsx        # sticky nav + mobile hamburger
│  ├─ Footer.tsx
│  ├─ sections/         # Hero, About, Skills, Projects, Services, Experience, Contact
│  └─ ui/               # Reveal, SectionHeading, SocialLinks, ContactForm
└─ data/                # ← EDIT YOUR CONTENT HERE
   ├─ site.ts           # name, role, contact info, social links, CV path, photo
   ├─ navigation.ts     # navbar links
   ├─ about.ts          # about text + info cards
   ├─ skills.ts         # technologies (grouped) + icons
   ├─ projects.ts       # projects (add/remove freely)
   ├─ services.ts       # services list
   └─ experience.ts     # journey / timeline
```

All content lives in `src/data/*` — you can edit everything without touching the components.
كل المحتوى موجود في مجلد `src/data` — عدّل بياناتك من هناك بدون لمس الكومبوننتس.

## How to customize / كيفية التعديل

### 1. Your photo / صورتك الشخصية
Replace **`public/profile.svg`** with your own photo.
If you use a `.jpg`/`.png`, update the path in `src/data/site.ts`:

```ts
profileImage: "/profile.jpg",
```

### 2. Contact info & social links / معلومات التواصل والروابط
Edit `src/data/site.ts` → `contact` and `socials`.
The placeholder phone/email/WhatsApp values are safe to replace.

### 3. Your CV / السيرة الذاتية
Replace **`public/cv.pdf`** with your real CV (keep the same filename), or change `cvUrl` in `site.ts`.

### 4. Projects / المشاريع
Edit the array in `src/data/projects.ts`. Add or remove objects freely — the grid updates automatically.
Project preview images live in `public/projects/`. Replace the `.svg` placeholders with your own screenshots
and update the `image` field (e.g. `"/projects/my-app.png"`).

### 5. Skills, Services, Journey
Edit `src/data/skills.ts`, `src/data/services.ts`, `src/data/experience.ts`.

### 6. Regenerate placeholder art (optional)
`node scripts/gen-placeholders.mjs` regenerates the branded SVG placeholders
(profile, project previews, favicon, OG image) in `/public`.

## Contact form / نموذج التواصل
The form validates on the client (name, email, phone, message) and shows a success state.
It is **not wired to a backend** — connect it to an email service or an API route
(`src/app/api/contact/route.ts`) when you're ready to receive real messages.

## Notes
- Images are served directly (`images.unoptimized` in `next.config.mjs`) so any file you drop
  into `/public` just works. If you later want Next.js image optimization for real photos,
  remove that flag and use `.jpg/.png/.webp` sources.
- Fully responsive & mobile-first, tested at 375 / 390 / 430 / 768 / 1024 / 1440 px with no horizontal scroll.
- Respects `prefers-reduced-motion`.
