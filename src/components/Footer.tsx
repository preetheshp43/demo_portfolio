import React from 'react';
import { ArrowUp } from 'lucide-react';
import { PORTFOLIO_DATA } from '../data/portfolioData';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="border-t border-light-border dark:border-paper-border/80 bg-light-subtle/50 dark:bg-paper-deep py-12 px-6 md:px-12 transition-colors">
      <div className="mx-auto max-w-7xl flex flex-col sm:flex-row items-center justify-between gap-6 font-mono text-xs">
        <div className="flex flex-col sm:flex-row items-center sm:items-start space-y-1 sm:space-y-0 sm:space-x-4 text-center sm:text-left">
          <span className="font-semibold text-light-text dark:text-ink">
            {PORTFOLIO_DATA.personal.name}
          </span>
          <span className="hidden sm:inline text-light-muted dark:text-ink-muted">·</span>
          <span className="text-light-muted dark:text-ink-muted">
            {PORTFOLIO_DATA.personal.educationBadge}
          </span>
        </div>

        <div className="text-light-muted/80 dark:text-ink-muted/60 text-center text-[11px]">
          © {new Date().getFullYear()} Preethesh Poojary. Designed with React, TypeScript & Tailwind CSS.
        </div>

        <button
          type="button"
          onClick={scrollToTop}
          className="inline-flex items-center space-x-1.5 rounded-lg border border-light-border dark:border-paper-border bg-light-surface dark:bg-paper px-3 py-1.5 text-xs text-light-text dark:text-ink hover:border-accent hover:text-accent transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
          aria-label="Back to top"
        >
          <span>TOP</span>
          <ArrowUp className="h-3.5 w-3.5" />
        </button>
      </div>
    </footer>
  );
};

export default Footer;
