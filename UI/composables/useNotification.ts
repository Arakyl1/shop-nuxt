import { useState } from '#imports';

import type { NotificationItem, NotificationItemCreate } from '../../type/index';

export default () => {
    const notificationData = () => useState<Array<NotificationItem>>('notification');

    function create(item: NotificationItemCreate<'key'>) {
        const data = notificationData();
        if (item && item.key) {
            const createItem = {
                state: item.state || 'info',
                text: item.key,
                active: true,
                createAt: Date.now()
            };
            data.value = [createItem, ...data.value];
        }
    }

    return { create };
};
