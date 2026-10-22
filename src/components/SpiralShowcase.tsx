import React from 'react';
import InfiniteSpiral from './InfiniteSpiral';
import { SPIRAL_PROJECT_IMAGES } from '../data/spiralImages';
import { Layers, Sparkles, MoveVertical } from 'lucide-react';

interface SpiralShowcaseProps {
  className?: string;
}

export const SpiralShowcase: React.FC<SpiralShowcaseProps> = ({ className = '' }) => {
  return (
    <div
      className={`relative rounded-2xl border border-light-border dark:border-paper-border bg-light-surface/70 dark:bg-paper-surface/40 p-6 sm:p-8 backdrop-blur-md overflow-hidden ${className}`}
    >
      {/* Background Subtle Editorial Grid */}
      <div className="absolute inset-0 editorial-grid pointer-events-none opacity-30" />

      {/* Showcase Header */}
      <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-4 border-b border-light-border/70 dark:border-paper-border/60">
        <div>
          <div className="inline-flex items-center space-x-2 font-mono text-[11px] tracking-widest text-accent uppercase mb-1">
            <span className="h-1.5 w-1.5 rounded-full bg-accent animate-ping" />
            <span>3D INTERACTIVE HELIX // SYSTEM GALLERY</span>
          </div>
          <h3 className="font-heading text-xl sm:text-2xl font-bold text-light-text dark:text-ink">
            Project & Architecture Showcase
          </h3>
        </div>

        {/* Interaction Hint Badge */}
        <div className="flex items-center space-x-2 rounded-full border border-light-border dark:border-paper-border bg-light-subtle/80 dark:bg-paper-deep/80 px-3.5 py-1.5 font-mono text-[10px] tracking-wider text-light-muted dark:text-ink-muted">
          <MoveVertical className="h-3 w-3 text-accent" />
          <span>DRAG · SCROLL · HOVER TO PAUSE</span>
        </div>
      </div>

      {/* 3D Infinite Spiral Container with Explicit Height */}
      <div className="relative w-full h-[460px] sm:h-[520px] rounded-xl overflow-hidden bg-light-subtle/40 dark:bg-paper-deep/60 border border-light-border/60 dark:border-paper-border/40">
        <InfiniteSpiral
          items={SPIRAL_PROJECT_IMAGES}
          animationMode="all"
          speed={0.55}
          direction="up"
          radius={170}
          cardWidth={120}
          cardHeight={120}
          verticalSpacing={65}
          perspective={1000}
          cardRadius={12}
          centerScale={1.22}
          edgeBlur={6}
          cardsPerTurn={7}
          pauseOnHover={true}
          imageFit="cover"
          className="w-full h-full"
        />

        {/* Corner Calibration Markers */}
        <div className="pointer-events-none absolute top-3 left-3 font-mono text-[9px] tracking-widest text-light-muted/50 dark:text-ink/30 uppercase">
          [HELIX.3D // Z-STAGE]
        </div>
        <div className="pointer-events-none absolute top-3 right-3 font-mono text-[9px] tracking-widest text-accent/60 uppercase">
          ● 7 NODES ACTIVE
        </div>
        <div className="pointer-events-none absolute bottom-3 left-3 font-mono text-[9px] tracking-widest text-light-muted/50 dark:text-ink/30 uppercase">
          ORBIT RADIUS: 170PX
        </div>
        <div className="pointer-events-none absolute bottom-3 right-3 font-mono text-[9px] tracking-widest text-accent/60 uppercase">
          TOUCH / POINTER DRAG READY
        </div>
      </div>

      {/* Footer Caption */}
      <div className="relative z-10 mt-4 flex flex-col sm:flex-row items-center justify-between text-xs font-mono text-light-muted dark:text-ink-muted/70 gap-2">
        <span className="text-center sm:text-left">
          Click any card to navigate to its project breakdown below.
        </span>
        <span className="text-[11px] text-accent/80 font-medium">
          REPLACEABLE VIA /public/images/
        </span>
      </div>
    </div>
  );
};

export default SpiralShowcase;
