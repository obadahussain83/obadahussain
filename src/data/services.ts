import type { IconType } from "react-icons";
import { FiLayers, FiMonitor, FiServer, FiGrid } from "react-icons/fi";

export interface Service {
  title: string;
  description: string;
  icon: IconType;
}

/**
 * Four core areas of expertise. Copy is translated in i18n/dict.ts
 * (index-aligned); icons + ordering live here.
 */
export const services: Service[] = [
  {
    title: "Full Stack Development",
    description:
      "End-to-end web applications across frontend, backend, databases and deployment.",
    icon: FiLayers,
  },
  {
    title: "Frontend Engineering",
    description:
      "Accessible, performant interfaces built with React, Next.js and TypeScript.",
    icon: FiMonitor,
  },
  {
    title: "Backend & APIs",
    description:
      "Secure, scalable server logic and REST APIs with Laravel, .NET and Node.js.",
    icon: FiServer,
  },
  {
    title: "Dashboards & Digital Products",
    description:
      "Data-rich dashboards and polished product experiences, shipped to production.",
    icon: FiGrid,
  },
];
