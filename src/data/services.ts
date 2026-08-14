import type { IconType } from "react-icons";
import {
  FiLayers,
  FiMonitor,
  FiServer,
  FiSmartphone,
  FiGrid,
  FiFileText,
  FiCode,
  FiShare2,
  FiRefreshCw,
  FiZap,
} from "react-icons/fi";

export interface Service {
  title: string;
  description: string;
  icon: IconType;
}

export const services: Service[] = [
  {
    title: "Full Stack Web Development",
    description:
      "End-to-end web solutions covering frontend, backend, databases and deployment.",
    icon: FiLayers,
  },
  {
    title: "Frontend Development",
    description:
      "Pixel-perfect, accessible and performant interfaces using React and Next.js.",
    icon: FiMonitor,
  },
  {
    title: "Backend Development",
    description:
      "Secure and scalable APIs and server logic with Node.js, Laravel and .NET.",
    icon: FiServer,
  },
  {
    title: "Responsive Website Development",
    description:
      "Websites that look and feel great on every screen size, mobile-first.",
    icon: FiSmartphone,
  },
  {
    title: "Dashboard Development",
    description:
      "Data-rich admin dashboards with charts, tables and real-time insights.",
    icon: FiGrid,
  },
  {
    title: "Landing Pages",
    description:
      "High-converting, fast-loading landing pages that tell your brand's story.",
    icon: FiFileText,
  },
  {
    title: "Web Application Development",
    description:
      "Complex, feature-rich web apps built with clean, maintainable architecture.",
    icon: FiCode,
  },
  {
    title: "Mobile App Development",
    description:
      "Cross-platform mobile applications powered by React Native and Expo.",
    icon: FiZap,
  },
  {
    title: "API Integration",
    description:
      "Seamless integration of third-party services, payments and REST APIs.",
    icon: FiShare2,
  },
  {
    title: "Website Redesign",
    description:
      "Modernizing outdated websites with fresh design and better performance.",
    icon: FiRefreshCw,
  },
];
