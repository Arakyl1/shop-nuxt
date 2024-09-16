import type { Config } from './node_modules/tailwindcss/types/index.js';

export default {
  content: [
    "@/components/**/*.{js,vue,ts}",
    "@/pages/**/*.vue",
  ],
  safelist: [
    // 'flex-row', 'flex-row-reverse', 'flex-col', 'flex-col-reverse',
    {
      pattern: /rounded-(.)|text-(.)/,
      variants: ['xl','lg','md','sm','xs','hover',]
    },
    {
      pattern: /flex|justify|justify-items|justify-self|items|self/
    }
  ],
  theme: {
    container: {
      padding: {
        DEFAULT: '1rem',
        sm: '2rem',
        lg: '3rem',
        xl: '4rem',
        '2xl': '5rem',
      },
    },
    
    borderRadius: {
      full: "9999px",
      xl: "8px",
      lg: "6px",
      base: "4px",
    },
    fontSize: createVar<'3xl'|'2xl'|'xl'|'lg'|'md'|'sm'|'xs'>('text', [['3xl', { 'lineHeight': '77px' }],['2xl', { lineHeight: '43px' }],['xl', { lineHeight: '29px' }],['lg', { lineHeight: '22px' }],['md', { lineHeight: '19px' }],['sm', { lineHeight: '16px' }],['xs', { lineHeight: '14px' }]]),
    colors: {
      'black': createVar<100|200|300|500|700|900>('black', [100, 200, 300, 500, 700, 900]),
      'blue': createVar<30|50|100|300|500>('blue', [30, 50, 100, 300, 500]),
      'gray': createVar<100|200|300|500|700>('gray', [100, 200, 300, 500, 700]),
      'yellow': createVar<100|300|500>('yellow', [100, 300, 500]),
      'red': createVar<100|300|500>('red', [100, 300, 500]),
      'green': createVar<300|500>('green', [300, 500]),
      'white': 'var(--white)'
      // {
      //   30: 'rgba(119, 177, 245, 0.1)',
      //   50: 'rgba(16, 116, 235, 0.3)',
      //   100: 'rgb(119, 177, 245)',
      //   300: '#4a98f5',
      //   500: 'rgb(16, 116, 235)',
      // }
    },
    extend: {},
  },
  plugins: [],
} as Config;

type FFF<U> = string | number | [U , { [K in 'lineHeight'| 'letterSpacing' | 'fontWeight']?: string }]
function createVar <U extends string | number = '', T extends FFF<U> = FFF<U>>(key: string, value: Array<T>) {
  return Object.fromEntries(value.map((_) => {
    if (Array.isArray(_)) {
      return [_[0], [`var(--${key}-${_[0]})`, _[1]]]
    } else return [_, `var(--${key}-${_})`];
  })) as { [P in U]: string }
}
// (U extends never ? T extends (string | number) ? T : T : U)
//(U extends string ? U : T extends (string | number) ? T : '')
// function createSafelist(key:string, value: (string | number)[]) {
//   return value.map((_) => `${key}-${_}`);
// }
