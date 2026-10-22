import React from 'react';

export interface StrokeTextProps {
  text?: string;
  strokeColor?: string;
  fillColor?: string | null;
  strokeWidth?: number;
  drawDuration?: number;
  fillDelay?: number;
  stagger?: number;
  ease?: string;
  trigger?: 'mount' | 'hover' | 'scroll' | 'loop';
  fillMode?: 'fade' | 'wipe' | 'none';
  wipeFrom?: 'left' | 'right' | 'top' | 'bottom';
  fontSize?: number;
  fontWeight?: number | string;
  fontFamily?: string;
  letterSpacing?: number;
  reverse?: boolean;
  strokeStyle?: 'solid' | 'dashed' | 'dotted';
  dashLength?: number;
  marching?: boolean;
  hoverRedraw?: boolean;
  shadow?: boolean;
  shadowColor?: string | null;
  className?: string;
  style?: React.CSSProperties;
}

declare const StrokeText: React.FC<StrokeTextProps>;
export default StrokeText;
