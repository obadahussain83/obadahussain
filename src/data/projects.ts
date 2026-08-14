export interface Project {
  title: string;
  description: string;
  technologies: string[];
  /** Project image in /public/projects. Replace files to update. */
  image: string;
  /** Optional live/demo link. Leave empty string to hide the button. */
  liveUrl: string;
  /** Optional GitHub link. Leave empty string to hide the button. */
  githubUrl: string;
  /** Optional badge: "personal" (your own) or "company" (built with Grids Apps). */
  tag?: "personal" | "company";
}

/**
 * Add / remove / reorder projects freely — the grid updates automatically.
 */
export const projects: Project[] = [
  {
    title: "Al-Hawkama Governance Platform",
    description:
      "Government governance platform for the Palestinian Ministry of Social Development — managing institutional workflows, oversight and reporting through a secure, role-based web system.",
    technologies: ["Next.js", "React", "Full Stack"],
    image: "/projects/al-hawkama.svg",
    liveUrl: "https://wssd.mosd.gov.ps/",
    githubUrl: "",
    tag: "company",
  },
  {
    title: "Dorosak",
    description:
      "Modern educational platform featuring interactive learning interfaces and AI-assisted experiences.",
    technologies: ["Next.js", "React", "TypeScript"],
    image: "/projects/dorosak.svg",
    liveUrl: "https://dorosak.com/en",
    githubUrl: "",
    tag: "company",
  },
  {
    title: "NexStock SaaS Landing Page",
    description:
      "Inventory and stock management system with dashboards, product management and reporting tools.",
    technologies: ["Laravel", "MySQL", "JavaScript"],
    image: "/projects/nexstock.svg",
    liveUrl: "https://nexstock.co/",
    githubUrl: "",
    tag: "company",
  },
  {
    title: "Digital Invitations",
    description:
      "Interactive digital invitation experiences with animations, countdowns, maps and mobile-first layouts.",
    technologies: ["React", "Next.js", "Framer Motion"],
    image: "/projects/digital-invitations.svg",
    liveUrl: "https://www.instagram.com/dawainvitation",
    githubUrl: "",
    tag: "personal",
  },
  {
    title: "Addha",
    description:
      "A scorekeeping calculator for card games — track rounds, running scores and results in real time. Currently a web app, with a mobile app planned.",
    technologies: ["Next.js", "React", "TypeScript"],
    image: "/projects/addha.svg",
    liveUrl: "https://addha.vercel.app/home",
    githubUrl: "",
    tag: "personal",
  },
];
