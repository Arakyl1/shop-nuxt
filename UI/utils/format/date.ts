// type GG<T extends string> = `${Exclude<T, "">}`
type FF<T extends string, U extends string> = `${U} ${T}`;
type GGG<U extends string, T extends string> = U | `${U}, ${Exclude<T, ''>}`;
type day = '' | 'DD' | 'DDD';
type mount = 'MM' | 'MMM' | 'MMMM';
type year = 'YY' | 'YYYY';
type week = 'WW' | 'WWW';
type hour = 'HH' | 'HHH';
type min = 'TT' | 'TTT';
type HM = `${hour | min | `HH:${min}` | `HHH:${min}`}`;
type MY = year | mount | FF<year, mount>;
type MYW = MY | week | FF<MY, week>;
type DWMY = MYW | day | FF<MYW, day>;
export type KeyDate = Exclude<
    `${GGG<DWMY, HM>}`,
    '' | `${string} ` | ` ${string}` | `, ${string}` | `${string} , ${string}` | `${string}  ${string}`
>;
// export type KeyFormatDat = `${'' | 'DD' | 'DDD'} ${'WW' | 'WWW'} ${'MM' | 'MM' | 'MMMM'} ${'' | 'YY' | 'YYYY' | `${'YY' | 'YYYY'}, ${HM}`}`;

const mapKeyValue: { [k: string]: keyof Intl.DateTimeFormatOptions } = {
    D: 'day',
    W: 'weekday',
    M: 'month',
    Y: 'year',
    H: 'hour',
    T: 'minute'
};

const mapParamsValue = {
    DD: '2-digit',
    DDD: 'numeric',
    MM: '2-digit',
    MMM: 'short',
    MMMM: 'long',
    YY: '2-digit',
    YYYY: 'numeric',
    WW: 'short',
    WWW: 'long',
    HH: '2-digit',
    HHH: 'numeric',
    TT: '2-digit',
    TTT: 'numeric'
};

function parceKeyInDateOption(key: KeyDate) {
    const params: Intl.DateTimeFormatOptions = {};
    const value = key.split(' ');

    function addParams(value: string) {
        const key = mapKeyValue[value.charAt(0)] as keyof Intl.DateTimeFormatOptions;
        if (key) {
            params[key] = mapParamsValue[value];
        }
    }
    value.forEach((_) => {
        const _el = _.replace(',', '') as keyof typeof mapParamsValue;
        if (_el.length < 4) {
            addParams(_el);
        } else {
            const option = _el.split(':');
            option.forEach((_) => addParams(_));
        }
    });
    return params;
}

export function formatDate(date: Date | string, key: KeyDate, replace: string = '', reg: RegExp = /(\sг.?(\sв))|\.$/gi) {
    return new Intl.DateTimeFormat('ru', parceKeyInDateOption(key))
        .format(typeof date === 'string' ? new Date(date) : date)
        .replace(reg, replace);
}

export function formatDateIsInput(date: string) {
    return date.replace(/(\d{2})\.(\d{2})\.(\d{4})/, '$3-$2-$1');
}
