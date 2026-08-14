import type { IconType } from "react-icons";
import { FiMapPin, FiCpu, FiBriefcase, FiCheckCircle } from "react-icons/fi";

export const aboutText =
  "I'm a Full Stack Developer passionate about building modern digital products and creating smooth user experiences. I enjoy transforming ideas into functional, responsive and scalable applications — writing clean, maintainable code that stands the test of time.";

export interface AboutCard {
  label: string;
  value: string;
  icon: IconType;
}

export const aboutCards: AboutCard[] = [
  { label: "Location", value: "Palestine", icon: FiMapPin },
  { label: "Specialization", value: "Full Stack Development", icon: FiCpu },
  { label: "Experience", value: "Web & Mobile Development", icon: FiBriefcase },
  { label: "Availability", value: "Available for Freelance", icon: FiCheckCircle },
];
