import { h } from "vue";

interface Props {

}
export default (_props?: Props) => {
    return h('svg', {
        ..._props,
        width: '25',
        height: '23',
        viewBox: '0 0 25 23',
        fill: 'none',
        xmlns: 'http://www.w3.org/2000/svg'
    }, [
        h('path', {
            'd': 'M12.5 0L15.3064 8.63729H24.3882L17.0409 13.9754L19.8473 22.6127L12.5 17.2746L5.15268 22.6127L7.95911 13.9754L0.611794 8.63729H9.69357L12.5 0Z',
            class: 'group-[.is-star-yellow]:fill-yellow-500 group-[.is-star-gray]:fill-gray-300'
        })])
}
