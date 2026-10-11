import type { Metadata, Viewport } from "next";
import { Analytics } from "@vercel/analytics/next";
import { Inter, JetBrains_Mono, Playfair_Display, Cairo } from "next/font/google";
import "../globals.css";
import AppProviders from "@/context/AppProviders";
import { site } from "@/data/site";

// Runs before paint:
// - applies the saved theme (avoids a flash of the wrong theme);
// - language comes from the server (middleware + lang cookie); visitors who
//   only have the older localStorage value get the cookie set and one reload;
// - marks repeat visits in this tab so the hero intro is skipped (CSS);
// - opens the page at the hero on refresh instead of the old scroll position.
const noFlashScript = `(function(){var e=document.documentElement;try{if('scrollRestoration' in history&&!location.hash){history.scrollRestoration='manual';window.scrollTo(0,0);}}catch(x){}try{e.setAttribute('data-theme',localStorage.getItem('theme')||'dark');if(!/(^|; )lang=/.test(document.cookie)){var l=localStorage.getItem('lang');if(l==='ar'||l==='en'){document.cookie='lang='+l+'; path=/; max-age=31536000; samesite=lax';if(l!==e.lang){location.reload();return;}}}}catch(x){}try{if(sessionStorage.getItem('hero-intro-seen')==='1')e.classList.add('intro-seen');else sessionStorage.setItem('hero-intro-seen','1');}catch(x){}})();`;

const LANGS = ["ar", "en"] as const;
type Lang = (typeof LANGS)[number];

// Both languages are prerendered; anything else 404s.
export const dynamicParams = false;
export function generateStaticParams() {
  return LANGS.map((lang) => ({ lang }));
}

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

// Accent fonts (signature, code labels) aren't needed for first paint, so
// they skip the preload and don't compete with Cairo/Inter.
const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-serif",
  display: "swap",
  preload: false,
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
  preload: false,
});

const cairo = Cairo({
  subsets: ["arabic", "latin"],
  variable: "--font-arabic",
  display: "swap",
});

const siteUrl = site.url;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  // /ar and /en exist internally; "/" is the one public URL.
  alternates: { canonical: "/" },
  title: "Obada Hussein | Full Stack Developer",
  description:
    "Full Stack Developer portfolio showcasing web applications, frontend development, backend development and modern digital experiences.",
  keywords: [
    "Obada Hussein",
    "Full Stack Developer",
    "Web Developer",
    "React",
    "Next.js",
    "Node.js",
    "Laravel",
    "Portfolio",
  ],
  authors: [{ name: "Obada Hussein" }],
  creator: "Obada Hussein",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    title: "Obada Hussein | Full Stack Developer",
    description:
      "Full Stack Developer portfolio showcasing web applications, frontend development, backend development and modern digital experiences.",
    siteName: "Obada Hussein",
    // The social preview image is generated as a PNG by
    // src/app/opengraph-image.tsx (Next's file convention wires it in here).
  },
  twitter: {
    card: "summary_large_image",
    title: "Obada Hussein | Full Stack Developer",
    description:
      "Full Stack Developer portfolio showcasing web applications, frontend development, backend development and modern digital experiences.",
  },
  icons: {
    icon: "/favicon.png",
    apple: "/apple-touch-icon.png",
  },
};

export const viewport: Viewport = {
  themeColor: "#070B14",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { lang: Lang };
}) {
  const lang = params.lang;
  return (
    <html
      lang={lang}
      dir={lang === "ar" ? "rtl" : "ltr"}
      data-theme="dark"
      suppressHydrationWarning
      className={`${inter.variable} ${playfair.variable} ${jetbrainsMono.variable} ${cairo.variable}`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: noFlashScript }} />
      </head>
      <body className="font-sans antialiased">
        <AppProviders initialLang={lang}>{children}</AppProviders>
        <Analytics />
      </body>
    </html>
  );
}
