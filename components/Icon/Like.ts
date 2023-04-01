import { h } from "vue";

interface Props {

}
export default (_props?: Props) => {
    return h('svg', {
        ..._props,
        viewBox: '0 0 34.2 31.3',
        fill: 'none',
        xmlns: 'http://www.w3.org/2000/svg'
    }, [
        h('path', {
            'd': 'M17.5,4.1L17,4.6l-0.5-0.5C13,0.7,7.4,0.7,3.9,4.2c-3.4,3.5-3.5,9.1,0,12.6L17.1,30l13.2-13.2c3.4-3.5,3.4-9.1-0.1-12.6C26.7,0.8,21.1,0.7,17.5,4.1z',
            class: 'transition-all group-[.icon-red]:fill-red-500 group-[.icon-red]:stroke-red-500 group-[.icon-black]:stroke-[3] group-[.icon-black]:stroke-gray-500 group-[.icon-black]:fill-none'
        })])
}
