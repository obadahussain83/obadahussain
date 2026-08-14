import { FiGithub, FiLinkedin, FiInstagram } from "react-icons/fi";
import { site } from "@/data/site";

interface SocialLinksProps {
  className?: string;
  size?: number;
}

const links = [
  { href: site.socials.github, label: "GitHub", Icon: FiGithub },
  { href: site.socials.linkedin, label: "LinkedIn", Icon: FiLinkedin },
  { href: site.socials.instagram, label: "Instagram", Icon: FiInstagram },
];

export default function SocialLinks({ className = "", size = 18 }: SocialLinksProps) {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {links.map(({ href, label, Icon }) => (
        <a
          key={label}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={label}
          className="group flex h-11 w-11 items-center justify-center rounded-full border border-accent/20 bg-accent/[0.05] text-fg/80 transition-all duration-300 hover:-translate-y-1 hover:border-accent/50 hover:text-accent-glow hover:shadow-glow-sm"
        >
          <Icon size={size} />
        </a>
      ))}
    </div>
  );
}
