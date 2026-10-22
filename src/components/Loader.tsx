import React, { useEffect, useRef, useState } from 'react';
import { PORTRAIT_IMAGE_SRC } from '../data/profile';
import StrokeText from './StrokeText';

interface LoaderProps {
  onExitStart?: () => void;
  onComplete: () => void;
  forceProgress?: number; // for testing/preview if passed
}

export const Loader: React.FC<LoaderProps> = ({
  onExitStart,
  onComplete,
  forceProgress,
}) => {
  const [progress, setProgress] = useState(0);
  const [isExiting, setIsExiting] = useState(false);
  const [isDone, setIsDone] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const exitCalledRef = useRef(false);

  // Check prefers-reduced-motion
  const prefersReducedMotion =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Check preview mode query params
  const isPreviewExit =
    typeof window !== 'undefined' &&
    new URLSearchParams(window.location.search).get('preview_exit') === 'true';

  // Real Asset Loading + Minimum 1.8s duration
  useEffect(() => {
    if (isPreviewExit) {
      setProgress(100);
      setIsExiting(true);
      onExitStart?.();
      return;
    }

    // If forceProgress is explicitly supplied (e.g. for static screenshot preview)
    if (typeof forceProgress === 'number') {
      setProgress(forceProgress);
      return;
    }

    // Lock body scroll
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    // Session storage check
    let alreadySeen = false;
    try {
      const urlParams = new URLSearchParams(window.location.search);
      const forceLoader = urlParams.get('loader') === '1' || urlParams.get('loader') === 'true';
      if (!forceLoader && sessionStorage.getItem('pp_portfolio_loaded') === 'true') {
        alreadySeen = true;
      }
    } catch {
      // Ignore sessionStorage issues
    }

    if (alreadySeen) {
      document.body.style.overflow = originalOverflow;
      onExitStart?.();
      onComplete();
      return;
    }

    let isCancelled = false;
    const startTime = performance.now();
    const MIN_DURATION = 1800; // 1.8 seconds minimum display time
    let assetsLoaded = false;

    // Track real assets
    const imgPromise = new Promise<void>((resolve) => {
      const img = new Image();
      img.src = PORTRAIT_IMAGE_SRC;
      if (img.complete) {
        resolve();
      } else {
        img.onload = () => resolve();
        img.onerror = () => resolve(); // don't block forever if portrait fails
      }
    });

    const fontsPromise = document.fonts ? document.fonts.ready : Promise.resolve();

    Promise.all([imgPromise, fontsPromise]).then(() => {
      assetsLoaded = true;
    });

    // Smooth ticker
    let rafId: number;
    const tick = (now: number) => {
      if (isCancelled) return;
      const elapsed = now - startTime;
      const timeRatio = Math.min(elapsed / MIN_DURATION, 1);

      // Ease out progress
      let currentTarget = timeRatio * (assetsLoaded ? 100 : 85);
      if (elapsed >= MIN_DURATION && assetsLoaded) {
        currentTarget = 100;
      }

      setProgress((prev) => {
        const next = Math.min(100, Math.max(prev + 0.8, Math.round(currentTarget)));
        if (next >= 100) {
          return 100;
        }
        return next;
      });

      if (elapsed < MIN_DURATION || !assetsLoaded || currentTarget < 100) {
        rafId = requestAnimationFrame(tick);
      } else {
        // Assets are ready and 1.8s has elapsed
        setProgress(100);
        // Small pause at 100 before exit
        setTimeout(() => {
          if (isCancelled) return;
          try {
            sessionStorage.setItem('pp_portfolio_loaded', 'true');
          } catch {
            // ignore
          }

          setIsExiting(true);
          if (!exitCalledRef.current) {
            exitCalledRef.current = true;
            onExitStart?.();
          }

          // Exit transition duration (0.9s)
          const exitDuration = prefersReducedMotion ? 300 : 900;
          setTimeout(() => {
            if (isCancelled) return;
            document.body.style.overflow = originalOverflow;
            setIsDone(true);
            onComplete();
          }, exitDuration);
        }, 220);
      }
    };

    rafId = requestAnimationFrame(tick);

    return () => {
      isCancelled = true;
      cancelAnimationFrame(rafId);
      document.body.style.overflow = originalOverflow;
    };
  }, [forceProgress, onComplete, onExitStart, prefersReducedMotion]);

  // Halftone Dot Grid Canvas Animation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let rafId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const onResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', onResize);

    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      const spacing = 32;
      const progressFraction = progress / 100;
      const centerX = width / 2;
      const centerY = height / 2;
      const maxDist = Math.sqrt(centerX * centerX + centerY * centerY);

      for (let x = spacing / 2; x < width; x += spacing) {
        for (let y = spacing / 2; y < height; y += spacing) {
          const dx = x - centerX;
          const dy = y - centerY;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const distFactor = 1 - Math.min(1, dist / (maxDist * 0.85));

          // Halftone screen calculation: dots grow as progress increases
          const maxRadius = 8.5;
          const growth = Math.sin((progressFraction * Math.PI) / 2);
          const baseRadius = 0.8 + (maxRadius - 0.8) * growth * (0.35 + 0.65 * distFactor);
          const radius = Math.max(0.5, Math.min(maxRadius, baseRadius));

          // Ink dot style
          ctx.beginPath();
          ctx.arc(x, y, radius, 0, Math.PI * 2);

          // Hue shift towards accent teal near the center
          if (distFactor > 0.45) {
            ctx.fillStyle = `rgba(47, 125, 109, ${0.12 + 0.28 * progressFraction})`;
          } else {
            ctx.fillStyle = `rgba(244, 241, 234, ${0.04 + 0.08 * progressFraction})`;
          }
          ctx.fill();
        }
      }

      rafId = requestAnimationFrame(draw);
    };

    rafId = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('resize', onResize);
    };
  }, [progress]);

  if (isDone) return null;

  const paddedProgress = String(progress).padStart(3, '0');

  // Simple fade for prefers-reduced-motion
  if (prefersReducedMotion) {
    return (
      <div
        className={`fixed inset-0 z-50 flex flex-col items-center justify-center bg-paper transition-opacity duration-300 ${
          isExiting ? 'opacity-0 pointer-events-none' : 'opacity-100'
        }`}
      >
        <div className="text-center font-mono text-accent text-xs tracking-widest uppercase mb-4">
          PREETHESH POOJARY — PORTFOLIO
        </div>
        <div className="font-mono text-7xl font-bold tracking-tighter text-ink">
          {paddedProgress}%
        </div>
      </div>
    );
  }

  return (
    <div
      className="fixed inset-0 z-50 pointer-events-none select-none"
      role="status"
      aria-live="polite"
      aria-label={`Loading portfolio: ${progress}% complete`}
    >
      {/* Top Split Panel */}
      <div
        className="absolute inset-x-0 top-0 h-1/2 bg-paper border-b border-paper-border/30 transform transition-transform duration-[900ms] ease-[cubic-bezier(0.77,0,0.175,1)]"
        style={{
          transform: isPreviewExit ? 'translateY(-60%)' : isExiting ? 'translateY(-101%)' : 'translateY(0%)',
        }}
      />

      {/* Bottom Split Panel */}
      <div
        className="absolute inset-x-0 bottom-0 h-1/2 bg-paper border-t border-paper-border/30 transform transition-transform duration-[900ms] ease-[cubic-bezier(0.77,0,0.175,1)]"
        style={{
          transform: isPreviewExit ? 'translateY(60%)' : isExiting ? 'translateY(101%)' : 'translateY(0%)',
        }}
      />

      {/* Halftone Canvas Background */}
      <canvas
        ref={canvasRef}
        className={`absolute inset-0 block w-full h-full pointer-events-none transition-opacity duration-500 ${
          isExiting ? 'opacity-0' : 'opacity-100'
        }`}
      />

      {/* Center Content Overlay */}
      <div
        className={`relative z-10 flex h-full w-full flex-col items-center justify-center px-6 transition-all duration-500 ease-out ${
          isExiting ? 'opacity-0 scale-95' : 'opacity-100 scale-100'
        }`}
      >
        {/* Subtle print crop marks in corners */}
        <div className="absolute top-8 left-8 font-mono text-[10px] tracking-widest text-ink/30 uppercase">
          SYS.LOAD // 2026-2027
        </div>
        <div className="absolute top-8 right-8 font-mono text-[10px] tracking-widest text-ink/30 uppercase">
          PRINT.EDITION // MONO-SCREEN
        </div>
        <div className="absolute bottom-8 left-8 font-mono text-[10px] tracking-widest text-ink/30 uppercase">
          MGL · IN // LAT: 12.91°N
        </div>
        <div className="absolute bottom-8 right-8 font-mono text-[10px] tracking-widest text-accent/50 uppercase">
          ASSETS · {progress < 100 ? 'SYNCING...' : 'READY'}
        </div>

        {/* Small caps title above counter with animated stroke */}
        <div className="mb-4 flex flex-col items-center">
          <div className="hidden sm:block w-full max-w-sm">
            <StrokeText
              text="PREETHESH POOJARY — PORTFOLIO"
              strokeColor="#2f7d6d"
              fillColor="#f4f1ea"
              strokeWidth={1.2}
              drawDuration={1.2}
              fillDelay={0.1}
              fontSize={15}
              letterSpacing={3}
              fontWeight={600}
              trigger="mount"
              fillMode="wipe"
              wipeFrom="left"
              className="text-center font-mono tracking-widest"
            />
          </div>
          <p className="sm:hidden font-mono text-xs tracking-widest text-ink/80 uppercase">
            PREETHESH POOJARY — PORTFOLIO
          </p>
        </div>

        {/* Large Percentage Counter */}
        <div className="relative flex items-baseline">
          <span className="font-mono text-8xl md:text-9xl lg:text-[10.5rem] font-bold tracking-tight text-ink tabular-nums drop-shadow-md">
            {paddedProgress}
          </span>
          <span className="ml-2 font-mono text-2xl md:text-3xl text-accent font-semibold">
            %
          </span>
        </div>

        {/* Fine Progress Rule */}
        <div className="mt-6 w-48 max-w-xs h-[1px] bg-paper-border relative overflow-hidden">
          <div
            className="h-full bg-accent transition-all duration-150 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Micro status text */}
        <p className="mt-3 font-mono text-[11px] tracking-wider text-ink-muted/60 uppercase">
          {progress < 40 && 'INITIALIZING MEMORY & SHADER BUFFERS'}
          {progress >= 40 && progress < 80 && 'LOADING MONOCHROME PORTRAIT ASSETS'}
          {progress >= 80 && progress < 100 && 'CALIBRATING HALFTONE MATRIX'}
          {progress === 100 && 'DISPLAY MATRIX READY — LAUNCHING'}
        </p>
      </div>
    </div>
  );
};

export default Loader;
