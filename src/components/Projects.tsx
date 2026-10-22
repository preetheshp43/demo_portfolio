import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PORTFOLIO_DATA, Project } from '../data/portfolioData';
import { ExternalLink, ArrowUpRight, Sparkles, Network, Activity, Calculator } from 'lucide-react';
import SpiralShowcase from './SpiralShowcase';

const GitHubIcon: React.FC<{ className?: string }> = ({ className = 'h-3.5 w-3.5' }) => (
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

type FilterCategory = 'All' | 'AI/ML' | 'Web' | 'Python';

const projectDiagrams: Record<string, React.ReactNode> = {
  'retail-supply-chain-agent': (
    <div className="relative w-full h-44 bg-paper-deep rounded-xl border border-paper-border/60 overflow-hidden p-4 flex flex-col justify-between font-mono text-xs">
      <div className="flex items-center justify-between text-[10px] text-accent">
        <span className="flex items-center gap-1.5">
          <Network className="h-3.5 w-3.5" />
          <span>MULTI-AGENT ORCHESTRATION</span>
        </span>
        <span className="border border-accent/40 rounded px-1.5 py-0.5 bg-accent/10">v1.2 ACTIVE</span>
      </div>
      <div className="grid grid-cols-3 gap-2 my-auto text-center text-[10px]">
        <div className="p-2 rounded bg-paper-surface border border-paper-border text-ink">
          <div className="text-accent font-semibold mb-0.5">PLANNER</div>
          <div className="text-[9px] text-ink-muted">Goal Decomp</div>
        </div>
        <div className="p-2 rounded bg-accent/15 border border-accent/40 text-ink shadow-sm">
          <div className="text-accent font-semibold mb-0.5">ROUTING</div>
          <div className="text-[9px] text-ink-muted">Inventory API</div>
        </div>
        <div className="p-2 rounded bg-paper-surface border border-paper-border text-ink">
          <div className="text-accent font-semibold mb-0.5">EVALUATOR</div>
          <div className="text-[9px] text-ink-muted">State Verifier</div>
        </div>
      </div>
      <div className="flex items-center justify-between text-[9px] text-ink-muted/60 border-t border-paper-border/40 pt-2">
        <span>STATE: MULTI-STEP REASONING</span>
        <span className="text-accent">DETERMINISTIC // VERIFIED</span>
      </div>
    </div>
  ),
  'disaster-response-intelligence': (
    <div className="relative w-full h-44 bg-paper-deep rounded-xl border border-paper-border/60 overflow-hidden p-4 flex flex-col justify-between font-mono text-xs">
      <div className="flex items-center justify-between text-[10px] text-accent">
        <span className="flex items-center gap-1.5">
          <Activity className="h-3.5 w-3.5" />
          <span>RESOURCE OPTIMIZATION PIPELINE</span>
        </span>
        <span className="border border-accent/40 rounded px-1.5 py-0.5 bg-accent/10">REAL-TIME</span>
      </div>
      <div className="flex items-center justify-around my-auto text-center text-[10px]">
        <div className="p-2 rounded bg-paper-surface border border-paper-border text-ink">
          <div className="text-accent font-semibold">SEVERITY</div>
          <div className="text-[9px] text-ink-muted">Geo-Clustering</div>
        </div>
        <div className="text-accent text-lg">→</div>
        <div className="p-2 rounded bg-accent/15 border border-accent/40 text-ink">
          <div className="text-accent font-semibold">DISPATCH</div>
          <div className="text-[9px] text-ink-muted">Linear Optimizer</div>
        </div>
      </div>
      <div className="flex items-center justify-between text-[9px] text-ink-muted/60 border-t border-paper-border/40 pt-2">
        <span>UNCERTAINTY MINIMIZATION</span>
        <span className="text-accent">PRIORITY ALLOCATION</span>
      </div>
    </div>
  ),
  'sgpa-cgpa-calculator': (
    <div className="relative w-full h-44 bg-paper-deep rounded-xl border border-paper-border/60 overflow-hidden p-4 flex flex-col justify-between font-mono text-xs">
      <div className="flex items-center justify-between text-[10px] text-accent">
        <span className="flex items-center gap-1.5">
          <Calculator className="h-3.5 w-3.5" />
          <span>ACADEMIC ALGORITHM MATRIX</span>
        </span>
        <span className="border border-accent/40 rounded px-1.5 py-0.5 bg-accent/10">100% ACCURATE</span>
      </div>
      <div className="grid grid-cols-2 gap-2 my-auto text-[10px]">
        <div className="p-2 rounded bg-paper-surface border border-paper-border text-ink">
          <div className="text-accent font-semibold">SEMESTER (SGPA)</div>
          <div className="text-[9px] text-ink-muted">Grade × Credit Matrix</div>
        </div>
        <div className="p-2 rounded bg-paper-surface border border-paper-border text-ink">
          <div className="text-accent font-semibold">CUMULATIVE (CGPA)</div>
          <div className="text-[9px] text-ink-muted">Multi-Term Weighted Avg</div>
        </div>
      </div>
      <div className="flex items-center justify-between text-[9px] text-ink-muted/60 border-t border-paper-border/40 pt-2">
        <span>FILE PERSISTENCE // CSV</span>
        <span className="text-accent">VALIDATED INPUTS</span>
      </div>
    </div>
  ),
};

export const Projects: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<FilterCategory>('All');
  const { projects } = PORTFOLIO_DATA;

  const categories: FilterCategory[] = ['All', 'AI/ML', 'Web', 'Python'];

  const filteredProjects =
    activeFilter === 'All'
      ? projects
      : projects.filter((p) => p.category === activeFilter);

  return (
    <section
      id="projects"
      className="relative py-28 px-6 md:px-12 max-w-7xl mx-auto scroll-mt-20 border-t border-paper-border/60"
    >
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
        <div>
          <div className="inline-flex items-center space-x-2 font-mono text-xs tracking-widest text-accent uppercase mb-3">
            <span className="h-1.5 w-1.5 rounded-full bg-accent" />
            <span>03 // SELECTED WORKS</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-bold text-light-text dark:text-ink tracking-tight">
            Featured <span className="text-accent">Engineering Projects</span>
          </h2>
        </div>
        <p className="font-mono text-xs text-light-muted dark:text-ink-muted max-w-xs md:text-right">
          AGENTIC AI · DECISION SUPPORT · SYSTEMS
        </p>
      </div>

      {/* 3D Infinite Spiral Interactive Architecture Showcase */}
      <SpiralShowcase className="mb-14" />

      {/* Filter Tabs */}
      <div className="flex items-center space-x-2 pb-8 overflow-x-auto no-scrollbar">
        {categories.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveFilter(tab)}
            className={`relative rounded-lg px-4 py-2 font-mono text-xs tracking-wider transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent ${
              activeFilter === tab
                ? 'bg-accent text-paper font-semibold shadow-md shadow-accent/20'
                : 'border border-light-border dark:border-paper-border bg-light-surface dark:bg-paper-surface/60 text-light-muted dark:text-ink-muted hover:text-light-text dark:hover:text-ink hover:border-accent/50'
            }`}
          >
            {tab === 'All' ? 'ALL WORKS' : tab}
          </button>
        ))}
      </div>

      {/* Project Cards Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
        <AnimatePresence mode="popLayout">
          {filteredProjects.map((project) => (
            <motion.article
              layout
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.35, ease: 'easeOut' }}
              className="group relative flex flex-col justify-between rounded-2xl border border-light-border dark:border-paper-border bg-light-surface dark:bg-paper-surface/60 p-6 sm:p-8 transition-all duration-300 hover:border-accent hover:shadow-2xl hover:shadow-accent/10"
            >
              <div>
                {/* Top Badge & Metric */}
                <div className="flex items-center justify-between mb-4">
                  <span className="inline-flex items-center space-x-1.5 rounded-full border border-accent/40 bg-accent/10 px-3 py-1 font-mono text-[11px] font-semibold text-accent uppercase">
                    <Sparkles className="h-3 w-3" />
                    <span>{project.category}</span>
                  </span>
                  {project.metrics && (
                    <span className="font-mono text-xs text-light-muted dark:text-ink-muted">
                      {project.metrics}
                    </span>
                  )}
                </div>

                {/* Title */}
                <h3 className="font-heading text-xl sm:text-2xl font-bold text-light-text dark:text-ink group-hover:text-accent transition-colors leading-tight mb-2">
                  {project.title}
                </h3>

                {/* Tagline */}
                <p className="font-mono text-xs text-accent font-medium mb-4">
                  // {project.tagline}
                </p>

                {/* Interactive Diagram / Architecture Preview */}
                <div className="mb-6">
                  {projectDiagrams[project.id] || (
                    <div className="w-full h-40 bg-paper-deep rounded-xl border border-paper-border flex items-center justify-center font-mono text-xs text-ink-muted">
                      ARCHITECTURE DIAGRAM PREVIEW
                    </div>
                  )}
                </div>

                {/* Description */}
                <p className="font-body text-sm sm:text-base leading-relaxed text-light-muted dark:text-ink-muted mb-5">
                  {project.description}
                </p>

                {/* Architecture Bullets */}
                <ul className="space-y-2 mb-6">
                  {project.architectureHighlights.map((highlight, idx) => (
                    <li
                      key={idx}
                      className="flex items-start space-x-2 text-xs font-mono text-light-text dark:text-ink"
                    >
                      <span className="text-accent mt-0.5">▸</span>
                      <span>{highlight}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Bottom: Tech Stack Tags & Actions */}
              <div>
                {/* Tech Tags */}
                <div className="flex flex-wrap gap-1.5 mb-6 pt-4 border-t border-light-border/60 dark:border-paper-border/40">
                  {project.techStack.map((tech) => (
                    <span
                      key={tech}
                      className="rounded border border-light-border dark:border-paper-border/80 bg-light-subtle dark:bg-paper-deep px-2 py-0.5 font-mono text-[10px] text-light-muted dark:text-ink-muted"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Action Buttons */}
                <div className="flex items-center space-x-3">
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center space-x-2 rounded-lg bg-accent px-4 py-2 font-mono text-xs uppercase tracking-wider text-paper font-semibold hover:bg-accent-hover transition-colors shadow-md shadow-accent/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                  >
                    <GitHubIcon className="h-3.5 w-3.5" />
                    <span>View Repository</span>
                  </a>
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center space-x-1.5 rounded-lg border border-light-border dark:border-paper-border px-4 py-2 font-mono text-xs uppercase tracking-wider text-light-text dark:text-ink hover:border-accent hover:text-accent transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                    >
                      <span>Code / Docs</span>
                      <ArrowUpRight className="h-3.5 w-3.5" />
                    </a>
                  )}
                </div>
              </div>
            </motion.article>
          ))}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default Projects;
