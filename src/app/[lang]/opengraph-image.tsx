import { ImageResponse } from "next/og";

// Render at request time (avoids a build-time prerender URL-resolution issue
// in @vercel/og); the card is tiny and cached by social crawlers anyway.
export const dynamic = "force-dynamic";

// Static metadata for the generated image (used by Next's file convention).
export const alt = "Obada Hussein — Full Stack Developer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/**
 * Social preview card, rendered to a real PNG at build/request time so it
 * displays correctly on WhatsApp, LinkedIn, X, Facebook, etc. (many of which
 * do not render SVG OG images).
 */
export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "0 90px",
          backgroundColor: "#05070f",
          backgroundImage:
            "radial-gradient(600px circle at 1000px 120px, rgba(139,92,246,0.35), transparent 55%), radial-gradient(500px circle at 120px 560px, rgba(59,130,246,0.28), transparent 55%)",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            fontSize: 88,
            fontWeight: 800,
            color: "#ffffff",
            letterSpacing: "-0.02em",
          }}
        >
          Obada Hussein
        </div>
        <div
          style={{
            marginTop: 12,
            fontSize: 56,
            fontWeight: 700,
            color: "transparent",
            backgroundImage: "linear-gradient(90deg, #3b82f6, #22d3ee)",
            backgroundClip: "text",
            WebkitBackgroundClip: "text",
          }}
        >
          Full Stack Developer
        </div>
        <div style={{ marginTop: 24, fontSize: 30, color: "#94a3b8" }}>
          Modern, fast and scalable web experiences
        </div>
      </div>
    ),
    { ...size }
  );
}
