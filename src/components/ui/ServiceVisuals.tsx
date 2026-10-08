import type { CSSProperties } from "react";
import type { ServiceVisual } from "@/data/services";

/**
 * Small live illustrations for the service cards. Pure CSS keyframes
 * (transform / opacity / clip-path) styled in globals.css under `.svc-`.
 * The parent sets data-play="true" while the card is on screen; otherwise
 * every animation inside is paused.
 */

const v = (vars: Record<string, string | number>) => vars as CSSProperties;

function StackVisual() {
  const layers = [
    { label: "UI", sub: "React · Next.js", color: "139 92 246", y: -58 },
    { label: "API", sub: "REST · Auth", color: "59 130 246", y: 0 },
    { label: "DB", sub: "MySQL · Cache", color: "34 211 238", y: 58 },
  ];
  return (
    <div className="svc-stack">
      {layers.map((l, i) => (
        <div key={l.label} className="svc-layer" style={v({ "--y": `${l.y}px`, "--c": l.color, "--d": `${i * -0.7}s` })}>
          <div className="svc-plate" />
          <span className="svc-layer-label">
            <b>{l.label}</b>
            {l.sub}
          </span>
        </div>
      ))}
      <span className="svc-rail" />
      <span className="svc-packet" />
      <span className="svc-packet svc-packet-up" />
    </div>
  );
}

function BrowserVisual() {
  return (
    <div className="svc-browser">
      <div className="svc-browser-bar">
        <i />
        <i />
        <i />
        <span>obada.dev</span>
      </div>
      <div className="svc-browser-body">
        <div className="svc-wf svc-wf-nav" style={v({ "--d": 0 })} />
        <div className="svc-wf svc-wf-hero" style={v({ "--d": 1 })}>
          <span />
          <span />
          <em className="svc-wf-btn" />
        </div>
        <div className="svc-wf-row">
          <div className="svc-wf" style={v({ "--d": 2 })} />
          <div className="svc-wf" style={v({ "--d": 3 })} />
          <div className="svc-wf" style={v({ "--d": 4 })} />
        </div>
        <svg className="svc-cursor" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M4 3l6.5 17 2.4-7.1L20 10.5z" />
        </svg>
        <span className="svc-click" />
      </div>
      <div className="svc-score">
        <svg viewBox="0 0 36 36" aria-hidden="true">
          <circle cx="18" cy="18" r="15" />
          <circle className="svc-score-arc" cx="18" cy="18" r="15" />
        </svg>
        <b>100</b>
      </div>
    </div>
  );
}

function ApiVisual() {
  return (
    <div className="svc-term">
      <div className="svc-term-bar">
        <i />
        <i />
        <i />
        <span>api — zsh</span>
      </div>
      <div className="svc-term-body">
        <p className="svc-type">
          <span className="svc-prompt">$</span> curl api.obada.dev/v1/projects
        </p>
        <p className="svc-line svc-ok" style={v({ "--d": 0 })}>
          HTTP/1.1 200 OK <span>· 38ms</span>
        </p>
        <p className="svc-line" style={v({ "--d": 1 })}>{"{"}</p>
        <p className="svc-line svc-indent" style={v({ "--d": 2 })}>
          <span className="svc-key">&quot;name&quot;</span>: <span className="svc-str">&quot;Al-Hawkama&quot;</span>,
        </p>
        <p className="svc-line svc-indent" style={v({ "--d": 3 })}>
          <span className="svc-key">&quot;stack&quot;</span>: [<span className="svc-str">&quot;Laravel&quot;</span>, <span className="svc-str">&quot;React&quot;</span>],
        </p>
        <p className="svc-line svc-indent" style={v({ "--d": 4 })}>
          <span className="svc-key">&quot;status&quot;</span>: <span className="svc-str">&quot;live&quot;</span>
        </p>
        <p className="svc-line" style={v({ "--d": 5 })}>
          {"}"}
          <span className="svc-caret" />
        </p>
      </div>
    </div>
  );
}

function DashboardVisual() {
  const bars = [0.45, 0.7, 0.55, 0.9, 0.65, 0.8, 1];
  return (
    <div className="svc-dash">
      <div className="svc-kpis">
        <div className="svc-kpi">
          <span>Revenue</span>
          <b>$48.2k</b>
          <em>▲ 24%</em>
        </div>
        <div className="svc-kpi">
          <span>Active users</span>
          <b>12.4k</b>
          <em>▲ 9%</em>
        </div>
      </div>
      <div className="svc-chart">
        <div className="svc-bars">
          {bars.map((h, i) => (
            <span key={i} style={v({ "--h": h, "--d": `${i * -0.35}s` })} />
          ))}
        </div>
        <svg className="svc-spark" viewBox="0 0 200 60" preserveAspectRatio="none" aria-hidden="true">
          <defs>
            <linearGradient id="svc-spark-fill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#10b981" stopOpacity="0.35" />
              <stop offset="1" stopColor="#10b981" stopOpacity="0" />
            </linearGradient>
          </defs>
          <path className="svc-spark-area" d="M0 48 L28 40 L56 44 L84 26 L112 32 L140 18 L168 22 L200 6 L200 60 L0 60Z" />
          <path className="svc-spark-line" d="M0 48 L28 40 L56 44 L84 26 L112 32 L140 18 L168 22 L200 6" />
        </svg>
      </div>
    </div>
  );
}

export default function ServiceVisualFor({ kind, play }: { kind: ServiceVisual; play: boolean }) {
  return (
    <div className="svc-visual" data-play={play} dir="ltr" aria-hidden="true">
      {kind === "stack" && <StackVisual />}
      {kind === "browser" && <BrowserVisual />}
      {kind === "api" && <ApiVisual />}
      {kind === "dashboard" && <DashboardVisual />}
    </div>
  );
}
