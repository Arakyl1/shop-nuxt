import Common from '@/common/C_ru.js';
import { ref } from '#imports';

type DotPrefix<T extends string> = T extends '' ? '' : `.${T}`;

type DotNestedKeys<T> = (
    T extends object ? { [K in Exclude<keyof T, symbol>]: `${K}${DotPrefix<DotNestedKeys<T[K]>>}` }[Exclude<keyof T, symbol>] : ''
) extends infer D
    ? Extract<D, string>
    : never;

type KEY_TEXT = DotNestedKeys<typeof Common>;

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



const locale = ref();
let common: null | KEY_TEXT = null;


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

function importLocale(locale: string) {
    return import(`../../common/C_${locale}.js`)
}

async function setCommon() {
    const res = await importLocale(locale.value.code)
    common = res.default || {}
}

export const t = useI18n().t;

export function useI18n() {

    function initI18n() {
        let _locale;
        // if (window) {
        //     console.log(localStorage.getItem('locale') )
        // }
        setLocale(_locale || null);
    }

    function setLocale(code: KEY_LOCALE | null) {

        if (!locale.value || locale.value.code !== code) {
            const newLocale = locales.find((l) => l.code === code) || locales[0];
            locale.value = newLocale;

            // if (window) {
            //     localStorage.setItem('locale', JSON.stringify(newLocale));
            // }
        }
    }

    function t(msg: KEY_TEXT, param: { replace: string, declination?: number } | null = null) {
        if (!common) return;
        let val = msg.split('.').reduce((val, part) => val?.[part] || '', common);
        if (param?.replace) {
            val = (val as string).replace('{0}', param.replace);
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

useI18n().initI18n();

setCommon()
