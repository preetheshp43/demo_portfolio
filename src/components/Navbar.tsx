import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowUpRight, Sun, Moon } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { PORTFOLIO_DATA } from '../data/portfolioData';

interface NavbarProps {
  visible?: boolean;
}

const navSections = [
  { label: 'About', id: 'about' },
  { label: 'Skills', id: 'skills' },
  { label: 'Projects', id: 'projects' },
  { label: 'Education', id: 'education' },
  { label: 'Contact', id: 'contact' },
];

export const Navbar: React.FC<NavbarProps> = ({ visible = true }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>('hero');
  const { theme, toggleTheme, isDark } = useTheme();

  // ScrollSpy for Active Section Highlighting
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 200;
      const allSections = ['hero', ...navSections.map((s) => s.id)];

      for (const sectionId of allSections) {
        const element = document.getElementById(sectionId);
        if (element) {
          const top = element.offsetTop;
          const height = element.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-700 ease-out ${
        visible ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'
      }`}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-12">
        <nav
          className="flex h-20 items-center justify-between border-b border-light-border/80 dark:border-paper-border/60 backdrop-blur-md bg-light-surface/90 dark:bg-paper/85 px-4 md:px-6 rounded-b-2xl shadow-sm transition-colors"
          aria-label="Main Navigation"
        >
          {/* Logo */}
          <a
            href="#hero"
            className="group flex items-center space-x-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded-md p-1"
            aria-label="Preethesh Poojary - Home"
          >
            <span className="flex h-9 w-9 items-center justify-center rounded-lg border border-light-border dark:border-paper-border bg-light-subtle dark:bg-paper-surface font-mono text-sm font-bold tracking-tighter text-light-text dark:text-ink transition-colors duration-200 group-hover:border-accent group-hover:text-accent">
              PP
            </span>
            <div className="hidden sm:flex flex-col">
              <span className="font-heading text-xs font-semibold tracking-wider text-light-text dark:text-ink uppercase">
                P. Poojary
              </span>
              <span className="font-mono text-[9px] text-accent tracking-widest uppercase">
                Software & AI
              </span>
            </div>
          </a>

          {/* Desktop Nav Links with Active Indicator */}
          <ul className="hidden md:flex items-center space-x-1 lg:space-x-2">
            {navSections.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <li key={item.id}>
                  <a
                    href={`#${item.id}`}
                    className={`relative rounded-lg px-3 py-1.5 font-mono text-xs uppercase tracking-wider transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent ${
                      isActive
                        ? 'text-accent font-semibold bg-accent/10'
                        : 'text-light-muted dark:text-ink-muted hover:text-light-text dark:hover:text-ink hover:bg-light-subtle/60 dark:hover:bg-paper-surface/60'
                    }`}
                  >
                    <span className="text-accent/60 mr-1">//</span>
                    <span>{item.label}</span>
                  </a>
                </li>
              );
            })}
          </ul>

          {/* Right Action Controls: Theme Toggle & Resume */}
          <div className="flex items-center space-x-2.5 sm:space-x-3">
            {/* Light / Dark Mode Toggle */}
            <button
              type="button"
              onClick={toggleTheme}
              className="flex h-9 w-9 items-center justify-center rounded-lg border border-light-border dark:border-paper-border bg-light-surface dark:bg-paper-surface text-light-text dark:text-ink hover:border-accent hover:text-accent transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
              aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
              title={`Switch to ${isDark ? 'light' : 'dark'} mode`}
            >
              {isDark ? (
                <Sun className="h-4 w-4 text-amber-300" />
              ) : (
                <Moon className="h-4 w-4 text-accent" />
              )}
            </button>

            {/* Resume Button */}
            <a
              href={PORTFOLIO_DATA.personal.resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center space-x-1.5 rounded-lg border border-accent bg-accent/10 px-3.5 py-1.5 font-mono text-xs tracking-wider text-accent font-semibold hover:bg-accent hover:text-paper transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
            >
              <span>Resume</span>
              <ArrowUpRight className="h-3.5 w-3.5" />
            </a>

            {/* Mobile Hamburger Button */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden flex h-9 w-9 items-center justify-center rounded-lg border border-light-border dark:border-paper-border bg-light-surface dark:bg-paper-surface text-light-text dark:text-ink hover:text-accent focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
              aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </nav>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-light-border dark:border-paper-border bg-light-surface/98 dark:bg-paper/98 backdrop-blur-xl px-6 py-6 transition-all duration-300">
          <ul className="space-y-3 font-mono text-xs uppercase tracking-wider">
            {navSections.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <li key={item.id}>
                  <a
                    href={`#${item.id}`}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`block py-2 px-3 rounded-lg transition-colors ${
                      isActive
                        ? 'bg-accent/15 text-accent font-bold'
                        : 'text-light-text dark:text-ink hover:text-accent'
                    }`}
                  >
                    <span className="text-accent mr-2">//</span>
                    {item.label}
                  </a>
                </li>
              );
            })}
            <li className="pt-3 border-t border-light-border dark:border-paper-border/60">
              <a
                href={PORTFOLIO_DATA.personal.resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-between w-full rounded-lg border border-accent bg-accent/10 px-4 py-2.5 font-mono text-xs uppercase tracking-wider text-accent font-semibold hover:bg-accent hover:text-paper transition-all"
              >
                <span>Download Resume (PDF)</span>
                <ArrowUpRight className="h-4 w-4" />
              </a>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
};

export default Navbar;
