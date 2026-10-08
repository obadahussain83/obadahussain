import type { IconType } from "react-icons";
import { FiBookOpen, FiBriefcase, FiCode } from "react-icons/fi";

export interface JourneyItem {
  title: string;
  subtitle: string;
  description: string;
  period?: string;
  icon: IconType;
  /** Highlight chips; not translated. */
  highlights: string[];
  /** Marks the ongoing chapter with a live "Now" badge. */
  current?: boolean;
}

/**
 * Timeline / journey entries. Copy is translated in i18n/dict.ts
 * (index-aligned); icons + highlights live here.
 */
export const journey: JourneyItem[] = [
  {
    title: "Computer Engineering",
    subtitle: "An-Najah National University",
    description:
      "Studying core computer engineering and software fundamentals, algorithms and system design.",
    period: "Education",
    icon: FiBookOpen,
    highlights: ["Algorithms", "Data Structures", "System Design"],
  },
  {
    title: "Full Stack Development",
    subtitle: "Web & Digital Products",
    description:
      "Building real-world web applications and digital products across the full stack.",
    period: "Focus",
    icon: FiCode,
    highlights: ["React", "Next.js", "Laravel", "Node.js"],
  },
  {
    title: "Full Stack Developer",
    subtitle: "Grids Apps",
    description:
      "Building and shipping production web and mobile applications end-to-end, crafting responsive interfaces and robust backend services with modern technologies.",
    period: "Experience",
    icon: FiBriefcase,
    highlights: ["Web Apps", "Mobile Apps", "APIs"],
    current: true,
  },
];
