import { h } from 'vue'

interface Props {
    
}
export default (_props?: Props , { slots }) => {
    return h('button', {
        ..._props,
        type: 'button',
        class: 'bt-base after:content-[" "]'
    }, slots.default())
}
