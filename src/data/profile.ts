// Profile data and configuration for Preethesh Poojary's Portfolio

/**
 * Single constant for the portrait image source.
 * Must be a same-origin path to prevent WebGL CORS issues.
 * Stored in /public/portrait.png
 */
export const PORTRAIT_IMAGE_SRC = '/portrait.png';

export interface SocialLink {
  name: string;
  url: string;
  icon: 'github' | 'linkedin' | 'email';
}

export interface NavLink {
  label: string;
  href: string;
}

export const PROFILE = {
  name: 'Preethesh Poojary',
  firstName: 'PREETHESH',
  lastName: 'POOJARY',
  tagline: 'SOFTWARE & AI ENGINEER — MANGALURU, IN',
  pitch: 'I build agentic AI systems and web apps that turn messy problems into clear decisions.',
  rotatingRoles: [
    'AI Engineer',
    'ML Enthusiast',
    'Web Developer',
    'Agentic Architect'
  ],
  status: {
    available: true,
    text: 'Available for internships — 2027',
  },
  portrait: {
    src: PORTRAIT_IMAGE_SRC,
    alt: 'Portrait photograph of Preethesh Poojary with print halftone effect',
    hint: 'Move cursor to reveal · Click for ripple',
  },
  socialLinks: [
    {
      name: 'GitHub',
      url: 'https://github.com/preetheshp43',
      icon: 'github' as const,
    },
    {
      name: 'LinkedIn',
      url: 'https://linkedin.com/in/preethesh-poojary-5a072338a',
      icon: 'linkedin' as const,
    },
    {
      name: 'Email',
      url: 'mailto:preetheshp43@gmail.com',
      icon: 'email' as const,
    },
  ],
  navLinks: [
    { label: 'About', href: '#about' },
    { label: 'Skills', href: '#skills' },
    { label: 'Projects', href: '#projects' },
    { label: 'Education', href: '#education' },
    { label: 'Contact', href: '#contact' },
  ],
  actions: {
    projects: { label: 'View Projects', href: '#projects' },
    resume: { label: 'Download Resume', href: '/resume.pdf' },
    contact: { label: 'Contact', href: '#contact' },
  },
};
