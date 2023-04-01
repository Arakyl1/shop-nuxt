import { h } from "vue";

interface Props {

}
export default (_props?: Props) => {
    return h('svg', {
        ..._props,
        width: '6',
        height: '11',
        viewBox: '0 0 6 11',
        fill: 'none',
        xmlns: 'http://www.w3.org/2000/svg'
    }, [
        h('path', {
            'd': 'M5.6665 5.5L0.916506 10.25L0.916505 0.749999L5.6665 5.5Z',
            fill: 'white'
        })])
}