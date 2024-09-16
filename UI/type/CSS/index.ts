import type { ClassNames } from './assets/css/ui.scss';
import type tailwind from "../../tailwind.config";
import type { DotNestedKeys } from "../index";
// import type { ClassNames as LibClassNames } from './assets/scss/lib.scss';

type Tailwind = typeof tailwind.theme
// type f = DotNestedKeys<Tailwind['colors'], '-'>
type startTrimString<T,S extends string> = T extends `${S}${infer P}` ? P : never
type ExtractStartTrimString<T,S extends string> = startTrimString<Extract<T, `${S}${string}`>, S>;
// export type CSS_BORDER_RADIUS = 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full';
export type CSS_FLEX_DIRECTION = 'row' | 'row-reverse' | 'col' | 'col-reverse'
export type CSS_JUSTIFY_CONTENT = 'normal' | 'start' | 'end' | 'center' | 'between' | 'around' | 'evenly' | 'stretch';
export type CSS_JUSTIFY_ITEMS = 'start' | 'end' | 'center' | 'stretch';
export type CSS_ALIGN_CONTENT = 'normal' | 'start' | 'end' | 'center' | 'between' | 'around' | 'evenly' | 'stretch';
export type CSS_ALIGN_ITEMS = 'start' | 'end' | 'center' | 'baseline' | 'stretch';
export type CSS_BORDER_RADIUS = DotNestedKeys<Tailwind['borderRadius'], '-'>;
export type CSS_FONT_SIZE = DotNestedKeys<Tailwind['fontSize'], '-'>;
export type CSS_FONT_WEIGHT = '' // ExtractStartTrimString<LibClassNames, 'textW-'>;
export type CSS_COLOR =  DotNestedKeys<Tailwind['colors'], '-'>;

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
export type SkeletonMode = ExtractStartTrimString<ClassNames, `SkeM_`>;

export type { ClassNames };