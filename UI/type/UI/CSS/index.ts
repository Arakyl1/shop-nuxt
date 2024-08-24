import type { ClassNames } from './assets/scss/ui.scss';

export type CSS_BORDER_RADIUS = 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full';
export type CSS_JUSTIFY_CONTENT = 'center' | 'start' | 'end' | 'left' | 'right' | 'between' | 'around' | 'evenly' | 'baseline';
export type CSS_ALIGN_ITEMS = 'center' | 'flex-start' | 'flex-end';
export type CSS_FLEX_DIRECTION = 'row' | 'row-reverse' | 'column' | 'column-reverse';
export type CSS_ALIGN_CONTENT = 'center' | 'start' | 'end' | 'between' | 'around' | 'evenly';
export type CSS_JUSTIFY_ITEMS = 'start' | 'end' | 'center';

export type ButtonMode = Extract<ClassNames, `btM-${string}`>;
export type InputMode = Extract<ClassNames, `input-${string}`>;

export * as Base from './assets/scss/base.scss';
export type { ClassNames };
