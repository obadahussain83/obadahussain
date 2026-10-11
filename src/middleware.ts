import { NextResponse, type NextRequest } from "next/server";

const LANGS = ["ar", "en"] as const;
type Lang = (typeof LANGS)[number];
const DEFAULT_LANG: Lang = "ar";
const YEAR = 60 * 60 * 24 * 365;

const isLang = (v: string | undefined): v is Lang => !!v && (LANGS as readonly string[]).includes(v);

// Each language is prerendered as its own static page (/ar, /en). Visitors
// keep clean URLs: "/" is rewritten to the language in their cookie, so the
// first HTML already has the right text and direction (no flash on reload).
export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const first = pathname.split("/")[1];

  // Generated social image lives under the language segment; serve as is.
  if (isLang(first) && pathname.includes("/opengraph-image")) return NextResponse.next();

  // /en or /en/... typed directly: remember it and drop the prefix.
  if (isLang(first)) {
    const url = req.nextUrl.clone();
    url.pathname = pathname.slice(first.length + 1) || "/";
    const res = NextResponse.redirect(url);
    res.cookies.set("lang", first, { path: "/", maxAge: YEAR, sameSite: "lax" });
    return res;
  }

  const cookie = req.cookies.get("lang")?.value;
  const lang = isLang(cookie) ? cookie : DEFAULT_LANG;
  const url = req.nextUrl.clone();
  url.pathname = `/${lang}${pathname === "/" ? "" : pathname}`;
  return NextResponse.rewrite(url);
}

export const config = {
  // Pages only: skip Next internals, metadata routes and any file with an extension.
  matcher: ["/((?!_next|api|.*\\..*).*)"],
};
