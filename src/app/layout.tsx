import type { Metadata, Viewport } from "next";
import { Analytics } from "@vercel/analytics/next";
import { Inter, JetBrains_Mono, Playfair_Display, Cairo } from "next/font/google";
import "./globals.css";
import AppProviders from "@/context/AppProviders";
import { site } from "@/data/site";

// Runs before paint to apply saved theme/language — avoids a flash of the
// wrong theme or direction on first load. Also opens the page at the hero
// on refresh instead of restoring the previous scroll position.
const noFlashScript = `(function(){try{if('scrollRestoration' in history&&!location.hash){history.scrollRestoration='manual';window.scrollTo(0,0);}}catch(e){}try{var t=localStorage.getItem('theme')||'dark';var l=localStorage.getItem('lang')||'ar';var e=document.documentElement;e.setAttribute('data-theme',t);e.setAttribute('lang',l);e.setAttribute('dir',l==='ar'?'rtl':'ltr');}catch(e){}})();`;

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
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="ar"
      dir="rtl"
      data-theme="dark"
      suppressHydrationWarning
      className={`${inter.variable} ${playfair.variable} ${jetbrainsMono.variable} ${cairo.variable}`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: noFlashScript }} />
      </head>
      <body className="font-sans antialiased">
        <AppProviders>{children}</AppProviders>
        <Analytics />
      </body>
    </html>
  );
}
