export interface JourneyItem {
  title: string;
  subtitle: string;
  description: string;
  period?: string;
}

/**
 * Timeline / journey entries — placeholder data, edit freely.
 */
export const journey: JourneyItem[] = [
  {
    title: "Computer Engineering",
    subtitle: "An-Najah National University",
    description:
      "Studying core computer engineering and software fundamentals, algorithms and system design.",
    period: "Education",
  },
  {
    title: "Full Stack Development",
    subtitle: "Web & Digital Products",
    description:
      "Building real-world web applications and digital products across the full stack.",
    period: "Focus",
  },
  {
    title: "Full Stack Developer",
    subtitle: "Grids Apps",
    description:
      "Building and shipping production web and mobile applications end-to-end — crafting responsive interfaces and robust backend services with modern technologies.",
    period: "Experience",
  },
];
