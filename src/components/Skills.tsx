import React from 'react';
import { PORTFOLIO_DATA } from '../data/portfolioData';
import {
  Code,
  Cpu,
  BrainCircuit,
  Globe,
  Database,
  Wrench,
  Terminal,
  Layers,
  Sparkles
} from 'lucide-react';

const categoryIcons: Record<string, React.ElementType> = {
  Programming: Code,
  'Core Computer Science': Cpu,
  'AI & Machine Learning': BrainCircuit,
  'Web Technologies': Globe,
  Database: Database,
  'Tools & DevOps': Wrench,
};

export const Skills: React.FC = () => {
  const { skillCategories } = PORTFOLIO_DATA;

  return (
    <section
      id="skills"
      className="relative py-28 px-6 md:px-12 max-w-7xl mx-auto scroll-mt-20 border-t border-paper-border/60"
    >
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-4">
        <div>
          <div className="inline-flex items-center space-x-2 font-mono text-xs tracking-widest text-accent uppercase mb-3">
            <span className="h-1.5 w-1.5 rounded-full bg-accent" />
            <span>02 // TECHNICAL ARSENAL</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-bold text-light-text dark:text-ink tracking-tight">
            Tools, Languages & <span className="text-accent">Architectures</span>
          </h2>
        </div>
        <p className="font-mono text-xs text-light-muted dark:text-ink-muted max-w-xs md:text-right">
          STRUCTURED FOR AGENTIC AI & MODERN WEB SYSTEMS
        </p>
      </div>

      {/* Grid of Skill Category Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {skillCategories.map((category) => {
          const IconComponent = categoryIcons[category.title] || Terminal;
          return (
            <div
              key={category.title}
              className="group relative rounded-2xl border border-light-border dark:border-paper-border bg-light-surface dark:bg-paper-surface/60 p-6 sm:p-7 transition-all duration-300 hover:border-accent hover:shadow-xl hover:shadow-accent/5 flex flex-col justify-between"
            >
              <div>
                {/* Header with Icon and Title */}
                <div className="flex items-center space-x-3 mb-4">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-accent/10 text-accent group-hover:bg-accent group-hover:text-paper transition-all duration-200">
                    <IconComponent className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-heading text-lg font-bold text-light-text dark:text-ink group-hover:text-accent transition-colors">
                      {category.title}
                    </h3>
                  </div>
                </div>

                <p className="text-xs text-light-muted dark:text-ink-muted leading-relaxed mb-6 font-body">
                  {category.description}
                </p>

                {/* Chips */}
                <div className="flex flex-wrap gap-2">
                  {category.skills.map((skill) => (
                    <span
                      key={skill.name}
                      className="inline-flex items-center space-x-1 rounded-lg border border-light-border dark:border-paper-border/80 bg-light-subtle/80 dark:bg-paper-deep/80 px-3 py-1.5 font-mono text-xs text-light-text dark:text-ink transition-all duration-150 group-hover:border-accent/40 hover:!border-accent hover:!text-accent hover:scale-[1.03]"
                    >
                      <span className="h-1 w-1 rounded-full bg-accent mr-1 opacity-70" />
                      <span>{skill.name}</span>
                    </span>
                  ))}
                </div>
              </div>

              {/* Bottom Subtle Accent Mark */}
              <div className="mt-6 pt-4 border-t border-light-border/60 dark:border-paper-border/40 flex items-center justify-between text-[11px] font-mono text-light-muted/70 dark:text-ink-muted/50">
                <span>{category.skills.length} TECHNOLOGIES</span>
                <span className="text-accent/60 opacity-0 group-hover:opacity-100 transition-opacity">
                  ACTIVE STACK ↗
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default Skills;
