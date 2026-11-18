export type ToolMode =
  | 'gradient'
  | 'glassmorphism'
  | 'neumorphism'
  | 'shadow'
  | 'blob'
  | 'button'
  | 'text'
  | 'palettes';

export type GradientType =
  | 'linear'
  | 'radial'
  | 'conic'
  | 'repeating-linear'
  | 'mesh';

export type RadialShape = 'circle' | 'ellipse';
export type RadialPosition =
  | 'center'
  | 'top'
  | 'bottom'
  | 'left'
  | 'right'
  | 'top left'
  | 'top right'
  | 'bottom left'
  | 'bottom right';

export interface ColorStop {
  id: string;
  color: string;
  position: number; // 0 to 100
}

export interface GradientState {
  type: GradientType;
  angle: number; // 0 to 360
  radialShape: RadialShape;
  radialPosition: RadialPosition;
  stops: ColorStop[];
}

export interface GlassmorphismState {
  blur: number; // 0 to 40
  opacity: number; // 0 to 100
  color: string;
  borderColor: string;
  borderWidth: number;
  borderRadius: number;
  hasShadow: boolean;
}

export interface NeumorphismState {
  shape: 'flat' | 'concave' | 'convex' | 'pressed';
  size: number;
  radius: number;
  distance: number;
  blur: number;
  baseColor: string;
}

export interface ShadowLayer {
  id: string;
  x: number;
  y: number;
  blur: number;
  spread: number;
  color: string;
  inset: boolean;
}

export interface ButtonState {
  text: string;
  gradientAngle: number;
  colorStart: string;
  colorEnd: string;
  textColor: string;
  borderRadius: number;
  paddingY: number;
  paddingX: number;
  fontSize: number;
  hoverEffect: 'scale' | 'glow' | 'shine' | 'lift';
}

export interface TextGradientState {
  text: string;
  angle: number;
  colorStart: string;
  colorMiddle: string;
  colorEnd: string;
  fontSize: number;
  fontWeight: number;
  hasShadow: boolean;
}

export interface PalettePreset {
  name: string;
  category: 'neon' | 'sunset' | 'ocean' | 'nature' | 'luxury' | 'pastel' | 'dark';
  gradient: string;
  stops: ColorStop[];
  angle: number;
}
