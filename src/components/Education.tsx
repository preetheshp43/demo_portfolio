import React from 'react';
import { PORTFOLIO_DATA } from '../data/portfolioData';
import { GraduationCap, Calendar, MapPin, Award, BookOpen } from 'lucide-react';

export const Education: React.FC = () => {
  const { education } = PORTFOLIO_DATA;

  return (
    <section
      id="education"
      className="relative py-28 px-6 md:px-12 max-w-7xl mx-auto scroll-mt-20 border-t border-paper-border/60"
    >
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-4">
        <div>
          <div className="inline-flex items-center space-x-2 font-mono text-xs tracking-widest text-accent uppercase mb-3">
            <span className="h-1.5 w-1.5 rounded-full bg-accent" />
            <span>04 // ACADEMIC MILESTONES</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-bold text-light-text dark:text-ink tracking-tight">
            Education & <span className="text-accent">Foundation</span>
          </h2>
        </div>
        <p className="font-mono text-xs text-light-muted dark:text-ink-muted max-w-xs md:text-right">
          B.E. ARTIFICIAL INTELLIGENCE & MACHINE LEARNING
        </p>
      </div>

      {/* Timeline Layout */}
      <div className="relative pl-6 md:pl-10 border-l border-light-border dark:border-paper-border/80 space-y-12">
        {education.map((item, index) => (
          <div key={index} className="relative group">
            {/* Timeline Marker Dot */}
            <div className="absolute -left-[31px] md:-left-[47px] top-1.5 flex h-7 w-7 items-center justify-center rounded-full border border-accent bg-light-surface dark:bg-paper text-accent shadow-md group-hover:scale-110 transition-transform">
              <GraduationCap className="h-3.5 w-3.5" />
            </div>

            {/* Card Content */}
            <div className="rounded-2xl border border-light-border dark:border-paper-border bg-light-surface dark:bg-paper-surface/60 p-6 sm:p-8 transition-all duration-300 hover:border-accent hover:shadow-xl hover:shadow-accent/5">
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-4">
                <div>
                  {/* Status / Level */}
                  <span className="inline-block rounded-md bg-accent/10 border border-accent/30 px-2.5 py-0.5 font-mono text-[11px] font-semibold text-accent uppercase mb-2">
                    {item.status}
                  </span>
                  <h3 className="font-heading text-xl sm:text-2xl font-bold text-light-text dark:text-ink">
                    {item.degree}
                  </h3>
                  <div className="font-body text-base font-semibold text-accent mt-1">
                    {item.institution}
                  </div>
                </div>

                {/* Score Pill */}
                <div className="flex sm:flex-col sm:items-end justify-between items-center shrink-0">
                  <div className="rounded-xl border border-accent/40 bg-accent/10 px-4 py-2 font-mono text-center">
                    <div className="text-lg font-bold text-accent">{item.score}</div>
                    <div className="text-[10px] uppercase tracking-wider text-light-muted dark:text-ink-muted">
                      ACADEMIC SCORE
                    </div>
                  </div>
                </div>
              </div>

              {/* Meta information row */}
              <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-light-muted dark:text-ink-muted mb-6">
                <span className="flex items-center gap-1.5">
                  <Calendar className="h-3.5 w-3.5 text-accent" />
                  <span>{item.period}</span>
                </span>
                <span className="flex items-center gap-1.5">
                  <MapPin className="h-3.5 w-3.5 text-accent" />
                  <span>{item.location}</span>
                </span>
              </div>

              {/* Descriptions */}
              <ul className="space-y-2 mb-6">
                {item.description.map((desc, i) => (
                  <li
                    key={i}
                    className="flex items-start space-x-2 text-xs sm:text-sm font-body text-light-muted dark:text-ink-muted leading-relaxed"
                  >
                    <span className="text-accent mt-1">▸</span>
                    <span>{desc}</span>
                  </li>
                ))}
              </ul>

              {/* Coursework Tags */}
              {item.coursework && (
                <div className="pt-4 border-t border-light-border/60 dark:border-paper-border/40">
                  <div className="font-mono text-xs text-light-muted dark:text-ink-muted mb-2 flex items-center gap-1.5">
                    <BookOpen className="h-3.5 w-3.5 text-accent" />
                    <span>KEY TECHNICAL COURSEWORK:</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {item.coursework.map((course) => (
                      <span
                        key={course}
                        className="rounded border border-light-border dark:border-paper-border/80 bg-light-subtle dark:bg-paper-deep px-2.5 py-1 font-mono text-xs text-light-text dark:text-ink"
                      >
                        {course}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Education;
