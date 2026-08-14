// Generates branded SVG placeholder assets into /public.
// Run: node scripts/gen-placeholders.mjs
import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const pub = join(__dirname, "..", "public");
const projectsDir = join(pub, "projects");
mkdirSync(projectsDir, { recursive: true });

const defs = `
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#6366f1"/>
      <stop offset="0.5" stop-color="#8b5cf6"/>
      <stop offset="1" stop-color="#3b82f6"/>
    </linearGradient>
    <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
      <path d="M40 0H0V40" fill="none" stroke="rgba(255,255,255,0.06)" stroke-width="1"/>
    </pattern>
  </defs>`;

// Escape XML special characters so text content stays valid XML/SVG.
const esc = (s) =>
  String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");

function projectSvg(title, subtitle) {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 500" width="800" height="500">
  ${defs}
  <rect width="800" height="500" fill="#0a0e1a"/>
  <rect width="800" height="500" fill="url(#grid)"/>
  <circle cx="640" cy="120" r="180" fill="url(#g)" opacity="0.28"/>
  <circle cx="160" cy="420" r="150" fill="#6366f1" opacity="0.18"/>
  <g font-family="'Segoe UI', system-ui, sans-serif">
    <text x="60" y="250" fill="#ffffff" font-size="52" font-weight="700">${esc(title)}</text>
    <text x="62" y="292" fill="#94a3b8" font-size="22" font-weight="400">${esc(subtitle)}</text>
    <text x="60" y="440" fill="url(#g)" font-size="18" font-family="'JetBrains Mono', monospace">&lt;/&gt; project preview</text>
  </g>
</svg>`;
}

const projects = [
  ["alazim-motors", "Alazim Motors", "Car showroom & rental platform"],
  ["dorosak", "Dorosak", "Educational platform · AI-assisted"],
  ["nexstock", "NexStock", "Inventory & stock management"],
  ["digital-invitations", "Digital Invitations", "Interactive digital invites"],
  ["mihna", "Mihna", "Services marketplace platform"],
];

for (const [file, title, subtitle] of projects) {
  writeFileSync(join(projectsDir, `${file}.svg`), projectSvg(title, subtitle));
}

// Profile placeholder (portrait)
const profile = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 440 520" width="440" height="520">
  ${defs}
  <rect width="440" height="520" fill="#0f1424"/>
  <rect width="440" height="520" fill="url(#grid)"/>
  <circle cx="220" cy="180" r="90" fill="url(#g)" opacity="0.9"/>
  <text x="220" y="205" fill="#ffffff" font-size="70" font-weight="700" text-anchor="middle" font-family="system-ui, sans-serif">OH</text>
  <path d="M120 430 q100 -110 200 0 v90 h-200 z" fill="url(#g)" opacity="0.85"/>
  <text x="220" y="500" fill="#cbd5e1" font-size="18" text-anchor="middle" font-family="'JetBrains Mono', monospace">replace /public/profile</text>
</svg>`;
writeFileSync(join(pub, "profile.svg"), profile);

// Favicon
const favicon = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="64" height="64">
  ${defs}
  <rect width="64" height="64" rx="14" fill="url(#g)"/>
  <text x="32" y="43" fill="#ffffff" font-size="30" font-weight="700" text-anchor="middle" font-family="system-ui, sans-serif">OH</text>
</svg>`;
writeFileSync(join(pub, "favicon.svg"), favicon);

// OG image
const og = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 630" width="1200" height="630">
  ${defs}
  <rect width="1200" height="630" fill="#05070f"/>
  <rect width="1200" height="630" fill="url(#grid)"/>
  <circle cx="1000" cy="120" r="260" fill="url(#g)" opacity="0.25"/>
  <circle cx="180" cy="560" r="220" fill="#6366f1" opacity="0.16"/>
  <g font-family="'Segoe UI', system-ui, sans-serif">
    <text x="90" y="300" fill="#ffffff" font-size="82" font-weight="800">Obada Hussein</text>
    <text x="92" y="380" fill="url(#g)" font-size="54" font-weight="700">Full Stack Developer</text>
    <text x="92" y="450" fill="#94a3b8" font-size="28">Modern, fast and scalable web experiences</text>
  </g>
</svg>`;
writeFileSync(join(pub, "og-image.svg"), og);

console.log("Placeholder assets generated in /public");
