import type { IconType } from "react-icons";
import { FiLayers, FiMonitor, FiServer, FiGrid } from "react-icons/fi";

export type ServiceVisual = "stack" | "browser" | "api" | "dashboard";

export interface Service {
  title: string;
  description: string;
  icon: IconType;
  /** Live illustration shown on the card (see ui/ServiceVisuals.tsx). */
  visual: ServiceVisual;
  /** Card glow colour. */
  tint: string;
  /** Tools shown as chips; not translated. */
  stack: string[];
}

/**
 * Four core areas of expertise. Copy is translated in i18n/dict.ts
 * (index-aligned); icons, visuals + ordering live here.
 */
export const services: Service[] = [
  {
    title: "Full Stack Development",
    description:
      "End-to-end web applications across frontend, backend, databases and deployment.",
    icon: FiLayers,
    visual: "stack",
    tint: "#22d3ee",
    stack: ["Next.js", "Node.js", "MySQL", "Docker"],
  },
  {
    title: "Frontend Engineering",
    description:
      "Accessible, performant interfaces built with React, Next.js and TypeScript.",
    icon: FiMonitor,
    visual: "browser",
    tint: "#3b82f6",
    stack: ["React", "TypeScript", "Tailwind", "Framer Motion"],
  },
  {
    title: "Backend & APIs",
    description:
      "Secure, scalable server logic and REST APIs with Laravel, .NET and Node.js.",
    icon: FiServer,
    visual: "api",
    tint: "#8b5cf6",
    stack: ["Laravel", ".NET", "Node.js", "REST"],
  },
  {
    title: "Dashboards & Digital Products",
    description:
      "Data-rich dashboards and polished product experiences, shipped to production.",
    icon: FiGrid,
    visual: "dashboard",
    tint: "#10b981",
    stack: ["Charts", "Realtime", "Role-based access", "Analytics"],
  },
];
