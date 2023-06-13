import { h } from "vue";

export default (_props: any) => {
    return h('svg', {
        ..._props,
        width: '64px',
        height: '64px',
        viewBox: '0 0 24 24',
        fill: 'none',
        xmlns: 'http://www.w3.org/2000/svg',
        'aria-hidden': true,
    }, [
        h('path', {
            'd': 'M10 12V17', 'stroke-width': '2', 'stroke-linecap': 'round', 'stroke-linejoin': 'round', 'stroke': '#000000',
            class: 'transition-all group-[.is-icon-white]:fill-white group-[.is-icon-black]:stroke-gray-500 group-[.is-icon-black:hover]:stroke-red-300'
        }),
        h('path', {
            'd': 'M14 12V17', 'stroke-width': '2', 'stroke-linecap': 'round', 'stroke-linejoin': 'round', 'stroke': '#000000',
            class: 'transition-all group-[.is-icon-white]:fill-white group-[.is-icon-black]:stroke-gray-500 group-[.is-icon-black:hover]:stroke-red-300'
        }),
        h('path', {
            'd': 'M4 7H20', 'stroke-width': '2', 'stroke-linecap': 'round', 'stroke-linejoin': 'round', 'stroke': '#000000',
            class: 'transition-all group-[.is-icon-white]:fill-white group-[.is-icon-black]:stroke-gray-500 group-[.is-icon-black:hover]:stroke-red-300'
        }),
        h('path', {
            'd': 'M6 10V18C6 19.6569 7.34315 21 9 21H15C16.6569 21 18 19.6569 18 18V10', 'stroke-width': '2', 'stroke-linecap': 'round', 'stroke-linejoin': 'round',
            class: 'transition-all group-[.is-icon-white]:fill-white group-[.is-icon-black]:stroke-gray-500 group-[.is-icon-black:hover]:stroke-red-300',  'stroke': '#000000',
        }),
        h('path', {
            'd': 'M9 5C9 3.89543 9.89543 3 11 3H13C14.1046 3 15 3.89543 15 5V7H9V5Z', 'stroke-width': '2', 'stroke-linecap': 'round', 'stroke-linejoin': 'round',
            class: 'transition-all group-[.is-icon-white]:fill-white group-[.is-icon-black]:stroke-gray-500 group-[.is-icon-black:hover]:stroke-red-300',  'stroke': '#000000',
        })
    ])
}

