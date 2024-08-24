import { formatDate, type KeyDate } from '../format/date';
import { formatNumber } from '../format/format';

export function onTelephoneMask() {
    let value = '';
    const event = new Event('input');

    const updateValueSendEvent = (target: HTMLInputElement, newValue: string) => {
        value = newValue;
        target.value = value;
        target.dispatchEvent(event);
    };

    return function ({ target }: Event) {
        if (target instanceof HTMLInputElement) {
            const targetValue = target.value;
            let updateValue;

            if (targetValue > value) {
                if (targetValue.length === 1) {
                    updateValue = targetValue.startsWith('+') || targetValue.startsWith('7') ? '7' : `7${targetValue}`;
                } else if (targetValue.length > 16) {
                    updateValue = value;
                } else {
                    updateValue =
                        targetValue.startsWith('+') && targetValue.length === 2 && targetValue[1] !== '7'
                            ? `7${targetValue.slice(2)}`
                            : targetValue;
                }

                updateValue = updateValue
                    .replace(/\D/g, '')
                    .replace(/(\d{1})(\d{0,3})(\d{0,3})(\d{0,2})(\d{0,2})/, '+$1 $2 $3 $4 $5')
                    .trimEnd();

                updateValueSendEvent(target, updateValue);
            } else {
                updateValueSendEvent(target, targetValue.trim());
            }
        }
    };
}

export function onDateMask(mask: KeyDate, updateValue?: (...arg: any[]) => unknown) {
    const event = new Event('change');
    return function ({ target }: Event) {
        if (target instanceof HTMLInputElement) {
            target.value = formatDate(target.value, mask);
            target.dispatchEvent(event);
            updateValue && updateValue(target.value);
        }
    };
}

export function onNumberMask() {
    const event = new Event('change');
    return function ({ target }: Event) {
        if (target instanceof HTMLInputElement && target.dataset.type === 'number') {
            const value = formatNumber(+target.value.replace(/\D/g, ''));
            target.value = value === 'не число' ? '' : value;
            target.dispatchEvent(event);
        }
    };
}
