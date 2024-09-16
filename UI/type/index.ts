import type { CSS_BORDER_RADIUS, CSS_COLOR, SkeletonMode } from './CSS/index';
import type { IconName } from './Icon/name';

export type DotPrefix<T extends string, S extends string> = T extends '' ? '' : `${S}${T}`;

export type DotNestedKeys<T, S extends string = '.'> = (
    T extends object ? { [K in Exclude<keyof T, symbol>]: `${K}${DotPrefix<DotNestedKeys<T[K]>, S>}` }[Exclude<keyof T, symbol>] : ''
) extends infer D
    ? Extract<D, string>
    : never;
// COMPOSABLE TYP
export interface useShowProps {
    autoClose?: boolean;
    delay?: number;
    closeDelay?: number;
    triggers?: Array<'hover' | 'click' | 'focus' | 'contextmenu'>;
}

export type NotificationItem = {
    text: string | number;
    state: 'info' | 'error' | 'success' | 'base' | 'loader';
    active: boolean;
    createAt: number;
};
export type NotificationItemStateKey = NotificationItem['state'];
export type NotificationItemCreate<T = string> = Pick<NotificationItem, 'state'> & { key: T; skip?: boolean };

export type * from './CSS/index';
export type * from './UI/Element';
export type * from './Icon/name'


interface DefaultAttrforUI {
    selectTriggerIcon?: IconName;
    selectTriggerIconActive?: IconName;
    selectDataTriggerInputIcon?: IconName;
    selectDataButtonRightIcon?: IconName;
    selectDataButtonLeftIcon?: IconName;
    animationLoaderColor?: CSS_COLOR;
    skeletonBaseColor?: CSS_COLOR;
    skeletonDefaultMode?: SkeletonMode;
    skeletonDefaultRounded?: CSS_BORDER_RADIUS;
    titleDefaultColor?: CSS_COLOR,
}

const defaultAttrforUI: DefaultAttrforUI = {
    selectTriggerIcon: 'Arrow-Primary-Top',
    selectTriggerIconActive: 'Arrow-Primary-Bottom',
    selectDataTriggerInputIcon: 'calendar',
    selectDataButtonRightIcon: 'arrow-right',
    selectDataButtonLeftIcon: 'arrow-right',
    animationLoaderColor: 'blue-300',
    skeletonBaseColor: 'gray-100',
    skeletonDefaultMode: 'gray',
    skeletonDefaultRounded: 'xl',
    titleDefaultColor: 'black-500'
}

export { defaultAttrforUI }