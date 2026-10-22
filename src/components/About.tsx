import React from 'react';
import { motion } from 'framer-motion';
import { PORTFOLIO_DATA } from '../data/portfolioData';
import { Award, GraduationCap, Code2, Users, ArrowUpRight, CheckCircle2 } from 'lucide-react';

export const About: React.FC = () => {
  const { about, personal } = PORTFOLIO_DATA;

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, delay: i * 0.1, ease: 'easeOut' },
    }),
  };

  return (
    <section
      id="about"
      className="relative py-28 px-6 md:px-12 max-w-7xl mx-auto scroll-mt-20 border-t border-paper-border/60 dark:border-paper-border/60"
    >
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-4">
        <div>
          <div className="inline-flex items-center space-x-2 font-mono text-xs tracking-widest text-accent uppercase mb-3">
            <span className="h-1.5 w-1.5 rounded-full bg-accent" />
            <span>01 // BACKGROUND & PHILOSOPHY</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-bold text-light-text dark:text-ink tracking-tight">
            Engineering with <span className="text-accent">Algorithmic Precision</span> & Real-World Utility.
          </h2>
        </div>
        <p className="font-mono text-xs text-light-muted dark:text-ink-muted max-w-xs md:text-right">
          MANGALURU, IN · AJIET · 8.80 CGPA
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* Left Column: Bio Paragraphs */}
        <div className="lg:col-span-7 space-y-6">
          <div className="space-y-4 font-body text-base sm:text-lg leading-relaxed text-light-muted dark:text-ink-muted">
            {about.bio.map((paragraph, idx) => (
              <p key={idx} className="first-of-type:text-light-text dark:first-of-type:text-ink font-normal">
                {paragraph}
              </p>
            ))}
          </div>

          {/* Core Strengths Checklist */}
          <div className="pt-4 grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            {[
              'Python & C Algorithm Engineering',
              'Agentic Multi-Step Workflow Planning',
              'Data Structures & Algorithm Rigor',
              'Full-Stack React & TypeScript UIs',
              'Relational DBMS & SQL Architecture',
              'Git Branching & Collaborative Agile'
            ].map((skill, index) => (
              <div
                key={index}
                className="flex items-center space-x-2.5 rounded-lg border border-light-border dark:border-paper-border/80 bg-light-surface dark:bg-paper-surface/60 p-3 text-xs sm:text-sm font-mono text-light-text dark:text-ink"
              >
                <CheckCircle2 className="h-4 w-4 text-accent shrink-0" />
                <span>{skill}</span>
              </div>
            ))}
          </div>

          {/* Action CTAs */}
          <div className="pt-4 flex items-center space-x-4">
            <a
              href="#contact"
              className="inline-flex items-center space-x-2 rounded-lg bg-accent px-5 py-2.5 font-mono text-xs uppercase tracking-wider text-paper font-semibold hover:bg-accent-hover transition-colors shadow-md shadow-accent/20"
            >
              <span>Get In Touch</span>
              <ArrowUpRight className="h-3.5 w-3.5" />
            </a>
            <a
              href={personal.resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-2 rounded-lg border border-light-border dark:border-paper-border px-5 py-2.5 font-mono text-xs uppercase tracking-wider text-light-text dark:text-ink hover:border-accent hover:text-accent transition-colors"
            >
              <span>View Resume (PDF)</span>
            </a>
          </div>
        </div>

        {/* Right Column: Stats & Highlight Cards */}
        <div className="lg:col-span-5 space-y-4">
          {/* Stats Grid */}
          <div className="grid grid-cols-2 gap-3.5">
            {about.stats.map((stat, i) => (
              <div
                key={i}
                className="rounded-xl border border-light-border dark:border-paper-border bg-light-surface dark:bg-paper-surface/80 p-5 shadow-sm hover:border-accent/60 transition-colors"
              >
                <div className="font-heading text-2xl sm:text-3xl font-bold text-accent">
                  {stat.value}
                </div>
                <div className="mt-1 font-mono text-xs tracking-wider text-light-muted dark:text-ink-muted uppercase">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>

          {/* Key Value Cards */}
          <div className="space-y-3 pt-2">
            {about.highlights.map((highlight, index) => {
              const Icon =
                index === 0 ? Code2 : index === 1 ? GraduationCap : index === 2 ? Award : Users;
              return (
                <div
                  key={index}
                  className="rounded-xl border border-light-border dark:border-paper-border/70 bg-light-surface dark:bg-paper-surface/50 p-4 transition-all duration-200 hover:border-accent/60 hover:bg-light-subtle dark:hover:bg-paper-surface"
                >
                  <div className="flex items-start space-x-3.5">
                    <div className="p-2 rounded-lg bg-accent/10 text-accent shrink-0">
                      <Icon className="h-4 w-4" />
                    </div>
                    <div>
                      <h4 className="font-heading text-sm font-semibold text-light-text dark:text-ink">
                        {highlight.title}
                      </h4>
                      <p className="mt-1 text-xs text-light-muted dark:text-ink-muted leading-relaxed">
                        {highlight.description}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
