import type { ClassNames } from './assets/scss/ui.scss';
import type { ClassNames as LibClassNames } from './assets/scss/lib.scss';


type startTrimString<T,S extends string> = T extends `${S}${infer P}` ? P : never
type ExtractStartTrimString<T,S extends string> = startTrimString<Extract<T, `${S}${string}`>, S>;
// export type CSS_BORDER_RADIUS = 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full';
export type CSS_JUSTIFY_CONTENT = ExtractStartTrimString<LibClassNames, 'justify-'>; //'center' | 'start' | 'end' | 'left' | 'right' | 'between' | 'around' | 'evenly' | 'baseline';
export type CSS_ALIGN_ITEMS = ExtractStartTrimString<LibClassNames, 'align-'> //'center' | 'flex-start' | 'flex-end';
export type CSS_FLEX_DIRECTION = Extract<ExtractStartTrimString<LibClassNames, 'flex-'>, 'row' | 'row-reverse' | 'column' | 'column-reverse'>; //;
export type CSS_ALIGN_CONTENT = 'center' | 'start' | 'end' | 'between' | 'around' | 'evenly';
export type CSS_JUSTIFY_ITEMS = ExtractStartTrimString<LibClassNames, 'items-'>; //'start' | 'end' | 'center';

export type ButtonMode = ExtractStartTrimString<ClassNames, 'btM_'>;
export type DropdownMode = ExtractStartTrimString<ClassNames, 'drM_'>;
export type SelectMode = ExtractStartTrimString<ClassNames, 'SelM_'>;
export type MaskMode = ExtractStartTrimString<ClassNames, 'MaM_'>;
export type ProgressMode = ExtractStartTrimString<ClassNames, 'ProM_'>;
export type RadioAppearance = ExtractStartTrimString<ClassNames, 'RadPrM_' | 'RadSecM_'>;
export type InputMode = ExtractStartTrimString<ClassNames, `InpM_`>;
export type ContainerSize = ExtractStartTrimString<ClassNames, 'Co_'>;
export type ContainerGrid = ExtractStartTrimString<ClassNames, 'CoG_'>;1
export type GridScrollContainer = ExtractStartTrimString<ClassNames, `GS_`>;
export type CardMode = ExtractStartTrimString<ClassNames, `Ca_`>;
export type PanelMode = ExtractStartTrimString<ClassNames, `Pa_`>;
export type CSS_BORDER_RADIUS = ExtractStartTrimString<LibClassNames, 'rounded-'>;
export type CSS_FONT_SIZE = ExtractStartTrimString<LibClassNames, 'textS-'>;
export type CSS_FONT_WEIGHT = ExtractStartTrimString<LibClassNames, 'textW-'>;
export type CSS_COLOR = ExtractStartTrimString<LibClassNames, 'color-'>;
export type SkeletonMode = ExtractStartTrimString<ClassNames, `SkeM_`>;

export type { ClassNames };