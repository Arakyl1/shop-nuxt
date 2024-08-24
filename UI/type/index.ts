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

export * from './UI/CSS/index';
export * from './UI/Element';
