/**
 * Central site configuration.
 * Edit personal info, links, and CV path here — nothing is hardcoded in components.
 */

export const site = {
  name: "Obada Hussein",
  role: "Full Stack Developer",
  tagline: "I build modern, fast and scalable web experiences.",
  heroDescription:
    "I develop modern web applications — from intuitive user interfaces to robust backend systems — with a focus on performance, usability and clean architecture.",

  // Profile image lives in /public. Replace this file to change the photo.
  profileImage: "/profile.jpg",

  // CV file lives in /public. Replace to update the downloadable CV.
  cvUrl: "/cv.pdf",

  // Contact info.
  contact: {
    phone: "+970 598 579 108",
    whatsapp: "970598579108", // international format, digits only (for wa.me link)
    email: "obadahussain83@gmail.com",
    location: "Palestine",
  },

  // Social links — edit URLs freely.
  socials: {
    github: "https://github.com/obadahussain83",
    linkedin: "https://www.linkedin.com/in/obada-hussain-b73b763b1/",
    instagram: "https://www.instagram.com/obada_hussain",
  },
} as const;

export type Site = typeof site;
