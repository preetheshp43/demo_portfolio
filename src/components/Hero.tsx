import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PROFILE } from '../data/profile';
import { PORTFOLIO_DATA } from '../data/portfolioData';
import HalftoneReveal from './HalftoneReveal';
import StrokeText from './StrokeText';
import { Mail, ArrowDown, Sparkles, ArrowUpRight } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

// Crisp inline SVGs for Brand Icons
const GitHubIcon: React.FC<{ className?: string }> = ({ className = 'h-4 w-4' }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    aria-hidden="true"
  >
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

const LinkedInIcon: React.FC<{ className?: string }> = ({ className = 'h-4 w-4' }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    aria-hidden="true"
  >
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

interface HeroProps {
  readyToAnimate: boolean; // triggered when loader exits
}

export const Hero: React.FC<HeroProps> = ({ readyToAnimate }) => {
  const [roleIndex, setRoleIndex] = useState(0);
  const [hasWebGL2, setHasWebGL2] = useState<boolean>(true);
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [canvasMounted, setCanvasMounted] = useState<boolean>(false);
  const { isDark } = useTheme();

  // Check WebGL2 support
  useEffect(() => {
    try {
      const canvas = document.createElement('canvas');
      const supported = !!(window.WebGL2RenderingContext && canvas.getContext('webgl2'));
      setHasWebGL2(supported);
    } catch {
      setHasWebGL2(false);
    }

    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Lazy-mount the HalftoneReveal canvas only after loader finishes
  useEffect(() => {
    if (readyToAnimate) {
      const timer = setTimeout(() => {
        setCanvasMounted(true);
      }, 50);
      return () => clearTimeout(timer);
    }
  }, [readyToAnimate]);

  // Rotating role effect
  useEffect(() => {
    const interval = setInterval(() => {
      setRoleIndex((prev) => (prev + 1) % PORTFOLIO_DATA.personal.rotatingRoles.length);
    }, 2800);
    return () => clearInterval(interval);
  }, []);

  const currentRole = PORTFOLIO_DATA.personal.rotatingRoles[roleIndex];

  // Stagger animation container
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants: any = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: 'easeOut',
      },
    },
  };

  return (
    <section
      id="hero"
      aria-label="Introduction & Portrait"
      className="relative min-h-screen w-full bg-light-bg dark:bg-paper pt-24 pb-12 lg:py-0 lg:h-screen flex flex-col justify-between overflow-hidden transition-colors"
    >
      {/* Background editorial grid markings */}
      <div className="absolute inset-0 editorial-grid pointer-events-none opacity-40" />

      {/* Main Grid / Split Layout */}
      <div className="relative z-10 mx-auto w-full max-w-7xl flex-1 px-6 md:px-12 flex flex-col lg:flex-row items-center justify-center lg:justify-between gap-10 lg:gap-8">
        
        {/* MOBILE PORTRAIT: Top stack on mobile */}
        <div className="lg:hidden w-full flex flex-col items-center">
          <div className="relative w-full max-w-sm sm:max-w-md h-[40vh] sm:h-[46vh] rounded-2xl overflow-hidden border border-light-border dark:border-paper-border/80 bg-light-surface dark:bg-paper-surface/50 shadow-2xl">
            {canvasMounted && hasWebGL2 ? (
              <HalftoneReveal
                src={PROFILE.portrait.src}
                mode="mono"
                shape="dot"
                cellSize={5}
                angle={45}
                inkColor={isDark ? '#f4f1ea' : '#120f17'}
                paperColor={isDark ? '#120f17' : '#faf9f6'}
                revealRadius={140}
                fit="contain"
                intro={true}
                wander={true}
                linger={1.2}
                clickBurst={true}
                className="w-full h-full"
              />
            ) : (
              <div className="relative w-full h-full flex items-center justify-center bg-light-subtle dark:bg-paper-surface">
                <img
                  src={PROFILE.portrait.src}
                  alt={PROFILE.portrait.alt}
                  className="w-full h-full object-contain filter contrast-125 brightness-95"
                  loading="eager"
                />
                <div className="absolute inset-0 halftone-fallback-pattern opacity-40 pointer-events-none" />
              </div>
            )}
            
            <div className="absolute bottom-3 inset-x-0 flex justify-center">
              <span className="font-mono text-[10px] tracking-widest text-light-muted dark:text-ink/70 bg-light-surface/90 dark:bg-paper/85 backdrop-blur-md px-3 py-1 rounded-full border border-light-border dark:border-paper-border/70">
                {PROFILE.portrait.hint}
              </span>
            </div>
          </div>
        </div>

        {/* LEFT CONTENT: Editorial Typography and Pitch */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={readyToAnimate ? 'visible' : 'hidden'}
          className="w-full lg:w-[48%] flex flex-col justify-center space-y-6 lg:space-y-7 lg:pr-4"
        >
          {/* Small Mono System Label */}
          <motion.div variants={itemVariants} className="flex items-center space-x-2.5">
            <span className="inline-block h-2 w-2 rounded-full bg-accent animate-pulse" />
            <h2 className="font-mono text-xs sm:text-[13px] tracking-widest text-light-muted dark:text-ink/80 uppercase">
              {PORTFOLIO_DATA.personal.educationBadge} · MANGALURU, IN
            </h2>
          </motion.div>

          {/* Huge Headline: PREETHESH / POOJARY */}
          <motion.div variants={itemVariants} className="space-y-1">
            <h1 className="text-5xl sm:text-7xl lg:text-[5.25rem] xl:text-[5.85rem] font-bold tracking-[-0.04em] leading-[0.92] text-light-text dark:text-ink font-heading select-none">
              <div>{PROFILE.firstName}</div>
              <div className="mt-1 flex items-center">
                <div className="w-full max-w-[540px]">
                  <StrokeText
                    text={PROFILE.lastName}
                    strokeColor="#2f7d6d"
                    fillColor="#2f7d6d"
                    strokeWidth={1.4}
                    drawDuration={1.4}
                    fillDelay={0.25}
                    fontSize={isMobile ? 70 : 100}
                    letterSpacing={-3}
                    fontWeight={800}
                    trigger="mount"
                    fillMode="wipe"
                    wipeFrom="left"
                    hoverRedraw={true}
                    className="font-heading"
                  />
                </div>
              </div>
            </h1>
          </motion.div>

          {/* Rotating Role Line */}
          <motion.div
            variants={itemVariants}
            className="flex items-center space-x-3 font-mono text-sm sm:text-base text-accent"
          >
            <span className="text-light-muted/40 dark:text-ink/40 font-mono">//</span>
            <div className="relative h-6 sm:h-7 overflow-hidden flex items-center">
              <AnimatePresence mode="wait">
                <motion.span
                  key={currentRole}
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -20, opacity: 0 }}
                  transition={{ duration: 0.35, ease: 'easeInOut' }}
                  className="font-semibold tracking-wide text-light-text dark:text-ink flex items-center gap-2"
                >
                  <Sparkles className="h-3.5 w-3.5 text-accent" />
                  {currentRole}
                </motion.span>
              </AnimatePresence>
            </div>
            <span className="hidden sm:inline font-mono text-xs text-light-muted/50 dark:text-ink/40">
              · CGPA 8.80 · 2027 Batch
            </span>
          </motion.div>

          {/* One-Line Pitch */}
          <motion.p
            variants={itemVariants}
            className="font-body text-base sm:text-lg lg:text-[1.125rem] leading-relaxed text-light-muted dark:text-ink-muted max-w-xl font-normal"
          >
            {PORTFOLIO_DATA.personal.pitch}
          </motion.p>

          {/* Action CTAs */}
          <motion.div
            variants={itemVariants}
            className="flex flex-wrap items-center gap-4 pt-2"
          >
            {/* View Projects (Filled) */}
            <a
              href="#projects"
              className="inline-flex items-center justify-center rounded-lg bg-accent px-6 py-3 font-mono text-xs sm:text-sm font-semibold uppercase tracking-wider text-paper hover:bg-accent-hover transition-all duration-200 shadow-lg shadow-accent/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-light active:scale-95"
            >
              View Projects
            </a>

            {/* Download Resume (Outline) */}
            <a
              href={PORTFOLIO_DATA.personal.resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-lg border border-light-border dark:border-paper-border bg-light-surface/60 dark:bg-paper-surface/60 px-6 py-3 font-mono text-xs sm:text-sm font-semibold uppercase tracking-wider text-light-text dark:text-ink hover:border-accent hover:text-accent transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent active:scale-95"
            >
              Download Resume
            </a>

            {/* Contact (Text Link) */}
            <a
              href="#contact"
              className="inline-flex items-center font-mono text-xs sm:text-sm uppercase tracking-wider text-light-muted dark:text-ink-muted hover:text-accent transition-colors duration-150 py-2 px-3 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded"
            >
              <span>Contact Me</span>
              <span className="ml-1 text-accent">→</span>
            </a>
          </motion.div>

          {/* Social Links Row */}
          <motion.div
            variants={itemVariants}
            className="flex items-center space-x-5 pt-2 border-t border-light-border/80 dark:border-paper-border/60"
          >
            <span className="font-mono text-xs tracking-widest text-light-muted/60 dark:text-ink/40 uppercase">
              CONNECT:
            </span>
            <div className="flex items-center space-x-3">
              <a
                href={PORTFOLIO_DATA.personal.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-9 w-9 items-center justify-center rounded-md border border-light-border dark:border-paper-border bg-light-surface/40 dark:bg-paper-surface/40 text-light-muted dark:text-ink-muted hover:border-accent hover:text-accent hover:bg-light-surface dark:hover:bg-paper-surface transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                aria-label="GitHub Profile"
              >
                <GitHubIcon className="h-4 w-4" />
              </a>
              <a
                href={PORTFOLIO_DATA.personal.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-9 w-9 items-center justify-center rounded-md border border-light-border dark:border-paper-border bg-light-surface/40 dark:bg-paper-surface/40 text-light-muted dark:text-ink-muted hover:border-accent hover:text-accent hover:bg-light-surface dark:hover:bg-paper-surface transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                aria-label="LinkedIn Profile"
              >
                <LinkedInIcon className="h-4 w-4" />
              </a>
              <a
                href={`mailto:${PORTFOLIO_DATA.personal.email}`}
                className="flex h-9 w-9 items-center justify-center rounded-md border border-light-border dark:border-paper-border bg-light-surface/40 dark:bg-paper-surface/40 text-light-muted dark:text-ink-muted hover:border-accent hover:text-accent hover:bg-light-surface dark:hover:bg-paper-surface transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                aria-label="Email Preethesh"
              >
                <Mail className="h-4 w-4" />
              </a>
            </div>
          </motion.div>
        </motion.div>

        {/* DESKTOP PORTRAIT */}
        <div className="hidden lg:flex lg:w-[50%] xl:w-[52%] h-[78vh] xl:h-[82vh] relative items-center justify-center">
          <div className="relative w-full h-full rounded-2xl overflow-hidden border border-light-border dark:border-paper-border bg-light-surface dark:bg-paper-deep/80 shadow-[0_20px_50px_rgba(0,0,0,0.15)] dark:shadow-[0_20px_50px_rgba(0,0,0,0.6)] group">
            {canvasMounted && hasWebGL2 ? (
              <HalftoneReveal
                src={PROFILE.portrait.src}
                mode="mono"
                shape="dot"
                cellSize={6}
                angle={45}
                inkColor={isDark ? '#f4f1ea' : '#120f17'}
                paperColor={isDark ? '#120f17' : '#faf9f6'}
                revealRadius={160}
                fit="contain"
                intro={true}
                wander={true}
                linger={1.2}
                clickBurst={true}
                className="w-full h-full cursor-crosshair"
              />
            ) : (
              <div className="relative w-full h-full flex items-center justify-center bg-light-subtle dark:bg-paper-surface">
                <img
                  src={PROFILE.portrait.src}
                  alt={PROFILE.portrait.alt}
                  className="w-full h-full object-contain filter contrast-125 brightness-95"
                  loading="eager"
                />
                <div
                  className="absolute inset-0 halftone-fallback-pattern opacity-40 pointer-events-none"
                  aria-hidden="true"
                />
              </div>
            )}

            {/* Corner Editorial Marks */}
            <div className="pointer-events-none absolute top-4 left-4 font-mono text-[9px] tracking-widest text-light-muted/40 dark:text-ink/30 uppercase">
              FIG 01. // ARCHIVE
            </div>
            <div className="pointer-events-none absolute top-4 right-4 font-mono text-[9px] tracking-widest text-accent/60 uppercase">
              ● REALTIME SHADER
            </div>
            <div className="pointer-events-none absolute bottom-4 left-4 font-mono text-[9px] tracking-widest text-light-muted/40 dark:text-ink/30 uppercase">
              100% SAME-ORIGIN // CORS-FREE
            </div>

            <div className="pointer-events-none absolute bottom-4 right-4 flex items-center space-x-1.5 rounded-full border border-light-border dark:border-paper-border/80 bg-light-surface/90 dark:bg-paper/85 backdrop-blur-md px-3 py-1 font-mono text-[10px] tracking-wider text-light-muted dark:text-ink-muted">
              <span className="h-1.5 w-1.5 rounded-full bg-accent animate-ping" />
              <span>{PROFILE.portrait.hint}</span>
            </div>
          </div>
        </div>
      </div>

      {/* BOTTOM STRIP: Availability Status & Scroll Indicator */}
      <div className="relative z-10 w-full border-t border-light-border/80 dark:border-paper-border/60 bg-light-surface/80 dark:bg-paper/80 backdrop-blur-md transition-colors">
        <div className="mx-auto max-w-7xl px-6 md:px-12 py-3.5 flex items-center justify-between text-xs font-mono">
          <div className="flex items-center space-x-2.5">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-accent" />
            </span>
            <span className="text-light-text dark:text-ink tracking-wider font-medium">
              {PORTFOLIO_DATA.personal.seeking}
            </span>
          </div>

          <a
            href="#about"
            className="flex items-center space-x-1.5 text-light-muted dark:text-ink-muted hover:text-accent transition-colors focus:outline-none focus-visible:ring-1 focus-visible:ring-accent rounded p-0.5"
            aria-label="Scroll to about section"
          >
            <span className="tracking-widest uppercase">Explore</span>
            <ArrowDown className="h-3.5 w-3.5 animate-bounce" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default Hero;
