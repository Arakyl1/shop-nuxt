// import { default as Common } from '@/common/_C';
import C_Ru from '@/common/ru.json';
import { ref } from '#imports';

type DotPrefix<T extends string> = T extends '' ? '' : `.${T}`;

type DotNestedKeys<T> = (
    T extends object ? { [K in Exclude<keyof T, symbol>]: `${K}${DotPrefix<DotNestedKeys<T[K]>>}` }[Exclude<keyof T, symbol>] : ''
) extends infer D
    ? Extract<D, string>
    : never;

type KEY_LOCALE = 'ru' | 'en';

const locales = [
    {
        code: 'ru',
        name: 'Russian'
    },
    {
        code: 'en',
        name: 'Europe'
    }
];

type KEY_TEXT = DotNestedKeys<typeof C_Ru>;

const locale = ref(locales[0]);
// let common = null;

// import(`@/common/${locale.value.code}.json`).then((_) => {
//     common = _;
// });
// async function loadCommon() {
//     common.value = await import(`@/common/${locale.value.code}.json`);
//     console.log(common.value);
// }

// watch(
//     () => locale.value,
//     async () => {
//         console.log(locale.value);
//         await loadCommon();
//     }
// );

export const t = useI18n().t;

export function useI18n() {
    function initI18n(code: KEY_LOCALE) {
        setLocale(code);
    }

    async function setLocale(code: KEY_LOCALE) {
        if (locale.value.code !== code) {
            locale.value = locales.find((l) => l.code === code) || locales[0];
        }
    }

    function t(msg: KEY_TEXT, param = null) {
        let val = msg.split('.').reduce((val, part) => val[part], C_Ru);
        if (param) {
            val = val.replace('{0}', param);
        }
        return val as unknown as string;
    }

    return {
        t,
        locale,
        locales,
        initI18n,
        setLocale
    };
}
