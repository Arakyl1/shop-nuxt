import { h } from "vue";

export default (_props: any) => {
    return h('svg', {
        ..._props,
        width: '64px',
        height: '64px',
        viewBox: '0 0 16.00 16.00',
        xmlns: 'http://www.w3.org/2000/svg'
    }, [
        h('path', {
            'd': 'M11.436 1.005A1.75 1.75 0 0113.902.79l.702.589a1.75 1.75 0 01.216 2.465l-5.704 6.798a4.75 4.75 0 01-1.497 1.187l-2.572 1.299a.75.75 0 01-1.056-.886l.833-2.759a4.75 4.75 0 01.908-1.68l5.704-6.798zm1.502.934a.25.25 0 00-.353.03l-.53.633 1.082.914.534-.636a.25.25 0 00-.031-.352l-.703-.59zm-.765 2.726l-1.082-.914-4.21 5.016a3.25 3.25 0 00-.621 1.15L5.933 11l1.01-.51a3.249 3.249 0 001.024-.812l4.206-5.013z',
            class: 'transition-all group-[.is-icon-white]:fill-white group-[.is-icon-black]:fill-gray-500 group-[.is-icon-black:hover]:fill-yellow-500'
        }),
        h('path', {
            'd': 'M3.25 3.5a.75.75 0 00-.75.75v9.5c0 .414.336.75.75.75h9.5a.75.75 0 00.75-.75V9A.75.75 0 0115 9v4.75A2.25 2.25 0 0112.75 16h-9.5A2.25 2.25 0 011 13.75v-9.5A2.25 2.25 0 013.25 2H6a.75.75 0 010 1.5H3.25z',
            class: 'transition-all group-[.is-icon-white]:fill-white group-[.is-icon-black]:fill-gray-500 group-[.is-icon-black:hover]:fill-yellow-500'
        })
    ])
}
